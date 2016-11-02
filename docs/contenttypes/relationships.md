---
title: Relationships
---
Relationships
=============

You can define relationships between records by adding a relation to
`contenttypes.yml`.

```yaml
entries:
    name: Entries
    singular_name: Entry
    fields:
        [..]
    relations:
        pages:
            multiple: false
            label: Select a page
            order: -id
    [..]
```

The `relations` are defined by the slug of the ContentType that it's related to.
In the example above `pages`. It takes a few parameters:

| Parameter  | Description |
|------------|-------------|
| `multiple` | `true` or `false`, to indicate whether the user can pick one related record, or more than one. |
| `label` | The label to show on the edit screen. |
| `order` | The order in which the items are listed on the edit screen. This can be any field in the ContentType. Prefix with `-` to reverse the sorting. In the case of the example, `-id` means that the records that were created last are at the top.
| `format` | How to show the titles for each record that can be selected. This takes a twig string where `item` is the record that can be selected.  For example if you have two fields for firstname and lastname you might put `'{{item.firstname}} {{item.lastname}}'` here. The default is `'{{ item.title|escape }} (№ {{ item.id }})'` |

Editing a record that has relations defined looks like this:

<a href="/files/relations1.png" class="popup"><img src="/files/relations1.png" width="350"></a>

If you define a relation only one way, for example from `entries` to `pages`,
but not the other way around, you will still see the references when editing the
record that has a relation to another record. It looks like this:

<a href="/files/relations2.png" class="popup"><img src="/files/relations2.png" width="350"></a>

If you see this, you might consider adding the reverse relation to the
`contenttypes.yml` as well.

Relations in templates
----------------------

Internally, relations are stored and accessible in the `Bolt\Record` object.
However, accessing `record.relation` will give you nothing but the ContentTypes
and id's:

```
    {{ dump(record.relation) }}
```

Output:

```
arr(2)
[
    "pages"        => arr(1)
        [
            0 => str(2) "45"
        ]
    "kitchensinks" => arr(2)
        [
            0 => str(2) "12"
            1 => str(2) "23"
        ]
]
```

To get the actual related records, use the _function_ `related()`

```
    {% set relatedrecords = record.related() %}
    {% if relatedrecords is not empty %}
        <p>Related content:</p>
        <ul>
        {% for related in relatedrecords %}
            <li><a href="{{ related.link }}">{{ related.title }}</a></li>
        {%  endfor %}
        </ul>
    {% endif %}
```

The `related()` function has two optional parameters. If you don't pass any
parameters, you will get all related records, regardless of their ContentType.
To retrieve only the related records of a specific ContentType, use:

```
    {% set relatedrecords = record.related('pages') %}
```

To request only one specific related record, pass the id as the second
parameter:

```
    {% set relatedrecords = record.related('pages', 45) %}
```

To use pagination in a list of related records, use the ids of the related
records in a `setcontent` tag:

```
    {% set ids = record.relation.news|join(" || ") %}
    {% setcontent messages = "news" where { id: ids } allowpaging limit 6 %}
    {% for item in messages %}
    ...
    {% endfor %}
    {{ pager('news') }}
```

<p class="note"><strong>Note:</strong> The <code>related()</code> function
<em>always</em> returns an array of records, even if you request only a single
record. In general, it's best to always use a <code>{% for %}</code>-loop, to
iterate over the results.</p>
