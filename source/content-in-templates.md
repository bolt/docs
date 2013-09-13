Content in templates
====================

Perhaps the thing you'll do most in templates is access records of content. Either by requesting specific content, or
implicitly when requesting pages that are the defaults for certain contenttypes.

Using a {{ record }}
----------------------

The easiest way to see what the contents of a record (or any other variable, for that matter) are, is to use the print()
function:

<pre class="brush: html">
{{ print(record) }}
</pre>

<a href="/files/content-example3.png" class="fancybox"><img src="/files/content-example3.png" width="500"></a>

As you can see in the screenshot, a record of a contenttype is an `object`. There are several benefits to this over a
regular `array`. We can access the fields like regular values, but we can also use specific functionality for every
object, without the need to define these separately.

You can access regular fields in a record like these examples for either a `page` or `entry` record:
<pre class="brush: html">
{{ page.title }}
{{ page.text }}

Created on {{ entry.datecreated|date('Y-m-d')}}

The contenttype for this entry is {{ entry.contenttype.name }},
and it contains {{ entry.contenttype.fields|length }} fields.
</pre>

The real power comes from using the special functions that are defined for every content record.

To get a link to the content:
<pre class="brush: html">
Link: &lt;a href="{{ page.link }}">{{ page.title }}&lt;/a>
</pre>

Get a short excerpt of the record:

<pre class="brush: html">
&lt;p>{{ page.excerpt(250) }}&lt;/p>
</pre>

#### Geolocation

The 'Geolocation' field type allows you to easily pick and use geolocations. You can use the given address, the
latitude, longitude, and the reverse geocoded address. To see the values that are stored, use `{{
print(page.geolocation) }}`. To insert a simple map from google with a marker at the given location, use:

<pre class="brush: html">
&lt;div>
&lt;img src="http://maps.googleapis.com/maps/api/staticmap?center={{ page.geolocation.latitude }},{{ page.geolocation.longitude }}&zoom=14&size=617x300&sensor=false&markers={{ page.geolocation.latitude }},{{ page.geolocation.longitude }}">
&lt;/div>
</pre>

More info about these static maps, can be found at [Static Maps API V2 Developer
Guide](https://developers.google.com/maps/documentation/staticmaps). Of course, you can use the geolocations with any
mapping service you like, since the latitude and longitude are universal.

#### Video

If you're using the 'video' field type, more information about the video is available. To see the values that are
stored, use `{{ print(page.video) }}`. To insert the `<embed>`-code for the video, use:

<pre class="brush: html">
{{ page.video.html }}
</pre>

There's also a special 'responsive' HTML snippet available for videos. To insert it, use the following, and add the
required CSS to your stylesheet:

<pre class="brush: html">
{{ page.video.responsive }}
</pre>

<pre class="brush: css">
/**
 * Styles for 'responsive video embeds'
 */
.responsive-video {
  height: 0; padding-top: 25px; padding-bottom: 67.5%; margin-bottom: 10px; position: relative; overflow: hidden;
}
.responsive-video.vimeo {
  padding-top: 0;
}
.responsive-video.widescreen {
  padding-bottom: 57.25%;
}
.responsive-video embed, .responsive-video iframe, .responsive-video object, .responsive-video video {
  top: 0; left: 0; width: 100%; height: 100%; position: absolute;
}
@media (max-width: 767px) {
  .responsive-video {
    padding-top: 0;
  }
}
</pre>

#### Imagelist

The imagelist fieldtype is accessible as an array. This is convenient for most cases, because this makes it easy to output them as lists in your HTML. This simple example for an imagelist field named 'slider' will output thumnbails for each of the images, with links to the full sized versions.

<pre class="brush: html">
{% for image in page.slider %}
  &lt;a href="{{ image.filename|image }}" title="{{ image.title }}">
    &lt;img src="{{ image.filename|thumbnail(100,100) }}">
  &lt;/a>
{% endfor %}
</pre>

The next example outputs a wrapping div and an unordered list, but only if the list actually contains elements. The first and last item in the list also get a custom 'first' and 'last' class added to them.

<pre class="brush: html">
  {% if page.slider|length > 0 %}
  &lt;div class='imageslider'>
    &lt;ul>
      {% for image in page.slider %}
      &lt;li class="{% if loop.first %}first {% endif %}{% if loop.last %}last {% endif %}">
        &lt;img src="{{ image.filename|thumbnail(320,240) }}" alt="{{ image.title }}">
      &lt;/li>
      {% endfor %}
    &lt;/ul>
  &lt;/div>
  {% endif %}
</pre>


### Getting the type of a certain field

If you're iterating over an array of record.values, it's sometimes useful to know what type of field you're dealing
with. This is where the `fieldkey()` function comes in handy:

<pre class="brush: html">
{% for key,value in record.values %}

  {% if record.fieldtype(key) == "image" %}

      <div class='imageholder-wide'><img src="{{ record.image|thumbnail(800, 600) }}"></div>

  {% elseif record.fieldtype(key) not in ['templateselect'] and value != "" %}

      {{ value }}

  {%  endif %}

{% endfor %}
</pre>


<p class="note"><strong>Note:</strong> To create connections between different records of the same or different contenttypes, see the page on [Relations and Taxonomies](/taxonomies).</p>


Using {{ records }}
-------------------

The `{{ records }}` array, is basically a set of several content records. When you have a `{{ records }}`array, you can
iterate over each of the records to output them as desired. In the following example you can see how to get an array of
records. You'll notice that in this case it's not actually called `records`, but `pages`. Since it's just a variable
name, we can call it whatever we like. After getting the `{{ pages }}` array, we use a simple `for` loop, so we can
iterate over each of the separate `{{ page}}` records.

<pre class="brush: html">
{% setcontent pages = 'pages/latest/4' %}

{% for page in pages %}

	// Do something with each {{ page }}
	{{ page.title }}

{% endfor %}
</pre>

Because `{{ records }}` is an array, we can use all the regular Twig functionality for arrays. In the previous example
we've shown how to iterate over the records using a `for` loop, but you can also do things like the following.

Check how many records there are:

<pre class="brush: html">
{% if pages|length > 0 %} More than 0 records {% endif %}

{% if pages|length < 5 %} Less than 5 records {% endif %}

There are exactly {{ pages|length }} records.
</pre>

[Reverse](http://twig.sensiolabs.org/doc/filters/reverse.html) the array:

<pre class="brush: html">
{% for page in pages|reverse %}

	// Do something with each {{ page }}
	{{ page.title }}

{% endfor %}
</pre>

Or [slice](http://twig.sensiolabs.org/doc/filters/slice.html) the array:

<pre class="brush: html">
{% set slice = pages|slice(1,3) %}

{% for page in slice %}

	// Do something with {{ page }} 1 through 3
	{{ page.title }}

{% endfor %}
</pre>

