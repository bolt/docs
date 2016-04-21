<?php

namespace Bolt\Docs;

use Silex;
use Symfony\Component\Config\ConfigCacheFactory;
use Symfony\Component\Yaml;

class Application extends Silex\Application
{
    /**
     * {@inheritdoc}
     */
    public function __construct(array $values = [])
    {
        parent::__construct($values);

        $this['yaml_parser'] = function () {
            return new Yaml\Parser();
        };

        $this['config_cache_factory'] = function($container) {
            return new ConfigCacheFactory($container['debug']);
        };

        $this->register(new Silex\Provider\TwigServiceProvider(), [
            'twig.path'       => __DIR__ . '/../view/templates',
            'twig.options' => [
                'cache' => __DIR__ . '/../var/cache/twig',
            ]
        ]);
        $this->register(new Silex\Provider\ServiceControllerServiceProvider());
        $this->register(new Silex\Provider\HttpFragmentServiceProvider());
        $this->register(new Silex\Provider\VarDumperServiceProvider());
        $this->register(new Silex\Provider\AssetServiceProvider());
        $this->register(new Provider\ConsoleServiceProvider());
        $this->register(new Provider\SlugifyServiceProvider());
        $this->register(new Provider\MarkdownServiceProvider());
        $this->register(new Provider\DocumentationServiceProvider(), [
            'documentation.versions_dir'           => __DIR__ . '/../var/versions',
            'documentation.page_builder.cache_dir' => __DIR__ . '/../var/cache/pages',
        ]);

        $config = Yaml\Yaml::parse(file_get_contents(__DIR__ . '/../app/config.yml'));
        $this['debug'] = isset($config['debug']) ? $config['debug'] : false;
        $this['documentation.versions.default'] = isset($config['default-version']) ? $config['default-version'] : 'master';

        if ($this['debug']) {
            $this->register(new Silex\Provider\WebProfilerServiceProvider(), [
                'profiler.cache_dir' => __DIR__ . '/../var/cache/profiler',
            ]);

            ini_set('error_reporting', -1);
        }
        ini_set('display_errors', (int) $this['debug']);
    }

    public function flush()
    {
        $this->mount('', new Controllers());

        parent::flush();
    }
}
