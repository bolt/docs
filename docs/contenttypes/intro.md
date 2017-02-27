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

<p class="note"><strong>Note:</strong> If you've just installed Bolt, you might
not have the <code>contenttypes.yml</code>-file yet. You will however have a
<code>contenttypes.yml.dist</code>-file in that same folder. The first time
Bolt is run, the <code>.yml.dist</code>-files will be automatically copied to
<code>.yml</code>-files. If you wish to do some configuration <em>before</em>
you first run Bolt, just copy <code>contenttypes.yml.dist</code> to
<code>contenttypes.yml</code> yourself.</p>

To add this ContentType, edit the file `app/config/contenttypes.yml`, and add
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

<p class="note"><strong>Note:</strong> This file is in the YAML format, which
means that the indentation is important. Make sure you leave leading spaces
intact.</p>

This creates a new ContentType 'news'. Its name is 'News', and a single record
is named 'News Item'. We've defined fields for 'title', 'slug', 'image' and
'text'. The 'record_template' defines the default template to use, when displaying a
single record in the browser.

After you've saved the file and refresh the Dashboard screen in your browser,
you'll be greeted by a warning that the Database needs to be updated. If we do
this, the new ContentType will be added to the database, with the fields that
we defined in our `contenttypes.yml` file.

<p class="tip"><strong>Tip:</strong> The Bolt backend is located at
<code>/bolt</code>, relative from the 'home' location of your website.</p>


<a href="/files/content-example1.png" class="popup"><img src="/files/content-example1.png" width="500"></a>

When you go to Configuration > Check Database, the database will be updated,
and you'll be given the option to add some "Lorem Ipsum" Records to the newly
created ContentType. If you do this, and go back to the dashboard, you'll see
your new ContentType with some example news items. Sweet!

<a href="/files/content-example2.png" class="popup"><img src="/files/content-example2.png" width="500"></a>

<p class="note"><strong>Note:</strong>In the following examples we're going to
tell you to make modifications to the default `base-2016` theme. This is
actually a very bad practice, and if you're going to make your own theme, make
a copy of the `base-2016` theme, and do your modifications in the copy.</p>

To add a listing of these news items to the website, edit the twig template
`theme/base-2016/index.twig`. Most likely, it'll contain an include for a
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
    on {{ newsitem.datecreated|date("M d, ’y")}}</p>

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
in the `theme/base-2016/` folder, and add the following HTML-code:

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
            on {{ newsitem.datecreated|date("M d, ’y")}}</p>

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
be an array of arrays. I.e. `{{ page.title }}` for the title of a page or `{{ events.4.date }}`
for the date of the fourth event in an array.

If you're building a template and are unsure of what a certain variable contains
or how the fields are named, use `{{ dump(foo) }}`, where 'foo' is the name of
your record or array.

This is explained in detail in the section [The structure of a Record](#structure-record).

Defining ContentTypes
---------------------

The ContentTypes in Bolt are defined in the file `app/config/contenttypes.yml`.
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
lowercase version, without any special characters. Like this:

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

The available options are:

| Option | Description |
|--------|-------------|
| `name` | The name of the ContentType, as it should be shown on screen or in the browser. It should be plural, if possible. |
| `singular_name` | The name of one Record in the ContentType. This should be singular. For example, if the ContentType's name is 'Pages', this should be 'Page' |
| `slug` (optional) | This determines the slug of the ContentType, and therefore the URLs that are generated for this ContentType. When omitted, the slug will be automatically generated. |
| `singular_slug` (optional) | This determines the slug of a single record in this ContentType, and therefore the URLs that are generated for these records. When omitted, the slug will be automatically generated. |
| `description` (optional) | A short description of the ContentType. This will be shown on the overview screen in the right aside column. |
| `tablename` (optional) | The (base) name of the table, as used in the database. If omitted, the `slug` will be used for this. |
| `fields` | The fields that make up the content in this ContentType. See the [Fields Definition][field-types] section for details. |
| `taxonomy` | An array listing the different taxonomies used by this ContentType. For example `[ categories, tags ]`. See the page on [Taxonomies][ct-taxonomies] for details. |
| `relations` | An array listing the different relations available to this ContentType. See the page on [Relations][ct-telations] for details. |
| `record_template` | The default template to use, when displaying a single Record of this ContentType. The template itself should be located in your `theme/foo/` folder, in Bolt's root folder. This can be overridden on a per-record basis, if one of the fields is defined as type `templateselect`. |
| `listing_template` | The default template to use, when displaying an overview of Records of this ContentType. The template itself should be located in your `theme/foo/` folder, in Bolt's root folder. |
| `listing_records` | The amount of records to show on a single overview page in the frontend. If there are more records, the results will be paginated   |
| `listing_sort` | The field used to sort the results on. You can reverse the order by adding a '-'. For example `title` or `-datepublish`. |
| `sort` (optional) | The default sorting of this ContentType, in the overview in Bolt's backend interface. For example `-datecreated`. Note that if your ContentType has a Taxonomy with `has_sortorder`, that the `sort` will be overruled by the Taxonomy's sorting. |
| `recordsperpage` (optional) | The amount of records shown on each page in the Bolt backend. If there are more records, they will be paginated. |
| `show_on_dashboard` (optional) | When set to `false` the ContentType will not appear in the 'Recently edited &hellip;' list on the dashboard page. |
| `show_in_menu` (optional) | When set to `false` the ContentType will show in a submenu instead of as a top level menu. Can also be set to a word or sentence to group ContentTypes under different menus. |
| `default_status` (optional) | Use this to set the default status for new records in this ContentType, i.e. `published`, `held`, `draft` or `timed`. |
| `searchable` (optional) | A boolean value to determine whether this ContentType should show up in search results. |
| `viewless` (optional) | When set to `true`, routes will not be set for the ContentType listing, or the records themselves. Useful for creating [Resource ContentTypes][howto-resource-ct]. |
| `title_format` (optional) | Is used to determine the format of the title in the backend. For example if you have two fields for `firstname` and `lastname` you might put `[ firstname, lastname ]` here. |
| `icon_many` (optional) | A [Font Awesome][fa] icon to be used in the sidebar for this ContentType. For example: `fa:cubes` |
| `icon_one` (optional) | A [Font Awesome][fa] icon to be used in the sidebar for a single record of this ContentType. For example: `fa:cube`. |
| `allow_numeric_slugs` (optional, advanced) | By default, Bolt prefixes slugs purely numeric with the ContentType slug (e.g. `entry-123` for an entry with title `123`), in order to distinguish slugs from IDs. If this option is set to `true`, numeric slugs remain unprefixed. Care has to be taken not to use [routes][template-routes] of the form `/{contenttype}/{id}` for links in templates or for [fetching content][fetching-content]!

The structure of a Record
-------------------------

Every record is an object, that contains the information of that record, as
well as some meta-information and its taxonomy.

<a href="/files/content-example3.png" class="popup"><img src="/files/content-example3.png" width="500"></a>

At the topmost level, it contains the following items:

| Item | Description |
|------|-------------|
| `id` | The unique identifying  number of this record in the database, for this ContentType. Note: there are duplicate ids for records in different ContentTypes. For example, there can be a record with id `1` for Pages, and also a record with id `1` for News. |
| `values` | `An array with the values of this record. |
| `taxonomy` | `An array (or `NULL`) for the taxonomy of this record. |
| `contenttype` | `An array representation of the ContentType that this record belongs to, complete with the fields that the record should have.  |
| `user` | `an array, containing information about the user, like the displayname, email-address, etcetera. |

The values contain the fields that are defined in the ContentType, together
with a few other fixed fields. The fixed fields are:

| Field name | Description |
|------------|-------------|
| `id` | The record's unique identifying number. |
| `slug` | The record's slug. Either generated automatically, or specified by the content editor. |
| `datecreated` | The timestamp of when the record was first created. |
| `datechanged` | The timestamp of when the record was last edited of modified. |
| `datepublish` | The timestamp when the record was published, or when it _will_ be published. |
| `datedepublish` | The timestamp when the record was depublished, or when it _will_ be depublished. |
| `ownerid` | The id of the user that last edited (or created) this record. |
| `status` | The current status of this record. Can be either `published`, `depublished`, `held`, `timed` or `draft`. |

If you're building a template and are unsure of what a certain variable
contains or how the fields are named, use `{{ dump(foo) }}`, where 'foo' is the
name of your record or array. In most templates, `{{ dump(record) }}` will work
as a generic fallback for whatever the name of your record is.

For detailed information on how to access the various fields and values in your
templates, see the [Template tags][templatetags] page.

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

[fa]: http://fortawesome.github.io/Font-Awesome/
[ct-relations]: ../contenttypes/relationships
[ct-taxonomies]: ../contenttypes/taxonomies
[fetching-content]: ../templating/content-fetching
[field-types]: ../fields
[howto-resource-ct]: ../howto/resource-contenttype
[template-routes]: ../templating/templates-routes
[templatetags]: ../templating/templatetags
