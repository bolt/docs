# form

`form(form_view, variables)` is a Twig function to render the HTML of a complete form.

```twig
{# render the form and change the submission method #} 
{{ form(form, {'method': 'GET'}) }} 
```

You will mostly use this
helper for prototyping or if you use custom form themes. If you need more flexibility in rendering the form, you should
use the other helpers to render individual parts of the form instead:

```twig
{{ form_start(form) }} {{ form_errors(form) }}

    {{ form_row(form.name) }}
    {{ form_row(form.dueDate) }}

    {{ form_row(form.submit, { 'label': 'Submit me' }) }}

{{ form_end(form) }}
```

Source: [Forms](https://symfony.com/doc/current/form/form_customization.html#reference-forms-twig-form)