# int

`int` is a Twig test to ...

`int` is a Twig test to test a value for being an `int` (like `is_int` in PHP).

It uses the mentioned PHP functions / comparisons internally, so you have the same behavior as in PHP.

```twig
{% if somevar is integer %} {# no equivalent in Twig %} #}
{% endif %}
{% if somevar is int %} {# same as integer test above, alternate way to write it %} #}
{% endif %}
```

Source: [Squirrelphp](https://github.com/squirrelphp/twig-php-syntax)
