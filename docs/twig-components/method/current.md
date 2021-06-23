# current

`current` is a Twig filter to check if a given record or menu corresponds to the page being shown in the browser.
Useful for adding 'active' states to menus and such.

```twig
{% if page|current %}class="current"{% endif %}
```

or:

```twig
{% if page|current %}
    Yes, {{ page.title }} is the current page.
{% else %}
    No, you're viewing another page than {{ page.title}}
{% endif %}
```


Source: Bolt