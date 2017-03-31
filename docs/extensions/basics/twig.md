---
title: Extending Twig
level: intermediate
---
Extension Building: Twig
========================

Twig functions, filters, and template paths can be added to an extension using
several built-in registration functions, and Twig templates can be simply
rendered.

<p class="note"><strong>Note:</strong> This section is best used for Twig
functionality for simple extensions that do a limited amount. For more complex
extensions and functionality, you may find it useful to move your Twig logic to
a class file and import the <tt>\Bolt\Extension\TwigTrait</tt>. </p>

Rendering Twig Templates
------------------------

Bolt provides a helper function for rendering Twig templates called `renderTemplate()`, 
which returns the rendered output. 

```php
$context = [
    'name' => 'Kenny Koala',
    'home' => 'Gum Tree Lane',
];
$output = $this->renderTemplate('template.twig', $context);
```

When using this function, Bolt will automatically add the extension's `templates/`
directory to the Twig path array. If you need other directories or Twig
namespaces added, see the [Registering Twig Paths](#registering-twig-paths)
section below.


Registering Twig Functions
--------------------------

Twig functions are registered by creating a protected function called
`registerTwigFunctions()` that returns an array.

Each array element's key will be the desired Twig function name as used in Twig,
e.g. `{{ koala() }}`

The array value can either be a string or an array:

* String values should be the name of a function in the extension's class loader
  file, and is converted to a callback automatically.
* Arrays are indexed values.
  * First value should be either a valid callback, or the name of a function
    in the extension's class loader file.
  * Second value should be an array of Twig function options. See the
    [Twig documentation](http://twig.sensiolabs.org/doc/advanced.html) for more information.


Registering Twig Filters
------------------------

Twig filters are registered by creating a protected function called
`registerTwigFilters()` that returns an array.

Each array element's key will be the desired Twig function name as used in Twig,
e.g. `{{ record.title|koala }}`

The array value can either be a string, or an array:

* String values should be the name of a function in the extension's class loader
  file, and is converted to a callback automatically.
* Arrays are indexed values.
  * First value should be either a valid callback, or the name of a function
    in the extension's class loader file.
  * Second value should be an array of Twig function options. See the 
    [Twig documentation](http://twig.sensiolabs.org/doc/advanced.html) for more information.

Registering Twig Paths
----------------------

When using the `renderTemplate()` function, Bolt will automatically add the
extension's `templates/` directory to the Twig path array, if it hasn't been
added already.

However, this can be customised with the `registerTwigPaths()` function by
returning an array of paths relative to the extension itself.

Additionally, each path can specify an array of options:
* `position` — Either `append` or `prepend`, depending on the desired search order for that path.
* `namespace` — A Twig namespace for the path.

Example Extension
-----------------

```php
namespace Bolt\Extension\DropBear\KoalaCatcher;

use Bolt\Asset\File\JavaScript;
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
    protected function registerTwigFunctions()
    {
        return [
            'koala'    => 'koalaFunction',
            'kangaroo' => ['kangarooFunction', ['is_safe' => ['html']]]
        ];
    }

    /**
     * {@inheritdoc}
     */
    protected function registerTwigFilters()
    {
        return [
            'koala'    => 'koalaFilter',
            'kangaroo' => ['kangarooFilter', ['is_safe' => ['html']]]
        ];
    }

    /**
     * {@inheritdoc}
     */
    protected function registerTwigPaths()
    {
        return [
            'templates/normal',
            'templates/special' => ['position' => 'prepend', 'namespace' => 'DropBear']
        ];
    }

    /**
     * Render and return the Twig file templates/normal/koala.twig
     *
     * @return string
     */
    public function koalaFunction()
    {
        return $this->renderTemplate('koala.twig');
    }

    /**
     * Koala-case strings.
     *
     * @param string $input
     *
     * @return string
     */
    public function koalaFilter($input)
    {
        return strtolower($input);
    }

    /**
     * Render and return the Twig file templates/special/skippy.twig
     *
     * @return string
     */
    public function kangarooFunction()
    {
        return $this->renderTemplate('@DropBear/skippy.twig');
    }

    /**
     * Kangaroo-case strings.
     *
     * @param string $input
     *
     * @return string
     */
    public function kangarooFilter($input)
    {
        return ucwords($input);
    }
}
```

<p class="note"><strong>Note:</strong> Using these methods you can not add
variables to Twig's global scope. If you have need of global Twig variables,
that are available in all templates, see the section 
<a href="../intermediate/service-providers#extending-the-global-twig-environment">
Extending the 'Global Twig' environment</a> for instructions on
how to do this. </p>


