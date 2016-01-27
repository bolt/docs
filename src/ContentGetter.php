<?php

namespace Bolt\Docs;


class ContentGetter
{

    private $source;

    public function source($version, $slug)
    {

        $sourceFile = sprintf('%s/version/%s/source_docs/%s.md', dirname(__DIR__), $version, $slug);

        if (!is_readable($sourceFile)) {
            return;
        }

        $this->source = file_get_contents($sourceFile);

        $this->source = \ParsedownExtra::instance()->text($this->source);

        return $this->source;
    }

    public function getTitle()
    {
        preg_match("/<h1>(.*)<\/h1>/i", $this->source, $maintitle);

        return $maintitle[1];
    }


    public function menu($version, $filename)
    {
        $sourceFile = sprintf('%s/version/%s/%s', dirname(__DIR__), $version, $filename);

        if (!is_readable($sourceFile)) {
            return [];
        }

        $yaml = new \Symfony\Component\Yaml\Parser();
        $this->menu = $yaml->parse(file_get_contents($sourceFile));

        return $this->menu;
    }

}

