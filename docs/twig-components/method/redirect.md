# redirect

`redirect(path)` is a Twig function to redirect from a page to another page or domain. Commonly 
used in an if/else clause, to redirect visitors based on some criteria.

```twig
{% if record.image!="" %}
<a href="{{ image(record.image) }}">
<img src="{{ thumbnail(record.image, 400, 260) }}">
</a>
{% else %}
{# passive-aggressive way to tell people to find their own image #}
{{ redirect('http://images.google.com/') }}
{% endif %}
```

```twig
{% setcontent records = "pages" limit latest 5 %}
{% for record in records %}

    <h2><a href="{{ record|link }}">{{ record.title }}</a></h2>
    <p>{{ record.excerpt() }}</p>

{% else %}

    {{ redirect(path('homepage')) }} or {{ redirect('page/some-page') }}

{% endfor %}
```
