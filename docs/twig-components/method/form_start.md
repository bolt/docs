# form_start

`form_start(form_view, variables)` is a Twig function to render the start tag of a form. This helper takes care of
printing the configured method and target action of the form. It will also include the correct enctype property if the
form contains upload fields.

```twig
{# render the start tag and change the submission method #}
{{ form_start(form, {'method': 'GET'}) }}
```

Source: [Forms](https://symfony.com/doc/current/form/form_customization.html#form-start-form-view-variables)