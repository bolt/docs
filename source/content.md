Contenttypes and records
========================

All content in Bolt is stored in the database in a logical and flexible fashion. In general, when you're building a
website, you have an idea what kind of content you're going to be managing with the website. Most websites have some
sort of 'pages' for generic stuff like 'about us' or 'Company History'. Most websites will also have some form of news-
like items, that are shown based on the date that they were published. Some other sites might have 'book reviews' or
'event dates' or even completely different content. All of these different types of content are called **Contenttypes**
in Bolt, and you can add as many different types as you need.

Each contenttype is defined by a few fixed **Fields** that are used internally, but otherwise you're free to define how
the content in a Contenttype is structured. For instance, in an 'event', you'll need a date on which the event takes
place. For a 'book review', you'll need an author and publisher of the book. Other commonly used fields are 'title',
'introduction' or 'image'. Some of the Fields are Fixed, which means that every contenttype has them. For example, every
contenttype has a Field for 'id', 'slug', 'date_created' and 'user'. Below we'll describe how to define the Contenttypes
and the Fields that you can use to store the desired information in them.

All content in your website is part of one Contenttype, which automatically defines which fields that piece of content
has, and that automatically specifies how that piece of content is structured. Each one of those pieces of content is
called a **Record**, and is stored in the database together. For example, a single 'book review' is a Record of
Contenttype 'reviews' and a single 'page' is a Record of Contenttype Pages.

When you're creating a page on a website that shows listings of several Records, you're using an **Array of Records**.
For instance, if you create a page that has 'the five latest book reviews', you'll be using an Array of 5 'book review'
Records of Contenttype 'book reviews'.

Before we'll dive into the details, we'll give you a quick example of a simple Contenttype, how it's stored, and how you
can access it in the templates to display on your site.

An Example: News items
----------------------

In this example, we'll create a very simple contenttype for news items. Each news item will have a title, an image, and
some text. We'll also be using some of the fixed Fields, like the slug, the user and the date.

To add this Contenttype, edit the file `app/config/contenttypes.yml`, and add the following to the bottom or top of the
file:

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

<p class="tip"><strong>Tip:</strong> For easier copy/pasting of the samples, doubleclick the code.</p>

<p class="note"><strong>Note:</strong> This file is in the YAML format, which means that the indentation is important.
Make sure you leave leading spaces intact.</p>


This creates a new contenttype 'news'. Its name is 'News', and a single record is named 'Newsitem'. We've defined fields
for 'title', 'slug', 'image' and 'text'. The 'template' defines the default template to use, when displaying a single
template in the browser.

After you've saved the file and Refresh the Dashboard screen in your browser, you'll be greeted by a warning that the
Database needs to be updated. If we do this, the new contenttype will be added to the database, with the fields that we
defined in our `contenttypes.yml` file.

<a href="/files/content-example1.png" class="fancybox"><img src="/files/content-example1.png" width="500"></a>

When you go to Settings > Check Database, the database will be updated, and you'll be given the option to add some
"Lorem Ipsum" Records to the newly created Contenttype. If you do this, and go back to the dashboard, you'll see your
new Contenttype with some example news items. Sweet!

<a href="/files/content-example2.png" class="fancybox"><img src="/files/content-example2.png" width="500"></a>

<p class="note"><strong>Note:</strong>In the following examples we're going to tell you to make modifications to the
default theme. This is actually a very bad practice, and if you're going to make your own theme, make a copy of the
default theme, and do your modifications in the copy.</p>


To add a listing of these news items to the website, edit the twig template `theme/default/index.twig`. Most likely,
it'll contain an include for a header and some other things. Add the following to the HTML-code, preferably somewhere
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

Most of the above example will seem pretty straightforward, but all of the specific template tags are explained in
detail in the chapter about [Content in templates](content-in-templates).

When you refresh the front page of the website, you should see four news items listed on the page. You can click the
title to go to the news item on a seperate page, but you'll get an error. In the contenttype we defined the template as
`newsitem.twig`, but it doesn't exist. Create the file in the `theme/default/` folder, and add the following HTML-code:

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

<p class="note"><strong>Tip:</strong> If you're curious about the different <code>{{ tags }}</code> in this bit of code,
read the <a href="/templates">Template documentation</a>.</p>

In the frontend of the website, in your templates, all content is accessible as an array. If you're accessing one
record, it will be an array containing the fields, taxonomies and metadata. If you're accessing a set of records, it
will be an array of arrays. I.e. `{{ page.title }}` for the title of a page or `{{ events.4.date }}` for the date of the
fourth event in an array.

If you're building a template and are unsure of what a certain variable contains or how the fields are named, use `{{
print(foo) }}`, where 'foo' is the name of your record or array.

Below, in the section [The structure of a Record](#the-structure-of-a-record), this is explained in detail.

Defining contenttypes
---------------------

The contenttypes in Bolt are defined in the file `app/config/contenttypes.yml`. You can edit this file directly, or from
within the Bolt interface under Settings > Contenttypes. Each distinct group of content can have its own Contenttype, to
enable the user to store the content as needed. Fields can be added later on, and settings can be changed, so nothing is
set in stone.

The general structure of each contenttype is:

<pre class="brush: plain">
name:
    option: value
    option: value
    option: value
    ..
</pre>

The `name` defines the name of the contenttype, and it should be a 'safe' version of the `name:` option below. Basically
this means that it should be a lowercase version, without any special characters. Like this:

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

  - `name`: The name of the Contenttype, as it should be shown on screen or in the browser. It should be plural, if
    possible.
  - `singular_name`: The name of one Record in the Contenttype. This should be singular. For example, if the
    Contenttype's name is 'Pages', this should be 'Page'
  - `slug` (optional): This determines the slug of the contenttype, and therefore the URLs that are generated for this
    contenttype. When omitted, the slug will be automatically generated.
  - `singular_slug` (optional): This determines the slug of the a single record in this contenttype, and therefore the
    URLs that are generated for these records. When omitted, the slug will be automatically generated.
  - `fields`: The fields that make up the content in this contenttype. See the [section below](#field-definitions) for
    details.
  - `taxonomy`: An array listing the different taxonomies used by this contenttype. For example `[ categories, tags ]`.
    See the page on [Taxonomies](/taxonomies) for details.
  - `record_template`: The default template to use, when displaying a single Record of this Contenttype. The template
    itself should be located in your `theme/foo/` folder, in Bolt's root folder. This can be overridden on a per-record
    base, if one of the fields is defined as type `templateselect`.
  - `listing_template`: The default template to use, when displaying an overview of Records of this Contenttype. The
    template itself should be located in your `theme/foo/` folder, in Bolt's root folder.
  - `listing_records`: The amount of records to show on a single overview page in the frontend. If there are more
    records, the results will be paginated.
  - `sort` (optional): The default sorting of this contenttype, in the overview in Bolt's backend interface. For example
    `datecreated DESC`.
  - `recordsperpage` (optional): the amount of records shown on each page in the Bolt backend. If there are more
    records, they will be paginated.

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
  - `slug`: Even though the slug is a fixed field, you can include it in the fields list, so that it can be customized.
    Add a `uses: title` value to specify the field it should use to automatically generate a suited slug from the title
    (or another field).
  - `image`: Simple image upload/select field.
  - `file`: Simple image upload/select field.
  - `html`: Wysiwyg HTML field.
  - `textarea`: Simple multi-line textarea input, for longer texts without HTML markup.
  - `video`: A set of fields for embedding videos from websites like Youtube and Vimeo.
  - `geolocation`: A set of fields for easy selection of a geolocation (latitude/longitude) with an address.
  - `date`: Datepicker widget, to set/select a date.
  - `datetime`: Similar to the `date` field, but adds an additional field so specify a time.
  - `number`: A field to store numbers. Internally stored so that they can be sorted numerically. (note: the maximum
    precision is 9 digits beofre the decimal mark, and 9 digits after)
  - `divider`: To seperate fields visually, you can add dividers. A divider can have a label, show a horizontal line, or
    both. Add a label with `label: This is a label` and a line with `line: true`.


Most fields have a few extra optional values, to further customize them.

  - `class: large`: Will show the field in a larger font, for `text` fields.
  - `label: Foo`: If omitted, the name of the field will be used as a label in the edit-screen. Replace 'Foo' with the
    desired label of the field.
  - `height: 150px`: For `html` and `textarea` fields, this will determine the height in the edit-screen.


The structure of a Record
-------------------------

Every record is an object, that contains the information of that record, as well as some meta-information and its
taxonomy.

<a href="/files/content-example3.png" class="fancybox"><img src="/files/content-example3.png" width="500"></a>

At the topmost level, it contains the following items:

  - `id`: The unique identifying  number of this record in the database, for this Contenttype. Note: there are duplicate
    ids for records in different contenttypes. For example, there can be a record with id `1` for Pages, and also a
    record with id `1` for News.
  - `values`: An array with the values of this record.
  - `taxonomy`: An array (or `NULL`) for the taxonomy of this record.
  - `contenttype`: An array representation of the contenttype that this record belongs to, complete with the fields that
    the record should have.
  - `user`: an array, containing information about the user, like the displayname, email-address, etcetera.

The values contain the fields that are defined in the contenttype, together with a few other fixed fields. The fixed
fields are:

  - `id`: The record's unique identifying number.
  - `slug`: The record's slug. Either generated automatically, or specified by the content editor.
  - `datecreated`: The timestamp of when the record was first created.
  - `datechanged`: The timestamp of when the record was last edited of modified.
  - `username`: The name of the user that last edited (or created) this record.
  - `status`: The current status of this record. Can be either `published`, `depublished`, `held`, `timed` or `draft`.

If you're building a template and are unsure of what a certain variable contains or how the fields are named, use `{{
print(foo) }}`, where 'foo' is the name of your record or array.

For detailed information on how to access the various fields and values in your templates, view the section [Content on
the Template tags page](/templatetags#content).
