# break

`break` is a Twig tag to break loops in Twig

This library adds break and continue and they work exactly as in PHP:

```twig
{% foreach list as entry %}
{% if loop.index > 10 %}
{% break %}
{% endif %}
{% endforeach %}
```

You can use break with a number to break out of multiple loops, just like in PHP: (continue does not support this)

```twig
{% foreach list as sublist %}
{% foreach sublist as entry %}
{% if loop.index > 10 %}
{% break 2 %} {# breaks out of both foreach loops #}
{% endif %}
{% endforeach %}
{% endforeach %}
```

While you can often circumvent the usage of `break` and `continue` in Twig, it sometimes leads to additional nesting and
more complicated code. Just one `break` or `continue` can clarify behavior and intent in these instances. Yet I would
advise to use `break` and `continue` sparingly.

Source: [Squirrelphp](https://github.com/squirrelphp/twig-php-syntax)
