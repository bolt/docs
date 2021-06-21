# block

`block`

When a template uses inheritance and if you want to print a block multiple times, use the block function:

```
<title>{% block title %}{% endblock %}</title>

<h1>{{ block('title') }}</h1>

{% block body %}{% endblock %}
```
<br>
The block function can also be used to display one block from another template:

```
{{ block("title", "common_blocks.twig") }}
```
<br>
Use the defined test to check if a block exists in the context of the current template:

```
{% if block("footer") is defined %}
    ...
{% endif %}
```
<br>

```
{% if block("footer", "common_blocks.twig") is defined %}
    ...
{% endif %}
```
<br>
See also

<a href="https://twig.symfony.com/doc/3.x/tags/extends.html">extends</a>
, <a href="https://twig.symfony.com/doc/3.x/functions/parent.html">parent</a>

<br>
Source: [Twig](https://twig.symfony.com/block)