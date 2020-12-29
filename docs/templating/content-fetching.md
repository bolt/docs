---
title: Fetching content
---
Fetching content
================

Besides content that is already available on a specific ContentType listing-
page or single-page [(Record and Records)](record-and-records), you can
directly fetch content from the database. For this you can use the
`{% setcontent ... %}` tag. The following example will get the content record
with slug 'about' from the 'pages' ContentType:

```twig
{% setcontent about = 'page/about' %}

{{ dump(about) }}
```

There are a lot of options for the `setcontent` tag. Most are optional, and all
can be used together any way you'd like. The most basic syntax is:

```twig
{% setcontent _variable_ = '_contenttype_' %}
```

This will set a _variable_ to contain the records of the given _contenttype_.
For example: `{% setcontent mypages = 'pages' %}` will set `{{ mypages }}` to
an array of all the records in 'pages'.


Trimming the amount of results
------------------------------
Normally, you don't need _all_ records, but a subset of the available records.
You can limit the number of records by using a `where` clause (more on that
below), but often it's easier to use the shortcut that Bolt provides.

If you need a single record, and know its `id` or `slug`, you can do this:

```twig
{# get the page with slug 'about' #}
{% setcontent about = 'page/about' %}

{# get the newsitem with id 12 #}
{% setcontent news = 'news/12' %}
```

If you need the '5 latest pages' or '3 first reviews', there's also a shortcut for that:

```twig
{% setcontent latestpages = 'pages' latest limit 5 %}

{{ dump(latestpages) }}
```

and:

```twig
{% setcontent firstreviews = 'reviews' earliest limit 3 %}

{{ dump(firstreviews) }}
```

Using `where`
-------------

If you need more specific criteria to select the records on, you can use the
`where` clause. The parameters must be listed in a hash.

```twig
{# get all pages with author id '2' #}
{% setcontent pages = 'pages' where { author: 2 } %}

{# get all events with eventdate '2012-10-15' #}
{% setcontent myevents = 'events' where { eventdate: '2012-10-15' } %}

```

The above examples selected records based on the parameter being **equal** to
the matching field in the available records. It's also possible to use
modifiers for the values, to select based on 'smaller than' or 'does not
equal':

```twig
{# get all pages not created by user '1' #}
{% setcontent mypages = 'pages' where { author: '!1' } %}

{# get all products where price is not empty #}
{% setcontent myproducts = 'products' where { price: '!' } %}

{# get all events with eventdate before '2012-10-15' #}
{% setcontent myevents = 'events' where { eventdate: '<2012-10-15' } %}

{# get all blog entries which have been published before last monday #}
{% setcontent myarticles = 'entries' where { status: 'published', publishedAt: '< last monday' } %}

{# get all books with amountsold over 1,000 #}
{% setcontent mybooks = 'books' where { amountsold: '>1000' } %}

{# get all blog entries except current record, negating a variable in the 'where' clause #}
{% set pageid = record.id %}
{% set whereid = '!' ~ pageid %}
{% setcontent blog_entries = 'blog' where { id: whereid } %}
```

You can also pass an object-like variable to the `where` clause, if this is more convenient for you.
This is useful when you're building the query dynamically, e.g. based on user input.

```twig
{% set condition = {'title': '%lorem%', 'status': "published"} %}
{% setcontent records = 'pages,showcases' where condition %}
```

<p class="tip"><strong>Tip:</strong> When using <code>'&lt;=2012-12-01'</code>
Bolt only selects dates before or equal to <code>'2012-12-01 00:00:00'</code>.
If you want to include December 1st, use <code>'&lt;2012-12-02'</code>. </p>

### The `%like%` option

```twig
{# get all pages with titles that contain 'ipsum' #}
{% setcontent mypages = 'pages' where { title: '%ipsum%' } %}
```

The `%like%` option is case-insensitive, and does not take word boundaries into
account. So, this example will return the pages with these titles:

  - 'Lorum ipsum dolor'
  - 'LORUM IPSUM DOLOR'
  - 'Lorumipsumdolor'
  - 'ipsumdolor'

But not:

  - 'Lorum ipsüm dolor'
  - 'Lorum ips um dolor'


<p class="tip"><strong>Tip:</strong> When using only one <code>%</code>, Bolt
will match only the beginning or the end of the field. For example:
<code>'lore%'</code> and <code>'%olor'</code> will both match "Lorem Ipsum
Dolor", but <code>'ipsu%'</code> won't. </p>

### Using taxonomies

You can use the same syntax to get records with a specific taxonomy. Note that
you should always use the _plural_ name of the taxonomy in the query:

```twig
{# get all events in the category 'music' #}
{% setcontent myevents = 'events' where { categories: 'music' } %}

{# get all pages with tag 'book' or 'movie' #}
{% setcontent mypages = 'pages' where { tags: 'book || movie' } %}
```

### Selecting on dates

You can use several 'shortcuts' for selecting records with dates in the past or
future. Some examples are:

  - `now` - The current date and time.
  - `today` - The current date, today at midnight.
  - `tomorrow` - The date of tomorrow, at midnight.
  - `yesterday` - The date of yesterday, at midnight.
  - `last year`
  - `next thursday`

You can use these date notations like this:

```twig
{# Selecting pages published _before_ yesterday #}
{% setcontent mypages = 'pages' where { publishedAt: '<yesterday' } %}

{# If you want to include yesterday in your `where`, use 'before today' #}
{% setcontent mypages = 'pages' where { publishedAt: '<today' } %}

{# Selecting pages published earlier today, or in the future #}
{% setcontent mypages = 'pages' where { publishedAt: '>today' } %}

{# Selecting pages published today only #}
{% setcontent mypages = 'pages' where { publishedAt: '>today && <tomorrow' } %}
```

<p class="tip"><strong>Tip:</strong> When using 'where' statements with a field
that is a date, you can use relative, textual dates, like <code>'last monday'
</code> or <code>'&gt; this year'</code>. Internally, Bolt uses the PHP <code>
strtotime()</code> function for this, so we refer to its
<a href="https://www.php.net/manual/en/function.strtotime.php" target="_blank">
manual page</a> for details. </p>

Like mentioned above, you can add more than one parameter to the where
clause:

```twig
{# get all pages not created by 'pete', and created after july 2012, with a .jpg image #}
{% setcontent mypages = 'pages' where { author: '!3', createdAt: '>2012-07-31', image: '%.jpg%' } %}
```

### 'AND' and 'OR'

You can use the `&&` and `||`-parameters to select on two criteria for any
field. However, you can't use something like `where { ownerid: '!3', ownerid:
'!4'}` because of the way hashes work in twig: The second `ownerid` would
overwrite the first. Instead, you can use the `&&` and `||`-parameters to
either select using `AND` or `OR`. examples:

```yaml
{# get all pages created by ownerid '3' or '4' #}
{% setcontent mypages = 'pages' where { author: '3 || 4' } %}

{# get all pages with an id greater than 29, but smaller or equal to 37 #}
{% setcontent mypages = 'pages' where { id: '>29 && <=37' } %}
```

Please note that using these operators, it'll be quite easy to create a
where statement that will never give good results:

```twig
{# This will _always_ match: #}
{% setcontent mypages = 'pages' where { author: '!3 || !4' } %}

{# This will never work: #}
{% setcontent mypages = 'pages' where { id: '<29 && >37' } %}
```

Getting content for a specific user
-----------------------------------

As you might've noticed, in the examples above, we've used `author` a couple
of times to get content specific to a given user. In Bolt, content is stored
with a reference to the author. This means that you
cannot do things like this:

```twig
{# get all pages created by user 'bob' #}
{% setcontent mypages = 'pages' where { author: 'bob' } %}
```

Instead, you'll need to use `author: 1`. If you don't know the `id`, but
you _do_ know their name, you can use the `getuser()` function.

```twig
{# get all pages created by user 'bob' #}
{% set myuserid = getuser('bob').id %}
{% setcontent mypages = 'pages' where { author: myuserid } %}

{# or, on one line #}
{% setcontent mypages = 'pages' where { author: getuser('bob').id } %}
```

Using `limit`
-------------
There's a default built-in limit to the amount of records returned, which is 20. It is good
practice to limit the maximum number of records, by adding a `limit` clause.

```twig
{# get 10 pages created by 'bob' #}
{% setcontent mypages = 'pages' where { author: getuser('bob').id } limit 10 %}
```

Paginating results
------------------
By default, Bolt will paginate records with the default for the `limit` directive. It will
also match the current page, using the `?page=2` query parameter in the URL, e.g.
`example.org/entries?page=2`

Additionally, you can specify/override the current page of results using the `page` directive:

```twig
{% setcontent entries = 'entries' page 4 %}
```

To read more about pagination in Bolt, check the [Paging content][paging-content] page.

Ordering results
----------------
The results can be sorted by any of the fields of the ContentType, using the
`orderby` clause. You can sort either ascending or descending. The order is
determined by the inclusion (or omission) of the minus before the name of
the field: `title` vs. `-title`.

```twig
{# get 10 pages, sorted alphabetically on title #}
{% setcontent mypages = 'pages' limit 10 orderby 'title' %}

{# get the 10 latest modified pages, sorted datechanged descending #}
{% setcontent mypages = 'pages' limit 10 orderby '-datechanged' %}
```

Note that the records are fetched from the database, according to the `orderby`
parameter. If you use `orderby 'title'`, you will get records with titles
starting with 'a'.

### Random order

To get 'random' selection of records, you can use the `random` directive,
either in combination with the `limit` directive or on its own.

The example below will return a pseudo-randomised selection of 3 testimonials:
```twig
{% setcontent testimonials = 'testimonials' random limit 3 %}
```

One record or multiple records?
-------------------------------
Sometimes Bolt will return one record, and sometimes a set of records. What
makes the difference?

```twig
{% setcontent mypage = 'page/about' %}
{{ mypage }} {# mypage is one record #}

{% setcontent mypages = 'page' latest 5 %}
{% for mypage in mypages %}
  {{ mypage }} {# mypages is an array that we can iterate over #}
{% endfor %}
```

Bolt tries to make an assumption about how you want to use it, based on what
you're requesting. By default, an array is returned, unless one of the
following is the case:

  - `{% setcontent foo = 'bar/1' %}` or `{% setcontent foo = 'bar/qux' %}`:
    When requesting one specific record, only one is returned.
  - `{% setcontent foo = 'pages' .. returnsingle %}`: If the `returnsingle`
    parameter is passed, Bolt assumes you only need one result.

If you use `limit 1`, you will get an array with 1 record. Unless, of course,
one of the above criteria was met.

To override the default behaviour, you can explicitly request either a single
record or multiple records:
```twig
{% setcontent mypage = 'pages' returnsingle %}
{# by specifying `returnsingle`, Bolt will return a single page from the pages ContentType #}

{% setcontent arrayofpages = 'pages' returnmultiple %}
{# by specifying `returnmultiple`, Bolt will return an array of pages, even if it is an array of 1 #}
```


Using the `printquery` option
-----------------------------

If you're working on selecting some content, but aren't quite getting the
desired results, you can add `printquery` to the `{% setcontent %}`- tag. Doing
this will output the SQL query Bolt creates and executes. For example:

```
{% setcontent entries = 'entries' latest 5 printquery %}

will show:

SELECT content FROM Bolt\Entity\Content content WHERE content.contentType = :ct0 AND content.status = :status_1 ORDER BY content.publishedAt DESC
ct0: entries
status_1: published
```

[paging-content]: ../templating/content-paging
