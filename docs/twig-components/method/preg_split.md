# preg_split

`preg_split(pattern)` is a Twig filter to make PHPs preg_split() function available as Twig filter. It splits text into
an array using a regular expression.

```twig
{% set keywords = "hypertext language, programming" %}
{{ keywords|preg_split("/[\s,]+/" }}
```

The result will be:

```twig
[0] => hypertext
[1] => language
[2] => programming
```

Jasny's Twig Extensions can be easily installed using Composer:

```twig
composer require jasny/twig-extensions
```

###Usage

```twig
$twig = new Twig_Environment($loader, $options);
$twig->addExtension(new Jasny\Twig\ArrayExtension());
```

To use in a Symfony project register the extensions as a service:

```twig
twig.extension.array:
class: Jasny\Twig\ArrayExtension
tags:
- { name: twig.extension }
```

Source: [Jasny](https://github.com/jasny/twig-extensions)
