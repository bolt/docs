# callable

`callable` is a Twig test to test a value for being a callable (like `is_callable` in PHP) 

It uses the mentioned PHP functions / comparisons internally, so you have the same behavior as in PHP.

```twig
{% if somevar is callable %} {# no equivalent in Twig %} #}
{% endif %}
```

Source: [Squirrelphp](https://github.com/squirrelphp/twig-php-syntax)
