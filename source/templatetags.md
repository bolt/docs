Bolt Template tags
==================

As mentioned before, a template in Bolt can use all of the standard Twig tags,
with a few additions that are specific to working with Bolt. If you're not
familiar with Twig yet, you should read "[Twig for Template
Designers](http://twig.sensiolabs.org/doc/templates.html)", on the official Twig
website.

Below you'll find the tags we've added specifically for Bolt, along with some
commonly used snippets, like menus.

Tag: include
------------

Use this to include another Twig template in the current template. Twig parses
the template like any other template, so you can use any tags in your included
template that you would use in the 'main' template. You can also use `include`
inside the included templates.

<pre class="brush: html">
	{% include '_header.twig' %}
</pre>

For more information, see [include](http://twig.sensiolabs.org/doc/tags/include.html)

Filter: localdate
-----------------

Outputs a localized, readable version of a timestamp, based on the `locale`
setting in the `config.yml`-file. See the [Locales](/locales) page for more
information on locales.

In Bolt dates are stored with each record for the date the record was created,
when it was last edited, and optionally when it was published. These dates are
stored in a way that makes it easier for the database to work with them when it
comes to sorting or selecting a specific period. They look like: `2013-02-18
09:41:10`, which isn't suitable to output on the website itself. The localdate
filter transforms the ugly timestamp to a readable, localized text. Examples:

<pre class="brush: html">
    '{{ record.datepublish }}' is the same as 
    '{{ record.datepublish|localdate("%A %B %e") }}'
</pre>

Outputs: 

  - '2012-12-05 06:51:16' is the same as 'mánudagur desember 5', if your locale
    is set to `is_IS`,  or
  - '2012-12-05 06:51:16' is the same as 'Monday December 5', if it's set to
    `en_GB`. Note that it correctly uses capitals according to the chosen
    language's conventions.

Some other examples: 

<pre class="brush:html">
&lt;ul>
    &lt;li> Created: {{ record.datecreated|localdate("%c") }}&lt;/li>
    &lt;li> Published: {{ record.datepublish|localdate("The %A in week %V of %Y") }}&lt;/li>
    &lt;li> Last changed: {{ record.datechanged|localdate("%B %e, %Y %r ") }}&lt;/li>
&lt;/ul>
</pre>

Outputs: 

  - Created: Fri 9 Nov 10:55:19 2012
  - Published: The Sunday in week 07 of 2013
  - Last changed: February 17, 2013 01:09:30 pm

The `localdate`-filter uses the PHP `strftime()` function internally. For all
possible options, see the official
[strftime()](http://php.net/manual/en/function.strftime.php) page on php.net.


Filter: date
------------

<pre class="brush: html">
{{ content.datecreated|date("M d, ’y")}}
</pre>

See the various options for 'date' on the [PHP
website](http://nl3.php.net/manual/en/function.date.php).

<p class="note"><strong>Note:</strong> This tag does <em>not</em> display a
localized version of the date. Use the <code>{{ localdate }}</code>-filter if
you want to display dates in other languages than English.</p>


Filter: link
------------

Create a link to the current record.

<pre class="brush: html">
	{{ entry|link }}
</pre>

or:

<pre class="brush: html">
	<a href="{{ page|link }}">Link to {{ page.title }}</a>
</pre>


Filter: current
-----------------

Checks if a given record corresponds to the page being shown in the browser.
Useful for adding 'active' states to menus and such.

<pre class="brush: html">
{% if page|current %}class="current"{% endif %}
</pre>

or:

<pre class="brush: html">
{% if page|current %}
	Yes, {{ page.title }} is the current page.
{% else %}
	No, you're viewing another page than {{ page.title}}
{% endif %}
</pre>




Filter: round, ceil and floor
-----------------------------
The `round`, `floor` and `ceil` modifiers can be used to round numbers (or
strings containing a numerical-like values) to the nearest integer, which
basically means "whole number"

<pre class="brush: html">
{% set pi = 3.141592 %}

Rounded, Pi is {{ pi|round }} {# "3" #}

The constant Pi is somewhere between {{ pi|floor }} and {{ pi|ceil }}
{# "3 and 4" #}
</pre>

If you need fancier number formatting than this, you can use the built-in Twig
`number_format`-filter. See the [docs
here](http://twig.sensiolabs.org/doc/filters/number_format.html).


Filter: slug
------------

The `slug` filter can be used to transform any string into a slug-like value.
This can be very useful when you're hand-crafting links to categories, pages or
other structures where you need a URL-safe representation of a string.

In this example, we build links to all category listing pages: 

<pre class="brush: html">
&lt;ul>
{% for category in app.config.get('taxonomy/categories/options') %}
    &lt;li>&lt;a href="/category/{{ category|slug }}">{{ category }}&lt;/a>&lt;/li>
{% endfor %}
&lt;ul>
</pre>



Filter: thumbnail
-----------------

Use this modifier to create a link to an automatically generated thumbnail of a
size of your choosing. For example:

<pre class="brush: html">
    &lt;img src="{{ content.image|thumbnail(320, 240) }}">
</pre>

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
  -  'f' ('fit') - The image will not be cropped but resized to fit within the
    given maximum width and height. This means that you will always get an
    image with the exact same width and height that you specified. The
    resulting image might be deformed, and will _not_ have the same aspect
    ratio as the original.
  - 'b' (borders) - Will add a border to the image, in order to make it fit
    within the given boundaries.
  - 'r' (resize) - Will resize the image to fit the boundaries, without
    cropping. This means your thumbnail might be smaller than the width/height
    given, but the the image will always maintain the aspect ratio of the
    original image.

Use the cropping parameter like this:

<pre class="brush: html">
    &lt;img src="{{ content.image|thumbnail(100, 100, "r") }}">
</pre>

If you omit the width and height altogether, the thumbnail will use the
'default' size and cropping mode. Remember to add quotes around the cropping
mode.

<pre class="brush: html">
    &lt;img src="{{ content.image|thumbnail }}">
</pre>

You can set the size in your `config.yml`, like this:

<pre class="brush: plain">
thumbnails: [ 160, 120, c ]
</pre>


Filter: image
-------------

Use this modifier to create a link to an image of your choosing. For example:

<pre class="brush: html">
    &lt;img src="{{ content.photo|image }}">
</pre>

If `content.photo` is an image in your `files/` folder, like `2012-11/foo.jpg`, 
this modifier will output a link like `/files/2012-11/foo.jpg`. This is useful 
for creating absolute links to an image, regardless of whether Bolt is installed 
in the root of your domain, a subdomain or a folder.

You can specify three parameters: the width, height, and the mode of cropping. 
By doing so, the image will be resized, and it behave exactly like the 
[thumbnail filter](#filter-thumbnail).

<pre class="brush: html">
    &lt;img src="{{ content.photo|image(100, 100, "r") }}">
</pre>


Tag: imageinfo
--------------

Sometimes it can be useful to have more information about a specific image in
your templates. You might want to know which type it is, what the dimensions
are, and what the aspect ratio is. In these cases, the `imageinfo` tag can be
used. It returns an array of data about the image. See the screenshot for
details:

<a href="/files/imageinfo.png" class="fancybox" rel="fancybox">
    <img src="/files/imageinfo.png" width="600"></a>

To see the available values for an image, use: 

<pre class="brush: html">
  {{ print(imageinfo(record.image)) }} 
  {# assuming 'record.image' is the image of the current record. #}
</pre>

The aspect ratio is the proportional relationship between the width and the
height of the image. In general, this is used to determine whether an image is
'landscape' or 'portrait'. Note that an image is considered to be landscape if
the aspect ratio is equal to or larger than 5:4 (1.25). An image is considered
to be portrait if the aspect ratio is equal to or smaller than 4:5 (0.8). Images
between those ratios are considered to be Square, even though the width and
height might not be exactly equal. For example, an image that is 650 x 600
pixels is classified as square. If you need more precise values, you can do your
own calculations, using the 'aspectratio' value.

For example, if you want to style an image, depending
on its aspect ratio, you can use these values:

<pre class="brush: html">
{% if imageinfo(record.image).landscape %}
    &lt;img src="{{ thumbnail(record.image, 400, 320) }}" class="landscape">
{% elseif imageinfo(record.image).portrait %}
    &lt;img src="{{ thumbnail(record.image, 320, 400) }}" class="portrait">
{% else %}
    &lt;img src="{{ thumbnail(record.image, 320, 320) }}" class="square">
{% endif %}
</pre>

Tag: fancybox
-------------

Use this tag to insert an image in the HTML, which functions as a Fancybox popup. 
You can optionally provide the width, height and cropping parameters, like you can 
do with the `thumbnail`-tag.

<pre class="brush: html">
    {{ record.photo|fancybox(100, 100, "r") }}
    or
    {{ fancybox("2013-03/foo.jpg", 100, 100) }}
</pre>

Note that you should include the fancybox `.js` and `.css` yourself, as well as set up the 'initialization' code:

<pre class="brush: html">
  &lt;script src="{{ paths.app }}view/lib/fancybox/jquery.fancybox.pack.js">&lt;/script>
  &lt;link rel="stylesheet" type="text/css" href="{{ paths.app }}view/lib/fancybox/jquery.fancybox.css">

  &lt!-- set up fancybox here, or do this in your own .js file somewhere -->
  &lt;script type="text/javascript">
    $(document).ready(function() {
      $(".fancybox").fancybox({   
      });
  }); 
  &lt;/script>    
</pre>



Tag: showimage
-------------

Use this tag to insert an image in the HTML. You can optionally provide the width, 
height and cropping parameters, like you can do with the `thumbnail`-tag.

<pre class="brush: html">
    {{ record.photo|showimage(800, 600) }}">
    or
    {{ showimage("2013-03/foo.jpg", 800, 600) }}">
</pre>


Tag: redirect
-------------

Use this tag to redirect from a page to another page or domain. Commonly used in 
an if/else clause, to redirect visitors based on some criteria. 

<pre class="brush: html">
    {% if record.image!="" %}
        &lt;a href="{{ image(record.image) }}">
            &lt;img src="{{ thumbnail(record.image, 400, 260) }}">
        &lt;/a>
    {% else %}
        {# passive-aggressive way to tell people to find their own image #}
        {{ redirect('http://http://images.google.com/') }}
    {% endif %}
</pre>

<pre class="brush: html">
    {% setcontent records = "pages/latest/5" %}
    {% for record in records %}

        &lt;h2>&lt;a href="{{ record.link }}">{{ record.title }}&lt;/a>&lt;/h2>
        &lt;p>{{ record.excerpt() }}&lt;/p>

    {% else %}

        {{ redirect(paths.root) }} or {{ redirect('page/some-page') }}

    {% endfor %}
  </pre>

Filter: raw
-----------

If the content contains HTML-fields, they will be rendered with escaped characters 
by default. If you want to use the
HTML as-is, add the raw modifier:

<pre class="brush: html">
	{{ page|raw }}
</pre>

If we didn't add the `raw` modifier, all '<' and '>' characters in the body would 
be output as '&amp;lt;' and '&amp;gt;'
respectively. If 'body' is an HTML field in our contenttype, we want it to be 
output as normal HTML, so we have to add
the `raw` modifier.

Filter: order
-------------

In most cases the results of `{% setcontent %}` or `{{ record.related() }}` are
in the desired order. In some cases you might want to reorder them, by using the
`order`-filter. The filter takes one parameter: the name of the field you wish
to order the results on:

<pre class="brush: html">
    {% set relatedrecords = record.related() %}
    &lt;p class="meta">Related content:
        &lt;ul>
        {% for related in relatedrecords|order('datepublish') %}
            &lt;li>&lt;a href="{{ related.link }}">{{ related.title }}&lt;/a>&lt;/li>
        {%  endfor %}
        &lt;/ul>
    &lt;/p>
</pre>

or: 

<pre class="brush: html">
    {# get the 10 latest entries by date, but sort them on the title field %}
    {% setcontent entries = "entries/latest/10" %}
    &lt;ul>
    {% for entry in entries|order('title') %}
        &lt;li>&lt;a href="{{ entry.link }}">{{ entry.title }}&lt;/a>&lt;/li>
    {%  endfor %}
    &lt;/ul>
</pre>


Variable: app
-------------

<pre class="brush: html">
{{ app.config.general.sitename }}
</pre>


<pre class="brush: html">
{{ print(app.config.general) }}
</pre>

For more info on `app`, see the chapter on [Bolt Internals](/internals).


Tag: setcontent
---------------

This tag is used to perform various queries on the database. It converts a
human-readable query to actual records.

Much, much more information about the `setcontent` tag, together with additional
query arguments, pagination, sorting and other options you can find in the
chapter about [Fetching content](content-fetching).

These queries are currently possible:

  * <code>entry/12</code> - get entry with id 12
  * <code>page/about</code> - get page with slug about
  * <code>event/latest/5</code> - get latest 5 events
  * <code>news/first/5</code> - get first 5 newsitems
  * <code>quote/random/5</code> - get 5 random quotes
  * <code>animal/search/5</code> - search for animals and return 5 of them (use
    where parameter 'filter' to specify searchstring)
  * <code>(animal,plant)/search/20</code> - search for animals and plants and
    return 20 of them (use where parameter 'filter' to specify searchstring)

<pre class="brush: html">
{% setcontent about = 'page/about' %}

&lt;h3>{{ about.title }}&lt;/h3>
{{ about.introduction|raw }}

&lt;a href="{{ about|link }}">link&lt;/a>
</pre>




Tag: for
--------

<pre class="brush: html">
&lt;h3>Recent pages&lt;/h3>
{% set pages = content('pages', {'limit': 5, 'order': 'datecreated desc'}) %}
&lt;ul>
	{% for page in pages %}
		&lt;li>&lt;a href="{{ page|link }}">{{ page.title }}&lt;/a>&lt;/li>
	{% else %}
		&lt;p>No recent pages.&lt;/p>
	{% endfor %}
&lt;/ul>
</pre>

Tag: print()
-----------------

<pre class="brush: html">
{% set about = content('page', {'slug': 'about'}) %}

{{ print(about) }}
</pre>

For more info on debugging your Bolt site, see the chapter on [Bolt
Internals](/internals).






