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

You can create Bolt Taxonomies by adding them to `taxonomy.yaml`. Bolt can use the
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

The default `taxonomy.yaml` has good examples of all three types. You must specify either a `slug` or `name` on each definition.

```yaml
tags:
    slug: tags
    singular_slug: tag
    behaves_like: tags
    postfix: "Add some freeform tags. Start a new tag by typing a comma or space."
    allow_spaces: false
    #listing_template: tag-listing.twig #custom template

groups:
    slug: groups
    singular_slug: group
    behaves_like: grouping
    options: { main: "The main group", meta: "Meta group", other: "The other stuff" }
    has_sortorder: true

categories:
    name: Categories
    slug: categories
    singular_name: Category
    singular_slug: category
    behaves_like: categories
    multiple: true
    options: [ news, events, movies, music, books, life, love, fun ]
```

The common options are:

| Option name | Description |
|-------------|-------------|
| `slug`, `singular_slug` | The plural and singular names of the taxonomies, that are used internally. Use alphanumeric lowercase slugs only. These are both derived from `name` and `singular_name` respectively if they are not defined. |
| `name`, `singular_name` | The plural and singular "pretty names" that are used for the taxonomy. You can use both uppercase and lowercase, as well as numbers and spaces in these. These are both derived from `slug` and `singular_slug` respectively if they are not defined. |
| `behaves_like` | Each taxonomy has a required value for `behaves_like` value, that defines the type of the taxonomy. Allowed values are `tags`, `categories` and `grouping`. |
| `required` | If a user is required to select this taxonomy for an entry. Defaults to `true`. |
| `allow_spaces` | This option is used for tags taxonomies only, and defines  whether or not the tag taxonomy will allow spaces in the tags. Allowed values are `true` and `false`. For example, if set to `true`, an input of "star wars" will add a single tag called "star wars". If set to `false`, this same input will add two separate tags called "star" and "wars". |
| `listing_template` | By default, a taxonomy's listing page will use the `listing.twig` template. However, by specifying a `listing_template`, you can set a different template for each taxonomy. Bolt will automatically create listing pages for all taxonomies using the slug. For example `/category/movies` will display all records that have the "movies" category. |
| `multiple` | This option is used for category taxonomies only, and defines whether or not the editor can select multiple categories. |
| `has_sortorder` | This option is used for grouping taxonomies only, and defines whether the group has its own sorting order. See below for an example of this. |
| `options` | This option is used for grouping and categories taxonomies, and defines the possible options for the editor to chose. The values can either be an array or a hash. See below for an example.
| `prefix` | Text/HTML to show before the field. |
| `postfix` | Text/HTML to show after the field. |


Setting options
---------------

Both the grouping as well as the categories Taxonomies use a number of set
options. You can set these possible options in your `taxonomy.yaml`, after
which the editor can select one or more of them when they are editing the
content. Yaml allows us to specify these options in a few different ways,
depending on your needs.

### Simple sequence

```
categories:
    …
    options: [ news, events, movies ]
```

### Mapping

If you like more control over the display names for the taxonomies, you can
specify the options using a mapping in your Yaml:

```
categories:
    …
    options:
        news: Latest News
        events: Current Events
        movies: Cool Movies
```

Adding Taxonomies to ContentTypes
---------------------------------

Once the Taxonomies are added, you need to add them to your ContentTypes in
`contenttypes.yaml`, so you can use them in your content. For example:

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

Displaying Taxonomies on a Record
----------------------------------
If you would like to display the taxonomy on a record, for example 'tags',
use something like this:

```twig
{% if record|taxonomies['tags'] is defined %}
Tags:
  {% for tag in record|taxonomies['tags'] %}
     <a href="{{ tag|link }}">{{ tag.name }}</a>{% if not loop.last %}, {% endif %}
  {% endfor %}
{% endif %}
```

For a slightly more sophisticated example, see the default taxonomy links
template [_taxonomylinks.html.twig](https://github.com/bolt/core/blob/master/templates/helpers/_taxonomylinks.html.twig), or even use it directly in your own
theme:

```twig
{% include '_sub_taxonomylinks.twig' with {record: record} %}
```

You can use `dump` to inspect the Taxonomies on a record:

```twig
{{ dump(record|taxonomies) }}

Tightenco\Collect\Support\Collection {#3381 ▼
  #items: array:3 [▼
    "tags" => array:4 [▼
      "animation" => Bolt\Entity\Taxonomy {#3690 ▶}
      "drama" => Bolt\Entity\Taxonomy {#3880 ▶}
      "education" => Bolt\Entity\Taxonomy {#3413 ▶}
      "web" => Bolt\Entity\Taxonomy {#3571 ▶}
    ]
    "groups" => array:1 [▼
      "meta" => Bolt\Entity\Taxonomy {#3564 ▶}
    ]
    "categories" => array:2 [▼
      "life" => Bolt\Entity\Taxonomy {#3568 ▶}
      "love" => Bolt\Entity\Taxonomy {#3293 ▶}
    ]
  ]
}
```

Or for one specific taxonomy:

```twig
{{ dump(record|taxonomies.tags) }}

array:4 [▼
  "animation" => Bolt\Entity\Taxonomy {#3695 ▶}
  "drama" => Bolt\Entity\Taxonomy {#3885 ▶}
  "education" => Bolt\Entity\Taxonomy {#3520 ▶}
  "web" => Bolt\Entity\Taxonomy {#3576 ▶}
]
```

Or even one specific item in a taxonomy:

```twig
{{ dump(record|taxonomies.tags.animation) }}

Bolt\Entity\Taxonomy {#3690 ▼
    -id: 6
    -content: Doctrine\ORM\PersistentCollection {#3687 ▶}
    -type: "tags"
    -slug: "animation"
    -name: "animation"
    -sortorder: 0
    -link: "/tags/animation"
}
```

A common usecase is conditional output of something, depending on whether a
taxonomy is set or not. You can do this with the following syntax:

```twig
{% if record|taxonomies.tags.biology is defined %}
    This is Biology
{% else %}
    No, this isn't biology.
{% endif %}
```

In the above example we're using the 'dot notation' to access the taxonomies.
In case you're working with variables, it's likely more legible if you use the
'bracket notation':

```twig
{% set mytaxonomy = 'movies' %}

{% if record|taxonomies.tags[mytaxonomy] is defined %}
    Movies are the best!
{% endif %}
```

<p class="note"><strong>Note:</strong> You can use this 'dot' and 'bracket'
notation interchangeably, according to your preference.
<code>record|taxonomies.categories.blog</code> is equivalent to
<code>record|taxonomies['categories']['blog']</code>.</p>

Show records with the same taxonomy value
-----------------------------------------
If you would like to display a list of records with the same taxonomy values, for instance “all pages in the same chapter”, you can do something like this:


```twig
{% setcontent mypages = 'pages' where {'chapters': myvalue } %}
<ul>
{% for record in mypages %}
<li><a>{% if record|current %} class="active"{% endif %} href="{{ record|link }}"> {{ record|title }}</a></li>
{% endfor %}
</ul>
```

If you have a taxonomy with the multiple: true setting you can do something like this:

```twig
{% if record|taxonomies.chapters is defined %}
{% for value in record|taxonomies['chapters'] %}
{% setcontent mypages = 'pages' where {'chapters': value.slug } %}
<ul>
    {% for record in mypages %}
    <li><a class="tag{% if record|current %} active{% endif %}" href="{{ record|link }}"> {{ record|title }}</a></li>
    {% endfor %}
</ul>
{% endfor %}
{% endif %}
```
In your `taxonomy.yaml` file, where you have defined your different taxonomies, you can decide which file should be used to display your records for a specific taxonomy (categories for example) if you do not want to stick to the default (which is `listing_template: listing.twig` in `config/bolt/config.yaml`). You can define this under your taxonomy like this: 

```
categories:
  name: Categories 
  ...
  listing_template: category.twig
``` 
Notice the `listing_template` key added above. Similarly,  you can decide the number of records to be shown within this taxonomy page.

```
  listing_records: 4
```

Taxonomy Record Listing
-----------------------
On the listing template that displays all records associated with a taxonomy
(for example: `/category/movies`), if you would like to display the taxonomy
name above the listing of records, simply use `{{ slug }}`.

Displaying Taxonomy Listings
----------------------------
If you would like to display links to all the category listing
pages in a sidebar on your website, you can do something like this:

```twig
{% for category in config.get('taxonomies/categories/options') %}
    <li><a href="/categories/{{ category|slug }}">{{ category }}</a></li>
{% endfor %}
```

Displaying a list of tags is a little more complex, since the field
is free-form. You could write a twig extension to query for all the
used tags on your entries in order to display them on your site:

```php
<?php

namespace App;

use Bolt\Entity\Taxonomy;
use Doctrine\ORM\EntityManagerInterface;
use Twig\Extension\AbstractExtension;
use Twig\TwigFunction;

class TagCloudTwigExtension extends AbstractExtension
{
    /** @var EntityManagerInterface */
    private $objectManager;

    public function __construct(EntityManagerInterface $objectManager)
    {
        $this->objectManager = $objectManager;
    }

    public function getFunctions()
    {
        return [
            new TwigFunction('tag_cloud', [$this, 'tagCloud']),
        ];
    }

    public function tagCloud() {
        $om = $this->objectManager;
        $qb = $om->createQueryBuilder();
        $qb->select("t.name, t.slug")
            ->addSelect("count(c) as count")
            ->from(Taxonomy::class, 't')
            ->leftJoin('t.content', 'c')
            ->where("t.type = 'tags'")
            ->groupBy("t.id")
            ->orderBy("t.name");
        $query = $qb->getQuery();
        $results = $query->getResult();
        return $results;
    }
}
```

And then display the tag cloud on your website using:

```twig
{% for tag in tag_cloud() %}
    <a href="/tag/{{ tag.slug }}">#{{ tag.name }} ({{ tag.count }})</a>
    {% if not loop.last %} | {% endif %}
{% endfor %}
```

[tax]: https://github.com/bolt/bolt/blob/%%VERSION%%/bolt/templates/helpers/_sub_taxonomylinks.twig
