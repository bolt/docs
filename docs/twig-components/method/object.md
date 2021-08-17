# object

`object` is a Twig test to test a value for being an `object` (like `is_object` in PHP).

It uses the mentioned PHP functions / comparisons internally, so you have the same behavior as in PHP.

```twig
{% if somevar is object %} {# no equivalent in Twig %} #}
{% endif %}
```

Source: [Squirrelphp](https://github.com/squirrelphp/twig-php-syntax)
