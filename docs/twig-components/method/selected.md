# selected

`selected(returnsingle = false, returnarray = false)` is a Twig filter to return all selected records from the content 
select field. Note, this filter should only be used on select fields that select from a list of Content, as opposed to 
a list of items.

For a Content select field with `multiple: false`:

```twig
{% set selected_record = record.select_field|selected %}

{{ selected_record.id }} {{ selected_record|title }}<br>
```

For a Content select field with multiple: true:

```twig
{% set selected_records = record.select_field|selected %}

{% for selected_record in selected_records %}
{{ selected_record.id }} {{ selected_record|title }} <br>
{% endfor %}
```
