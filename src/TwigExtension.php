<?php

namespace Bolt\Docs;

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
     */
    public function __construct(Application $app)
    {
        $this->app      = $app;
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
        ];
    }

    public function getFilters()
    {
        $safe = ['is_safe' => ['html', 'asset']];
        $env  = ['needs_environment' => true];

        return [
        ];
    }
}

