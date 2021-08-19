# preg_match

`preg_match(pattern)` is a Twig filter to perform a regular expression match.

```twig
{% if client.email|preg_match('/^.+@.+\.\w+$/') %}
    Email: {{ client.email }}
{% endif %}
```

Jasny's Twig Extensions can be easily installed using composer:

```twig
composer require jasny/twig-extensions
```

###Usage

```twig
$twig = new Twig_Environment($loader, $options);
$twig->addExtension(new Jasny\Twig\ArrayExtension());
```

To use in a symfony project register the extensions as a service:

```twig
twig.extension.array:
class: Jasny\Twig\ArrayExtension
tags:
- { name: twig.extension }
```

Source: [Jasny](https://github.com/jasny/twig-extensions)
