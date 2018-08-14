---
title: Record and Records
---
Record and Records
==================

When writing templates for Bolt, you'll be mostly working with a single record
with content, or arrays containing a number of records. See the page on
[ContentTypes](../contenttypes/intro) for more information on how they
become available in templates.

This page is divided in two parts: working with a single `{{ record }}`, or
with an array of `{{ records }}`. In the examples below we mostly refer to the
generic `record` variable, but in your own templates you're free to use the
proper name of the ContentType used.

Using a `{{ record }}`
----------------------

The easiest way to see what the contents of a record (or any other variable,
for that matter) are, is to use the `dump()` function:

```
{{ dump(record) }}
```

<a href="/files/content-example3.png" class="popup"><img src="/files/content-example3.png" width="500"></a>

As you can see in the screenshot, a record of a ContentType is an `object`.
There are several benefits to this over a regular `array`. We can access the
fields like regular values, but we can also use specific functionality for
every object, without the need to define these separately.

You can access regular fields in a record like these examples for either a
`page` or `entry` record:

```twig
{{ page.title }}
{{ page.text }}

Created on {{ entry.datecreated|date('Y-m-d')}}

The ContentType for this entry is {{ entry.contenttype.name }},
and it contains {{ entry.contenttype.fields|length }} fields.
```

The real power comes from using the special functions that are defined for every
content record.

To get a link to the content:

```twig
Link: <a href="{{ page.link }}">{{ page.title }}</a>
```

Get a short excerpt of the record:

```twig
<p>{{ page.excerpt(250) }}</p>
```

Get the next and previous record:

```twig
{% set previous = page.previous() %}
{% set next = page.next() %}
```

The next and previous functions allow for additional parameters. For example,
you can base the next record on any field (this is `datepublish` by default),
filtered by a `where` clause, see [using where](content-fetching#using-where)
for more details.

```twig
{% set next = page.next('datepublish', {'status': page.taxonomy.status} ) %}
```

### Getting the type of a certain field

If you're iterating over an array of `record.values`, it's sometimes useful to
know what type of field you're dealing with. This is where the `fieldtype()`
function comes in handy, it reads the fieldtype from the `contenttypes.yml`
configuration file:

```
{% for key,value in record.values %}

  {% if record.fieldtype(key) == "image" %}

      <div class='imageholder-wide'><img src="{{ record.image|thumbnail(800, 600) }}"></div>

  {% elseif record.fieldtype(key) not in ['templateselect'] 
            and key != "templatefields"
            and value != "" %}

      {{ value }}

  {%  endif %}

{% endfor %}
```

<p class="note"><strong>Note:</strong> To create connections between different
records of the same or different ContentTypes, see the page on <a
href="../contenttypes/relationships">Relations</a>.</p>


Using `{{ records }}`
-------------------

The `{{ records }}` array is basically a set of several content records. When
you have a `{{ records }}` array, you can iterate over each of the records to
output them as desired. In the following example you can see how to get an array
of records. You'll notice that in this case it's not actually called `records`,
but `pages`. Since it's just a variable name, we can call it whatever we like.
After getting the `{{ pages }}` array, we use a simple `for` loop, so we can
iterate over each of the separate `{{ page }}` records.

```
{% setcontent pages = 'pages/latest/4' %}

{% for page in pages %}

    {# Do something with each {{ page }} #}
    {{ page.title }}

{% endfor %}
```

Because `{{ records }}` is an array, we can use all the regular Twig
functionality for arrays. In the previous example we've shown how to iterate
over the records using a `for` loop, but you can also do things like the
following.

Check how many records there are:

```
{% if pages|length > 0 %} More than 0 records {% endif %}

{% if pages|length < 5 %} Less than 5 records {% endif %}

There are exactly {{ pages|length }} records.
```

[Reverse](http://twig.sensiolabs.org/doc/filters/reverse.html) the array:

```
{% for page in pages|reverse %}

    {# Do something with each {{ page }} #}
    {{ page.title }}

{% endfor %}
```

Or [slice](http://twig.sensiolabs.org/doc/filters/slice.html) the array:

```
{% set slice = pages|slice(1,3) %}

{% for page in slice %}

    {# Do something with {{ page }} 1 through 3 #}
    {{ page.title }}

{% endfor %}
```

Use only the first or last record of the array with the `first` or `last` filters:

```
{% set firstrecords = records|first %}

The title of the first record is:
{{ firstrecord.title }}

Or directly, the last title:
{{ records|last.title }}
```

[1]: https://developers.google.com/maps/documentation/staticmaps
