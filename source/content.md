Contenttypes and records
========================

All content in Bolt is stored in the database in a logical and flexible fashion.
In general, when you're building a website, you have an idea what kind of
content you're going to be managing with the website. Most websites have some
sort of 'pages' for generic stuff like 'about us' or 'Company History'. Most
websites will also have some form of news- like items, that are shown based on
the date that they were published. Some other sites might have 'book reviews' or
'event dates' or even completely different content. All of these different types
of content are called **Contenttypes** in Bolt, and you can add as many
different types as you need.

Each contenttype is defined by a few fixed **Fields** that are used internally,
but otherwise you're free to define how the content in a Contenttype is
structured. For instance, in an 'event', you'll need a date on which the event
takes place. For a 'book review', you'll need an author and publisher of the
book. Other commonly used fields are 'title', 'introduction' or 'image'. Some of
the Fields are Fixed, which means that every contenttype has them. For example,
every contenttype has a Field for 'id', 'slug', 'date_created' and 'user'. Below
we'll describe how to define the Contenttypes and the Fields that you can use to
store the desired information in them.

<p class="tip"><strong>Tip:</strong> The 'slug' is a special value, that's used in the generation of the URL at which
a page will be available on the website. It usually contains a  variant of the
title, that's been made suitable for indexing by search engines. Ideally, it is
both semantical and human readable. For example, if you have a page named "About
our company", a good slug would be <code>about-our-company</code>.</p>

All of the content on your website is part of one specific Contenttype, which
automatically defines which fields that piece of content has, which in turn
specifies how that piece of content is structured. Each one of those pieces of
content is called a **Record**, and is stored in the database together. For
example, a single 'book review' is a Record of Contenttype 'reviews' and a
single 'page' is a Record of Contenttype Pages.

When you're creating a page on a website that shows listings of several Records,
you're using an **Array of Records**. For instance, if you create a page that
has 'the five latest book reviews', you'll be using an Array of 5 'book review'
Records of Contenttype 'book reviews'.

Before we'll dive into the details, we'll give you a quick example of a simple
Contenttype, how it's stored, and how you can access it in the templates to
display on your site.

An Example: News items
----------------------

In this example, we'll create a very simple contenttype for news items. Each
news item will have a title, an image, and some text. We'll also be using some
of the fixed Fields, like the slug, the user and the date.

<p class="note"><strong>Note:</strong> If you've just installed Bolt, you might
not have the <code>contenttypes.yml</code>-file yet. You will however have a
<code>contenttypes.yml.dist</code>-file, in that same folder. The first time Bolt is
run, the <code>.yml.dist</code>-files will be automatically copied to
<code>.yml</code>-files. If you wish to do some configuration <em>before</em>
you first run Bolt, just copy <code>contenttypes.yml.dist</code> to
<code>contenttypes.yml</code> yourself. </p>

To add this Contenttype, edit the file `app/config/contenttypes.yml`, and add
the following to the bottom or top of the file:

<pre class="brush: plain">
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
    template: newsitem.twig
</pre>

<p class="tip"><strong>Tip:</strong> For easier copy/pasting of the samples,
doubleclick the code.</p>

<p class="note"><strong>Note:</strong> This file is in the YAML format, which
means that the indentation is important. Make sure you leave leading spaces
intact.</p>

This creates a new contenttype 'news'. Its name is 'News', and a single record
is named 'Newsitem'. We've defined fields for 'title', 'slug', 'image' and
'text'. The 'template' defines the default template to use, when displaying a
single template in the browser.

After you've saved the file and Refresh the Dashboard screen in your browser,
you'll be greeted by a warning that the Database needs to be updated. If we do
this, the new contenttype will be added to the database, with the fields that we
defined in our `contenttypes.yml` file.

<p class="tip"><strong>Tip:</strong> The Bolt backend is located at
<code>/bolt</code>, relative from the 'home' location of your website. </p>


<a href="/files/content-example1.png" class="fancybox"><img src="/files/content-example1.png" width="500"></a>

When you go to Settings > Check Database, the database will be updated, and
you'll be given the option to add some "Lorem Ipsum" Records to the newly
created Contenttype. If you do this, and go back to the dashboard, you'll see
your new Contenttype with some example news items. Sweet!

<a href="/files/content-example2.png" class="fancybox"><img src="/files/content-example2.png" width="500"></a>

<p class="note"><strong>Note:</strong>In the following examples we're going to
tell you to make modifications to the default `base-2013` theme. This is
actually a very bad practice, and if you're going to make your own theme, make a
copy of the `base-2013` theme, and do your modifications in the copy.</p>

To add a listing of these news items to the website, edit the twig template
`theme/base-2013/index.twig`. Most likely, it'll contain an include for a header
and some other things. Add the following to the HTML-code, preferably somewhere
below the header section:

<pre class="brush: html">
{% setcontent newsitems = "news/latest/4" %}

{% for newsitem in newsitems %}
&lt;article>
    &lt;h2>&lt;a href="{{ newsitem.link }}">{{ newsitem.title }}&lt;/a>&lt;/h2>

    {{ newsitem.excerpt }}

    &lt;p class="meta">&lt;a href="{{ newsitem.link }}">Link&lt;/a> -
    Posted by {{ newsitem.user.displayname }}
    on {{ newsitem.datecreated|date("M d, ’y")}}&lt;/p>

&lt;/article>
{% endfor %}
</pre>

Most of the above example will seem pretty straightforward, but all of the
specific template tags are explained in detail in the chapter about [Content in
templates](content-in-templates).

When you refresh the front page of the website, you should see four news items
listed on the page. You can click the title to go to the news item on a separate
page, but you'll get an error. In the contenttype we defined the template as
`newsitem.twig`, but it doesn't exist. Create the file in the `theme/default/`
folder, and add the following HTML-code:

<pre class="brush: html">
&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;
&lt;head&gt;
	&lt;meta charset="utf-8" /&gt;
	&lt;title&gt;{{ newsitem.title }}&lt;/title&gt;
&lt;/head&gt;

&lt;body&gt;

    &lt;article&gt;

        &lt;h1&gt;&lt;a href="{{ newsitem.link }}"&gt;{{ newsitem.title }}&lt;/a&gt;&lt;/h1&gt;

        {% if content.image!="" %}
            &lt;div class='imageholder'&gt;&lt;img src="{{ newsitem.image|thumbnail(480, 480) }}"&gt;&lt;/div&gt;
        {% endif %}

        {{ newsitem.text }}

        &lt;p class="meta"&gt;&lt;a href="{{ newsitem.link }}"&gt;Link&lt;/a&gt; -
        	Posted by {{ newsitem.username }}
        	on {{ newsitem.datecreated|date("M d, ’y")}}&lt;/p&gt;

    &lt;/article&gt;
&lt;/body&gt;
&lt;/html&gt;
</pre>

<p class="note"><strong>Tip:</strong> If you're curious about the different
<code>{{ tags }}</code> in this bit of code, read the <a
href="/templates">Template documentation</a>.</p>

In the frontend of the website, in your templates, all content is accessible as
an array. If you're accessing one record, it will be an array containing the
fields, taxonomies and metadata. If you're accessing a set of records, it will
be an array of arrays. I.e. `{{ page.title }}` for the title of a page or `{{
events.4.date }}` for the date of the fourth event in an array.

If you're building a template and are unsure of what a certain variable contains
or how the fields are named, use `{{ print(foo) }}`, where 'foo' is the name of
your record or array.

Below, in the section [The structure of a Record](#the-structure-of-a-record),
this is explained in detail.

Defining contenttypes
---------------------

The contenttypes in Bolt are defined in the file `app/config/contenttypes.yml`.
You can edit this file directly, or from within the Bolt interface under
Settings > Contenttypes. Each distinct group of content can have its own
Contenttype, to enable the user to store the content as needed. Fields can be
added later on, and settings can be changed, so nothing is set in stone.

The general structure of each contenttype is:

<pre class="brush: plain">
name:
    option: value
    option: value
    option: value
    ..
</pre>

The `name` defines the name of the contenttype, and it should be a 'safe'
version of the `name:` option below. Basically this means that it should be a
lowercase version, without any special characters. Like this:

<pre class="brush: plain">
pages:
    name: Pages
    singular_name: Page
    ..
</pre>

<pre class="brush: plain">
cafes:
    name: Cafés
    singular_name: Café
    ..
</pre>

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
  - `fields`: The fields that make up the content in this contenttype. See the
    [section below](#field-definitions) for details.
  - `taxonomy`: An array listing the different taxonomies used by this
    contenttype. For example `[ categories, tags ]`. See the page on
    [Taxonomies](/taxonomies) for details.
  - `record_template`: The default template to use, when displaying a single
    Record of this Contenttype. The template itself should be located in your
    `theme/foo/` folder, in Bolt's root folder. This can be overridden on a per-
    record base, if one of the fields is defined as type `templateselect`.
  - `listing_template`: The default template to use, when displaying an overview
    of Records of this Contenttype. The template itself should be located in
    your `theme/foo/` folder, in Bolt's root folder.
  - `listing_records`: The amount of records to show on a single overview page
    in the frontend. If there are more records, the results will be paginated.
  - `sort` (optional): The default sorting of this contenttype, in the overview
    in Bolt's backend interface. For example `datecreated DESC`.
  - `recordsperpage` (optional): the amount of records shown on each page in the
    Bolt backend. If there are more records, they will be paginated.

Field definitions
-----------------

All fields have a general structure, like this:

<pre class="brush: plain">
        name:
            type: name-of-fieldtype
            option: value
            option: value
            ..
</pre>

The following fields are available:

  - `text`: Simple text-input, for single-line fields
  - `slug`: Even though the slug is a fixed field, you can include it in the
    fields list, so that it can be customized. Add a `uses: title` value to
    specify the field it should use to automatically generate a suited slug from
    the title (or another field). It's also possible to specify multiple fields
    to use, these values will be concatenated and used for the slug. Syntax for
    multiple fields:
<pre class="brush: plain">
    slug:
        type: slug
        uses: [field1,field2]
</pre>
  - `image`: Simple image upload/select field. Currently takes one optional 
    attribute (attrib:) parameter 'title' — this will allow you to specify text
    that you can call in your templates to retreive either/or captions or alt 
    text for your image layout.
<pre class="brush: plain">
    image:
        type: image
        attrib: title
</pre>
  - `imagelist`: A field to create a list of images. Useful for slideshows and
    imagesliders.
  - `file`: Simple image upload/select field.
  - `html`: Wysiwyg HTML field.
  - `textarea`: Simple multi-line textarea input, for longer texts without HTML
    markup.
  - `select`: A drop-down list to make a pre-defined selection from. There are 
    two ways of sepecifying the list of available options. Either a YAML array
    or a contenttype/field lookup.
    
    Array values:
<pre class="brush: plain">
    selectfield:
        type: select
        values: [ none, foo, bar ]
</pre>

    Lookup existing Contenttype record fields:
<pre class="brush: plain">
    selectfield:
        type: select
        values: mycontenttype/fieldname
</pre>
  - `video`: A set of fields for embedding videos from websites like Youtube and
    Vimeo.
  - `geolocation`: A set of fields for easy selection of a geolocation
    (latitude/longitude) with an address.
  - `date`: Datepicker widget, to set/select a date.
  - `datetime`: Similar to the `date` field, but adds an additional field so
    specify a time.
  - `integer`: A field to store whole, integer numbers. The value must be
    between <span style="white-space: nowrap">-2147483648</span> and +2147483647.
  - `float`: A field to store numbers. Internally stored so that they can be
    sorted numerically. (note: the maximum precision is 9 digits before the
    decimal mark, and 9 digits after)

Most fields have a few extra optional values, to further customize them.

  - `class: large`: Will show the field in a larger font, for `text` fields.
  - `class: wide`: Will show the field extra wide, for filling out the column.
    For `text` fields only.
  - `class: narrow`: Will show the field narrow, for fields that should take
    only a couple of characters. For `text` fields only.
  - `variant: inline`: Will show the field to the right of the label, taking up
    less space vertically. For `text` fields only.
  - `label: Foo`: If omitted, the name of the field will be used as a label in
    the edit-screen. Replace 'Foo' with the desired label of the field.
  - `height: 150px`: For `html` and `textarea` fields, this will determine the
    height in the edit-screen.
  - `index: true`: Add a database index for this field, only add if you know
    what this means. Does not work on `html`, `textarea`, `video`, `markdown`,
    `geolocation` and `imagelist`. [added in 1.1]
  - `prefix: ..`: Text to add before the field. See below for an example.
  - `postfix: ..`: Text to add after the field. See below for an example.
  - `default: ..`: The default value for a field, if applicable. See below for
    an example.
  - `required: true`: Use this to make a field required. See below for examples.
  - `pattern: ..`: Use this to validate a field against a certain pattern. See
    below for examples.

### Prefix and Postfix 
Sometimes it can be beneficial to add some extra text, labels or other markup to
how a field is displayed in the Bolt backend, when editing a record. You can use
the optional `prefix` and `postfix` values to add some markup before or after a
field. For example:

<pre class="brush: plain">
        subtitle:
            type: text
            class: large
            prefix: "<p>Add a subtitle, if you want.</p>"
            postfix: "<hr>"
</pre>

As you can see, using `postfix: "<hr>"` gives a simple and effective way of
adding a divider in the edit screen.

### Default values

When you want to give a record a default value, use `default:`. For most fields
this will set the initial value of the field, when you're creating a new record
of this contenttype. For `date` and `datetime` fields, the value is passed
through [strtotime](http://php.net/manual/en/function.strtotime.php), meaning that you
can use a fixed date as default, like "1900-01-01 12:00:00", but also relative
dates like "first day of this month", "next Monday" or "yesterday".

### Required and patterns

You can use the `required` option to make a field required. Combine it with the
`pattern` option to make sure that a field contains an email-address, or that a
title is no longer than a certain amount of characters. Note that the
requirements are only enforced in the browser, so don't "trust" any data that's
been entered by an editor.

Currently, you can use the `required` option for fields of type `text`,
`textarea`, `html`, `float` and `integer`.

For example, to make a title required, you can do this:

<pre class="brush: plain">
        title:
            type: text
            prefix: "<p>A title is required.</p>"
            required: true
            class: large
</pre>

If combined with a `pattern`, you can add frontend validation to the field. By
doing this, you can require that the values of a field are within certain
parameters. You can use either one of the predetermined patterns like `email` or
`url`, or any regular expression. Currently, the `pattern` option is allowed for
fields of type `text`, `float` and `integer`. Examples of patterns to be used
can be found on the website [html5pattern.com](http://html5pattern.com/). Some
common use-cases are:

- `email`: the input must be a valid email address. The email address must be
  _possible_ syntactically, but it's not required that it actually exists.
- `url`: the input must be a valid email url, starting with `http://` or
  `https://`. The URL address must be _possible_ syntactically, but it's not
  required that it actually exists.
- `^.{1,50}$`: The input can contain any character, and should be between 1 and 50
  characters in length.
- `^[0-9_ -]*$`: The input can contain numbers, dashes, underscores and spaces.
- `^[a-zA-Z0-9 ]{10,20}$`: The input can contain uppercase and lowercase letters
  and numbers, and should be between 10 and 20 characters in length.
- `^[1-9][0-9]{3}[\s]?[A-Za-z]{2}$`: The input should be a Dutch postal code: four
  numbers with no leading '0', an optional space, and two letters. `1234 ab` or
  `2518HL` are valid inputs.

For example, use this to make sure a title is no longer than 80 characters: 

<pre class="brush: plain">
        title:
            type: text
            prefix: "<p>A title is required. The maximum length is 80 characters</p>"
            required: true
            pattern: "^.{1,80}$"
            class: large
</pre>

The `^` and `$` in some of the examples note the beginning and end of the value
respectively. If we would omit these, the results would be off. For example,
`.{1,10}` would match any value that has "between 1 and 10 characters" in it,
regardless of what comes before or after it. Probably not what you're looking
for.

<p class="note"><strong>Note:</strong>You should not try to use a pattern to
match an email address. Always use <code>email</code> to validate an email
address. </p>

You can also define fields that are not required, but that _do_ have a pattern.
Doing this, the field can be left blank, but if it _is_ filled, it must match
the pattern. For example, you could make an optional email-address like this:

<pre class="brush: plain">
        person:
            type: text
            prefix: "<p>An optional email address.</p>"
            required: false
            pattern: email
</pre>

<p class="note"><strong>Note:</strong> If you have a required field, you should
always include a postfix. Otherwise the editor might not know what's expected of
them. </p>

The structure of a Record
-------------------------

Every record is an object, that contains the information of that record, as well
as some meta-information and its taxonomy.

<a href="/files/content-example3.png" class="fancybox"><img src="/files/content-example3.png" width="500"></a>

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

The values contain the fields that are defined in the contenttype, together with
a few other fixed fields. The fixed fields are:

  - `id`: The record's unique identifying number.
  - `slug`: The record's slug. Either generated automatically, or specified by
    the content editor.
  - `datecreated`: The timestamp of when the record was first created.
  - `datechanged`: The timestamp of when the record was last edited of modified.
  - `username`: The name of the user that last edited (or created) this record.
  - `status`: The current status of this record. Can be either `published`,
    `depublished`, `held`, `timed` or `draft`.

If you're building a template and are unsure of what a certain variable contains
or how the fields are named, use `{{ print(foo) }}`, where 'foo' is the name of
your record or array. In most templates, `{{ print(record) }}` will work as a
generic fallback for whatever the name of your record is.

For detailed information on how to access the various fields and values in your
templates, view the section [Content on the Template tags
page](/templatetags#content).
