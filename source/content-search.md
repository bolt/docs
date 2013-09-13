Searching in content
====================

There are two ways to search. You can use the global search, which searches through all the contenttypes. Or you
can use the search which is provided in the {% setcontent .. %} tag.

## Global search

The global search is configured inside the config.yml and the routing.yml. In config you define which template
will show the results and in the routing you could change to default URL.
By default this global search will search through all contenttypes unless 'searchable' is set to _false_.

You can initiate the search by visiting the URL `/search?q=SEARCH`. 

The template that is used for search by default, is defined in your `config.yml` file:

<pre class="brush: plain">
# Template for showing the search results. If not defined, uses the settings
# for listing_template and listing_records
search_results_template: listing.twig
search_results_records: 10
</pre>

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

The other two variables are `search` which returns a sanitized query, which is the actual query that ran. And `searchresult` which
contain various values useful to show. 

  - **searchresult.no&#x5f;of&#x5f;results** - number of actual results (ignores paging of course)
  - **searchresult.query** - the decoded and parsed query in an array. you can use the values but there is no guarantee they won't change in newer versions of Bolt.
  - **searchresult.results** - the search results, same as `records`

## {% setcontent %} search

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
