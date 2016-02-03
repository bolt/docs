<?php

namespace Bolt\Docs;

use Cocur\Slugify\Slugify;

class ContentGetter
{

    private $source;

    public function __construct($version, $slug)
    {
        $sourceFile = sprintf('%s/version/%s/source_docs/%s.md', dirname(__DIR__), $version, $slug);

        // dump($sourceFile);

        if (!is_readable($sourceFile)) {
            return;
        }

        $this->source = \ParsedownExtra::instance()->text(file_get_contents($sourceFile));
    }

    public function source()
    {

        // phpinfo();

        // Markup for <h1> and <h2>..
        $source = preg_replace_callback("/<h([234])>(.*)<\/h([234])>/i", function($matches) {
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

    public function getTitle()
    {
        preg_match("/<h1>(.*)<\/h1>/i", $this->source, $maintitle);

        return $maintitle[1];
    }


    public function getMenu($version, $filename)
    {
        $sourceFile = sprintf('%s/version/%s/%s', dirname(__DIR__), $version, $filename);

        if (!is_readable($sourceFile)) {
            return [];
        }

        $yaml = new \Symfony\Component\Yaml\Parser();
        $this->menu = $yaml->parse(file_get_contents($sourceFile));

        return $this->menu;
    }

    public function getSubmenu()
    {
        preg_match_all("/<h2>(.*)<\/h2>/i", $this->source, $matches);

        $submenu = array();
        foreach ($matches[1] as $key => $title) {
            $submenu[ $this->makeSlug(strip_tags($title)) ] = strip_tags($title);
        }

        return $submenu;
    }

    public function makeSlug($str)
    {
        $s = new Slugify();
        return $s->slugify($str);
    }

}

