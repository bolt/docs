---
title: Sorting a ContentType with a 'sortorder'
---
Sorting a ContentType with a 'sortorder'
========================================

Sometimes you might need to sort Pages or some other ContentType on an
arbitrary order, instead of on "Title, aphabetically" or "Date added". In these
cases, you can use the built-in taxonomy that can use a given sortorder. This
will allow you to manually define the order of all records in that specific
ContentType. To set it up, follow these two steps:

First, make sure you have a taxonomy set up to use the 'sortorder' sorting.
Make sure it has set both `behaves_like: grouping` as well as `has_sortorder:
true`. The below example comes straight from the default `taxonomy.yml`, and it
has this feature enabled:

```
chapters:
    slug: chapters
    singular_slug: chapter
    behaves_like: grouping
    options: { main: "The main chapter", meta: "Meta Chapter", other: "The other stuff" }
    has_sortorder: true
```

Tip: You will _need_ to keep the `options:` setting in there. Even if you don't
really need to order the records into different groups, you'll need to keep at
least one of the 'options' present in your taxonomy.

Secondly, you'll want to make sure that you configure your ContentType to use
this taxonomy in your `contenttypes.yml`. Note that the ContentType does _not_
require a `sort:` option. In this case Bolt will use the sorting, as defined in
our taxonomy, so defining another sort option would make no sense. For example,
see this `pages` ContentType:

```
pages:
    name: Pages
    singular_name: Page
    fields:
        title:
            type: text
            class: large
            group: content
        slug:
            type: slug
            uses: title
        […]
    taxonomy: [ chapters ]
    recordsperpage: 100
```

Once you've done this, you can edit the records in Bolt, assigning them the
sort order you need:

<a href="/files/howto_sortorder_1.png" class="popup"><img src="/files/howto_sortorder_1.png" width="590"></a><br>

In the overview page, you'll see the records listed ascending, in the order
you've specified:

<a href="/files/howto_sortorder_2.png" class="popup"><img src="/files/howto_sortorder_2.png" width="590"></a><br>

Note that retrieving these records in the frontend works automatically. If you
wish to get the records ordered by the given sortorder, just use a plain
`setcontent`:

```
{% setcontent orderedpages = 'pages' %}
{{ dump(orderedpages) }}
```

You can still order by a specific field, by overriding the order in the
`setcontent` tag:

```
{% setcontent orderedpages = 'pages' orderby 'title' %}
{{ dump(orderedpages) }}
```

