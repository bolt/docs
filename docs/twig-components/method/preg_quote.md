# preg_quote

`preg_quote(delimiter = "\/")` is a Twig filter to quote regular expression characters. It puts a backslash in front of
every character that is part of the regular expression syntax. This is useful if you have a run-time string that you
need to match in some text and the string may contain special regex characters.

```twig
{% set keywords = '$40 for a g3/400' %}
{{ keywords|preg_quote('/') }}

Result: '\$40 for a g3\/400'
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
