---
title: Taxonomies
---
Taxonomies
==========

Most content can be structured in logical ways, using categorisation or
labelling. Basically, taxonomies can be used to create 'groupings' or
'classifications' between different content, regardless of their ContentTypes.
Common examples of taxonomies on websites are 'categories' or 'tags'. For
example, a website about movies might have "Romance", "Science Fiction" and
"Comedy" as categories for its reviews. Any classification like this is broadly
called a taxonomy. Bolt allows you to define and use your own taxonomies to
classify and structure your content.

You can create Bolt Taxonomies by adding them to `taxonomy.yml`. Bolt can use the
common 'tags' and 'categories' out of the box, but it also allows you to
customize them to your needs. You can define your own Taxonomies, and choose
how they behave. There are three main types of Taxonomy:

  - `tags`: Tags are a sort of 'freeform' labeling. Each record can have
    several tags, that do not have to be selected from a predefined list. Just
    add tags, as you go! Examples of websites that use tags extensively are
    [Flickr](http://www.flickr.com/search/?q=tag%3Akitten) or
    [Delicious](https://delicious.com/tag/kittens). The Taxonomy can be set up
    to allow spaces in tag names or not.
  - `categories`: Categories are chosen predefined categorizations for your
    record. These are often found on weblogging sites, to define the different
    types of blogpostings. The Taxonomy can be limited to either one or more
    categories for each record.
  - `grouping`: Grouping is like categories but it is - by definition - more
    strict. When a grouping applies to a certain record, that record should be
    viewed as a part of the other records with the same grouping. As such, a
    record can have only one 'grouping' at most.

The default `taxonomy.yml` has good examples of all three types. If
`name` and `singular_name` are omitted, they are generated automatically by
Bolt.

```yaml
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

The common options are: 

| Option name | Description |
|-------------|-------------|
| `slug`, `singular_slug` | The plural and singular names of the taxonomies, that are used internally. Use alphanumeric lowercase slugs only. |
| `name`, `singular_name` | The plural and singular "pretty names" that are used for the taxonomy. You can use both uppercase and lowercase, as well as numbers and spaces in these. |
| `behaves_like` | Each taxonomy has a required value for `behaves_like` value, that defines the type of the taxonomy. Allowed values are `tags`, `categories` and `grouping`. |
| `allow_spaces` | This option is used for tags taxonomies only, and defines  whether or not the tag taxonomy will allow spaces in the tags. Allowed values are `true` and `false`. For example, if set to `true`, an input of "star wars" will add a single tag called "star wars". If set to `false`, this same input will add two separate tags called "star" and "wars". | 
| `listing_template` | By default, a taxonomy's listing page will use the `listing.twig` template. However, by specifying a `listing_template`, you can set a different template for each taxonomy. Bolt will automatically create listing pages for all taxonomies using the slug. For example `/category/movies` will display all records that have the "movies" category. |
| `multiple` | This option is used for category taxonomies only, and defines whether or not the editor can select multiple categories. |
| `has_sortorder` | This option is used for grouping taxonomies only, and defines whether the group has its own sorting order. See below for an example of this. |
| `options` | This option is used for grouping and categories taxonomies, and defines the possible options for the editor to chose. The values can either be an array or a hash. See below for an example. 

Setting options
---------------

Both the grouping as well as the categories Taxonomies use a number of set options. You can set these possible options in your `taxonomy.yml`, after which the editor can select one or more of them when they are editing the content. Yaml allows us to specifiy these options in a few different ways, depending on your needs. 

### Simple sequence

```
categories:
    …
    options: [ news, events, movies ]
```    

### Mapping

If you like more control over the display names for the taxonomies, you can specify the options using a mapping in your Yaml: 

```
categories:
    …
    options:
        news: Latest News
        events: Current Events
        movies: Cool Movies
```   

Sorting order
-------------

Bolt ContentTypes can have their own sorting order. Usually this is defined as something like `sort: title` in the ContentType to sort alphabetically by title. Sometimes it might make more sense to use a grouping Taxonomy, and sort within those groups. To do this, you can add `has_sortorder`, which allows the editor to not only select a group to classify a record, but it also allows them to set a sorting order by which the records inside that specific group are sorted. 

<a href="/files/taxonomy_sortorder2.png" class="popup"><img src="/files/taxonomy_sortorder2.png" width="500"></a>

In Bolt's backend listing for the content-type, the content will be organised by the selected group, and it will be sorted by the sorting order: 

<a href="/files/taxonomy_sortorder1.png" class="popup"><img src="/files/taxonomy_sortorder1.png" width="500"></a>

Note that the sorting is done inside the group only. 

Adding Taxonomies to ContentTypes
---------------------------------

Once the Taxonomies are added, you need to add them to your ContentTypes in
`contenttypes.yml`, so you can use them in your content. For example:

```yaml
entries:
    name: Pages
    singular_name: Page
    fields:
        …
    taxonomy: chapters

```

If you'd like to use more than one Taxonomy for a ContentType, be sure to use
an array:

```yaml
pages:
    …
    taxonomy: [ categories, tags ]
```

Displaying Taxonomies in templates
----------------------------------

If you'd like to show only one specific Taxonomy, for example 'tags', use
something like this:

```twig
{% if record.taxonomy.tags is defined %}
    {% for tag in record.taxonomy.tags %}
        {{ tag }}{% if not loop.last %}, {% endif %}
    {% endfor %}
{% endif %}
```

If you're using a listing, and would like to access the taxonomy name, simply use `{{ slug }}`.

Displaying all used taxonomies
------------------------------

If you'd like to just display the used Taxonomies in your templates, you can either write some twig code to output all of them in sequence, but for a quick fix, you can use a snippet like the following: 

After updating your content with Taxonomies, you can edit your templates to show
the Taxonomies and to link to automatically generated listing pages:

```twig
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

For a slightly more sophisticated example, inspect the file 
`theme_defaults/_sub_taxonomylinks.twig`, or even use it directly in your own
theme:

```twig 
{% include '_sub_taxonomylinks.twig' with {record: record} %}
```
