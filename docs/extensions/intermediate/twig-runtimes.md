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
        // Create a runtime for the Twig extension class
        $app[''twig.runtime.koala_catcher'] = $app->share(
            function ($app) {
                return new KoalaTwigExtension();
        });
    }

    /**
     * {@inheritdoc}
     */
    protected function registerTwigFunctions()
    {
        $app = $this->getContainer();
        $koalaTwig = $app['twig.runtime.koala_catcher';

        return [
            // Note that the value is an array, and the first value of that
            // array is a callable
            'generate_lipsum' => [[$koalaTwig, 'generateLipsum']]]
        ];
    }

    /**
     * {@inheritdoc}
     */
    protected function registerTwigFilters()
    {
        $app = $this->getContainer();
        $koalaTwig = $app['twig.runtime.koala_catcher';

        return [
            'hello', [[$koalaTwig, 'strHello']]),
        ];
    }

}
```

### Runtime class example

Create your class file in the directory `src/Twig/KoalaTwigExtension.php`

```php
namespace Bolt\Extension\DropBear\KoalaCatcher\Twig;

use Silex\Application;

class KoalaTwigExtension extends \Twig_Extension
{
    public function generateLipsum($params1, $params2, ...) {
        // your logic here
    }

    public function strHello($params1) {
        // your logic here
    }
}
```

For more information about extending Twig, see the
[official docmentation](https://twig.sensiolabs.org/doc/1.x/advanced.html)
