# string

`string` is a Twig test to test a value for being an `string` (like `is_string`).

It uses the mentioned PHP functions / comparisons internally, so you have the same behavior as in PHP.

```twig
{% if somevar is string %} {# no equivalent in Twig %} #}
{% endif %}
```

Source: [Squirrelphp](https://github.com/squirrelphp/twig-php-syntax)
