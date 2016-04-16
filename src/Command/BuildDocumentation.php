<?php

namespace Bolt\Docs\Command;

use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Yaml\Dumper;

/**
 * Class BuildDocumentation console command
 *
 * @author Ross Riley <riley.ross@gmail.com>
 */
class BuildDocumentation extends Command
{
    private $versionsDir = '/version/';
    private $versionsFile = 'versions.yml';

    protected function configure()
    {
        $this->setName("bolt:build-docs")
            ->addArgument('branches', InputArgument::IS_ARRAY, ['master'])
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
            $this->writeVersion($output, $branch, $name, './source_docs/');
            $versionsArray[$branch] = $name;
        }

        $dumper = new Dumper();

        // Write the passed in versions to the yml file
        $path = getcwd() . '/app/' . $this->versionsFile;
        file_put_contents($path, $dumper->dump($versionsArray));
        $output->writeln("<info>Versions saved to $path</info>");
    }

    protected function writeVersion(OutputInterface $output, $branch, $branchName, $prefix = '')
    {
        $directory = getcwd() . $this->versionsDir . $branchName;

        $tree = shell_exec("git ls-tree -r $branch $prefix");
        $tree = array_filter(explode("\n", $tree));
        $filelist = array_map('str_getcsv', $tree, array_fill(0, count($tree), "\t"));

        foreach ($filelist as $source) {
            $file = $source[1];

            $content = shell_exec("git show $branch:$file");

            @mkdir(dirname($directory . '/' . $file), 0755, true);
            file_put_contents($directory . '/' . $file, $content);
        }

        $menu = shell_exec('git show ' . $branch . ":menu_docs.yml");
        file_put_contents($directory . '/menu_docs.yml', $menu);

        $output->writeln("<info>Branch $branch written to $directory</info>");
    }
}
