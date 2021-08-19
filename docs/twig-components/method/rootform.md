# rootform

`rootform` is a Twig test to check if the current form does not have a parent form view.

```twig
 {# DON'T DO THIS: this simple check can't differentiate between a form having
    a parent form view and a form defining a nested form field called 'parent' #}

 {% if form.parent is null %}
     {{ form_errors(form) }}
 {% endif %}

{# DO THIS: this check is always reliable, even if the form defines a field called 'parent' #}

 {% if form is rootform %}
     {{ form_errors(form) }}
 {% endif %}
```

Source: 