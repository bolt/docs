---
title: Creating a simple menu
---
Simple menu
===========

The following creates a simple menu in HTML, based on the last 4 pages. Only
pages where the chapter taxonomy is 'main' are selected, assuming there's a
taxonomy 'chapter'.

```
    <nav id="main">
    {% setcontent pages = 'pages/latest/4' where { 'taxonomy/chapter': 'main'}  %}

    {% for page in pages %}
        {% if loop.first %}<ul>{% endif %}
        <li><a href="{{ page|link }}" {% if page|current %}class="current"{% endif %}>{{ page.title|trimtext(12) }}</a></li>
        {% if loop.last %}</ul>{% endif %}
    {% else %}
        <em>No main navigation items. Add some Pages, and set the 'Chapter' to 'Main'.</em>
    {% endfor %}
    </nav> 
```

<p class="note"><strong>Note:</strong> This is a specific sample. In general,
you're probably better off using Bolt's built in <a href="../configuration/menus">menu
functionality</a>.</p>
