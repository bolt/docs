# bool

`bool` is a Twig test to to test a value for being a bool (like `is_bool` in PHP).

It uses the mentioned PHP functions / comparisons internally, so you have the same behavior as in PHP.

```twig
{% if somevar is boolean %} {# no equivalent in Twig %} #}
{% endif %}
{% if somevar is bool %} {# same as boolean test above, alternate way to write it %} #}
{% endif %}
```

Source: [Squirrelphp](https://github.com/squirrelphp/twig-php-syntax)
