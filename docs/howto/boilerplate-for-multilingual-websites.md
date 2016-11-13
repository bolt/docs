---
title: Building Multilingual Websites with Bolt
level: intermediate
---
Boilerplate for Multilingual Websites
=====================================

```twig
{% spaceless %}

{% set availablelanguages = ['en', 'nl', 'de'] %}

{% set locales =
  { 'en' : 'en_GB'
  , 'nl' : 'nl_NL'
  , 'de' : 'de_DE'
  }
%}

{# --- attempt to get the language from the URL --- #}

{% if app.canonicalpath %}
    {% set languageslug = app.canonicalpath|split('/')[1] %}
{% else %}
    {% set languageslug = app.paths.current|split('/')[1] %}
{% endif %}

{# --- set the language, otherwise fallback to default language --- #}

{% if languageslug in availablelanguages %}
    {% set language = languageslug %}
{% else %}
    {% set language = 'en' %}
{% endif %}

{# --- set the locale for international dates --- #}

{% set ret = app.config.set('general/locale', locales[language]) %}
{{ app.initLocale() }}

{# --- set the language for the Labels extension --- #}

{{ setLanguage(language) }}

{# --- set the ContentTypes --- #}

{% set pagescontenttype      = language ~ '-pages' %}
{% set entriescontenttype    = language ~ '-entries' %}
{# ... more ContentTypes ... #}

{# --- set the menus --- #}

{% set menumain              = language ~ '-main' %}
{% set menufooter            = language ~ '-footer' %}
{# ... more menus ... #}

{% endspaceless %}
<!DOCTYPE HTML>
<html lang="{{language}}">

<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <title>
      {% if record.title is defined %}{{ record.title|striptags }} | {% endif %}
      {{ app.config.get('general/sitename') }}
      {% if record.title is not defined and app.config.get('general/payoff') %} | {{ app.config.get('general/payoff') }}{% endif %}
    </title>
</head>

<body>

    <header>
        <nav>
            <ul>
                {{ menu(menumain) }}
            </ul>
        </nav>
    </header>

    <section>

        {% setcontent = entriescontenttype %}
        {% for entry in entries %}
        <article>
            <header>
                <h2><a href="{{ record.link }}">{{ entry.title }}</a></h2>
                <p>{{ l('Posted on') }} <time>{{ entry.datepublish|localedatetime('%F') }}</time> {{ l('by') }} {{ record.user.displayname }}</p>
            </header>
            {{ entry.teaser }}
        </article>
        {% endfor %}

    </section>

    <aside>
        ...
    </aside>

    <footer>
        ...
    </footer>

</body>

</html>

```
