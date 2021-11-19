# preg_match

`preg_match(pattern)` is a Twig filter to perform a regular expression match.

```twig
{% if client.email|preg_match('/^.+@.+\.\w+$/') %}
    Email: {{ client.email }}
{% endif %}
```

Source: [Jasny](https://github.com/jasny/twig-extensions)
