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
object, without the need to define these seperately.

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
iterate over each of the seperate `{{ page}}` records.

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

Fetching content
----------------

To get content from the database, you can use the `setcontent` tag. The following example will get the content record
with slug 'about' from the 'pages' contenttype:

<pre class="brush: html">
{% setcontent about = 'page/about' %}

{{ print(about) }}
</pre>

There are a lot of options for the `setcontent` tag. Most are optional, and all can be used together any way you'd like.
The most basic syntax is:

<code>
{% setcontent _variable_ = '_contenttype_' %}
</code>

This will set a _variable_ to contain the records of the given _contenttype_. For example: `{% setcontent mypages =
'pages' %}` will set `{{ mypages }}` to an array of all the records in 'pages'.

### Limiting the results, using `where`

Normally, you don't need _all_ records, but a subset of the available records.. You can limit the number of records by using a 'where' clause (more on that below), but often it's easier to use the shortcut Bolt provides.

If you need a single record, and know its id or slug, you can do this:

<pre class="brush: html">
{# get the page with slug 'about' #}
{% setcontent about = 'page/about' %}

{# get the newsitem with id 12 #}
{% setcontent news = 'news/12' %}
</pre>

If you need the '5 latest pages' or '3 first reviews', there's also a shortcut for that:

<pre class="brush: html">
{% setcontent latestpages = 'pages/latest/5' %}

{{ print(latestpages) }}
</pre>

and:

<pre class="brush: html">
{% setcontent firstreviews = 'reviews/first/3' %}

{{ print(firstreviews) }}
</pre>

If you need a more specific criteria to select the records on, you can use the `where` clause. The parameters must be
listed as a hash, so you can include more than one, if needed.

<pre class="brush: html">
{# get all pages with username 'bob' #}
{% setcontent mypages = 'pages' where { username: 'bob' } %}

{# get all events with eventdate '2012-10-15' #}
{% setcontent myevents = 'events' where { eventdate: '2012-10-15' } %}

</pre>

The above examples selected records based on the parameter being **equal** to the matching field in the available
records. It's also possible to use modifiers for the values, to select based on 'smaller than' or 'does not equal'

<pre class="brush: html">
{# get all pages not created by 'bob' #}
{% setcontent mypages = 'pages' where { username: '!bob' } %}

{# get all events with eventdate before '2012-10-15' #}
{% setcontent myevents = 'pages' where { eventdate: '&lt;2012-10-15' } %}

{# get all books with amountsold over 1,000 #}
{% setcontent mybooks = 'books' where { amountsold: '&gt;1000' } %}

{# get all pages with a title that contains 'ipsum' #}
{% setcontent mypages = 'pages' where { title: '%ipsum%' } %}
</pre>

<p class="tip"><strong>Tip:</strong> When using <code>'&lt;=2012-12-01'</code> Bolt only selects dates before or equal
to <code>'2012-12-01 00:00:00'</code>. If you want to include december 1st, use <code>'&lt;2012-12-02'</code>. </p>

The `%like%` option is case-insensitive, and does not take word boundaries into account. So, this last example will
return the pages with these titles:

  - 'Lorum ipsum dolor'
  - 'LORUM IPSUM DOLOR'
  - 'Lorumipsumdolor'
  - 'ipsumdolor'

But not:

  - 'Lorum ipsüm dolor'
  - 'Lorum ips um dolor'


<p class="tip"><strong>Tip:</strong> When using only one <code>%</code>, Bolt will match only the beginning or the end
of the field. For example: <code>'lore%'</code> end <code>'olor%'</code> will both match "Lorem Ipsum Dolor", but
<code>'ipsu%'</code> won't. </p>

You can use several 'shortcuts' for selecting records with dates in the past or future. These are:

  - `NOW` - The current date and time.
  - `TODAY` - The current date, today at midnight.
  - `TOMORROW` - The date of tomorrow, at midnight.
  - `YESTERDAY` - The date of yesterday, at midnight.

Some examples of these are:

<pre class="brush: html">
{# Selecting pages published _before_ yesterday #}
{% setcontent mypages = 'pages' where { datepublish: '&lt;YESTERDAY' } %}

{# If you want to include yesterday in your `where`, use 'before today' #}
{% setcontent mypages = 'pages' where { datepublish: '&lt;TODAY' } %}

{# Selecting pages published earlier today, or in the future #}
{% setcontent mypages = 'pages' where { datepublish: '&gt;TODAY' } %}

{# Selecting pages published today only #}
{% setcontent mypages = 'pages' where { datepublish: '&gt;TODAY', datepublish: '&lt;TOMORROW' } %}
</pre>

<p class="note"><strong>Note:</strong> These shortcuts are case sensitive, so you must use CAPS. <code>'&lt;today'</code>
will not work.</p>

Like mentioned above, you can add more than one parameter to the where clause:

<pre class="brush: html">
{# get all pages not created by 'pete', and created after july 2012, with a .jpg image #}
{% setcontent mypages = 'pages' where { username: '!pete', datecreated: '>2012-07-31', image: '%.jpg%' } %}
</pre>

You can use the `&&` and `||`-parameters to select on two criteria for any field. However, you can't use something like `where { username: '!pete', username: '!mike'}` because of the way hashes work in twig: The second `username` would overwrite the first.
Instead, you can use the `&&` and `||`-parameters to either select using `AND` or `OR`. examples:

<pre class="brush: html">
{# get all pages created by 'pete' or 'mike' #}
{% setcontent mypages = 'pages' where { username: 'pete || mike' } %}

{# get all pages with an id greater than 29, but smaller or equal to 37 #}
{% setcontent mypages = 'pages' where { id: '>29 && &lt;=37' } %}
</pre>

Please note that using these operators, it'll be quite easy to create a where statement that will never give good results:

<pre class="brush: html">
{# This will _always_ match: #}
{% setcontent mypages = 'pages' where { username: '!pete || !mike' } %}

{# This will never work: #}
{% setcontent mypages = 'pages' where { id: '&lt;29 && &gt37' } %}
</pre>



### Using `limit`.

There's no built-in limit to the amount of records returned. It is good practice to limit the maximum number of records,
by adding a `limit` clause.

<pre class="brush: html">
{# get 10 pages created by 'bob' #}
{% setcontent mypages = 'pages' where { username: 'bob' } limit 10 %}
</pre>

### Ordering results.

The results can be sorted by any of the fields of the contenttype, using the `orderby` clause. You can sort either
ascending or descending.

<pre class="brush: html">
{# get 10 pages, sorted alphabetically on title #}
{% setcontent mypages = 'pages' limit 10 orderby 'title' %}

{# get the 10 latest modified pages, sorted datechanged descending #}
{% setcontent mypages = 'pages' limit 10 orderby '-datechanged' %}

Note that the records are fetched from the database, according to the `orderby` parameter. If you use `orderby 'title'`, you will get records with titles starting with 'a', and not just some records, that are sorted after fetching them from the database.

</pre>

<h3>One record or multiple records?</h3>

Sometimes Bolt will return one record, and sometimes a set of records. What makes the difference?

<pre class="brush: html">
{% setcontent mypage = 'page/about' %}
{{ mypage }} {# mypage is one record #}

{% setcontent mypages = 'page/latest/5' %}
{% for mypage in mypages %}
  {{ mypage }} {# mypages is an array, that we can loop #}
{% endfor %}
</pre>

Bolt tries to make an assumption about how you want to use it, based on what you're requesting. By default, an array is
returned, unless one of the following is the case:

  - `{% setcontent foo = 'bar/1' %}` or `{% setcontent foo = 'bar/qux' %}`: When requesting one specific record, only
    one is returned.
  - `{% setcontent foo = 'page' where { .. } %}`: If 'page' is the singular slug of the contenttype 'pages', Bolt
    assumes you only need one.

If you use 'limit 1', you will get an array with 1 record. Unless, of course, one of the above criteria was met.

Paging
------

When you have more records than you'd like to display on one page, you can add paging.

If you want to add paging to your template, add `allowpaging` to your `setcontent` tag, and add a `pager` tag.

<pre class="brush: html">
{% setcontent entries = "entries/latest/3" allowpaging %}

{% for entry in entries %}
    {{ entry.title }}
{% endfor %}

{{ pager() }}
</pre>

If you have more than one block of records that you want to paginate on one page, you can use their names in a parameter
to keep them seperate:

<pre class="brush: html">
{% setcontent entries = "entries/latest/3" allowpaging %}

{{ pager('entries') }}

{% setcontent mypages = "pages/latest/6" allowpaging %}

{{ pager('pages') }}

</pre>

You can add an optional parameter do determine how many 'neigbouring' pages are shown in the pager:

<pre class="brush: html"> {{ pager('', 2) }} or: {{ pager('', 4) }} </pre>

By default, Bolt will output a simple yet functional pager. Be sure to add some styles to your CSS to make it look
right. These are the default rules:

<pre class="brush: css">
.pagination {
}

.pagination ul {
    float: left;
    clear: both;
    display: block;
    margin: 8px 0;
    padding: 0;
    border: 1px solid #DDD;
}

.pagination ul li {
    float: left;
    list-style-type: none;
    border-right: 1px solid #DDD;
    padding: 4px 6px;
}

.pagination ul li:last-child {
    border-right: none;
}

.pagination ul li.active {
    font-weight: bold;
    background-color: #CCF;
}

.pagination ul li a {
    text-decoration: none;
}
</pre>

If you'd like to define your own pager from scratch, just copy `/app/view/_sub_pager.twig` to your own `view` folder,
and rename it to something like `_sub_mypager.twig`. Then, pass the name as an extra parameter to the `pager` tag:

<pre class="brush: html">
{{ pager('', 3, '_sub_mypager.twig') }}
</pre>


Search template
---------------

There are two ways to search. You can use the global search, which searches through all the contenttypes. Or you
can use the search which is provided in the {% setcontent .. %} tag.

#### Global search

The global search is configured inside the config.yml and the routing.yml. In config you define which template
will show the results and in the routing you could change to default URL.
By default this global search will search through all contenttypes unless 'searchable' is set to _false_.

You can initiate the search by visiting the URL `/search?q=SEARCH`. 

In the template you have access to three variables:

  - **records** - the search result records
  - **search** - the sanitized search query
  - **searchresult** - an array with various values regarding your search

Example use case:

<pre class="brush: html">
<p>
    {{ searchresult.no_of_results }} results for {{ search }} found.
</p>

<ol>
{% for record in records %}
    <li>
        <a href="{{ record.link }}">{{ record.title }}</a>
        <!-- {{ record.searchresultweight }} - this returns the weight of the result, an indication of the relevance }} -->
    </li>
{% endfor %}
</ol>
</pre>

The search added one 'special' value added to each record: `record.searchresultweight`. The results are sorted on this value, as it's an
indication to how good it matched.
In the default implementation it returns a score of how good the search terms matched
against a record. For instance, if the search term was **exactly** the title it returns a higher score then when it only
matched some part of the title or body text.
It's a fairly subjective scoring algorithm but it should suffice for most cases.

The other two variables are `search` which returns a sanitatized query, which is the actual query that ran. And `searchresult` which
contain various values useful to show. 

  - **searchresult.no&#x5f;of&#x5f;results** - number of actual results (ignores paging of course)
  - **searchresult.query** - the decoded and parsed query in an array. you can use the values but there is no guarantee they won't change in newer versions of Bolt.
  - **searchresult.results** - the search results, same as `records`

#### {% setcontent %} search

This search allows you to specify exactly where the search should look. It works just like a normal `{% setcontent %}`.

Some examples:

<pre class="brush: html">
{# search for the BOGEYMAN in the contenttype 'pages' #}
{% setcontent results = 'pages/search' with { filter: 'BOGEYMAN' } %}

{# search for the BOGEYMAN in the contenttype 'pages' and return only the first 5 results #}
{% setcontent results = 'pages/search/5' with { filter: 'BOGEYMAN' } %}

{# search for the BOGEYMAN in the contenttype 'pages' and the contenttype 'entries' #}
{% setcontent results = '(pages,entries)/search' with { filter: 'BOGEYMAN' } %}
</pre>

As you can see you have more control of where to look but you cannot see the decoded query or the actual number of results.
