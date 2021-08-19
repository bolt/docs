# slug

`slug` is a Twig filter to be used to transform any string into a slug-like value. This can be very useful when you're 
hand-crafting links to categories, pages or other structures where you need a URL-safe representation of a string.

In this example, we build links to all category listing pages:

```twig
<ul>
{% for category in app.config.get('taxonomy/categories/options') %}
    <li><a href="/category/{{ category|slug }}">{{ category }}</a></li>
{% endfor %}
<ul>
```
