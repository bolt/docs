# true

`true` is a Twig test to test a value for being `true` (like `=== true`).

It uses the mentioned PHP functions / comparisons internally, so you have the same behavior as in PHP.

```twig
{% if someflag is true %} {# instead of {% if someflag is same as(true) %} #}
{% endif %}
```

Source: [Squirrelphp](https://github.com/squirrelphp/twig-php-syntax)
