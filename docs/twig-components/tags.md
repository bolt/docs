---
title: Twig tags
---

Twig tags
=========

## for

This tag is used to iterate over arrays or collections of an object, similar to
`foreach` in PHP.

```twig
<h3>Recent pages</h3>
{% setcontent pages = 'pages' limit 5 order '-datecreated' %}
<ul>
  {% for page in pages %}
    <li><a href="{{ page|link }}">{{ page.title }}</a></li>
  {% else %}
    <p>No recent pages.</p>
  {% endfor %}
</ul>
```

See: [`for` in the Twig documentation][for].

## setcontent

The `setcontent` tag is used to perform various queries on the database. It
converts a human-readable query to actual records.

Much, much more information about the `setcontent` tag, together with
additional query arguments, pagination, sorting and other options you can find
in the chapter about [Fetching content][content].

These queries are currently possible:

  * `entry/12` - get entry with id 12
  * `page/about` - get page with slug about
  * `animal/search/5` - search for animals and return 5 of them (use
    where parameter 'filter' to specify search string)
  * `(animal,plant)` - fetch records for animals and plants

```twig
{% setcontent about = 'page/about' %}

<h3>{{ about.title }}</h3>
{{ about.introduction|raw }}

<a href="{{ about|link }}">link</a>
```

## switch

The `switch` tag implements a `switch` statement, like the one present in
[PHP][switch] and many other programming languages. It allows you to
'clean up' a list of `if` / `elseif` / `else` statements, in a more concise
way. For example:

```twig
{% set foo = 1 %}
{% switch foo %}
  {% case 1 %}
    Foo was equal to the number one.
  {% case 2 %}
    Foo was two.
  {% default %}
    This is the default fallback.
{% endswitch %}
```

[content]: ../templating/content-fetching
[for]: http://twig.symfony.com/doc/tags/for.html
[switch]: http://php.net/manual/en/control-structures.switch.php
