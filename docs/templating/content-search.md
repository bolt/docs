---
title: Implementing Search
---
Searching in content
====================

There are two ways to search. You can use the global search, which searches
through all the ContentTypes. Or you can use the search which is provided in
the `{% setcontent .. %}` tag.

Bolt searches through all fields that a ContentType has, including taxonomies
like tags and categories. Note that Relations do not show up in the search
results, but the actual records these relations point to should show up, if the
search term is found.

Searching is case insensitive, and normalised. This means that a search for
'CAFE' or 'cafe' is equal, and either will show records that have the word
'Café' in it.

Internally Bolt uses a 'result weight' to assign a score to all matching
records. For example, a match in a title will usually give a higher score than
a match somewhere in the body tag. The search algorithm uses an 'OR' type
search. If you search for more than one word, you will get results for all
records containing one or more of these words. Records that contain more than
one word will usually show up higher than records with only one matching word,
because it will get a higher score. See the section below on how to influence
the scoring for results.

Global search
-------------

The global search is configured inside the config.yml and the routing.yml. In
config you define which template will show the results and in the routing you
could change to default URL. By default this global search will search through
all ContentTypes unless 'searchable' is set to _false_.

You can initiate the search by visiting the URL `/search?q=SEARCH`.

The template that is used for search by default, is defined in your
`config.yml` file:

```yaml
# Template for showing the search results. If not defined, uses the settings
# for listing_template and listing_records
search_results_template: listing.twig
search_results_records: 10
```

In the template you have access to three variables:

  - **records** - the search result records
  - **search** - the sanitized search query
  - **searchresult** - an array with various values regarding your search

Example use case:

```
<p>
    {{ searchresult.no_of_results }} results for {{ search }} found.
</p>

<ol>
{% for record in records %}
    <li>
        <a href="{{ record.link }}">{{ record.title }}</a>
        <!-- {{ record.searchresultweight }} - this returns the index-score or
        weight of the result, an indication of the relevance }} -->
    </li>
{% endfor %}
</ol>
```

The search added one 'special' value added to each record:
`record.searchresultweight`. The results are sorted on this value, as it's an
indication to how good it matched. In the default implementation it returns a
score of how good the search terms matched against a record. For instance, if
the search term was **exactly** the title it returns a higher score then when
it only matched some part of the title or body text.

The other two variables are `search` which returns a sanitized query, which is
the actual query that ran. And `searchresult` which contain various values
useful to show.

  - **searchresult.no_of_results** - number of actual results
    (ignores paging of course)
  - **searchresult.query** - the decoded and parsed query as an array.
  - **searchresult.results** - the search results, same as `records`

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

## Influencing the scores

All results are sorted on the `searchresultweight` value, which is set by
Bolt's search algortihm as a score of how "good" the match is. In the default
implementation it returns a score of how well the search terms matched against
a record. For instance, if the search term was **exactly** the title it returns
a higher score then when it only matched some part of the title or body text. A
match in a title field also scores higher than a result in the body text
somewhere.

Optionally, you can set the scoring for fields and taxonomies, to change the
scoring for a match in those fields or taxonomies. In our opinion, you seldomly
need to adjust these scorings manually, and it suffices to use the defaults. By
default, a match in any field in the ContentType gets a base score of '50'. A
match in the title gets a base score of '100', and a matching taxonomy gets a
base score of '75'.

You can override these scores in the config files for the ContentTypes and
taxonomies. For example, in `contenttypes.yml`:

```yaml
pages:
    name: Pages
    singular_name: page
    fields:
        title:
            type: text
            class: large
            searchweight: 20
        html:
            type: html
            height: 150px
            searchweight: 100
```

Or in `taxonomy.yml`:

```yaml
tags:
    slug: tags
    singular_slug: tag
    behaves_like: tags
    searchweight: 80
```
