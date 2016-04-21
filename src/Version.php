<?php

namespace Bolt\Docs;

use Symfony\Component\Yaml;

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
     *
     * @param string           $version
     * @param string           $basePath
     * @param PageBuilder      $builder
     * @param Yaml\Parser      $yamlParser
     */
    public function __construct(
        $version,
        $basePath,
        PageBuilder $builder,
        Yaml\Parser $yamlParser
    ) {
        $this->version = $version;
        $this->basePath = $basePath;
        $this->builder = $builder;
        $this->yamlParser = $yamlParser;
    }

    /**
     * @return string
     */
    public function getVersion()
    {
        return $this->version;
    }

    /**
     * {@inheritdoc}
     */
    public function __toString()
    {
        return $this->getVersion();
    }

    /**
     * Get a page.
     *
     * @param string $slug
     *
     * @return Page
     */
    public function getPage($slug)
    {
        return $this->getRootPage()->getPage($slug);
    }

    /**
     * Get the menu.
     *
     * @return array
     */
    public function getMenu()
    {
        return $this->getRootPage()->getMenu()['children'];
    }

    private function getRootPage()
    {
        if (!$this->rootPage) {
            $this->rootPage = $this->builder->build($this->basePath . '/docs');
            $this->rootPage->setName($this->version);
        }

        return $this->rootPage;
    }

    /**
     * Get the class reference from the correct YAML file.
     *
     * @return array
     */
    public function getClassReference()
    {
        if ($this->classReference === null) {
            $file = $this->basePath . '/class_reference.yml';

            $contents = null;
            if (file_exists($file)) {
                $contents = $this->yamlParser->parse(file_get_contents($file));
            }

            $this->classReference = $contents ?: [];
        }

        return $this->classReference;
    }

    /**
     * Get the cheatsheet reference from the correct YAML file.
     *
     * @return array
     */
    public function getCheatSheet()
    {
        if ($this->cheatSheet === null) {
            $file = $this->basePath . '/cheatsheet.yml';

            $contents = null;
            if (file_exists($file)) {
                $contents = $this->yamlParser->parse(file_get_contents($file));
            }

            $this->cheatSheet = $contents ?: [];
        }

        return $this->cheatSheet;
    }
}
