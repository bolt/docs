<?php

namespace Bolt\Docs;


class ContentGetter
{
    public function source($version, $slug)
    {

        $sourceFile = sprintf('%s/version/%s/source_docs/%s.md', dirname(__DIR__), $version, $slug);

        if (!is_readable($sourceFile)) {
            return;
        }

        $source = file_get_contents($sourceFile);

        $source = \ParsedownExtra::instance()->text($source);

        return $source;

    }
}

