Fetching content
================

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

## Limiting the results, using `where`

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

{# get all blog artcles which have been published before last monday #}
{% setcontent myevents = 'pages' where { status: 'published', datepublish: '&lt; last monday' } %}

{# get all books with amountsold over 1,000 #}
{% setcontent mybooks = 'books' where { amountsold: '&gt;1000' } %}

{# get all pages with a title that contains 'ipsum' #}
{% setcontent mypages = 'pages' where { title: '%ipsum%' } %}
</pre>

<p class="tip"><strong>Tip:</strong> When using <code>'&lt;=2012-12-01'</code> Bolt only selects dates before or equal
to <code>'2012-12-01 00:00:00'</code>. If you want to include December 1st, use <code>'&lt;2012-12-02'</code>. </p>

<p class="tip"><strong>Tip:</strong> When using 'where' statements with a field that is a date, you can use relative, textual dates, like <code>'last monday'</code> or <code>'&gt; this year'</code>. Internally, Bolt uses the <code>strtotime()</code> funtion for this, so we refer to its <a href="http://php.net/manual/en/function.strtotime.php" target="_blank">manual page</a> for details. </p>

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

By using '|||'-parameters (three pipes) you can create an OR-part for multiple columns. For example:

<pre class="brush: html">
{# Select users from Amsterdam that match either username 'pete' or firstname 'Mike' #}
{% setcontent mypages = 'pages' where { city: 'Amsterdam', 'username ||| firstname': 'pete ||| Mike' } %}

{#
    Query output:
    WHERE ( (city = 'Amsterdam') AND ( (username = 'pete') OR (firstname = 'Mike') ) )
#}
</pre>


## Using `limit`.

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
  - `{% setcontent foo = 'pages' .. returnsingle %}`: If the 'returnsingle' parameter is passed, Bolt assumes you only need one result.

If you use 'limit 1', you will get an array with 1 record. Unless, of course, one of the above criteria was met.
