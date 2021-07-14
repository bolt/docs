# form_label

`form_label(orm_view, label, variables)` is a Twig function to render the label for the given field. You can optionally
pass the specific label you want to display as the second argument.

```twig
{{ form_label(form.name) }}

{# The two following syntaxes are equivalent #}
{{ form_label(form.name, 'Your Name', {'label_attr': {'class': 'foo'}}) }}

{{ form_label(form.name, null, {
    'label': 'Your name',
    'label_attr': {'class': 'foo'}
}) }}
```

Source: [Forms](https://symfony.com/doc/current/form/form_customization.html#form-label-form-view-label-variables)