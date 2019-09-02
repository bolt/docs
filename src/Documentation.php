<?php

declare(strict_types=1);

namespace Bolt\Docs;

use Symfony\Component\Finder\Finder;
use Symfony\Component\Finder\SplFileInfo;
use Symfony\Component\Yaml\Parser;

/**
 * Documentation class.
 *
 * @author Carson Full <carsonfull@gmail.com>
 * @author Gawain Lynch <gawain.lynch@gmail.com>
 */
class Documentation
{
    /** @var Parser */
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
    private $fileStructure = [];

    /**
     * Constructor.
     */
    public function __construct(Parser $yamlParser, PageBuilder $pageBuilder, string $versionDir, string $default)
    {
        $this->yamlParser = $yamlParser;
        $this->pageBuilder = $pageBuilder;
        $this->versionDir = $versionDir;
        $this->default = (string) $default;

        $this->load();
    }

    public function load(): void
    {
        /** @var Finder $dirs */
        $dirs = (new Finder())->directories()->in($this->versionDir)->sortByName()->depth(0);

        foreach ($dirs as $dir) {
            /** @var SplFileInfo $dir */
            $this->addVersion($dir->getBasename(), $dir->getRealPath());
        }
        /** @var Finder $files */
        $files = (new Finder())->files()->in($this->versionDir)->sortByName();

        /** @var SplFileInfo $file */
        foreach ($files as $file) {
            $this->fileStructure[] = \str_replace('/docs/', '/', $file->getRelativePathname());
        }
    }

    /**
     * @throws \InvalidArgumentException
     */
    public function getDefault(): Version
    {
        return $this->getVersion($this->default);
    }

    public function addVersion($name, $baseDir): void
    {
        $this->versions[$name] = new Version($name, $baseDir, $this->pageBuilder, $this->yamlParser);
    }

    /**
     * @throws \InvalidArgumentException
     */
    public function getVersion(string $version): Version
    {
        if (! isset($this->versions[$version])) {
            throw new \InvalidArgumentException("Version: \"${version}\" does not exist.");
        }

        return $this->versions[$version];
    }

    public function hasVersion(string $version): bool
    {
        return isset($this->versions[$version]);
    }

    /**
     * @return Version[]
     */
    public function getVersions(): array
    {
        return $this->versions;
    }

    public function getFileStructure(): array
    {
        return $this->fileStructure;
    }
}
