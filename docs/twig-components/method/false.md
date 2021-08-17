# false

`false` is a Twig test to test a value for being `false` (like `=== false` in PHP).

It uses the mentioned PHP functions / comparisons internally, so you have the same behavior as in PHP.

```twig
{% if someflag is false %} {# instead of {% if someflag is same as(false) %} #}
{% endif %}
```

Source: [Squirrelphp](https://github.com/squirrelphp/twig-php-syntax)