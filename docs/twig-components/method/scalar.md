# scalar

`scalar` is a Twig test to a value for being an `scalar` (integer, float, string or boolean, like `is_scalar`).

It uses the mentioned PHP functions / comparisons internally, so you have the same behavior as in PHP.

```twig
{% if somevar is scalar %} {# no equivalent in Twig %} #}
{% endif %}
```

Source: [Squirrelphp](https://github.com/squirrelphp/twig-php-syntax)
