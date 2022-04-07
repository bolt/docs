`paginate()`is a Twig function to rearrange (and remove) the empty places after using the
[filter(arrow)](https://docs.boltcms.io/5.0/twig-components/method/filter) method:

```
{% set filteredRecords = [] %}

{% for record in records %}
    {% set filteredFields = record|filter(r => r.title == title) %}

    {% if filteredRecords|length > 0 %}
       {% set filteredRecords = filteredFields|merge([record}) %}
    {% endif %}
{% endfor %}

{% set records = filteredRecords %}
```

And then you can use:

```
{% set records = paginate(records) %}
```

Source: Bolt

