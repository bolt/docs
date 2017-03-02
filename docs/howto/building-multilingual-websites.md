---
title: Building Multilingual Websites with Bolt
level: intermediate
---
Building Multilingual Websites with Bolt
========================================

Bolt does not support multilingual websites at the moment. There are often
multiple ways to handle multilingual websites. This page describes one simple
method to facilitate one.

In short, with this method you'll duplicate every ContentType per language (or
region). So this will only work for sites with a few languages or without too
many ContentTypes.

<p class="note"><strong>Note:</strong> This section requires some knowledge of
Bolt and Twig (in particular,
<a href="http://twig.sensiolabs.org/doc/templates.html#template-inheritance">Template Inheritance</a>).
Please remember that this is only one way to handle multilingual content.
Questions and/or suggestions are welcome, please check the
<a href="../other/contributing">contributing guide</a> or the
<a href="https://bolt.cm/community">Bolt community</a> page for more
information.</p>


Table of Contents
-----------------

 * [Defining ContentTypes](#defining-contenttypes)
 * [Defining Routes](#defining-routes)
 * [Defining Menus](#defining-menus)
 * [Making Templates and Fetching Content](#making-templates-and-fetching-content)
 * [Implementing Multilingual Search](#implementing-multilingual-search)
 * [Internationalization of Templates](#internationalization-templates)
   * [International Dates and Times](#international-dates-and-times)
 * [Implementing Multilingual Forms](#implementing-multilingual-forms)
 * [Limitations and Recommendations](#limitations-and-recommendations)
   * [Twig vs Extension](#twig-vs-extension)
   * [Boilerplate Master Template](#boilerplate-master-template)
   * [Multilingual Taxonomy Listings](#multilingual-taxonomy-listings)
   * [Directly Link Individual Pages between Languages](#directly-link-individual-pages-between-languages)
   * [Pagination on Search Results Pages](#pagination-search-results-pages)


Defining ContentTypes
---------------------

An important step when making websites, is to properly [define your ContentTypes
](../contenttypes/intro). Since ContentTypes are defined in YAML, there are
some handy tricks you can apply. YAML provides node anchors (`&`) and references
(`*`) for repeated nodes. So once the fields of a ContentType are defined, you
can simply reference them. Be sure that the anchor is defined before it is used.
See the use of `&pagefields` and `*pagefields` in the following example. Assume
`en` is English, `nl` is Dutch, and `de` is German.

```yaml
pages-en:
    name: Pages
    singular_name: Page
    fields: &pagefields
        title:
            type: text
            class: large
        slug:
            type: slug
            uses: title
        image:
            type: image
        text:
            type: html
            height: 300px
    template: page.twig

pages-nl:
    name: Paginas
    singular_name: Pagina
    fields: *pagefields
    template: page.twig

pages-de:
    name: Seiten
    singular_name: Seite
    fields: *pagefields
    template: page.twig
```

A recommended method is to use the same slugs for the same ContentTypes with the
language as a prefix or postfix. You can choose to omit the language for the
_default_ ContentTypes if you desire:

| postfix               | prefix                |
| --------------------- | --------------------- |
| `pages-en` or `pages` | `en-pages` or `pages` |
| `pages-nl`            | `nl-pages`            |
| `pages-de`            | `de-pages`            |

Depending on the website and/or your preferences, you can group the definitions
in `contenttypes.yml` by language or by ContentType:

| by language  | by ContentType |
| ------------ | -------------- |
| `en-pages`   | `pages-en`     |
| `en-entries` | `pages-nl`     |
| `nl-pages`   | `entries-en`   |
| `nl-entries` | `entries-nl`   |

See the following sections why it might be more useful to use `en-pages` and
`nl-pages` instead of `pages` and `paginas`.



Defining Routes
---------------

A new route needs to be defined for every ContentType defined. This section will
make use of the following patterns:

 * `[language]/[contenttype]/[slug]`;
 * `[language]/[slug]`, for the `pages` ContentType.

This makes the routes fairly straightforward to define:

```yaml
# ------------------------------------------------------------------------------
# [en] English
# ------------------------------------------------------------------------------

en-entries:
  path:               /en/entry/{slug}
  defaults:           { _controller: 'Bolt\Controllers\Frontend::record', 'contenttypeslug': 'en-entries' }
  contenttype:        en-entries

# ... more ContentTypes here ...

en-pages:
  path:               /en/{slug}
  defaults:           { _controller: 'Bolt\Controllers\Frontend::record', 'contenttypeslug': 'en-pages' }
  contenttype:        en-pages

# ------------------------------------------------------------------------------
# [nl] Dutch
# ------------------------------------------------------------------------------

nl-entries:
  path:               /nl/artikel/{slug}
  defaults:           { _controller: 'Bolt\Controllers\Frontend::record', 'contenttypeslug': 'nl-entries' }
  contenttype:        nl-entries

# ... more ContentTypes here ...

nl-pages:
  path:               /nl/{slug}
  defaults:           { _controller: 'Bolt\Controllers\Frontend::record', 'contenttypeslug': 'nl-pages' }
  contenttype:        nl-pages
```

<p class="tip"><strong>Tip:</strong> Make use of comments in your
<code>contenttypes.yml</code>, <code>routing.yml</code> and
<code>menu.yml</code> to divide different sections.</p>

Defining Menus
--------------
Define your menus as usual. You'll need a duplicate of every menu per language.
Be sure to prefix (or postfix) them, just like with ContentTypes and routes.

```yaml
en-main:
  - label: Home
    path: en-pages/1
  - label: About
    path: en-pages/2

nl-main:
  - label: Home
    path: nl-pages/1
  - label: Over
    path: nl-pages/2
```

<p class="tip"><strong>Tip:</strong> Don't forget to check the
<a href="http://market.bolt.cm/view/d49af7c7-7b34-4396-b436-2f63f4747a7d">Menu Editor</a>
extension.</p>

Making Templates and Fetching Content
-------------------------------------
Probably, the most interesting part. It is best to make use of the powerful
[Template Inheritance](http://twig.sensiolabs.org/doc/templates.html#template-
inheritance), in Twig, where you define one master template — e.g. `master.twig`
— that is extended by other pages. Start by determining the current language
based on the URL and define all ContentTypes and menus.

```twig
{% spaceless %}
{# --- attempt to get the language from the URL --- #}
{% if app.canonicalpath %}
    {% set languageslug = app.canonicalpath|split('/')[1] %}
{% else %}
    {% set languageslug = app.paths.current|split('/')[1] %}
{% endif %}

{# --- set the language, otherwise fallback to default language --- #}
{% if languageslug in ['en', 'nl', 'de'] %}
    {% set language = languageslug %}
{% else %}
    {% set language = 'en' %}
{% endif %}

{% set pagescontenttype      = language ~ '-pages' %}
{% set entriescontenttype    = language ~ '-entries' %}
{# ... more ContentTypes ... #}

{% set menumain              = language ~ '-main' %}
{% set menufooter            = language ~ '-footer' %}
{# ... more menus ... #}

{% endspaceless %}
```
Now, in order to fetch content, you'll want to re-write all `setcontent` queries
and `menu()` calls. Instead of:

```twig
{% setcontent pages = 'pages' where { ... } %}
```

```twig
{{ menu('main') }}
```

use:

```twig
{% setcontent pages = pagescontenttype where { ... } %}
```
```twig
{{ menu(menumain) }}
```

Basically, instead of directly calling `setcontent` with something directly like
`pages`, save these language-dependent values in a variable.


Implementing Multilingual Search
--------------------------------

Define a route for the search results pages for every language. Again, keep the
same slugs for the routenames prefixed (or postfixed) with the language.

```yaml
en-searchresults:
  path:               /en/searchresults
  defaults:           { _controller: 'Bolt\Controllers\Frontend::search' }

nl-searchresults:
  path:               /nl/zoekresultaten
  defaults:           { _controller: 'Bolt\Controllers\Frontend::search' }
```

In your template, use the following script to determine what the URL is for the
search results page based on the current language. In your search form, set the
`action` attribute to that URL.

```twig
{% set searchresultsurl = app.config.get('routing')[language ~ '-searchresults'].path %}

...

<form method="get" action="{{ searchresultsurl }}" id="search-form">
    ...
</form>
```

By default, the `search_results_template` is `listing.twig`. This can be
modified in `config.yml` if desired. Every time a search is triggered, the
variable `records` needs to be overridden. Define a variable that has all
ContentTypes you want to search in:

```twig
{% if search %}
    {% allcontenttypes = [ pagescontenttype, entriescontenttype ]|join(',') %}
    {% setcontent records = '(' ~ allcontenttypes ~')/search' where { filter: search } %}
{% endif %}
```

<!-- Currently, there's a limitation with this approach. It is not possible to have
pagination with such a `setcontent` query. -->



Internationalization of Templates
---------------------------------
If your templates has some strings that do not directly depend on content, you
will want to translate these as well. The [Labels] extension is made for this
purpose.

In your `master.twig` template, set the current language for Labels:

```twig
{{ setlanguage(language) }}
```

Now, instead of using text directly, you want to put them through the Labels
function `l(...)` (lower-case L). This takes a string that you want to translate
as an argument. Optionally, you can prefix this with a namespace. The syntax is
`<namespace>:<string>`.

```twig
{{ l('The string you want to translate') }}
{{ l('namespace:The string you want to translate') }}

```

<p class="note"><strong>Note:</strong> The current implementation of the Labels
extension does <strong>not</strong> allow the usage of colons (<code>:</code>)
in translatable strings as this will define a namespace.</p>

<p class="note"><strong>Note:</strong> The <code>__()</code> function is used
internally by Bolt.</p>

<!--
[todo]
- Add a Labels example.
- How to translate strings in backend using csv.
- How to translate strings via the database.
- hm.. should the Labels extension work as l(label) and l(namespace, label) ?
-->

### International Dates and Times

Usually, you want the dates and times in the same language. Currently, the
default `locale` setting is set in `config.yml`. It depends on your server what
locales are available. Use the following command:

```
locale -a
```

This will output a list of available locales. You'll probably see something like:

```
C
C.UTF-8
en_GB.utf8
en_US.utf8
nl_NL.utf8
```

In order to set the locale in a Twig template, you'll first need a mapping of
languages to locales.

<!--
| language | locale  |
| ---------| ------- |
| `en`     | `en_GB` |
| `nl`     | `nl_NL` |
| `de`     | `de_DE` |
-->

```twig
{% set locales =
  { 'en' : 'en_GB'
  , 'nl' : 'nl_NL'
  , 'de' : 'de_DE'
  }
%}
```

Set the correct locale and call the function `initLocale` to apply a new locale.

```
{% set ret = app.config.set('general/locale', locales[language]) %}
{{ app.initLocale() }}
```

When outputting dates, use the [localedatetime filter](../templating/templatetags#localedatetime). Note
that this is only useful if the date structure is identical for every language,
which is not always the case. You'll want to use a simple `if` statement for
each exception.

```twig
{% if language == 'zh' %}
  {# -- Output a Chinese date -- #}
  {% set year  = record.datepublish|localedatetime("%Y") %}
  {% set month = record.datepublish|localedatetime("%m") %}
  {% set day   = record.datepublish|localedatetime("%d") %}
  {{year}}年{{month}}月{{day}}日
{% else %}
  {{ record.datepublish|localedatetime("%F") }}
{% endif %}
```

<!--
[todo]
- it's probably possible to write a custom macro which takes a date and
  transforms this in a 'nice' date.
-->



Implementing Multilingual Forms
-------------------------------

```
[todo]
```

<!--
[todo]
- add some examples with the new BoltForms.
- multilingual mail templates.
-->



Limitations and Recommendations
-------------------------------
This tutorial shows one of many ways to make a multilingual website. Since, this
functionality is not provided out-of-the-box, there are some limitations with
the aforementioned approach.



### Twig vs Extension

This page provides many solutions by settings variables in Twig. This is not
necessary the _best_ way to do things, but it's workable in most situations.
Many of these tricks can be ported into an extension to keep your templates
clean(er). Think of setting the locale and exposing default variables via
functions in a custom extension.

<p class="tip"><strong>Tip:</strong> Use
<a href="http://twig.sensiolabs.org/doc/tags/macro.html">Twig macros</a> to make
reusable functions in Twig.</p>



### Boilerplate Master Template

Check out the [boilerplate template](boilerplate-for-multilingual-websites)
that applies most of the abovementioned tricks to kickstart your theme for your
multilingual site.



### Multilingual Taxonomy Listings

If you need taxonomy listings per language, duplicate the taxonomies per
language in `taxonomy.yml`. Then in `contenttypes.yml`, use the
language-specific taxonomy in your ContentTypes.



### Directly Link Individual Pages between Languages

If you want to link individual pages directly between languages, you will need
to add a relationship per language and then manually link the contents.

```yaml
en-pages:
  ...
  relations:
    nl-pages: &pagesrelationship
      multiple: false
      label: Select a page
      order: -id
    de-pages: *pagesrelationship

...

nl-pages:
  ...
  relations:
    en-pages: *pagesrelationship
    de-pages: *pagesrelationship
```

Output these links in your templates. Always add an additional
check if an relationship is not defined.

```twig
{% set relatedrecords = record.related() %}

{% if relatedrecords['en-pages'] is not empty %}
    <a href="{{ relatedrecords['en-pages'].link }}">English</a>
{% else %}
    <a href="/en">English</a>
{% endif %}

{% if relatedrecords['nl-pages'] is not empty %}
    <a href="{{ relatedrecords['nl-pages'].link }}">Nederlands</a>
{% else %}
    <a href="/nl">Nederlands</a>
{% endif %}
```
<p class="note"><strong>Note:</strong> This approach is not recommended for
sites with lots of content, since this is going to be a lot of work for editors.
Furthermore, this only works if the website structure is exactly the same for
every language.</p>



### Pagination on Search Results Pages

There currently is no pagination on search results pages.

```
[todo]
```

<!--
[todo]
- Need to do some extensive testing for some of these limitations.
- Compare with different multilingual solutions of other CMS.
-->

[labels]: https://github.com/bolt/labels
