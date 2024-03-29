# with

`with` is a Twig tag to create a new inner scope. Variables set within this scope are not visible 
outside of the scope:

```twig
{% with %}
    {% set foo = 42 %}
    {{ foo }} {# foo is 42 here #}
{% endwith %}
foo is not visible here any longer
```

Instead of defining variables at the beginning of the scope, you can pass a hash of variables you want to define in the 
`with` tag; the previous example is equivalent to the following one:

```twig
{% with { foo: 42 } %}
    {{ foo }} {# foo is 42 here #}
{% endwith %}
foo is not visible here any longer
```

```twig
{# it works with any expression that resolves to a hash #}
{% set vars = { foo: 42 } %}
{% with vars %}
    ...
{% endwith %}
```

By default, the inner scope has access to the outer scope context; you can disable this behavior by appending the `only` 
keyword:

```twig
{% set bar = 'bar' %}
{% with { foo: 42 } only %}
    {# only foo is defined #}
    {# bar is not defined #}
{% endwith %}
```

Source: [Twig](https://twig.symfony.com/with)