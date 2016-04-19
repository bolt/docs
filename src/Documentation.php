<?php

namespace Bolt\Docs;

use Symfony\Component\Filesystem\Exception\FileNotFoundException;
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
    private $versionFile;
    /** @var string */
    private $default;
    /** @var Version[] */
    private $versions = [];
    /** @var bool */
    private $debug;

    /**
     * Constructor.
     *
     * @param Yaml\Parser $yamlParser
     * @param PageBuilder $pageBuilder
     * @param string      $versionDir
     * @param string      $versionFile
     * @param string      $default
     * @param bool        $debug
     */
    public function __construct(Yaml\Parser $yamlParser, PageBuilder $pageBuilder, $versionDir, $versionFile, $default, $debug)
    {
        $this->yamlParser = $yamlParser;
        $this->pageBuilder = $pageBuilder;
        $this->versionDir = rtrim($versionDir, '/') . '/';
        $this->versionFile = $versionFile;
        $this->default = (string) $default;
        $this->debug = $debug;

        $this->load();
    }

    public function load()
    {
        if (!file_exists($this->versionFile)) {
            throw new FileNotFoundException(null, 0, null, $this->versionFile);
        }

        $versions = $this->yamlParser->parse(file_get_contents($this->versionFile));
        foreach ($versions as $version) {
            $this->addVersion($version, $this->versionDir . $version);
        }
        if ($this->debug) {
            $this->addVersion('local', __DIR__ . '/../source_docs');
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
}
