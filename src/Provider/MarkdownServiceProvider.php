<?php

namespace Bolt\Docs\Provider;

use Bolt\Docs\Twig\MarkdownExtension;
use ParsedownExtra;
use Pimple\Container;
use Pimple\ServiceProviderInterface;
use Twig_Environment;

class MarkdownServiceProvider implements ServiceProviderInterface
{
    /**
     * {@inheritdoc}
     */
    public function register(Container $container)
    {
        $container['markdown'] = function() {
            return new ParsedownExtra();
        };

        if (isset($container['twig'])) {
            $container->extend('twig', function (Twig_Environment $twig, $container) {
                $twig->addExtension(new MarkdownExtension($container['markdown']));

                return $twig;
            });
        }
    }
}
