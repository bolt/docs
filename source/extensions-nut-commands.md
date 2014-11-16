Providing Nut Console Commands
==============================

With your extension, you may want to provide console commands via Bolt's built-in 
`nut` command.

#### Step 1: Create a Command Class

You should create a class for your extension that extends `Symfony\Component\Console\Command\Command`
that should have both a minimum of `configure()` and `execute()` functions 

```
namespace Bolt\Extensions\Author\ExtensionName;

use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Output\OutputInterface;

class MyExtCommand extends Command
{
    protected function configure()
    {
        $this
            ->setName('myext:doit')
            ->setDescription('Do It from this extension')
            ->addArgument(
                'type',
                InputArgument::OPTIONAL,
                'Who type of thing do you want to do?';
            )
            ->addOption(
               'summary',
               null,
               InputOption::VALUE_NONE,
               'Display final summary output from Doing It';
            )
        ;
    }

    protected function execute(InputInterface $input, OutputInterface $output)
    {
        $type = $input->getArgument('type');
        if ($type == 'fast') {
            // Code execution here
            $text = "<info>Processing fast</info>\n"
        } else {
            $text = "<info>Processing slow</info>\n"
        }

        if ($input->getOption('summary')) {
            $num = 12;
            $text .= "<comment>While processing we completed $num things</comment>";
        }

        $output->writeln($text);
    }
}
```

In the above example we've added an option `--summary` and an (optional) argument
labelled `type`.

This can be called from your Bolt installation:
    
```bash
./app/nut myext:doit [--summary] [type]
```

#### Step 2: Call from inside your extension

Finally you need only add a call to `addConsoleCommand()` and pass it a new
instance of your Command class.

```
public function initialize()
{
    // Add your command
    $this->addConsoleCommand(new MyExtCommand());

    // Do the rest of your extension logic
}
```