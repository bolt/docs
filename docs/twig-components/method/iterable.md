# iterable

`iterable` is a Twig test to check if a variable is an array or a traversable object:

```twig
{# evaluates to true if the foo variable is iterable #}
{% if users is iterable %}
    {% for user in users %}
        Hello {{ user }}!
    {% endfor %}
{% else %}
    {# users is probably a string #}
    Hello {{ users }}!
{% endif %}
```

Source: [Twig](https://twig.symfony.com/doc/3.x/tests/iterable.html)