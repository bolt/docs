<?php

namespace Bolt\Docs\Provider;

use Cocur\Slugify\Bridge\Twig\SlugifyExtension;
use Cocur\Slugify\Slugify;
use Pimple\Container;
use Pimple\ServiceProviderInterface;
use Twig_Environment;

class SlugifyServiceProvider implements ServiceProviderInterface
{
    /**
     * {@inheritdoc}
     */
    public function register(Container $container)
    {
        $container['slugify.regex'] = null;
        $container['slugify.options'] = array();

        $container['slugify'] = function ($container) {
            return new Slugify($container['slugify.regex'], $container['slugify.options']);
        };

        if (isset($container['twig'])) {
            $container->extend('twig', function (Twig_Environment $twig, $container) {
                $twig->addExtension(new SlugifyExtension($container['slugify']));

                return $twig;
            });
        }
    }
}
