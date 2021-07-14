# form_end

`form_end(form_view, variables)` is a Twig function to render the end tag of a form.

```twig
{{ form_end(form) }}
```

This helper also outputs form_rest() (which is explained later in this article) unless you set render_rest to false:

```twig
{# don't render unrendered fields #}
{{ form_end(form, {'render_rest': false}) }}
```

Source: [Forms](https://symfony.com/doc/current/form/form_customization.html#form-end-form-view-variables)