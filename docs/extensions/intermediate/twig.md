---
title: Extending Twig
level: intermediate
---
Extension Building: Twig
========================

Write custom Twig extension in a dedicated class
------------------------------------------------

You can easely write your custom Twig extension in a separate class.
To extend Twig, we use Pimple to extends twig service after definition: http://pimple.sensiolabs.org/#modifying-services-after-definition

```php
namespace Bolt\Extension\DropBear\KoalaCatcher;

use Bolt\Extension\SimpleExtension;

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
        // Extends Twig environnement
        $app->extend('twig', function ($twig, $app) {
            $twig->addExtension(new KoalaTwigExtension($app));
            return $twig;
        });
    }
}
```

Create yout class file in the directory : Twig\KoalaTwigExtension.php

```php
namespace Bolt\Extension\DropBear\KoalaCatcher\Twig;

use Silex\Application;

class KoalaTwigExtension extends \Twig_Extension
{
    /** @var Application */
    private $app;

    /** @var \Twig_Environment */
    private $twig = null;

    /**
     *
     */
    public function __construct(Application $app)
    {
        $this->app = $app;
    }

    /**
     *
     */
    public function initRuntime(\Twig_Environment $environment)
    {
        $this->twig = $environment;
    }

    /**
     * Return the name of the extension
     */
    public function getName()
    {
        return 'koala.extension.twig';
    }
    
     /**
     * Create new functions
     */
    public function getFunctions()
    {
        return array(
            new Twig_SimpleFunction('lipsum', 'generate_lipsum'),
        );
    }
    
     /**
     * Create new filters
     */
    public function getFilters()
    {
        return array(
            new Twig_SimpleFilter('hello', 'str_hello'),
        );
    }
    
    public function generate_lipsum($params1, $params2, ...) {
        // your logical here
    }
    
    
    public function str_hello($params1) {
        // your logical here
    }

}
```
For more information about extending Twig, official doc is here: https://twig.sensiolabs.org/doc/1.x/advanced.html


