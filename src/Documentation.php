<?php

namespace Bolt\Docs;

use Symfony\Component\Finder\Finder;
use Symfony\Component\Finder\SplFileInfo;
use Symfony\Component\Yaml;

class Documentation
{
    /** @var Yaml\Parser */
    private $yamlParser;
    /** @var PageBuilder */
    private $pageBuilder;
    /** @var string */
    private $versionDir;
    /** @var string */
    private $default;
    /** @var Version[] */
    private $versions = [];
    /** @var array */
    private $filestructure = [];
    /**
     * Constructor.
     *
     * @param Yaml\Parser $yamlParser
     * @param PageBuilder $pageBuilder
     * @param string      $versionDir
     * @param string      $default
     */
    public function __construct(Yaml\Parser $yamlParser, PageBuilder $pageBuilder, $versionDir, $default)
    {
        $this->yamlParser = $yamlParser;
        $this->pageBuilder = $pageBuilder;
        $this->versionDir = $versionDir;
        $this->default = (string) $default;

        $this->load();
    }

    public function load()
    {
        $dirs = (new Finder())->directories()->in($this->versionDir)->sortByName()->depth(0);

        foreach ($dirs as $dir) {
            /** @var SplFileInfo $dir */
            $this->addVersion($dir->getBasename(), $dir->getRealPath());
        }

        $files = (new Finder())->files()->in($this->versionDir)->sortByName();

        foreach ($files as $file) {
            $this->filestructure[] = str_replace('/docs/', '/', $file->getRelativePathname());
        }
    }

    /**
     * @return Version
     */
    public function getDefault()
    {
        return $this->getVersion($this->default);
    }

    public function addVersion($name, $baseDir)
    {
        $this->versions[$name] = new Version($name, $baseDir, $this->pageBuilder, $this->yamlParser);
    }

    /**
     * @param string $version
     *
     * @return Version
     */
    public function getVersion($version)
    {
        if (!isset($this->versions[$version])) {
            throw new \InvalidArgumentException("Version: \"$version\" does not exist.");
        }
        return $this->versions[$version];
    }

    public function hasVersion($version)
    {
        return isset($this->versions[$version]);
    }

    /**
     * @return Version[]
     */
    public function getVersions()
    {
        return $this->versions;
    }

    /**
     * @return array
     */
    public function getFileStructure()
    {
        return $this->filestructure;
    }

}
