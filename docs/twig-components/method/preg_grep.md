# preg_grep

`preg_grep(pattern, flags = "")` is a Twig filter to perform a regular expression match and return an array of entries
that match the pattern.

```twig
{% set values = [..., ..., ...] %} 
{{ values|preg_grep("/^(\d+)?\.\d+$/");
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
