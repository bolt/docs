---
title: Twig Runtimes
level: advanced
---
Extension Building: Twig Runtimes
=================================

Creating Twig extensions in a dedicated class
---------------------------------------------

To keep your extensions's functionality and code appropriately modular, it is
often a good idea to move the functions you extend Twig with to a dedicated
class.

With Bolt, you can easily write your custom Twig extension in a separate class.

<p class="note"><strong>Note:</strong> For more basic information on extending
Bolt's Twig functionality, <a href="../basics/twig">
See the "basic" Twig documentation</a></p>

The extension loader functions `registerTwigFunctions()` and `registerTwigFilters()`
return an associative (key/value) array, where the value is an indexed array. The
first value of the indexed array can be a callback, rather than the name of a
function in the extension loader itself.


### Extension loader example

```php
namespace Bolt\Extension\DropBear\KoalaCatcher;

use Bolt\Extension\DropBear\KoalaCatcher\Twig;
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
        $app['koala.gumtree'] = $app->share(function ($app) {
            // An "expensive" service that we only want to load at runtime when needed!
            return new Gumtree();
        });

        // Create a runtime for the Twig extension class
        $app['twig.runtime.koala_catcher'] = $app->share(function ($app) {
            // Our runtime uses the $app['koala.gumtree'] service, so we
            // want to "lazy load" it as needed.
            return new Twig\KoalaTwigRuntime($app['koala.gumtree']);
        });

        $app['twig.runtimes'] = $app->extend(
            'twig.runtimes',
            function (array $runtimes) {
                // You must append your array to the passed in $runtimes array and return it
                return $runtimes + [
                    Twig\KoalaTwigRuntime::class => 'twig.runtime.koala_catcher',
                ];
            }
        );
    }

    /**
     * {@inheritdoc}
     */
    protected function registerTwigFunctions()
    {
        $koalaTwigRuntimeCallable = [Twig\KoalaTwigRuntime::class, 'generateLipsum'];

        return [
            'generate_lipsum' => [$koalaTwigRuntimeCallable]
        ];
    }

    /**
     * {@inheritdoc}
     */
    protected function registerTwigFilters()
    {
        $koalaTwigRuntimeCallable = [Twig\KoalaTwigRuntime::class, 'strHello'];

        return [
            'hello' => [$koalaTwigRuntimeCallable],
        ];
    }
}
```

### Runtime class example

Create your class file as `src/Twig/KoalaTwigRuntime.php`

```php
namespace Bolt\Extension\DropBear\KoalaCatcher\Twig;

use Bolt\Extension\DropBear\KoalaCatcher\Gumtree;
use Silex\Application;

/**
 * Twig runtime class that will only be invoked when one of its functions or
 * filters are used.
 *
 * @author Kenny Koala <kenny@dropbear.com.au>
 */
class KoalaTwigRuntime
{
    /** @var Gumtree */
    private $gumtree;

    /**
     * Constructor.
     *
     * @param Gumtree $gumtree
     */
    public function __construct(Gumtree $gumtree)
    {
        $this->gumtree = $gumtree;
    }

    public function generateLipsum($type, $quantity)
    {
        // your logic here
        return $this->gumtree->pickLeaves($type, $quantity);
    }

    public function strHello($name)
    {
        // your logic here
        return $this->gumtree->greet($name);
    }
}
```

For more information about extending Twig, see the
[official docmentation](https://twig.sensiolabs.org/doc/1.x/advanced.html)
