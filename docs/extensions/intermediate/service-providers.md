---
title: Services & Service Providers
level: advanced
---
Extension Building: Services & Service Providers
================================================

When creating extensions that provide anything more than very simple
functionality, it is a good idea to break that functionality out into services.

Each service should have responsibility over a single part of the functionality
provided by the extension, and that responsibility should be contained to the
class. This is known in computer science as the Single Responsibility Principle
(SRP).

It is good practice to aim to have an extension's services narrowly aligned
with this principle.

Registering Services
--------------------

When you have a small number of classes to register as services, and your
extension is extending `SimpleExtension`, you can use the `registerServices()`
function to register your extension's services with the application, e.g.:

```php
namespace Bolt\Extension\DropBear\KoalaCatcher;

use Bolt\Extension\SimpleExtension;
use Silex\Application;

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
    protected function registerServices(Application $app)
    {
        $app['koala'] = $app->share(
           function ($app) {
               return new Koala($this->getConfig(), $app['drop.bear']);
           }
        );
    }
}
```

Extending the 'Global Twig' environment
---------------------------------------

The same can be used to extend the global Twig environment. This can be useful
for exposing certain global variables in Twig. For example, if you want to 
make certain configuration settings from your extension available in the
templates, you can use the following:

```php
    public function registerServices(Application $app)
    {
        $app['twig'] = $app->share($app->extend(
            'twig',
            function ($twig) use ($app) {
                $config = $this->getConfig();
                $twig->addGlobal('extensionsetting_foo', $config['foo']);
                return $twig;
            }
        ));
    }
```

After doing this, you can use `{{ extensionsetting_foo }}` in your Twig templates.


Creating Service Providers
--------------------------

When adding several services in more complex extensions, you will probably want
to create a service provider to register your services.

In this case you can use the `getServiceProviders()` function to return an
array of class objects that implement `Silex\ServiceProviderInterface`.

```php
namespace Bolt\Extension\DropBear\KoalaCatcher;

use Bolt\Extension\DropBear\KoalaCatcher\Provider;
use Bolt\Extension\SimpleExtension;
use Silex\Application;

/**
 * An extension for catching koalas.
 *
 * @author Kenny Koala <kenny@dropbear.com.au>
 */
class KoalaCatcherExtension extends SimpleExtension
{
    public function getServiceProviders()
    {
        return [ 
            $this,
            new Provider\KoalaServiceProvider($this-getConfig()),
        ]
    }
}
```

The service provider class `src/Provider/KoalaServiceProvider.php` would then
look something like:

```php
namespace Bolt\Extension\DropBear\KoalaCatcher\Provider;

use Silex\Application;
use Silex\ServiceProviderInterface;

/**
 * Koala service provider.
 *
 * @author Kenny Koala <kenny@dropbear.com.au>
 */
class KoalaServiceProvider implements ServiceProviderInterface
{
    /** @var array */
    private $config;

    /**
     * Constructor.
     *
     * @param array $config
     */
    public function __construct(array $config)
    {
        $this->config = $config;
    }

    /**
     * {@inheritdoc}
     */
    public function register(Application $app)
    {
        $app['koala'] = $app->share(
           function ($app) {
               return new Koala($this->config, $app['drop.bear']);
           }
        );
    }

    /**
     * {@inheritdoc}
     */
    public function boot(Application $app)
    {
    }
}
```
