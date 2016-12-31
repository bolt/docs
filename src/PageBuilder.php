<?php

namespace Bolt\Docs;

use Cocur\Slugify\SlugifyInterface;
use ParsedownExtra;
use Symfony\Component\Config\ConfigCacheFactoryInterface;
use Symfony\Component\Config\ConfigCacheInterface;
use Symfony\Component\Config\Resource\DirectoryResource;
use Symfony\Component\Config\Resource\FileResource;
use Symfony\Component\Filesystem\Exception\FileNotFoundException;
use Symfony\Component\Yaml;
use Webmozart\PathUtil\Path;

class PageBuilder
{
    /** @var SlugifyInterface */
    protected $slugifier;
    /** @var ParsedownExtra */
    protected $markdown;
    /** @var Yaml\Parser */
    protected $yamlParser;
    /** @var ConfigCacheFactoryInterface */
    protected $configCacheFactory;
    /** @var string */
    protected $cacheDir;

    /** @var string */
    protected $root;
    /** @var string */
    protected $version;

    /**
     * Constructor.
     *
     * @param SlugifyInterface            $slugifier
     * @param ParsedownExtra              $markdown
     * @param Yaml\Parser                 $yamlParser
     * @param ConfigCacheFactoryInterface $configCacheFactory
     * @param string                      $cacheDir
     */
    public function __construct(
        SlugifyInterface $slugifier,
        ParsedownExtra $markdown,
        Yaml\Parser $yamlParser,
        ConfigCacheFactoryInterface $configCacheFactory,
        $cacheDir
    ) {
        $this->slugifier = $slugifier;
        $this->markdown = $markdown;
        $this->yamlParser = $yamlParser;
        $this->configCacheFactory = $configCacheFactory;
        $this->cacheDir = $cacheDir;
    }

    /**
     * @param string $root
     * @param string $version
     *
     * @return Page
     */
    public function build($root, $version)
    {
        $this->root = rtrim($root, '/') . '/';
        $this->version = $version;
        return $this->loadCacheCollection('');
    }

    /**
     * @param string $dir
     *
     * @return Page
     */
    protected function loadCacheCollection($dir)
    {
        $page = null;
        $cache = $this->configCacheFactory->cache(
            $this->getCacheFile($dir),
            function (ConfigCacheInterface $cache) use ($dir, &$page) {
                $page = $this->loadCollection($dir);
                $str = serialize($page);
                $cache->write($str, [new DirectoryResource($this->root . $dir)]);
            }
        );

        if (!$page) {
            $page = unserialize(file_get_contents($cache->getPath()));
        }

        return $page;
    }

    protected function loadCollection($dir)
    {
        try {
            $page = $this->loadCachePage($dir . '/index.md');
        } catch (FileNotFoundException $e) {
            $page = new Page();
            $page->setTitle($dir);
            $page['pages'] = array_map(function($file) {
                $ext = pathinfo($file, PATHINFO_EXTENSION);
                if ($ext !== '') {
                    $ext = '.' . $ext;
                }
                return substr($file, 0, strlen($file) - strlen($ext));
            }, array_diff(scandir($this->root . $dir, SCANDIR_SORT_NONE), ['.', '..']));
        }
        $page->setName(basename($dir));

        foreach ((array) $page['pages'] as $subPageName) {
            $subPath = (empty($dir) ? $dir : $dir . '/') . $subPageName;
            if (is_dir($this->root . $subPath)) {
                $subPage = $this->loadCacheCollection($subPath);
            } elseif (is_file($this->root . $subPath . '.md')) {
                $subPage = $this->loadCachePage($subPath . '.md');
                $subPage->setName($subPageName);
            } else {
                throw new FileNotFoundException(null, 0, null, $this->root . $subPath);
            }

            $page->addSubPage($subPage);
        }

        return $page;
    }

    /**
     * @param string $file
     *
     * @return Page
     */
    protected function loadCachePage($file)
    {
        $page = null;
        $cache = $this->configCacheFactory->cache(
            $this->getCacheFile($file),
            function (ConfigCacheInterface $cache) use ($file, &$page) {
                $page = $this->loadPage($file);
                $str = serialize($page);
                $cache->write($str, [new FileResource($this->root . $file)]);
            }
        );

        if (!$page) {
            $page = unserialize(file_get_contents($cache->getPath()));
        }

        return $page;
    }

    protected function loadPage($file)
    {
        if (!is_readable($this->root . $file)) {
            throw new FileNotFoundException($file);
        }

        $page = new Page();

        $page->setVersion($this->version);
        $page->setPath($file);

        $document = file_get_contents($this->root . $file);
        if (strpos($document, '---') === 0) {
            $parts = explode("---\n", $document, 3);
            $source = $parts[2];
            $page->setVariables($this->yamlParser->parse($parts[1]));
        } else {
            $source = $document;
        }

        $content = $this->markdown->text($source);

        if (!$page->getTitle()) {
            if (preg_match('#<h1>(.*)</h1>#i', $content, $mainTitle)) {
                $page->setTitle($mainTitle[1]);
            } else {
                $page->setTitle(Path::getFilenameWithoutExtension($file));
            }
        }

        // We don't need the top-level H1 from the content, because we
        // output it in the template where we need it.
        $content = preg_replace('#<h1>(.*)</h1>#i', '', $content);

        $submenu = [];
        preg_match_all('#<h2>(.*)</h2>#i', $content, $matches);
        foreach ($matches[1] as $key => $title) {
            $title = strip_tags($title);
            $submenu[$this->slugifier->slugify($title)] = $title;
        }
        $page->setSubMenu($submenu);

        $content = $this->markupAnchors($content);

        $page->setContent($content);

        return $page;
    }

    /**
     * Add anchors markup for <h2> and <h3> and <h4>
     *
     * @param string $source
     *
     * @return string
     */
    protected function markupAnchors($source)
    {
        return preg_replace_callback(
            '#<h([234])>(.*)</h([234])>#i',
            function ($matches) {
                return sprintf(
                    '<h%s id="%s">%s<a href="#%2$s" class="anchor">¶</a></h%1$s>',
                    $matches[1],
                    $this->slugifier->slugify(strip_tags($matches[2])),
                    $matches[2]
                );
            },
            $source
        );
    }

    protected function getCacheFile($file)
    {
        $hash = hash('sha256', $this->root . $file);
        return $this->cacheDir . '/' . $hash[0] . $hash[1] . '/' . $hash . '.php';
    }
}
