# order

`order(on = "-publishedAt", onSecondary = null, locale = null)` is a Twig filter to reorder the results of {% setcontent
%} or {{ record|related() }}.

|Parameter    |Description
|---|---
|on `optional`    |The first field to order on. Appending a - will result in descending order. Default is -publishedAt
|`onSecondary` optional    |If two records have the same on order, this is used to determine the appropriate order.
|`locale` optional    |Order by the on or onSecondary value in the given locale. Default is the current locale.

```twig
{% set relatedrecords = record|related() %}
<p class="meta">Related content:
    <ul>
    {% for related in relatedrecords|order('publishedAt') %}
        <li><a href="{{ related|link }}">{{ related.title }}</a></li>
    {% endfor %}
    </ul>
</p>
```

or:

```twig
{# get the 10 latest entries by date, but sort them on the title and subtitle fields #}
{% setcontent entries = "entries/latest/10" %}

<ul>
{% for entry in entries|order('title', 'subtitle') %}
    <li><a href="{{ entry|link }}">{{ entry.title }}</a></li>
{% endfor %}
</ul>
```

<p class="note"><strong>Note:</strong> Ordering with the `order`-filter is case sensitive. This means that 'banana' will 
come before 'Apple'. If you're sorting on a title or name field and this case sensitivity is undesirable, you can use 
`|order('slug')` instead. The slug is always lowercase, so this will normalize the ordering.</p>
