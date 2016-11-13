---
title: Nut Console Commands
level: advanced
---
Extension Building: Nut Console Commands
========================================

With your extension, you may want to provide console commands via Bolt's built-
in `nut` command.

Bolt provides the `registerNutCommands()` that accepts an array of
`Symfony\Component\Console\Command\Command` objects for registration as
Nut commands.

A simple example of an extension that registers some Nut commands would look
like:

```php
namespace Bolt\Extension\DropBear\KoalaCatcher;

use Bolt\Extension\SimpleExtension;
use Pimple as Container;
use Symfony\Component\Console\Command\Command;

/**
 * An extension for catching koalas.
 *
 * @author Kenny Koala <kenny@dropbear.com.au>
 */
class KoalaCatcherExtension extends SimpleExtension
{
    /**
     * {@inheritdoc}
     */
    protected function registerNutCommands(Container $container)
    {
        return [
            new Nut\DropBearCommand(),
            new Nut\KoalaCommand($container),
        ];
    }
}
```

**NOTE:** There are two classes you might choose to extend for a Nut application.

For simple Nut commands that don't need to interact with any services provided
by Bolt itself, you need only extend `Symfony\Component\Console\Command\Command`

More complex commands that need to access Bolt provided services should
alternatively extend `Bolt\Nut\BaseCommand`.

Creating a Command Class
------------------------

The command class should have both a minimum of `configure()` and `execute()`
functions.

```php
namespace Bolt\Extension\DropBear\KoalaCatcher\Nut;

use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Output\OutputInterface;

/**
 * An nut command for then KoalaCatcher extension.
 *
 * @author Kenny Koala <kenny@dropbear.com.au>
 */
class KoalaCommand extends Command
{
    protected function configure()
    {
        $this
            ->setName('koala:gumleaves')
            ->setDescription('Give your koala some gum leaves')
            ->addArgument(
                'type',
                InputArgument::OPTIONAL,
                'What type of gum tree should we use?'
            )
            ->addOption(
               'summary',
               null,
               InputOption::VALUE_NONE,
               'Display final summary output from feeding.'
            )
        ;
    }

    protected function execute(InputInterface $input, OutputInterface $output)
    {
        $type = $input->getArgument('type');
        if ($type == 'blue') {
            // Code execution here
            $text = "<info>Feeding the koala leaves from a Blue Gum</info>\n";
        } else {
            $text = "<info>Feeding the koala leaves from a Red Gum</info>\n";
        }

        if ($input->getOption('summary')) {
            $num = 12;
            $text .= "<comment>Your koala ate $num gum leaves</comment>";
        }

        $output->writeln($text);
    }
}
```

In the above example we've added an option `--summary` and an (optional)
argument labelled `type`.

This can then be called from your Bolt installation:

```bash
./app/nut koala:gumleaves [--summary] [type]
```
