<?php

namespace Bolt\Docs;

use Cocur\Slugify\Slugify;

class ContentGetter
{
    private $basepath = '';
    private $source = '';
    private $slug = '';
    private $version = '';
    private $menucounter = 0;

    /**
     * ContentGetter constructor.
     *
     * @param string $version
     * @param string $slug
     */
    public function __construct($version = 'local', $slug = null)
    {
        $this->rootpath = dirname(__DIR__);

        if ($version === 'local') {
            $this->basepath = $this->rootpath;
        } else {
            $this->basepath = sprintf('%s/version/%s/', dirname(__DIR__), $version);
        }

        if ($slug !== null) {
            $sourceFile = sprintf('%s/source_docs/%s.md', $this->basepath, $slug);

            if (!is_readable($sourceFile)) {
                return;
            }

            $this->source = \ParsedownExtra::instance()->text(file_get_contents($sourceFile));
        }

        $this->slug = $slug;
        $this->version = $version;

    }

    /**
     * Get the source for a page, making internal links for <h2> to <h4>
     *
     * @return string
     */
    public function source()
    {
        // Markup for <h1> and <h2>..
        $source = preg_replace_callback("/<h([234])>(.*)<\/h([234])>/i", function ($matches) {
            $output = sprintf("<h%s id='%s'>%s<a href='#%s' class='anchor'>¶</a></h%s>",
                $matches[1],
                $this->makeSlug($matches[2]),
                $matches[2],
                $this->makeSlug($matches[2]),
                $matches[1]
            );
            return $output;
        }, $this->source);

        return $source;
    }

    /**
     * Get the title for a page.
     *
     * @return string
     */
    public function getTitle()
    {
        preg_match("/<h1>(.*)<\/h1>/i", $this->source, $maintitle);

        return $maintitle[1];
    }

    /**
     * Get the class reference from the correct YAML file.
     *
     * @return array
     */
    public function getClassReference()
    {
        $sourceFile = sprintf('%s/class_reference.yml', $this->basepath);

        $yaml = new \Symfony\Component\Yaml\Parser();
        $this->classReference = $yaml->parse(file_get_contents($sourceFile));

        return $this->classReference;
    }

    /**
     * Get the cheatsheet reference from the correct YAML file.
     *
     * @return array
     */
    public function getCheatsheet()
    {
        $sourceFile = sprintf('%s/cheatsheet.yml', $this->basepath);

        $yaml = new \Symfony\Component\Yaml\Parser();
        $this->cheatsheet = $yaml->parse(file_get_contents($sourceFile));

        return $this->cheatsheet;
    }

    /**
     * Get the menu for the current 'version' as an array.
     *
     * @param string $filename
     *
     * @return array
     */
    public function getMenu($filename)
    {
        $sourceFile = sprintf('%s/%s', $this->basepath, $filename);

        if (!is_readable($sourceFile)) {
            return [];
        }

        $yaml = new \Symfony\Component\Yaml\Parser();
        $this->menu = $yaml->parse(file_get_contents($sourceFile));

        return $this->menu;
    }

    /**
     * Get the menu for the current 'version' as an array, suitable to return in
     * a JSON response.
     *
     * @param string $filename
     *
     * @return array
     */
    public function getJsonMenu($filename)
    {
        $menu = $this->getMenu($filename);

        $menuArray = [];
        foreach ($menu as $key => $menuItem) {
            $menuArray[] = $this->menuHelper($menuItem);
        }

        return $menuArray;
    }

    /**
     * Helper function for getJsonMenu
     *
     * @param array $menu
     *
     * @return array
     */
    private function menuHelper($menu)
    {
        $children = [];
        if (is_array($menu['items']) && !empty($menu['items'])) {
            foreach($menu['items'] as $link => $item){
                if (is_string($item)) {
                    $this->menucounter++;
                    $link = '/' . $this->version . '/' . $link;
                    $children[] = [
                        'id'    => $this->menucounter . '-' . $this->makeSlug($item),
                        'label' => $item,
                        'url'   => $link
                    ];
                } elseif (is_array($item)) {
                    $children[] = $this->menuHelper($item);
                }
            }
        }

        $this->menucounter++;

        return [
            'id'            => $this->menucounter . '-' . $this->makeSlug($menu['title']),
            'label'         => $menu['title'],
            'childrenlinks' => $this->findLinks($children),
            'children'      => $children
        ];
    }

    /**
     * Helper function to build an array of links, recursively.
     */
    private function findLinks($arr)
    {
        $links = [];

        if (is_array($arr)) {
            foreach($arr as $item) {
                if (isset($item['url'])) {
                    $links[] = $item['url'];
                } else {
                    $links = array_merge($links, $this->findLinks($item['children']));
                }
            }
        }

        return $links;
    }

    /**
     * Get a 'submenu', parsed from the <h2> headings in a page.
     *
     * @return array
     */
    public function getSubmenu()
    {
        preg_match_all("/<h2>(.*)<\/h2>/i", $this->source, $matches);

        $submenu = array();
        foreach ($matches[1] as $key => $title) {
            $submenu[ $this->makeSlug(strip_tags($title)) ] = strip_tags($title);
        }

        return $submenu;
    }


    /**
     * Get the available versions from the correct YAML file.
     *
     * @return array
     */
    public function getVersions()
    {
        $sourceFile = sprintf('%s/app/versions.yml', dirname(__DIR__));

        $yaml = new \Symfony\Component\Yaml\Parser();
        $this->versions = $yaml->parse(file_get_contents($sourceFile));

        return $this->versions;
    }

    /**
     * Create a slug
     *
     * @param string $str
     *
     * @return string
     */
    private function makeSlug($str)
    {
        $s = new Slugify();
        return $s->slugify($str);
    }

}

