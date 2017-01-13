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

```
{% setcontent about = 'page/about' %}

{{ dump(about) }}
```

There are a lot of options for the `setcontent` tag. Most are optional, and all
can be used together any way you'd like. The most basic syntax is:

```
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

```
{# get the page with slug 'about' #}
{% setcontent about = 'page/about' %}

{# get the newsitem with id 12 #}
{% setcontent news = 'news/12' %}
```

If you need the '5 latest pages' or '3 first reviews', there's also a shortcut for that:

```
{% setcontent latestpages = 'pages/latest/5' %}

{{ dump(latestpages) }}
```

and:

```
{% setcontent firstreviews = 'reviews/first/3' %}

{{ dump(firstreviews) }}
```

Using `where`
-------------

If you need more specific criteria to select the records on, you can use the
`where` clause. The parameters must be listed in a hash.

```
{# get all pages with ownerid '2' #}
{% setcontent mypages = 'pages' where { ownerid: '2' } %}

{# get all events with eventdate '2012-10-15' #}
{% setcontent myevents = 'events' where { eventdate: '2012-10-15' } %}

```

The above examples selected records based on the parameter being **equal** to
the matching field in the available records. It's also possible to use
modifiers for the values, to select based on 'smaller than' or 'does not
equal':

```
{# get all pages not created by user '1' #}
{% setcontent mypages = 'pages' where { ownerid: '!1' } %}

{# get all products where price is not empty #}
{% setcontent myproducts = 'products' where { price: '!' } %}

{# get all events with eventdate before '2012-10-15' #}
{% setcontent myevents = 'events' where { eventdate: '<2012-10-15' } %}

{# get all blog entries which have been published before last monday #}
{% setcontent myarticles = 'entries' where { status: 'published', datepublish: '< last monday' } %}

{# get all books with amountsold over 1,000 #}
{% setcontent mybooks = 'books' where { amountsold: '>1000' } %}
```

<p class="tip"><strong>Tip:</strong> When using <code>'&lt;=2012-12-01'</code>
Bolt only selects dates before or equal to <code>'2012-12-01 00:00:00'</code>.
If you want to include December 1st, use <code>'&lt;2012-12-02'</code>. </p>

### The `%like%` option

```
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

```
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

```
{# Selecting pages published _before_ yesterday #}
{% setcontent mypages = 'pages' where { datepublish: '<yesterday' } %}

{# If you want to include yesterday in your `where`, use 'before today' #}
{% setcontent mypages = 'pages' where { datepublish: '<today' } %}

{# Selecting pages published earlier today, or in the future #}
{% setcontent mypages = 'pages' where { datepublish: '>today' } %}

{# Selecting pages published today only #}
{% setcontent mypages = 'pages' where { datepublish: '>today && <tomorrow' } %}
```

<p class="tip"><strong>Tip:</strong> When using 'where' statements with a field
that is a date, you can use relative, textual dates, like <code>'last monday'
</code> or <code>'&gt; this year'</code>. Internally, Bolt uses the <code>
strtotime()</code> funtion for this, so we refer to its
<a href="http://php.net/manual/en/function.strtotime.php" target="_blank">
manual page</a> for details. </p>

Like mentioned above, you can add more than one parameter to the where
clause:

```
{# get all pages not created by 'pete', and created after july 2012, with a .jpg image #}
{% setcontent mypages = 'pages' where { ownerid: '!3', datecreated: '>2012-07-31', image: '%.jpg%' } %}
```

### 'AND' and 'OR'

You can use the `&&` and `||`-parameters to select on two criteria for any
field. However, you can't use something like `where { ownerid: '!3', ownerid:
'!4'}` because of the way hashes work in twig: The second `ownerid` would
overwrite the first. Instead, you can use the `&&` and `||`-parameters to
either select using `AND` or `OR`. examples:

```yaml
{# get all pages created by ownerid '3' or '4' #}
{% setcontent mypages = 'pages' where { ownerid: '3 || 4' } %}

{# get all pages with an id greater than 29, but smaller or equal to 37 #}
{% setcontent mypages = 'pages' where { id: '>29 && <=37' } %}
```

Please note that using these operators, it'll be quite easy to create a
where statement that will never give good results:

```yaml
{# This will _always_ match: #}
{% setcontent mypages = 'pages' where { ownerid: '!3 || !4' } %}

{# This will never work: #}
{% setcontent mypages = 'pages' where { id: '<29 && >37' } %}
```

By using the `|||`-operator (three pipes) you can create an `OR`-part for
multiple columns. For example:

```
{# Select users from Amsterdam that match either username 'pete' or firstname 'Mike' #}
{% setcontent mypages = 'pages' where { city: 'Amsterdam', 'username ||| firstname': 'pete ||| Mike' } %}

{# Query output:
    WHERE ( (city = 'Amsterdam') AND ( (username = 'pete') OR (firstname = 'Mike') ) )
#}
```

Since `AND` is the default, there is no `&&&` equivalent to `|||`.

Getting content for a specific user
-----------------------------------

As you might've noticed, in the examples above, we've used `ownerid` a couple
of times to get content specific to a given user. In Bolt, content is stored
with a reference to the owner, the so called `ownerid`. This means that you
cannot do things like this:

```
{# get all pages created by user 'bob' #}
{% setcontent mypages = 'pages' where { username: 'admin' } %}
```

Instead, you'll need to use the `ownerid`. If you don't know the `ownerid`, but
you _do_ know their name, you can use the `getuserid()` function.

```
{# get all pages created by user 'bob' #}
{% set myuserid = getuserid('bob') %}
{% setcontent mypages = 'pages' where { ownerid: myuserid } %}

{# or, on one line #}
{% setcontent mypages = 'pages' where { ownerid: getuserid('bob') } %}
```

Using `limit`
-------------
There's no built-in limit to the amount of records returned. It is good
practice to limit the maximum number of records, by adding a `limit` clause.

```
{# get 10 pages created by 'bob' #}
{% setcontent mypages = 'pages' where { ownerid: '1' } limit 10 %}
```

Ordering results
----------------
The results can be sorted by any of the fields of the ContentType, using the
`orderby` clause. You can sort either ascending or descending. The order is
determined by the inclusion (or omission) of the minus before the name of 
the field: `title` vs. `-title`. 

```
{# get 10 pages, sorted alphabetically on title #}
{% setcontent mypages = 'pages' limit 10 orderby 'title' %}

{# get the 10 latest modified pages, sorted datechanged descending #}
{% setcontent mypages = 'pages' limit 10 orderby '-datechanged' %}
```

Note that the records are fetched from the database, according to the `orderby`
parameter. If you use `orderby 'title'`, you will get records with titles
starting with 'a'.

You can also get results randomised by using content queries. Please see the [setcontent](templatetags#setcontent) documentation for examples.


One record or multiple records?
-------------------------------
Sometimes Bolt will return one record, and sometimes a set of records. What
makes the difference?

```
{% setcontent mypage = 'page/about' %}
{{ mypage }} {# mypage is one record #}

{% setcontent mypages = 'page/latest/5' %}
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

Using the `printquery` option
-----------------------------
If you're working on selecting some content, but aren't quite getting the desired results, you can add `printquery` to the `{% setcontent %}`- tag. Doing this will output the SQL query Bolt creates and executes. For example:

```
{% setcontent entries = 'entries/latest/5' printquery %}

will show:

SELECT bolt_entries.* FROM bolt_entries WHERE (`bolt_entries`.`status` = 'published')
ORDER BY `datepublish` DESC LIMIT 5
```

