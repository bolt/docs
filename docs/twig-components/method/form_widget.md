# form_widget

`form_widget(form_view, variables)` is a Twig function to render the HTML widget of a given field. If you apply this to
an entire form or collection of fields, each underlying form row will be rendered.

```twig
{# render a widget, but add a "foo" class to it #}
{{ form_widget(form.name, {'attr': {'class': 'foo'}}) }}
```

The second argument to `form_widget()` is an array of variables. The most common variable is `attr`, which is an array
of HTML attributes to apply to the HTML widget. In some cases, certain types also have other template-related options
that can be passed. These are discussed on a type-by-type basis. The `attributes` are not applied recursively to child
fields if you’re rendering many fields at once (e.g. `form_widget(form)`).

See [Form Variables Reference](https://symfony.com/doc/current/form/form_customization.html#twig-reference-form-variables)
to learn more about the `variables` argument.

Source: [Forms](https://twig.symfony.com/form_widget)