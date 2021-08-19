# preg_replace

`preg_replace(pattern, replacement = "", limit = -1)` is a Twig filter to make PHPs preg_replace() function available as
twig filter. 

Example usage:

```twig
{{ content.text|preg_replace('/[^a-z]+/', '_') }}
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
