<?php

namespace Bolt\Docs\Command;

use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Filesystem\Filesystem;
use Symfony\Component\Yaml\Dumper;

/**
 * Class BuildDocumentation console command
 *
 * @author Ross Riley <riley.ross@gmail.com>
 */
class BuildDocumentation extends Command
{
    /** @var string */
    private $versionsDir;
    /** @var string */
    private $versionsFile;
    /** @var Filesystem */
    private $filesystem;

    /**
     * Constructor.
     *
     * @param string $versionsDir
     * @param string $versionsFile
     */
    public function __construct($versionsDir, $versionsFile)
    {
        parent::__construct();
        $this->versionsDir = rtrim($versionsDir, '/') . '/';
        $this->versionsFile = $versionsFile;
        $this->filesystem = new Filesystem();
    }

    protected function configure()
    {
        $this->setName("bolt:build-docs")
            ->addArgument('branches', InputArgument::IS_ARRAY, null, ['master'])
            ->setDescription("Builds documentation from an array of git branches");
    }

    /**
     * {@inheritdoc}
     */
    protected function execute(InputInterface $input, OutputInterface $output)
    {
        $versionsArray = [];

        foreach ($input->getArgument('branches') as $branch) {
            $name = str_replace('release/', '', $branch);
            $this->writeVersion($output, $branch, $name, 'source_docs/');
            $versionsArray[] = $name;
        }

        $dumper = new Dumper();

        // Write the passed in versions to the yml file
        $this->filesystem->dumpFile($this->versionsFile, $dumper->dump($versionsArray));
        $output->writeln("<info>Versions saved to {$this->versionsFile}</info>");
    }

    protected function writeVersion(OutputInterface $output, $branch, $branchName, $prefix = '')
    {
        $directory = $this->versionsDir . $branchName;
        $this->filesystem->remove($directory);

        $files = shell_exec("git ls-tree -r --name-only $branch $prefix");
        $files = array_filter(explode("\n", $files));

        foreach ($files as $file) {
            $content = shell_exec("git show $branch:$file");

            $file = $directory . '/' . str_replace($prefix, '', $file);
            $this->filesystem->dumpFile($file, $content);
        }

        $output->writeln("<info>Branch $branch written to $directory</info>");
    }
}
