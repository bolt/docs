Contenttypes and records
========================

All content in Bolt is stored in the database in a logical and flexible
fashion. In general, when you're building a website, you have an idea what kind
of content you're going to be managing with the website. Most websites have
some sort of 'pages' for generic stuff like 'about us' or 'Company History'.

Most websites will also have some form of news-like items, that are shown based
on the date that they were published. Some other sites might have 'book
reviews' or 'event dates' or even completely different content. All of these
different types of content are called **Contenttypes** in Bolt, and you can add
as many different contenttypes as you need.

Each contenttype is defined by a couple of fixed, required **Fields** that are
used internally, but otherwise you're free to define how the content in a
Contenttype is structured. For instance, in an 'event', you'll need a date on
which the event takes place. For a 'book review', you'll need an author and
publisher of the book. Other commonly used fields are `title`, `introduction`
or maybe an `image`. Some of the Fields are fixed, which means that every
contenttype has them. For example, every contenttype has a Field for `id`,
`slug`, `datecreated` and `ownerid`. Below we'll describe how to define
Contenttypes and Fields.

<p class="tip"><strong>Tip:</strong> The <code>slug</code> is a special value
that's used in the generation of the URL at which a page will be available on
the website. It usually contains a variant of the title, that's been made
suitable for indexing by search engines. Ideally, it is both semantic and
human-readable. For example, if you have a page named "About our company", a
good slug would be <code>about-our-company</code>.</p>

All content on your website is part of one specific Contenttype, which
automatically defines which fields that piece of content has, which in turn
specifies how that piece of content is structured. Each one of those pieces of
content is called a **Record**, and is stored in the database. For example, a
single 'event' is a Record of Contenttype 'events' and a single 'page' is a
Record of Contenttype 'pages'.

When you're creating a page on a website that shows listings of several
Records, you're using an **Array of Records**. For instance, if you create a
page that has 'the five latest events', you'll be using an Array of 5 'event'
Records of Contenttype 'events'.

Before we'll dive into the details, we'll give you a quick example of a simple
Contenttype, how it's stored, and how you can access it in templates to display
on your site.

An Example: News items
----------------------

In this example, we'll create a very simple contenttype for news items. Each
news item will have a title, an image, and some text. We'll also be using some
of the fixed Fields, like the `slug`, the `ownerid` and the various dates.

<p class="note"><strong>Note:</strong> If you've just installed Bolt, you might
not have the <code>contenttypes.yml</code>-file yet. You will however have a
<code>contenttypes.yml.dist</code>-file in that same folder. The first time
Bolt is run, the <code>.yml.dist</code>-files will be automatically copied to
<code>.yml</code>-files. If you wish to do some configuration <em>before</em>
you first run Bolt, just copy <code>contenttypes.yml.dist</code> to
<code>contenttypes.yml</code> yourself.</p>

To add this contenttype, edit the file `app/config/contenttypes.yml`, and add
the following to the bottom or top of the file:

```apache
news:
    name: News
    singular_name: Newsitem
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

This creates a new contenttype 'news'. Its name is 'News', and a single record
is named 'Newsitem'. We've defined fields for 'title', 'slug', 'image' and
'text'. The 'record_template' defines the default template to use, when displaying a
single record in the browser.

After you've saved the file and Refresh the Dashboard screen in your browser,
you'll be greeted by a warning that the Database needs to be updated. If we do
this, the new contenttype will be added to the database, with the fields that
we defined in our `contenttypes.yml` file.

<p class="tip"><strong>Tip:</strong> The Bolt backend is located at
<code>/bolt</code>, relative from the 'home' location of your website. </p>


<a href="/files/content-example1.png" class="popup"><img src="/files/content-example1.png" width="500"></a>

When you go to Configuration > Check Database, the database will be updated,
and you'll be given the option to add some "Lorem Ipsum" Records to the newly
created Contenttype. If you do this, and go back to the dashboard, you'll see
your new Contenttype with some example news items. Sweet!

<a href="/files/content-example2.png" class="popup"><img src="/files/content-example2.png" width="500"></a>

<p class="note"><strong>Note:</strong>In the following examples we're going to
tell you to make modifications to the default `base-2014` theme. This is
actually a very bad practice, and if you're going to make your own theme, make
a copy of the `base-2014` theme, and do your modifications in the copy.</p>

To add a listing of these news items to the website, edit the twig template
`theme/base-2014/index.twig`. Most likely, it'll contain an include for a
header and some other things. Add the following to the HTML-code, preferably
somewhere below the header section:

```
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
page, but you'll get an error. In the contenttype we defined the template as
`newsitem.twig`, but it doesn't exist. Create the file in the `theme/base-2014/`
folder, and add the following HTML-code:

```
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
href="/building-templates">Template documentation</a>.</p>

In the frontend of the website, in your templates, all content is accessible as
an array. If you're accessing one record, it will be an array containing the
fields, taxonomies and metadata. If you're accessing a set of records, it will
be an array of arrays. I.e. `{{ page.title }}` for the title of a page or `{{ events.4.date }}`
for the date of the fourth event in an array.

If you're building a template and are unsure of what a certain variable contains
or how the fields are named, use `{{ dump(foo) }}`, where 'foo' is the name of
your record or array.

This is explained in detail in the section [The structure of a Record](#structure-record).

Defining contenttypes
---------------------

The contenttypes in Bolt are defined in the file `app/config/contenttypes.yml`.
You can edit this file directly, or from within the Bolt interface under
Configuration > Contenttypes. Each distinct group of content can have its own
Contenttype, to enable the user to store the content as needed. Fields can be
added later on, and settings can be changed, so nothing is set in stone.

The general structure of each contenttype is:

```apache
name:
    option: value
    option: value
    option: value
    ..
```

The `name` defines the name of the contenttype, and it should be a 'safe'
version of the `name:` option below. Basically this means that it should be a
lowercase version, without any special characters. Like this:

```apache
pages:
    name: Pages
    singular_name: Page
    ..
```

```apache
cafes:
    name: Cafés
    singular_name: Café
    ..
```

The available options are:

  - `name`: The name of the Contenttype, as it should be shown on screen or in
    the browser. It should be plural, if possible.
  - `singular_name`: The name of one Record in the Contenttype. This should be
    singular. For example, if the Contenttype's name is 'Pages', this should be
    'Page'
  - `slug` (optional): This determines the slug of the contenttype, and
    therefore the URLs that are generated for this contenttype. When omitted,
    the slug will be automatically generated.
  - `singular_slug` (optional): This determines the slug of the a single record
    in this contenttype, and therefore the URLs that are generated for these
    records. When omitted, the slug will be automatically generated.
  - `description` (optional): A short description of the contenttype. This will
    be shown on the overview screen in the right aside column.
  - `fields`: The fields that make up the content in this contenttype. See the
    [Fields Definition](#field-definitions) section below for details.
  - `taxonomy`: An array listing the different taxonomies used by this
    contenttype. For example `[ categories, tags ]`. See the page on
    [Taxonomies](/taxonomies) for details.
  - `relations`: An array listing the different relations available to this
    contenttype. See the page on [Relations](/relationships) for details.
  - `record_template`: The default template to use, when displaying a single
    Record of this Contenttype. The template itself should be located in your
    `theme/foo/` folder, in Bolt's root folder. This can be overridden on a
    per-record basis, if one of the fields is defined as type `templateselect`.
  - `listing_template`: The default template to use, when displaying an
    overview of Records of this Contenttype. The template itself should be
    located in your `theme/foo/` folder, in Bolt's root folder.
  - `listing_records`: The amount of records to show on a single overview page
    in the frontend. If there are more records, the results will be paginated.
  - `sort` (optional): The default sorting of this contenttype, in the overview
    in Bolt's backend interface. For example `-datecreated`.
  - `recordsperpage` (optional): The amount of records shown on each page in
    the Bolt backend. If there are more records, they will be paginated.
  - `show_on_dashboard` (optional): When set to `false` the contenttype will
    not appear in the 'Recently edited &hellip;' list on the dashboard page.
  - `default_status` (optional): Use this to set the default status for new
    records in this contenttype, i.e. `published`, `held`, `draft` or `timed`.
  - `searchable` (optional): A boolean value to determine whether this
    contenttype should show up in search results.
  - `viewless` (optional): When set to `true`, routes will not be set for the
    Contenttype listing, or the records themselves. Useful for creating
    [resource contenttypes](/howto/resource-contenttype).
  - `title_format` (optional): Is used to determine the format of the title in
    the backend. For example if you have two fields for `firstname` and 
    `lastname` you might put `[ firstname, lastname ]` here.
  - `icon_many` (optional): A [Font Awesome](http://fortawesome.github.io/Font-
    Awesome/) icon to be used in the sidebar for this contenttype. For example:
    `fa:cubes`
  - `icon_one` (optional): A [Font Awesome](http://fortawesome.github.io/Font-
    Awesome/) icon to be used in the sidebar for a single record of this
    contenttype. For example: `fa:cube`.

Field definitions
-----------------

All fields have a general structure, like this:

```apache
        name:
            type: name-of-fieldtype
            option: value
            option: value
            ..
```

The following fieldtypes are available:

  - `text`: Simple text-input, for single-line fields
  - `slug`: Even though the slug is a fixed field, you can include it in the
    fields list, so that it can be customized. Add a `uses: title` value to
    specify the field it should use to automatically generate a suited slug from
    the title (or another field). It's also possible to specify multiple fields
    to use, these values will be concatenated and used for the slug. Syntax for
    multiple fields:
```apache
    slug:
        type: slug
        uses: [field1,field2]
```
  - `templateselect`: Allows setting a template to use when rendering a
    specific record. Will allow the record creator to specify any template in
    the root folder of the current theme with a file name that does not begin
    with an underscore. If a specific template is not chosen in the record
    editor, the record will be rendered with the default template for that
    contenttype.
  - `image`: Simple image upload/select field. Currently takes an optional attribute
    (attrib:) parameter `title` — this will allow you to specify text that you can call
    in your templates to retreive either/or captions or alt text for your image layout.
    Valid options for the attributes are `title`, `alt` and `[ title, alt]`. You can
    retrieve these attributes in your templates using `{{ record.values.image.title }}`.
```apache
    image:
        type: image
        attrib: title
```
  - `imagelist`: A field to create a list of images. Useful for slideshows and
    galleries.
  - `file`: Simple file upload/select field.
    If you use the file or filelist type make sure that you also set `extensions` and that
    the global setting for `accept_file_types` in the main `config.yml` includes
    the correct extensions
  - `filelist`: A more complex upload/select field.
  - `html`: WYSIWYG HTML field.
     You can override and set CKEditor options, see
     [CKEditor config documentation](http://docs.ckeditor.com/#!/api/CKEDITOR.config) for options).
```apache
    htmlfield:
        type: html
        options:
            ckeditor:
                height: 400
                autoGrow_maxHeight: 400
                autoGrow_onStartup: false
                uiColor: '#BADA55'
                # autoGrow_minHeight: 300
                # contentsCss: ["/css/custom.css"]
```

  - `markdown`: [Markdown](http://daringfireball.net/projects/markdown/) format input field.
  - `textarea`: Simple multi-line textarea input, for longer texts without HTML
    markup.
  - `select`: A drop-down list to make a pre-defined selection from. There are
    two ways of specifying the list of available options. Either a YAML array
    or a contenttype/field lookup.

    Array values:
```apache
    selectfield:
        type: select
        values: [ none, foo, bar ]
```

    Lookup existing Contenttype record fields:
```apache
    selectfield:
        type: select
        values: mycontenttype/fieldname

    # i.e. to display both the id and title of 'pages':
    selectapage:
        type:select
        values: pages/id,title
```

    **Note:** Much more information and details about `select` fields can be found on this page: [Getting the most out of the ‘Select’ fieldtype](howto/select-field-type).

  - `checkbox`: A field to store "True or false" type values. Internally stored
    as either `1` for `true` if the checkbox was checked, and `0` for `false`
    if it wasn't checked.
  - `video`: A set of fields for embedding videos from websites like Youtube
    and Vimeo.
  - `geolocation`: A set of fields for easy selection of a geolocation
    (latitude/longitude) with an address.
  - `date`: Datepicker widget, to set/select a date.
  - `datetime`: Similar to the `date` field, but adds an additional field to
    specify a time. Both date and datetime fields accept some options for the
    datepicker plugin. However, currently the `dateFormat` is fixed to the
    format that Bolt uses internally
    (see [jQueryUI datepicker documentation](http://jqueryui.com/datepicker/)).
```apache
    datefield:
        type: datetime
        default: "2001-01-01"
        options:
            datepicker:
                changeMonth: true
                changeYear: true
                yearRange: "-100:-0"
```
  - `integer`: A field to store integers. The value must be between
    <span style="white-space: nowrap">-2147483648</span> and +2147483647.
  - `float`: A field to store (floating point) numbers. Internally stored so
    that they can be sorted numerically. Note: the maximum precision is 9
    digits before the decimal mark, and 9 digits after.

For `integer` and `float` fields you can set `min: ...` and `max: ...` to limit
the range of allowed values. For integer (64 bit) the default limits are
-2147483647 to 2147483647. The default `step: ...` is 0.00000001 for float
and 1 for integer fields.

Most fields have a few extra optional values, to further customize them.

  - `label: Foo`: If omitted, the name of the field will be used as a label in
    the edit-screen. Replace 'Foo' with the desired label of the field.
  - `info: ..`: Use for displaying extra information about the field.
  - `prefix: ..`: Text to add before the field. See below for an example.
  - `postfix: ..`: Text to add after the field. See below for an example.
  - `default: ..`: The default value for a field, if applicable. See below for
    an example.
  - `class: narrow`: Will show the field narrow, for fields that should take
    only a couple of characters. For `text` fields only.
  - `class: large`: Will show the field in a larger font, for `text` fields.
  - `class: wide`: Will show the field extra wide, for filling out the column.
    For `text` fields, `date` and `datetime` and `select` fields only.
  - `variant: inline`: Will show the field to the right of the label, taking up
    less space vertically. For `text`, `date` and `datetime` fields only.
  - `height: 150px`: For `html` and `textarea` fields, this will determine the
    height in the edit-screen. For `html` fields (CKEditor) you might need to
    set height via options (see example at `html` field).

Advanced options
  - `required: true`: Use this to make a field required. See below for
    examples.
  - `index: true`: Add a database index for this field, only add if you know
    what this means. Does not work on `html`, `textarea`, `video`, `markdown`,
    `geolocation` and `imagelist`. [added in 1.1]
  - `readonly: true`: Use this to make a field readonly. Only works on `float`,
    `integer` and `text` fields, only add if you know what this means. See
    below for examples.
  - `pattern: ..`: Use this to validate a field against a certain pattern. See
    below for examples.
  - `allowtwig: true`: Explicitly allow twig to be used in this field. This is
    needed if you want to allow twig snippets in your content. Note: This
    feature will allow everybody with access to the contenttype to add twig to
    the content. Be careful when using this.


### Upload locations

Fields of the types `image`, `file`, `imagelist` and `filelist` upload new
files to the `files/` folder by default. If you would like to have more control
over the structure of the uploaded files, use the `upload` setting.

Example: Upload to a folder called 'photouploads':

```
  imagefield:
    - type: image
    - label: "Upload a photo"
    - upload: photouploads
```

Note: The uploads will still go into the base `files/` folder. For more
advanced options, see the relevant
[Github Issue thread](https://github.com/bolt/bolt/pull/1435).

### File and Filelist options

A field with the type `file` or `filelist` has some default values for the file
extensions that may be uploaded. If you need more you have to explicitly set
those in the configuration

  - `extensions: [ txt, md ]`: A list of allowed file extensions for uploading


### Prefix and Postfix

Sometimes it can be beneficial to add some extra text, labels or other markup
to how a field is displayed in the Bolt backend, when editing a record. You can
use the optional `prefix` and `postfix` values to add some markup before or
after a field. For example:

```apache
        subtitle:
            type: text
            class: large
            prefix: "<p>Add a subtitle, if you want.</p>"
            postfix: "<hr>"
```

As you can see, using `postfix: "<hr>"` gives a simple and effective way of
adding a divider in the edit screen.

### Info

In the case where you want to provide a large volume of informational text
about the use and purpose of a field, the value of the `info` parameter can be
used.

The info paramter will place a button beside the field label that, when hovered
over, will display a popup with the info text.

For fields that have an info button by default (e.g. `image` field), the info
description will override that field type default.

### Default values

When you want to give a record a default value, use `default:`. For most fields
this will set the initial value of the field, when you're creating a new record
of this contenttype. For `date` and `datetime` fields, the value is passed
through [strtotime](http://php.net/manual/en/function.strtotime.php), meaning
that you can use a fixed date as default, like "1900-01-01 12:00:00", but also
relative dates like "first day of this month", "next Monday" or "yesterday".

### Required and patterns

You can use the `required` option to make a field required. Combine it with the
`pattern` option to make sure that a field contains an email-address, or that a
title is no longer than a certain amount of characters. Note that the
requirements are only enforced in the browser, so don't "trust" any data that's
been entered by an editor. When a field does not validate, a default message is
shown that, *"the x field is required or needs to match a pattern"*. You can
set a custom error message for a field with the error option. for example
`error: "The title field is required and must be no longer than 40 characters"`

Currently, you can use the `required` option for fields of type `text`,
`textarea`, `html`, `date`, `datetime`, `float` and `integer`.

For example, to make a title required, you can do this:

```apache
        title:
            type: text
            prefix: "<p>A title is required.</p>"
            required: true
            class: large
```

If combined with a `pattern`, you can add frontend validation to the field. By
doing this, you can require that the values of a field are within certain
parameters. You can use either one of the predetermined patterns like `email`
or `url`, or any regular expression. Currently, the `pattern` option is only
available for `text` fields. Examples of patterns that can be used, can be
found on the website [html5pattern.com](http://html5pattern.com/). Some common
use-cases are:

- `email`: the input must be a valid email address. The email address must be
  _possible_ syntactically, but it's not required that it actually exists.
- `url`: the input must be a valid url, starting with `http://` or `https://`.
  The URL address must be _possible_ syntactically, but it's not required that
  it actually exists.
- `^.{1,50}$`: The input can contain any character, and should be between 1 and
  50 characters in length.
- `^[0-9_ -]*$`: The input can contain numbers, dashes, underscores and spaces.
- `^[a-zA-Z0-9 ]{10,20}$`: The input can contain uppercase and lowercase
  letters and numbers, and should be between 10 and 20 characters in length.
- `^[1-9][0-9]{3}[\s]?[A-Za-z]{2}$`: The input should be a Dutch postal code:
  four numbers with no leading '0', an optional space, and two letters. `1234
  ab` or `2518HL` are valid inputs.

For example, use this to make sure a title is no longer than 80 characters:

```apache
        title:
            type: text
            prefix: "<p>A title is required. The maximum length is 80 characters</p>"
            required: true
            pattern: "^.{1,80}$"
            class: large
```

The `^` and `$` in some of the examples note the beginning and end of the value
respectively. If we would omit these, the results would be off. For example,
`.{1,10}` would match any value that has "between 1 and 10 characters" in it,
regardless of what comes before or after it. Probably not what you're looking
for.

<p class="note"><strong>Note:</strong> You should not try to use a pattern to
match an email address. Always use <code>email</code> to validate an email
address.</p>

You can also define fields that are not required, but that _do_ have a pattern.
Doing this, the field can be left blank, but if it _is_ filled, it must match
the pattern. For example, you could make an optional email-address like this:

```apache
        person:
            type: text
            prefix: "<p>An optional email address.</p>"
            required: false
            pattern: email
```

<p class="note"><strong>Note:</strong> If you have a required field, you should
always include a postfix. Otherwise the editor might not know what's expected
of them. </p>

### Readonly fields

You can use the `readonly` option to lock the content in a field. For example
if you have generated some entries with an import that users should not change.
You can combine it with the `default` option to make sure that a field contains
something. The readonly status is only enforced in the browser, so don't
"trust" any data that's been entered by an editor.

```apache
        serialnumber:
            type: text
            default: "SN-123456789"
            readonly: true
```


Grouping fields in tabs
-----------------------

If you have a number of fields in your contenttype, it might be convenient to
add grouping to the fields, by using tabs. It will look like this:

<a href="/files/contenttype-tabs.png" class="popup"><img src="/files/contenttype-tabs.png"></a>

To do this, simply add `group` to the fields that you would like to place under
a certain tab. You don't need to specify _all_ of the fields with a grouping,
just the ones that are the first on a tab. Any subsequent fields without a
specified `group` will fall under the previously set grouping.

For example:

```apache
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
        body:
            type: html
        image:
            type: image
            group: media
        file:
            type: file
        ..
```

The structure of a Record
-------------------------

Every record is an object, that contains the information of that record, as
well as some meta-information and its taxonomy.

<a href="/files/content-example3.png" class="popup"><img src="/files/content-example3.png" width="500"></a>

At the topmost level, it contains the following items:

  - `id`: The unique identifying  number of this record in the database, for
    this Contenttype. Note: there are duplicate ids for records in different
    contenttypes. For example, there can be a record with id `1` for Pages, and
    also a record with id `1` for News.
  - `values`: An array with the values of this record.
  - `taxonomy`: An array (or `NULL`) for the taxonomy of this record.
  - `contenttype`: An array representation of the contenttype that this record
    belongs to, complete with the fields that the record should have.
  - `user`: an array, containing information about the user, like the
    displayname, email-address, etcetera.

The values contain the fields that are defined in the contenttype, together
with a few other fixed fields. The fixed fields are:

  - `id`: The record's unique identifying number.
  - `slug`: The record's slug. Either generated automatically, or specified by
    the content editor.
  - `datecreated`: The timestamp of when the record was first created.
  - `datechanged`: The timestamp of when the record was last edited of modified.
  - `datepublish`: The timestamp when the record was published, or when it _will_ be published.
  - `datedepublish`: The timestamp when the record was depublished, or when it _will_ be depublished.
  - `ownerid`: The id of the user that last edited (or created) this record.
  - `status`: The current status of this record. Can be either `published`,
    `depublished`, `held`, `timed` or `draft`.

If you're building a template and are unsure of what a certain variable
contains or how the fields are named, use `{{ dump(foo) }}`, where 'foo' is the
name of your record or array. In most templates, `{{ dump(record) }}` will work
as a generic fallback for whatever the name of your record is.

For detailed information on how to access the various fields and values in your
templates, see the [Template tags](/templatetags) page.

Advanced: YAML Repeated Nodes
-----------------------------

<p class="meta">
    <strong>Bolt 2.2+</strong><br>
    The following functionality is only available in Bolt 2.2 and later.
</p>

In order to make your Contenttype definitions more compact, and consistent, you
can use YAML repeated nodes. Bolt has a special YAML key called `__nodes` that
it will use only for repeated nodes, and not create a Contenttype or table for.
These nodes then become selectable in a Contenttype definition.

Each node is defined by an `key_name: &node_name` with the fields then included,
and indented below.

```apache
## Defaults nodes. Does not create a Contenttype
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

Using the above nodes we could simplify a default `Pages` Contenttype to look
like this:

```apache
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
