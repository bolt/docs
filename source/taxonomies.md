Taxonomies
==========

You can create taxonomies by adding them to `taxonomy.yml`. Basically,
taxonomies can be created to create automatic 'groupings' between different
content, regardless of their contenttypes. Common examples of taxonomies on
websites are 'categories' or 'tags'. In Bolt, taxonomies are a bit more generic:
You can define your own taxonomies, and choose how they behave. There are three
main types of taxonomy, that are:

  - `tags`: Tags are a sort of 'freeform' labeling. Each record can have several
    tags, that do not have to be selected from a predefined list. Just add tags,
    as you go! Examples of websites that use tags extensively are
    [Flickr](http://www.flickr.com/search/?q=tag%3Akitten) or
    [Delicious](https://delicious.com/tag/kittens).
  - `categories`: Categories are chosen pre-defined categorizations for your
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

<pre class="brush:plain">
tags:
    slug: tags
    singular_slug: tag
    behaves_like: tags
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
</pre>

Once the taxonomies are added, you need to add them to your contenttypes in
`contenttypes.yml`, so you can use them in your content. For example:

<pre class="brush:plain">
entries:
    name: Pages
    singular_name: Page
    fields:
        ..
    taxonomy: chapters
..
</pre>

If you'd like to use more than one taxonomy for any contenttype, be sure to use an array:

<pre class="brush:plain">
pages:
    ..
    taxonomy: [ categories, tags ]
..
</pre>

After updating your content with taxonomies, you can edit your templates to show
the taxonomies it has, and to link to automatically generated listing pages for
each taxonomy:

<pre class="brush:html">
{% if record.taxonomy is defined %}
    {% for type, values in record.taxonomy %}
        <em>{{ type }}:</em>
        {% for link, value in values %}
                <a href="{{ link }}">{{ value }}</a>{% if not loop.last %}, {% endif %}
        {% endfor %}
        {% if not loop.last %} - {% endif %}
    {% endfor %}
{% endif %}
</pre>

If you'd like to show only one specific taxonomy, for example 'tags', use something like this:

<pre class="brush:html">
{% if record.taxonomy.tags is defined %}
    {% for tag in record.taxonomy.tags %}
        {{ tag }}{% if not loop.last %}, {% endif %}
    {% endfor %}
{% endif %}
</pre>

<p class="note"><strong>Note:</strong> If you'd like to just display the
'default' taxonomies in your templates, you can use this to include it: <code>{%
include '_sub_taxonomylinks.twig' with {record: record} %}</code>.</p>
