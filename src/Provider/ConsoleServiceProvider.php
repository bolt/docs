<?php

namespace Bolt\Docs\Provider;

use Pimple\Container;
use Pimple\ServiceProviderInterface;
use Symfony\Component\Console;

class ConsoleServiceProvider implements ServiceProviderInterface
{
    /**
     * {@inheritdoc}
     */
    public function register(Container $container)
    {
        $container['console'] = function ($container) {
            $console = new Console\Application('Bolt Docs', '');

            $console->addCommands($container['console.commands']);

            return $console;
        };

        $container['console.commands'] = function ($container) {
            return [
            ];
        };
    }
}
