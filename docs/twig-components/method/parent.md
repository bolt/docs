# parent

`parent` is a Twig function to render the contents of the parent block when overriding a block by using the parent
function, when a template uses inheritance.

```twig
{% extends "base.html" %}

    {% block sidebar %}
    <h3>Table Of Contents</h3>
    ...
    {{ parent() }}
{% endblock %}
```

The `parent()` call will return the content of the sidebar block as defined in the `base.html` template.

### See also

[extends](https://twig.symfony.com/doc/3.x/tags/extends.html)
, [block](https://twig.symfony.com/doc/3.x/functions/block.html)
, [block](https://twig.symfony.com/doc/3.x/tags/block.html)

Source: [Twig](https://twig.symfony.com/parent)