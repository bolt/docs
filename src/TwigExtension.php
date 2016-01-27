<?php

namespace Cheatsheet;

use Cocur\Slugify\Slugify;
use Silex\Application;

/**
 * The class for Bolt' Twig tags, functions and filters.
 */
class TwigExtension extends \Twig_Extension
{
    /** @var \Silex\Application */
    private $app;

    /**
     * @param \Silex\Application $app
     * @param \Pimple            $handlers
     * @param boolean            $safe
     */
    public function __construct(Application $app)
    {
        $this->app      = $app;
        // $this->handlers = $handlers;
        // $this->safe     = $safe;
    }

    public function getName()
    {
        return 'SilexBootstrap';
    }


    public function getFunctions()
    {
        $safe = ['is_safe' => ['html']];
        $env  = ['needs_environment' => true];

        return [
            new \Twig_SimpleFunction('asset', [$this, 'asset']),
            new \Twig_SimpleFunction('dump', [$this, 'dump']),
        ];
    }

    public function getFilters()
    {
        $safe = ['is_safe' => ['html', 'asset']];
        $env  = ['needs_environment' => true];

        return [
            new \Twig_SimpleFilter('slug', [$this, 'slug'], $safe),
            new \Twig_SimpleFilter('markdown', [$this, 'markdown'], $safe),
        ];
    }

    public function asset($asset)
    {
        return $this->app['request_stack']->getMasterRequest()->getBasepath().'/'.ltrim($asset, '/');
    }

    public function dump($var)
    {
        if ($this->app['config']['debug']) {
            dump($var);
        }
    }

    public function slug($str)
    {
        $s = new Slugify();
        return $s->slugify($str);
    }

    public function markdown($str)
    {
        return \ParsedownExtra::instance()->text($str);
    }

}

