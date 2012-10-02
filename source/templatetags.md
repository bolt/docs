Bolt Template tags
==================

As mentioned before, a template in Bolt can use all of the standard Twig tags, with a few additions that are specific to working with Bolt. If you're not familiar with Twig yet, you should read "[Twig for Template Designers](http://twig.sensiolabs.org/doc/templates.html)", on the official Twig website. 

Below you'll find the tags we've added specifically for Bolt, along with some commonly used snippets, like menus. 

Tag: include
------------

Use this to include another Twig template in the current template. Twig parses the template like any other template, so you can use any tags in your included template that you would use in the 'main' template. You can also use `include` inside the included templates. 

<pre class="brush: html">
	{% include '_header.twig' %}
</pre>

For more information, see [include](http://twig.sensiolabs.org/doc/tags/include.html)

Modifier: link
--------------

Create a link to the current record.

<pre class="brush: html">
	{{ entry|link }}
</pre>

or: 

<pre class="brush: html">
	<a href="{{ page|link }}">Link to {{ page.title }}</a>
</pre>


Modifier: current
-----------------

Checks if a given record corresponds to the page being shown in the browser. Useful for adding 'active' states to menus and such. 

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


Modifier: thumbnail
-------------------

Use this modifier to create a link to an automatically generated thumbnail of a size of your choosing. For example:

<pre class="brush: html">
	&lt;img src="{{ content.image|thumbnail(320, 240) }}">
</pre>

If `content.image` is an image in your files/ folder, like 'foo.jpg', this modifier will output a link like '/thumbs/240x320/foo.jpg'

You can specifiy three parameters: the width, height, and the mode of cropping. The mode of croppingis important if you're requesting a thumbnail that has different proportions than the original image. Valid options for cropping are:

  -  'f' ('fit') - The image will not be cropped but resized to fit within the given maximum width and height. This means that you can get an image with different width and height than you specified, to make it fit within the boundaries. 
  - 'c' (crop, default) - Makes sure you always get an image that is the specified width and height. The image is not transformed, so it will be cropped to fit the boundaries is necessary. 
  - 'b' (borders) - Will add a border to the image, in order to make it fit within the given boundaries. 
  - 'r' (resize) - Will resize the image to fit the boundaries, without cropping. This means your thumbnail might de deformed, if the aspect ratio of the thumbnail differs from the original image. 


Modifier: raw
-------------

If the content contains HTML-fields, they will be rendered with escaped characters by default. If you want to use the HTML as-is, add the raw modifier:

<pre class="brush: html">
	{{ page|raw }}
</pre>

If we didn't add the `raw` modifier, all '<' and '>' characters in the body would be output as '&amp;lt;' and '&amp;gt;' respectively. If 'body' is an HTML field in our contenttype, we want it to be output as normal HTML, so we have to add the `raw` modifier.


Modifier: date
--------------

<pre class="brush: html">
{{ content.datecreated|date("M d, ’y")}}
</pre>

See the various options for 'date' on the [PHP website](http://nl3.php.net/manual/en/function.date.php).


Variable: app
-------------

<pre class="brush: html">
{{ app.config.general.sitename }}
</pre>


<pre class="brush: html">
{{ print(app.config.general) }}
</pre>



Tag: set / content
------------------

<pre class="brush: html">
{% set about = content('page', {'slug': 'about'}) %}
{# check if there's a page with slug 'about' #}
{% if about.title is defined %}

    &lt;h3>{{ about.title }}&lt;/h3>
    {{ about.introduction|raw }}

    &lt;a href="{{ about|link }}">link&lt;/a>

{% else %}

    &lt;h3>Alas, no about!&lt;/h3>
    
{% endif %}
</pre>

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

Function: print()
-----------------

<pre class="brush: html">
{% set about = content('page', {'slug': 'about'}) %}

{{ print(about) }}
</pre>



<pre class="brush: html">

</pre>




