Twig Templating
===============

There are four primary Twig components: tags, 
functions, filters, tests and operators. Bolt allows you to define
custom components of all five types. 

```twig
{# Example of a custom tag (setcontent) #}
{% setcontent pages = 'pages' %}

{# Example of a function (menu) #}
{% set variable = menu() %}

{# Example of a filter (length) #}
{% set len = 'one two three'|length %}

{# Example of a twig Test (odd) #}
{% if 5 is odd %}
```

You can create as many or as few filters, functions and tests
within a single Twig extension class as you like. 
Crating tags and operators is rarely necessary and is a more complicated process.
Bolt itself only uses one custom tag, namely `setcontent`.
Read the official Twig documentation on [creating tags][twig-tags] and
[creating operators][twig-operators] for more information.

## Creating a custom Twig filter

To create a custom Twig filter, you need a class that extends Twig's `AbstractExtension`
inside the `src` folder in the root of your project.

The `AbstractExtension` defines a number of functions that register all Twig functions,
filters and tests that the class defines:

| Function | Return value | Purpose |
--- | --- | ---
| `getFunctions` | array | Returns a list of `TwigFunction` objects that the class defines.
| `getFilters` | array | Returns a list of `TwigFilter` objects that the class defines.
| `getTests` | array | Returns a list of `TwigTest` objects that the class defines.

```php
<?php

namespace App;

use Twig\Extension\AbstractExtension;
use Twig\TwigFilter;

class CustomExtension extends AbstractExtension
{
    /**
     * Returns a list of filters to add to the existing list.
     *
     * @return TwigFilter[]
     */
    public function getFilters()
    {
        return [
            new TwigFilter('substring', [$this, 'getSubstring']),
        ];
    }

    /**
     * In this function, $string is required.
     * $strat and $length are optional, and have default values of 0 and 5 respectively;
     */
    public function getSubstring(string $string, int $start=0, int $length=5): string
    {
        return substr($string, $start, $length);
    }
}
```

To verify that the `substring` Twig filter is correctly registered, check that it is
shown after running `php bin/console debug:twig`.

You can use this filter like so:

```twig
{% set substr = 'one two three'|substring %}

{{ 'one two three'|substring(3) }}
{{ 'one two three'|substring(start=3) }} {# this and the example above produce the same result. #}

{{ dump('one two three'|substring(length=2)) }}
```

## Creating a Twig function

If you want a Twig function in addition to the `substring` filter, the code chances just slightly with
the new `use` clause and a new function called `getFunctions`:

```php
<?php

namespace App;

use Twig\Extension\AbstractExtension;
use Twig\TwigFilter;
use Twig\TwigFunction;

class CustomExtension extends AbstractExtension
{
    /**
     * Returns a list of filters to add to the existing list.
     *
     * @return TwigFilter[]
     */
    public function getFilters()
    {
        return [
            new TwigFilter('substring', [$this, 'getSubstring']),
        ];
    }

    public function getFunctions()
    {
        return [
            new TwigFunction('substring', [$this, 'getSubstring']),
        ];
    }

    /**
     * In this function, $string is required.
     * $strat and $length are optional, and have default values of 0 and 5 respectively;
     */
    public function getSubstring(string $string, int $start=0, int $length=5): string
    {
        return substr($string, $start, $length);
    }
}
```

Then, we can use the `substring` function like so:

```twig
{% set substr = substring('one two three') %}

{{ substring('one two three', 3) }}
{{ substring('one two three', start=3) }} {# this and the example above produce the same result. #}

{{ dump(substring('one two three', length=2)) }}
```

## Creating a Twig test

Twig tests are especially useful to use together with the `if` tag.

For example, let's create a `negative` test that works like this:

```twig
    {% if variable is negative %}
        {# handle a negative variable here...#}
    {% endif %}
```

Create a class in the `src` folder of your project that looks like this:

```php
<?php

namespace App;

use Twig\Extension\AbstractExtension;
use Twig\TwigTest;

class CustomExtension extends AbstractExtension
{
    public function getTests()
    {
        return [
            new TwigTest('negative', [$this, 'isNegative']),
        ];
    }

    public function isNegative($variable): bool
    {
        if (isNan($variable)) {
            // Not a number is not negative.
            return false;
        }

        // true for -1, -5, -100
        // false for 0, 5, 100
        return $variable < 0;
    }
}
```

Read more about this topic in Symfony's official documentation: [templating][docs].

[docs]: https://symfony.com/doc/current/components/templating.html
[twig-tags]: https://twig.symfony.com/doc/3.x/advanced.html#tags
[twig-operators]: https://twig.symfony.com/doc/3.x/advanced.html#operators
