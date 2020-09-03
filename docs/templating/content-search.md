---
title: Implementing Search
---
Searching in content
====================

There are three ways to search. You can use the global search, which searches
through all the ContentTypes. You can also use the listing search, which searches
through the ContentType of the listing page. Or you can use the search which is provided in
the `{% setcontent .. %}` tag.

Bolt searches through all fields that a ContentType has. 
Note that Relations do not show up in the search
results, but the actual records these relations point to should show up, if the
search term is found.

Searching is case insensitive, and normalised. This means that a search for
'CAFE' or 'cafe' is equal, and either will show records that have the word
'Café' in it.

Global search
-------------

The global search will search through
all ContentTypes excluding the ones where 'searchable' is set to _false_.

You can initiate the search by visiting the URL `/search?q=SEARCH`.

The template that is used for search by default, is defined in your
`config.yaml` file:

```yaml
# Template for showing the search results. If not defined, uses the settings
# for listing_template and listing_records
search_results_template: listing.twig
search_results_records: 10
```

In the template you have access to three variables:

  - **records** - the search result records
  - **searchTerm** - the sanitized search query

Example use case:

```twig
{% if records|length == 0 %}
    <p>
        {{ searchresult.no_of_results }} results for {{ searchTerm }} found.
    </p>
{% else %}
    <ol>
    {% for record in records %}
        <li>
            <a href="{{ record|link }}">{{ record.title }}</a>
        </li>
    {% endfor %}
    </ol>
{% endif %}
```

## Listing search / filter

The listing search allows you to search through the records of the 
listing page that you are currently on. As such, it is useful for creating
custom filters to get a subset from all published records.

Note that the listing search is configured in `config.yaml`:

```yaml
# Allow filtering on listing pages using query parameters, much like you
# would with {% setcontent %}. E.g. /pages?order=id and /pages?title=%voluptat%
# Useful for search.
query_search: true
```

The listing search uses query parameters that work just as the where parameters
for `setcontent`.

For example, to filter all pages that contain the word `lorem` you'd go to 
`/pages?anyField=%lorem%`. The `setcontent` equivalent of the results is:

```twig
{% setcontent records = 'pages' where { anyField: '%lorem%' } %}
```

Using this, it is easy to create a search form on any listing page:

```twig
<form>
    <input type="text" name="anyField">
    <input type="submit">
</form>
```

Similarly, you can search on specific fields, for example if we have this
ContentType definition:

```yaml
pages:
    name: Pages
    singular_name: Page
    fields:
      title:
        type: text
      body:
        type: html
      pagetype:
        type: select
        values: [ post, article, announcement ]
```

Then, we can add this form to the listing page:

```twig
<form>
    <select name="pagetype">
       <option value="post">Posts</option>
       <option value="article">Articles</option>
       <option value="announcement">Announcements</option>
    </select>
    <input type="submit">
</form>
```

Every time a user submits the form, the link will update,
e.g. `/pages?pagetype=post` and it will contain only the records
matching this selection.

## `{% setcontent %}` search

This search allows you to specify exactly where the search should look. It
works just like a normal `{% setcontent %}`.

Some examples:

```
{# search for 'Waldo' in the ContentType 'pages' #}
{% setcontent results = 'pages/search' where { filter: 'waldo' } %}

{# search for 'Waldo' in the ContentType 'pages' and return only the first 5 results #}
{% setcontent results = 'pages/search/5' where { filter: 'waldo' } %}

{# search for 'Waldo' in the ContentType 'pages' and the ContentType 'entries' #}
{% setcontent results = '(pages,entries)/search' where { filter: 'waldo' } %}
```

If you're not getting the results you're expecting, use `{{ dump(results) }}`
to dump the set of results, or add the `printquery` parameter at the end of the
`{% setcontent %}`-tag.
