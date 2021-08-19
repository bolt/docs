# product

`product` is a Twig filter to calculate the product of values in an array.

```twig
{% set array = [2, 4, 6, 8] %}
{{ array|product }}
```

The result will be:

```twig
384
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