<?php

declare(strict_types=1);

namespace Bolt\Docs;

use Symfony\Component\Yaml;

/**
 * Version class.
 *
 * @author Carson Full <carsonfull@gmail.com>
 * @author Gawain Lynch <gawain.lynch@gmail.com>
 */
class Version
{
    /** @var string */
    private $version;
    /** @var string */
    private $basePath;
    /** @var PageBuilder */
    private $builder;
    /** @var Yaml\Parser */
    private $yamlParser;

    /** @var Page */
    private $rootPage;
    /** @var string */
    private $cheatSheet;
    /** @var string */
    private $classReference;

    /**
     * Constructor.
     */
    public function __construct(string $version, string $basePath, PageBuilder $builder, Yaml\Parser $yamlParser)
    {
        $this->version = $version;
        $this->basePath = $basePath;
        $this->builder = $builder;
        $this->yamlParser = $yamlParser;
    }

    public function __toString(): string
    {
        return $this->getVersion();
    }

    public function getVersion(): string
    {
        return $this->version;
    }

    /**
     * Get a page.
     *
     * @throws \InvalidArgumentException
     */
    public function getPage(string $page): Page
    {
        return $this->getRootPage()->getPage($page);
    }

    /**
     * Get the menu.
     */
    public function getMenu(): array
    {
        return $this->getRootPage()->getMenu()['children'];
    }

    /**
     * Get the class reference from the correct YAML file.
     *
     * @throws \Symfony\Component\Yaml\Exception\ParseException
     */
    public function getClassReference(): array
    {
        if ($this->classReference === null) {
            $file = $this->basePath . '/class_reference.yml';

            $contents = null;
            if (\file_exists($file)) {
                $contents = $this->yamlParser->parse(\file_get_contents($file));
            }

            $this->classReference = $contents ?: [];
        }

        return $this->classReference;
    }

    /**
     * Get the cheatsheet reference from the correct YAML file.
     *
     * @throws \Symfony\Component\Yaml\Exception\ParseException
     */
    public function getCheatSheet(): array
    {
        if ($this->cheatSheet === null) {
            $file = $this->basePath . '/cheatsheet.yml';

            $contents = null;
            if (\file_exists($file)) {
                $contents = $this->yamlParser->parse(\file_get_contents($file));
            }

            $this->cheatSheet = $contents ?: [];
        }

        return $this->cheatSheet;
    }

    private function getRootPage(): Page
    {
        if (! $this->rootPage) {
            $this->rootPage = $this->builder->build($this->basePath . '/docs', $this->version);
            $this->rootPage->setName($this->version);
        }

        return $this->rootPage;
    }
}
