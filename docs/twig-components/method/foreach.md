# foreach

`foreach` is a Twig tag to create loops with the same syntax as in PHP.

```twig
{% foreach list as sublist %}
  {% foreach sublist as key => value %}
  {% endforeach %}
{% endforeach %}
```

Internally it behaves the exact same way as for: it actually creates ForNode elements, so you have the same functionality like in for loops, including the loop variable and else. else works the same as with for:

```twig
{% foreach list as sublist %}
    {% foreach sublist as key => value %}
    {% else %}
        Array "sublist" is empty / no iteration took place
    {% endforeach %}
{% else %}
    Array "list" is empty / no iteration took place
{% endforeach %}
```

Source: [Squirrelphp](https://github.com/squirrelphp/twig-php-syntax)
