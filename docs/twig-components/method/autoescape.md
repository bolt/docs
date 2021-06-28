# autoescape

`autoescape` is a Twig tag to, whether automatic escaping is enabled or not, mark a section of a template to be
escaped or not by using the `autoescape` tag:

```twig
{% autoescape %}
    Everything will be automatically escaped in this block using the HTML strategy
{% endautoescape %}
```
```twig
{% autoescape 'html' %}
    Everything will be automatically escaped in this block using the HTML strategy
{% endautoescape %}
```

```twig
{% autoescape 'js' %}
    Everything will be automatically escaped in this block using the js escaping strategy
{% endautoescape %}
```

```twig
{% autoescape false %}
    Everything will be outputted as is in this block
{% endautoescape %}
```
When automatic escaping is
enabled everything is escaped by default except for values explicitly marked as safe. Those can be marked in the
template by using the <u>raw</u> filter:

```twig
{% autoescape %}
    {{ safe_value|raw }}
{% endautoescape %}
```

Functions returning template data (like macros and parent)
always return safe markup.


### Note

Twig is smart enough to not escape an already escaped value by the escape filter.

### Note

<p>Twig does not escape static expressions:</p>

```twig
{% set hello = <strong>Hello<strong> %}
{{ hello }}
{{ "<strong>world<strong>" }}
```

Will be rendered "&lt;strong&gt;Hello&lt;/strong&gt; <strong>world</strong>".


### Note

The chapter Twig for Developers gives more information about when and how automatic escaping is applied.


Source: [Twig](https://twig.symfony.com/autoescape)
