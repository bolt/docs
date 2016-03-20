Bolt Template tags
==================

As mentioned before, a template in Bolt can use all of the standard Twig tags,
with a few additions that are specific to working with Bolt. If you're not
familiar with Twig yet, you should read "[Twig for Template Designers][twig]",
on the official Twig website.

Below you'll find the tags we've added specifically for Bolt, grouped by type:
functions, filters, and available variables.

Twig tags
---------

### include

Use this to include another Twig template in the current template. Twig parses
the template like any other template, so you can use any tags in your included
template that you would use in the 'main' template. You can also use `include`
inside the included templates.

```
{% include '_header.twig' %}
```

For more information, see [include][inc].

An alternative to using 'include', is to set up your templates using Template
Inheritance. This is a method of defining a base template, and then expand it in
more detail in the templates that extend this base template. See the section on
[Template inheritance][inheritance] on the twig website.



### imageinfo

Sometimes it can be useful to have more information about a specific image in
your templates. You might want to know which type it is, what the dimensions
are, and what the aspect ratio is. In these cases, the `imageinfo` tag can be
used. It returns an array of data about the image. See the screenshot for
details:

<a href="/files/imageinfo.png" class="popup"><img src="/files/imageinfo.png" width="600"></a>

To see the available values for an image, use:

```
{{ dump(imageinfo(record.image)) }}
{# assuming 'record.image' is the image of the current record. #}
```

The aspect ratio is the proportional relationship between the width and the
height of the image. In general, this is used to determine whether an image is
'landscape' or 'portrait'. Note that an image is considered to be landscape if
the aspect ratio is equal to or larger than 5:4 (1.25). An image is considered
to be portrait if the aspect ratio is equal to or smaller than 4:5 (0.8). Images
between those ratios are considered to be Square, even though the width and
height might not be exactly equal. For example, an image that is 650 x 600
pixels is classified as square. If you need more precise values, you can do your
own calculations, using the 'aspectratio' value.

For example, if you want to style an image, depending on its aspect ratio, you can use
these values:

```
{% if imageinfo(record.image).landscape %}
    <img src="{{ thumbnail(record.image, 400, 320) }}" class="landscape">
{% elseif imageinfo(record.image).portrait %}
    <img src="{{ thumbnail(record.image, 320, 400) }}" class="portrait">
{% else %}
    <img src="{{ thumbnail(record.image, 320, 320) }}" class="square">
{% endif %}
```

### Magnific Popup

Use this tag to insert an image in the HTML, which functions as an image popup.
You can optionally provide the width, height and cropping parameters, like you
can do with the `thumbnail`-tag.

```
{{ record.photo|popup(100, 100, "r") }}
or
{{ popup("2014-10/foo.jpg", 100, 100) }}
```

Note that you should include the Magnific Popup `.js` and `.css` yourself, as
well as set up the 'initialization' code:

```
<script src="/app/view/js/jquery.magnific-popup.min.js"></script>
<link rel="stylesheet" type="text/css" href="/app/view/css/magnific-popup.css">

{# set up lightbox script here, or do this in your own .js file somewhere #}
<script type="text/javascript">
  $(document).ready(function() {
    $('.magnific, div.imageholder a').magnificPopup({
        type: 'image'
        // other options
    });
  });
</script>
```

For more information about Magnific Popup, see the
[Magnific Popup website][popup].

### showimage

Use this tag to insert an image in the HTML. You can optionally provide the
width, height and cropping parameters, like you can do with the `thumbnail`-tag.

```
{{ record.photo|showimage(800, 600) }}
or
{{ showimage("2013-03/foo.jpg", 800, 600) }}
```


### redirect

Use this tag to redirect from a page to another page or domain. Commonly used in
an if/else clause, to redirect visitors based on some criteria.

```
{% if record.image!="" %}
    <a href="{{ image(record.image) }}">
        <img src="{{ thumbnail(record.image, 400, 260) }}">
    </a>
{% else %}
    {# passive-aggressive way to tell people to find their own image #}
    {{ redirect('http://http://images.google.com/') }}
{% endif %}
```

```
{% setcontent records = "pages/latest/5" %}
{% for record in records %}

    <h2><a href="{{ record.link }}">{{ record.title }}</a></h2>
    <p>{{ record.excerpt() }}</p>

{% else %}

    {{ redirect(paths.root) }} or {{ redirect('page/some-page') }}

{% endfor %}
```


### setcontent

This tag is used to perform various queries on the database. It converts a
human-readable query to actual records.

Much, much more information about the `setcontent` tag, together with additional
query arguments, pagination, sorting and other options you can find in the
chapter about [Fetching content](content-fetching).

These queries are currently possible:

  * `entry/12` - get entry with id 12
  * `page/about` - get page with slug about
  * `event/latest/5` - get latest 5 events
  * `news/first/5` - get first 5 newsitems
  * `quote/random/5` - get 5 random quotes
  * `animal/search/5` - search for animals and return 5 of them (use
    where parameter 'filter' to specify searchstring)
  * `(animal,plant)/search/20` - search for animals and plants and
    return 20 of them (use where parameter 'filter' to specify searchstring)

```
{% setcontent about = 'page/about' %}

<h3>{{ about.title }}</h3>
{{ about.introduction|raw }}

<a href="{{ about.link }}">link</a>
```

### getuser and getuserid

Sometimes youneed to fetch a specific record based on the correct user. In cases
like these, You'll need to be able to get the data for this user, and the user's
id. For these occasions, the functions `getuserid` and `getuser` come in handy.
The function takes one argument: either a known id, or the username, that the
user also uses to log on.

Example 1: Getting a user

```
{{ dump(getuser(1)) }}
```

<a href="/files/templatetags-getuser.png" class="popup"><img src="/files/templatetags-getuser.png" width="500"></a>


Example 2: Using in `setcontent`

```
{% setcontent pages = "pages" where { ownerid: getuserid('admin') } %}
```


### for

```
<h3>Recent pages</h3>
{% setcontent pages = 'pages' limit 5 order '-datecreated' %}
<ul>
  {% for page in pages %}
    <li><a href="{{ page.link }}">{{ page.title }}</a></li>
  {% else %}
    <p>No recent pages.</p>
  {% endfor %}
</ul>
```

### dump()

```
{% set about = content('page', {'slug': 'about'}) %}

{{ dump(about) }}
```

For more info on debugging your Bolt site, see the chapter on
[Bolt Internals](./internals/bolt-internals).

<p class="note"><strong>Note:</strong> Don't forget to set <code>debug:
true</code> in your <code>config.yml</code> file. Otherwise the
<code>dump()</code> will output nothing at all.</p>



Twig Filters
------------


### excerpt

Excerpt creates a short, text-only, excerpt of a record or a string. It's useful
to get short blurbs of text for overview pages, listings, etcetera. If you pass
it a string, it will simply strip out HTML and, reduce it to a given length:

```
{% set text = "Bonum patria: miserum exilium. Ut optime, secundum" %}
{{ text|excerpt(10) }}

=> Bonum pat…
```

If you get an excerpt of a Record, Bolt will attempt to get an excerpt that's
representative of the Record. If it has a recognisable title, it will start with
that, and it will use the other text-fields to complete it. If fact, it's the
same function that's used in the Bolt backend, on the dashboard.

```
{% setcontent page = "pages/1" %}
{{ page|excerpt(200) }}

=> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Videsne quam sit magna
dissensio? Cum ageremus, inquit, vitae beatum et eundem supremum diem, scribebamus haec.
Duo Reges: constructio int…
```

### localdate

Outputs a localized, readable version of a timestamp, based on the `locale`
setting in the `config.yml`-file. See the [Locales](./locales) page for more
information on locales. If the locale you've set in `config.yml` does not work,
you should verify that the locale is properly installed on your sysem.

In Bolt dates are stored with each record for the date the record was created,
when it was last edited, and optionally when it was published. These dates are
stored in a way that makes it easier for the database to work with them when it
comes to sorting or selecting a specific period. They look like:
`2013-02-18 09:41:10`, which isn't suitable to output on the website itself.
The localdate filter transforms the ugly timestamp to a readable, localized
text. Examples:

```
'{{ record.datepublish }}' is the same as
'{{ record.datepublish|localdate("%A %B %e") }}'
```

Outputs:

  - '2012-12-05 06:51:16' is the same as 'mánudagur desember 5', if your locale is set to
    `is_IS`,  or
  - '2012-12-05 06:51:16' is the same as 'Monday December 5', if it's set to `en_GB`. Note
    that it correctly uses capitals according to the chosen language's conventions.

Some other examples:

```
<ul>
    <li> Created: {{ record.datecreated|localdate("%c") }}</li>
    <li> Published: {{ record.datepublish|localdate("The %A in week %V of %Y") }}</li>
    <li> Last changed: {{ record.datechanged|localdate("%B %e, %Y %r ") }}</li>
</ul>
```

Outputs:

  - Created: Fri 9 Nov 10:55:19 2012
  - Published: The Sunday in week 07 of 2013
  - Last changed: February 17, 2013 01:09:30 pm

The `localdate`-filter uses the PHP `strftime()` function internally. For all
possible options, see the official [strftime()][strftime] page on php.net.


### date

```
{{ content.datecreated|date("M d, ’y")}}
```

See the various options for 'date' on the [PHP website][date].

<p class="note"><strong>Note:</strong> This tag does <em>not</em> display a
localized version of the date. Use the <code>{{ localdate }}</code>-filter if
you want to display dates in other languages than English.</p>


### current

Checks if a given record corresponds to the page being shown in the browser.
Useful for adding 'active' states to menus and such.

```
{% if page|current %}class="current"{% endif %}
```

or:

```
{% if page|current %}
	Yes, {{ page.title }} is the current page.
{% else %}
	No, you're viewing another page than {{ page.title}}
{% endif %}
```


### round, ceil and floor

The `round`, `floor` and `ceil` modifiers can be used to round numbers (or
strings containing a numerical-like values) to the nearest integer, which
basically means "whole number".

```
{% set pi = 3.141592 %}

Rounded, Pi is {{ pi|round }} {# "3" #}

The constant Pi is somewhere between {{ pi|floor }} and {{ pi|ceil }}
{# "3 and 4" #}
```

If you need fancier number formatting than this, you can use the built-in Twig
`number_format`-filter. See the [docs here][number].


### slug

The `slug` filter can be used to transform any string into a slug-like value.
This can be very useful when you're hand-crafting links to categories, pages or
other structures where you need a URL-safe representation of a string.

In this example, we build links to all category listing pages:

```
<ul>
{% for category in app.config.get('taxonomy/categories/options') %}
    <li><a href="/category/{{ category|slug }}">{{ category }}</a></li>
{% endfor %}
<ul>
```

### shy

The "soft hyphenate" filter can be used for strings without spaces, that would
otherwise break the layout of your page. By adding these soft hyphens, the
browser knows it can wrap to the next line. For example:

```
|                         |
| Before: {{ file }}      |
| MyVeryLongFilenameWithoutSpacesOrDashesOrWhatever.jpg |
|                         |
| After: {{ file|shy }}   |
| MyVeryLongFilenameWith- |
| outSpacesOrDashesOrWha- |
| tever.jpg               |
|                         |
```

### safestring

Use this modifier to return a "safe" version of the string. For example:

```
{% set text = "Bonum patria: miserum exilium. Ut optime, secundum" %}
{{ text|safestring(true) }}

=> bonum-patria-miserum-exilium-ut-optime-secundum
```

Characters in the string are converted to lowercase, accented ones are converted to their lowercase ASCII equivalent.
Punctuation signs, and trailing space if present, are replaced by hyphens.

You can specify two parameters: strict mode and extrachars.

  - Strict mode (boolean, default to false): spaces are converted to hyphens.
  - Extra chars (string, default to empty): A string containing extra non-alphabetical characters to keep in result.

```
{# Default settings #}
{% set text = "Bonum patria: miserum exilium. Ut optime, secundum" %}
{{ text|safestring() }}

=> bonum patria-miserum exilium-ut optime-secundum

{# Strict mode #}
{% set text = "Bonum patria: miserum exilium. Ut optime, secundum" %}
{{ text|safestring(true) }}

=> bonum-patria-miserum-exilium-ut-optime-secundum

{# Keep dots #}
{% set text = "my beautiful image.jpg" %}
{{ text|safestring(true, ".") }}

=> my-beautiful-image.jpg
```

### thumbnail

Use this modifier to create a link to an automatically generated thumbnail of a
size of your choosing. For example:

```
<img src="{{ content.image|thumbnail(320, 240) }}">
```

If `content.image` is an image in your `files/` folder, like `foo.jpg`, this
modifier will output a link like `/thumbs/320x240/foo.jpg`. This is useful for
creating absolute links to a thumbnail, regardless of whether Bolt is installed
in the root of your domain, a subdomain or a folder.

You can specify three parameters: the width, height, and the mode of cropping.
The mode of cropping is important if you're requesting a thumbnail that has
different proportions than the original image. Valid options for cropping are:

  - 'c' (crop, default) - Makes sure you always get an image that is the
    specified width and height. The image is not transformed, so it will be
    cropped to fit the boundaries is necessary.
  - 'f' ('fit') - The image will not be cropped but resized to fit within the
    given maximum width and height. This means that you will always get an image
    with the exact same width and height that you specified. The resulting image
    might be deformed, and will _not_ have the same aspect ratio as the
    original.
  - 'b' (borders) - Will add a border to the image, in order to make it fit
    within the given boundaries.
  - 'r' (resize) - Will resize the image to fit the boundaries, without
    cropping. This means your thumbnail might be smaller than the width/height
    given, but the the image will always maintain the aspect ratio of the
    original image.

Use the cropping parameter like this:

```
<img src="{{ content.image|thumbnail(100, 100, "r") }}">
```

If you omit the width and height altogether, the thumbnail will use the
'default' size and cropping mode. Remember to add quotes around the cropping
mode.

```
<img src="{{ content.image|thumbnail }}">
```

You can set the size in your `config.yml`, like this:

```
thumbnails: [ 160, 120, c ]
```


### image

Use this modifier to create a link to an image of your choosing. For example:

```
<img src="{{ content.photo|image }}">
```

If `content.photo` is an image in your `files/` folder, like `2012-11/foo.jpg`,
this modifier will output a link like `/files/2012-11/foo.jpg`. This is useful
for creating absolute links to an image, regardless of whether Bolt is installed
in the root of your domain, a subdomain or a folder.

You can specify three parameters: the width, height, and the mode of cropping.
By doing so, the image will be resized, and it behave exactly like the
[thumbnail filter](#filter-thumbnail).

```
<img src="{{ content.photo|image(100, 100, "r") }}">
```



### raw

If the content contains HTML-fields, they will be rendered with escaped
characters by default. If you want to use the HTML as-is, add the raw modifier:

```
{{ page.tite|raw }}
```

If we didn't add the `raw` modifier, all '<' and '>' characters in the body
would be output as '&amp;lt;' and '&amp;gt;' respectively. If 'body' is an HTML
field in our contenttype, we want it to be output as normal HTML, so we have to
add the `raw` modifier.

### order

In most cases the results of `{% setcontent %}` or `{{ record.related() }}` are
in the desired order. In some cases you might want to reorder them, by using the
`order`-filter. The filter takes one or two parameters: the names of the fields
you wish to order the results on:

```
{% set relatedrecords = record.related() %}
<p class="meta">Related content:
    <ul>
    {% for related in relatedrecords|order('datepublish') %}
        <li><a href="{{ related.link }}">{{ related.title }}</a></li>
    {%  endfor %}
    </ul>
</p>
```

or:

```
{# get the 10 latest entries by date, but sort them on the title field %}
{% setcontent entries = "entries/latest/10" %}
<ul>
{% for entry in entries|order('title', 'subtitle') %}
    <li><a href="{{ entry.link }}">{{ entry.title }}</a></li>
{%  endfor %}
</ul>
```

**Note:** Ordering with the `order`-filter is case sensitive. This means that
'banana' will come _before_ 'Apple'. If you're sorting on a title or name field
and this case sensitivity is undesirable, you can use `|order('slug')` instead.
The slug is always lowercase, so this will normalize the ordering.

### preg_replace

Makes PHPs `preg_replace()` function available as twig filter. Example usage:

```
{{ content.text|preg_replace('/[^a-z]+/', '_') }}
```


Available variables in Twig
---------------------------

### app

```
{{ app.config.get('general/sitename') }}
```


```
{{ dump(app.config.get('general') }}
```

For more info on `app`, see the chapter on [Bolt Internals](./internals/bolt-internals).


Tests
-----

### json

Use this test to determine if a given variable is JSON.

Examples:

```
{% if var is json %}
    JSON: {{ var }}
{% else %}
    JSON: {{ var|json_encode }}
{% endif %}
```

```
{% if var is json %}
    Decoded: {{ var|json_decode }}
{% endif %}
```


### defined (for extensions)

Use this test to determine if a certain extension is available. You
can use this in your themes, where it's not apparent whether or not the user
will have a certain extension installed.

Examples:

```
{% if FacebookLike is defined %}
    {{ facebooklike() }}
{% endif %}
```

You can use this, to output a friendly warning to users of the templates:

```
{% if BoltForms is defined %}
    {{ boltforms('contact') }}
{% else %}
    <p>Warning: This theme suggests you install the 'Bolt Forms' extension.</p>
{% endif %}
```

<p class="note"><strong>Note:</strong> in the <code>{% if %}</code>-tag you must use the
*name* of the extension. Don't add quotes!</p>

[twig]: http://twig.sensiolabs.org/doc/templates.html
[inc]: http://twig.sensiolabs.org/doc/tags/include.html
[inheritance]: http://twig.sensiolabs.org/doc/templates.html#template-inheritance
[number]: http://twig.sensiolabs.org/doc/filters/number_format.html
[popup]: http://dimsemenov.com/plugins/magnific-popup/
[strftime]: http://php.net/manual/en/function.strftime.php
[date]: http://php.net/manual/en/function.date.php

