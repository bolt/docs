# preg_get_all

`preg_get_all(pattern, group = 0)` is a Twig filter to perform a regular expression match and return the group for all
matches.

```twig
First name: {{ client.fullname|preg_get_all('/^\S+/') }}
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
