# constant

`constant` is Twig function to return the constant value for a given string:

```twig
{{ some_date|date(constant('DATE_W3C')) }}
{{ constant('Namespace\\Classname::CONSTANT_NAME') }}
```
You can read constants from object instances as well:

```twig
{{ constant('RSS', date) }}
```

Use the defined test to check if a constant is defined:

```twig
{% if constant('SOME_CONST') is defined %}
    ...
{% endif %}
```
Source: [Twig](https://twig.symfony.com/constant)