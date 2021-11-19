# float

`float` is a Twig test to test a value for being a float (like `is_float` in PHP).

It uses the mentioned PHP functions / comparisons internally, so you have the same behavior as in PHP.

```twig
{% if somevar is float %} {# no equivalent in Twig %} #}
{% endif %}
```

Source: [Squirrelphp](https://github.com/squirrelphp/twig-php-syntax)
