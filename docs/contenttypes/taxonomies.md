---
title: Taxonomies
---
Taxonomies
==========

You can create taxonomies by adding them to `taxonomy.yml`. Basically,
taxonomies can be created to create automatic 'groupings' between different
content, regardless of their contenttypes. Common examples of taxonomies on
websites are 'categories' or 'tags'. In Bolt, taxonomies are a bit more generic:
You can define your own taxonomies, and choose how they behave. There are three
main types of taxonomy:

  - `tags`: Tags are a sort of 'freeform' labeling. Each record can have several
    tags, that do not have to be selected from a predefined list. Just add tags,
    as you go! Examples of websites that use tags extensively are
    [Flickr](http://www.flickr.com/search/?q=tag%3Akitten) or
    [Delicious](https://delicious.com/tag/kittens). The taxonomy can be set up to
    allow spaces in tag names or not.
  - `categories`: Categories are chosen predefined categorizations for your
    record. These are often found on weblogging sites, to define the different
    types of blogpostings. The taxonomy can be limited to either one or more
    categories for each record.
  - `grouping`: Grouping is like categories but it is - by definition - more
    strict. When a grouping applies to a certain record, that record should be
    viewed as a part of the other records with the same grouping. As such, a
    record can have only one 'grouping' at most.

The default `taxonomy.yml` has good examples of all three types. Note that each
taxonomy has a `behaves_like` value, that defined the type of the taxonomy. If
`name` and `singular_name` are omitted, they are generated automatically by
Bolt.

```apache
tags:
    slug: tags
    singular_slug: tag
    behaves_like: tags
    allow_spaces: false
    #listing_template: tag-listing.twig #custom template

chapters:
    slug: chapters
    singular_slug: chapter
    behaves_like: grouping
    options: [ main, meta, other ]

categories:
    name: Categories
    slug: categories
    singular_name: Category
    singular_slug: category
    behaves_like: categories
    multiple: 1
    options: [ news, events, movies, music, books, life, love, fun ]
```
By default, a taxonomypage will use the `listing.twig` template. However, by specifying a `listing_template`, you can set a different template for each taxonomy.

Once the taxonomies are added, you need to add them to your ContentTypes in
`contenttypes.yml`, so you can use them in your content. For example:

```apache
entries:
    name: Pages
    singular_name: Page
    fields:
        ..
    taxonomy: chapters
..
```

If you'd like to use more than one taxonomy for a contenttype, be sure to use an
array:

```apache
pages:
    ..
    taxonomy: [ categories, tags ]
..
```

After updating your content with taxonomies, you can edit your templates to show
the taxonomies and to link to automatically generated listing pages:

```
{% if record.taxonomy is defined %}
    {% for type, values in record.taxonomy %}
        <em>{{ type }}:</em>
        {% for link, value in values %}
                <a href="{{ link }}">{{ value }}</a>{% if not loop.last %}, {% endif %}
        {% endfor %}
        {% if not loop.last %} - {% endif %}
    {% endfor %}
{% endif %}
```

If you'd like to show only one specific taxonomy, for example 'tags', use
something like this:

```
{% if record.taxonomy.tags is defined %}
    {% for tag in record.taxonomy.tags %}
        {{ tag }}{% if not loop.last %}, {% endif %}
    {% endfor %}
{% endif %}
```

<p class="note"><strong>Note:</strong> If you'd like to just display the
'default' taxonomies in your templates, you can use this to include it: <code>{%
include '_sub_taxonomylinks.twig' with {record: record} %}</code>.</p>
