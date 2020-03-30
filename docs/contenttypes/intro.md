---
title: Introduction
---
ContentTypes
============

All content in Bolt is stored in the database in a logical and flexible
fashion. In general, when you're building a website, you have an idea what kind
of content you're going to be managing with the website. Most websites have
some sort of 'pages' for generic stuff like 'about us' or 'Company History'.

Most websites will also have some form of news-like items, that are shown based
on the date that they were published. Some other sites might have 'book
reviews' or 'event dates' or even completely different content. All of these
different types of content are called **ContentTypes** in Bolt, and you can add
as many different ContentTypes as you need.

Each ContentType is made up of **Fields**, you can read more about **Fields**
and what fields are available in the [Fields Definition][field-types] section.

All content on your website is part of one specific ContentType, which
automatically defines which fields that piece of content has, which in turn
specifies how that piece of content is structured. Each one of those pieces of
content is called a **Record**, and is stored in the database. For example, a
single 'event' is a Record of ContentType 'events' and a single 'page' is a
Record of ContentType 'pages'.

When you're creating a page on a website that shows listings of several
Records, you're using an **Array of Records**. For instance, if you create a
page that has 'the five latest events', you'll be using an Array of 5 'event'
Records of ContentType 'events'.

Before we'll dive into the details, we'll give you a quick example of a simple
ContentType, how it's stored, and how you can access it in templates to display
on your site.

An Example: News items
----------------------

In this example, we'll create a very simple ContentType for news items. Each
news item will have a title, an image, and some text. We'll also be using some
of the fixed Fields, like the `slug`, the `ownerid` and the various dates.

To add this ContentType, edit the file `config/bolt/contenttypes.yaml`, and add
the following to the bottom or top of the file:

```yaml
news:
    name: News
    singular_name: News Item
    fields:
        title:
            type: text
            class: large
        slug:
            type: slug
            uses: title
        image:
            type: image
        text:
            type: html
            height: 300px
    record_template: newsitem.twig
```

<p class="tip"><strong>Tip:</strong> This file is in the YAML format, which
means that the indentation is important. Make sure you leave leading spaces
intact.</p>

This creates a new ContentType 'news'. Its name is 'News', and a single record
is named 'News Item'. We've defined fields for 'title', 'slug', 'image' and
'text'. The 'record_template' defines the default template to use, when
displaying a single record in the browser.

<p class="note"><strong>Note:</strong> You should always ensure that the key
that defines each of the ContentTypes and the value of the <code>name</code>
are the same. In the above example, we start with the key <code>news:</code>,
and the name is set to <code>name: News</code>. If these do not match, Bolt
will show an error message.</p>

Save the file and refresh the Dashboard screen in your browser. If you do this,
you'll see your new ContentType in the sidebar, ready for use. Sweet!

<a href="/files/content-example2.png" class="popup"><img src="/files/content-example2.png" width="500"></a>

<p class="note"><strong>Note:</strong> In the following examples we're going to
tell you to make modifications to the default `base-2020` theme. This is
actually a very bad practice, and if you're going to make your own theme, make
a copy of the `base-2020` theme, and do your modifications in the copy.</p>

To add a listing of these news items to the website, edit the twig template
`theme/base-2020/index.twig`. Most likely, it'll contain an include for a
header and some other things. Add the following to the HTML-code, preferably
somewhere below the header section:

```twig
{% setcontent newsitems = "news/latest/4" %}

{% for newsitem in newsitems %}
<article>
    <h2><a href="{{ newsitem.link }}">{{ newsitem.title }}</a></h2>

    {{ newsitem.excerpt }}

    <p class="meta"><a href="{{ newsitem.link }}">Link</a> -
    Posted by {{ newsitem.user.displayname }}
    on {{ newsitem.createdAt|date("M d, ’y")}}</p>

</article>
{% endfor %}
```

Most of the above example will seem pretty straightforward, but all of the
specific template tags are explained in detail in the chapter about [Content in
templates](content-in-templates).

When you refresh the front page of the website, you should see four news items
listed on the page. You can click the title to go to the news item on a separate
page, but it will use the default `record.twig` template. In the ContentType we
defined the template as `newsitem.twig`, but it doesn't exist. Create the file
in the `theme/base-2020/` folder, and add the following HTML-code:

```twig
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8" />
    <title>{{ newsitem.title }}</title>
</head>

<body>

    <article>

        <h1><a href="{{ newsitem.link }}">{{ newsitem.title }}</a></h1>

        {% if content.image!="" %}
            <div class='imageholder'><img src="{{ newsitem.image|thumbnail(480, 480) }}"></div>
        {% endif %}

        {{ newsitem.text }}

        <p class="meta"><a href="{{ newsitem.link }}">Link</a> -
            Posted by {{ newsitem.user.displayname }}
            on {{ newsitem.createdAt|date("M d, ’y")}}</p>

    </article>
</body>
</html>
```

<p class="note"><strong>Tip:</strong> If you're curious about the different
<code>{{ tags }}</code> in this bit of code, read the <a
href="../templating/building-templates">Template documentation</a>.</p>

In the frontend of the website, in your templates, all content is accessible as
an array. If you're accessing one record, it will be an array containing the
fields, taxonomies and metadata. If you're accessing a set of records, it will
be an array of arrays. I.e. `{{ page.title }}` for the title of a page or
`{{ events.3.date }}` for the date of the fourth event in an array.

<p class="note"><strong>Tip:</strong> Although it's possible to access an array
of records by its index number, this is not used very often in practice. It's
much more common to use a loop like <code>{% for event in events %}</code>, to
iterate over all of the <code>events</code>, and then use them seperately as a
single <code>event</code>.</p>

If you're building a template and are unsure of what a certain variable contains
or how the fields are named, use `{{ dump(foo) }}`, where 'foo' is the name of
your record or array.

This is explained in detail in the section [The structure of a Record](#structure-record).

Defining ContentTypes
---------------------

ContentTypes in Bolt are defined in the file `config/bolt/contenttypes.yaml`.
You can edit this file directly, or from within the Bolt interface under
Configuration > ContentTypes. Each distinct group of content can have its own
ContentType, to enable the user to store the content as needed. Fields can be
added later on, and settings can be changed, so nothing is set in stone.

The general structure of each ContentType is:

```yaml
name:
    option: value
    option: value
    option: value
    ..
```

The `name` defines the name of the ContentType, and it should be a 'safe'
version of the `name:` option below. Basically this means that it should be a
lowercase version, without any special characters. Spaces should be replaced
by hyphens. Like this:

```yaml
pages:
    name: Pages
    singular_name: Page
    ..
```

```yaml
cafes:
    name: Cafés
    singular_name: Café
    ..
```

```yaml
blog-posts:
    name: "Blog Posts"
    singular_name: "Blog Post"
    ..
```

The available options are:

| Option | Description |
|--------|-------------|
| `name` | The name of the ContentType, as it should be shown on screen or in the browser. It should be plural, if possible. |
| `slug` <small>(optional)</small> | This determines the slug of the ContentType, and therefore the URLs that are generated for this ContentType. When omitted, the slug will be automatically generated from the `name`. |
| `singular_name` | The name of one Record in the ContentType. This should be singular. For example, if the ContentType's name is 'Pages', this should be 'Page' |
| `singular_slug` <small>(optional)</small> | This determines the slug of a single record in this ContentType, and therefore the URLs that are generated for these records. When omitted, the slug will be automatically generated from the `singular_name`. |
| `fields` | The fields that make up the content in this ContentType. See the [Fields Definition][field-types] section for details. |
| `taxonomy` | An array listing the different taxonomies used by this ContentType. For example `[ categories, tags ]`. See the page on [Taxonomies][ct-taxonomies] for details. |
| `relations` | An array listing the different relations available to this ContentType. See the page on [Relations][ct-relations] for details. |
| `record_template` | The default template to use, when displaying a single Record of this ContentType. The template itself should be located in your `theme/foo/` folder, in Bolt's root folder. This can be overridden on a per-record basis, if one of the fields is defined as type `templateselect`. |
| `listing_template` | The default template to use, when displaying an overview of Records of this ContentType. The template itself should be located in your `theme/foo/` folder, in Bolt's root folder. |
| `listing_records` | The amount of records to show on a single overview page in the frontend. If there are more records, the results will be paginated   |
| `listing_sort` | The field used to sort the results on. You can reverse the order by adding a '-'. For example `title` or `-datepublish`. |
| `sort` <small>(optional)</small> | The default sorting of this ContentType, in the overview in Bolt's backend interface. For example `-datecreated`. Note that if your ContentType has a Taxonomy with `has_sortorder`, that the `sort` will be overruled by the Taxonomy's sorting. |
| `records_per_page` <small>(optional)</small> | The amount of records shown on each page in the Bolt backend. If there are more records, they will be paginated. |
| `show_on_dashboard` <small>(optional)</small> | When set to `false` the ContentType will not appear in the 'Recently edited &hellip;' list on the dashboard page. |
| `show_in_menu` <small>(optional)</small> | When set to `false` the ContentType will show in a submenu instead of as a top level menu. Can also be set to a word or sentence to group ContentTypes under different menus. |
| `default_status` <small>(optional)</small> | Use this to set the default status for new records in this ContentType, i.e. `published`, `held`, `draft` or `timed`. |
| `searchable` <small>(optional)</small> | A boolean value to determine whether this ContentType should show up in search results. |
| `viewless` <small>(optional)</small> | When set to `true`, routes will not be set for the ContentType listing, or the records themselves. Useful for creating [Resource ContentTypes][howto-resource-ct]. |
| `singleton` <small>(optional)</small> | When set to `true`, the Bolt UI will adapt to give a fluent experience for ContentTypes with one post. Like a complex homepage or general settings. [Singletons][howto-singletons]. |
| `title_format` <small>(optional)</small> | Is used to determine the format of the title in the backend. For example if you have two fields for `firstname` and `lastname` you might put `[ firstname, lastname ]` here. |
| `icon_many` <small>(optional)</small> | A [Font Awesome][fa] icon to be used in the sidebar for this ContentType. For example: `fa:cubes`. See the full list of available icons in the [FA gallery][gallery]. |
| `icon_one` <small>(optional)</small> | A [Font Awesome][fa] icon to be used in the sidebar for a single record of this ContentType. For example: `fa:cube`. |
| `locales` <small>(optional)</small> | The locales the content can be entered in.  i.e. `['en', 'nl', 'pt_BR', 'es']`. |

<p class="note"><strong>Note:</strong> A ContentType slug or name may not start
with a double underscore. A field key may not contain a double underscore.
Those names are reserved for internal use.</p>

### Automatic titles versus `title_format`

As you might have noticed in the screenshots above or in the Bolt backend
itself, Records in listing overviews and in the "Recently edited" panel are
always shown with a linked title. Even if the ContentType does not actually
have a field named `title`, Bolt will make a reasonable assumption as to what
the "Title" should be. By using `title_format` you can override this, if Bolt
doesn't provide correct titles for a ContentType.

### Singleton ContentTypes

You can set the option to create a **Singleton** ContentType, which basically
is a ContentType that only contains exactly one record. For example, you can
create a Singleton where you can store the site's social media links and basic
contact info, that you can then use globally in your templates. Another common
usecase is for a logical place to put the "Homepage" content.

More details and examples can be found in
[Making a Singleton ContentType][howto-singletons].

### Grouping ContentTypes in the sidebar

If you have a larger number of ContentTypes, the siebar in Bolt's backend might
look too cluttered. To make your the sidebar tidier, you can group several
ContentTypes together in the sidebar menu, using the `show_in_menu` option.

For example:

```yaml
entries:
    name: Entries
    …
    show_in_menu: false

showcases:
    name: Showcases
    …
    show_in_menu: false
```

The result of this example, is shown in the following screenshot:

<a href="/files/contenttype_show_in_menu.png" class="popup"><img src="/files/contenttype_show_in_menu.png" width="642"></a>

<p class="note">Tip: If you provide a name, like <code>show_in_menu:
Foo</code>, then that name will be used, instead of the generic "Other content"
label.</p>

The structure of a Record
-------------------------

Every record is an object, that contains the information of that record, as
well as some meta-information and its taxonomy.

<a href="/files/content-example3.png" class="popup"><img src="/files/content-example3.png" width="500"></a>

At the topmost level, it contains the following items:

| Item | Description |
|------|-------------|
| `id` | The unique identifying number of this record in the database. |
| `contentType` | A string containing the key of the content type. |
| `author` | An array, containing information about the user, like the displayname, email-address, etcetera. |
| `status` | The current status of this record. Can be either `published`, `depublished`, `held`, `timed` or `draft`. |
| `createdAt` | The timestamp of when the record was first created. |
| `modifiedAt` | The timestamp of when the record was last edited of modified. |
| `publishedAt` | The timestamp when the record was published, or when it _will_ be published. |
| `depublishedAt` | The timestamp when the record was depublished, or when it _will_ be depublished. |
| `fields` | An array with metadata of the Fields on this record.  To get field values, see below. |
| `contentTypeDefinition` | An array with metadata of the ContentType that this record belongs to. |
| `taxonomies` | An aray with metadata of the Taxonomies attached to this record. |

The object also contains a generic getter for a record field values.  Fetch the value
using {{ record.field_name }}.  If the `field_name` is not found, it throws an exception 
if it's invoked from code, and return null if invoked from within a template. 
(In templates we need to be more lenient, in order to do things like `{% if record.foo %}..{% endif %}`.
Note: We can not rely on `{% if record.foo is defined %}`, because it always returns `true` for object properties.)

There is also a variety of built-in twig helper [filters][twig-filters] and [functions][twig-functions] to get various 
pieces of record data.  

If you're building a template and are unsure of what a certain variable
contains or how the fields are named, use `{{ dump(foo) }}`, where 'foo' is the
name of your record or array. In most templates, `{{ dump(record) }}` will work
as a generic fallback for whatever the name of your record is.

Advanced: YAML Repeated Nodes
-----------------------------

In order to make your ContentType definitions more compact, and consistent, you
can use YAML repeated nodes. Bolt has a special YAML key called `__nodes` that
it will use only for repeated nodes, and not create a ContentType or table for.
These nodes then become selectable in a ContentType definition.

Each node is defined by an `key_name: &node_name` with the fields then included,
and indented below.

```yaml
## Defaults nodes. Does not create a ContentType
__nodes:
    record_defaults: &record_defaults
        title:
            type: text
            class: large
            group: main
        slug:
            type: slug
            uses: title
    content_defaults: &content_defaults
        image:
            type: image
            attrib: title
        body:
            type: html
            height: 300px
            group: content
    template_defaults: &template_defaults
        template:
            type: templateselect
            filter: '*.twig'
            group: meta
```

In the above example, we have the `record_defaults` node that defines `title`
and `slug` fields, a `content_defaults` node that defines the `image` and `body`
fields, and a `template_defaults` node that defines our template selector.

Using the above nodes we could simplify a default `Pages` ContentType to look
like this:

```yaml
pages:
    name: Pages
    singular_name: Page
    fields:
        <<: *record_defaults
        teaser:
            type: html
            height: 150px
        <<: *content_defaults
        <<: *template_defaults
    taxonomy: [ chapters ]
    recordsperpage: 100
```

Keeping fields together in a group
----------------------------------
If you have defined groups in a YAML repeated node, you can add a field from a
specific ContentType to one of these groups.

In the example below, the **slider** field will appear in the tab **media**.

Example:

```yaml
__nodes:
    record_defaults: &record_defaults
        title:
            type: text
            class: large
            group: main
        slug:
            type: slug
            uses: title
    content_defaults: &content_defaults
        image:
            type: image
            group: media
(...)

pages:
    name: Pages
    singular_name: Page
    fields:
        <<: *record_defaults
        slider:
            type: imagelist
            group: media
(...)
```

[fa]: https://fontawesome.com
[gallery]: https://fontawesome.com/v4.7.0/icons/
[ct-relations]: ../contenttypes/relationships
[ct-taxonomies]: ../contenttypes/taxonomies
[fetching-content]: ../templating/content-fetching
[field-types]: ../fields
[howto-resource-ct]: ../howto/resource-contenttype
[howto-singletons]: ../howto/singleton-contenttype
[routing]: ../configuration/routing
[twig-filters]: ../twig-components/filters
[twig-functions]: ../twig-components/functions
