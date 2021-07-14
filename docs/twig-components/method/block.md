# block

`block` is a Twig function to print a block multiple times when a template uses inheritance.


```twig
<title>{% block title %}{% endblock %}</title>

<h1>{{ block('title') }}</h1>

{% block body %}{% endblock %}
```

The block function can also be used to display one block from another template:
```twig
{{ block("title", "common_blocks.twig") }}
```

Use the defined test to check if a block exists in the context of the current template:

```twig
{% if block("footer") is defined %}
    ...
{% endif %}
```

```twig
{% if block("footer", "common_blocks.twig") is defined %}
    ...
{% endif %}
```

See also

<a href="https://twig.symfony.com/doc/3.x/tags/extends.html">extends</a>
, <a href="https://twig.symfony.com/doc/3.x/functions/parent.html">parent</a>

<br>
Source: [Twig](https://twig.symfony.com/block)