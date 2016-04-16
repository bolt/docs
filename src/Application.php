<?php

namespace Bolt\Docs;

use Silex;
use Symfony\Component\Yaml\Yaml;

class Application extends Silex\Application
{
    /**
     * {@inheritdoc}
     */
    public function __construct(array $values = [])
    {
        parent::__construct($values);

        $this->register(new Silex\Provider\RoutingServiceProvider());
        $this->register(new Silex\Provider\ValidatorServiceProvider());
        $this->register(new Silex\Provider\ServiceControllerServiceProvider());
        $this->register(new Silex\Provider\HttpFragmentServiceProvider());
        $this->register(new Silex\Provider\TwigServiceProvider(), [
            'twig.path'       => dirname(__DIR__) . '/view',
            'twig.options' => [
                'cache' => __DIR__ . '/../cache',
            ]
        ]);
        $this->register(new Silex\Provider\VarDumperServiceProvider());
        $this->register(new Silex\Provider\AssetServiceProvider(), [
            'assets.base_path' => '/view/',
        ]);
        $this->register(new Provider\ConsoleServiceProvider());
        $this->register(new Provider\SlugifyServiceProvider());
        $this->register(new Provider\MarkdownServiceProvider());

        $this->mount('', new Controllers());

        $this['config'] = $config = Yaml::parse(file_get_contents(__DIR__ . '/../app/config.yml'));
        $this['debug'] = $config['debug'];

        if ($this['debug']) {
            $this->register(new Silex\Provider\WebProfilerServiceProvider(), [
                'profiler.cache_dir' => __DIR__ . '/../cache/profiler',
            ]);

            ini_set('error_reporting', -1);
        }
        ini_set('display_errors', (int) $this['debug']);
    }
}
