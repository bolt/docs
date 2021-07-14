# form_row

`form_row(form_view, variables)` is a Twig function to render the “row” of a given field, which is the combination of
the field’s label, errors, help and widget.

```twig
{# render a field row, but display a label with text "foo" #}
{{ form_row(form.name, {'label': 'foo'}) }}
```

The second argument to `form_row()` is an array of variables. The templates provided in Symfony only allow to override
the label as shown in the example above.

See [Form Variables](https://symfony.com/doc/current/form/form_customization.html#twig-reference-form-variables) to learn about the variables argument.

Source: [Forms](https://symfony.com/doc/current/form/form_customization.html#form-row-form-view-variables)