# excerpt

`excerpt(length = 280, includeTitle = false, focus = null, wrap = false)` is a Twig filter create a short, text-only, 
excerpt of a record or a string. It's useful to get short blurbs of text
for overview pages, listings, et cetera. If you pass it a string, it will simply strip out HTML and, reduce it to a 
given length:

```twig
{% set text = "Bonum patria: miserum exilium. Ut optime, secundum" %}
{{ text|excerpt(10) }}

=> Bonum pat…
```

If you get an excerpt of a Record, Bolt will attempt to get an excerpt that's representative of the Record. If it has a recognisable title, it will start with that, and it will use the other text-fields to complete it. In fact, it's the same function that's used in the Bolt backend, on the dashboard. See also extras.

```twig
{% setcontent page = "pages/1" %}
{{ page|excerpt(200) }}

=> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Videsne quam sit magna
dissensio? Cum ageremus, inquit, vitae beatum et eundem supremum diem, scribebamus haec.
Duo Reges: constructio int…
```

It is also possible to highlight a keyword in an excerpt, which can be used in search results.

```twig
{% set keyword = 'ageremus' %}{# this is the keyword you want to highlight #}
{% set include_title = false %}{# this will include the title in the results #}
{% setcontent page = "pages/1" %}
{{ page|excerpt(200, include_title, keyword|default('')) ) }}

=> …consectetur adipiscing elit. Videsne quam sit magna dissensio? Cum <mark>ageremus</mark>,
inquit, vitae beatum et eundem supremum diem, scribebamus haec. Duo Reges: constructio int…
```

|Parameter | Description
|---|---
|length	| The maximum length of the excerpt
|includeTitle | Whether to include the "title" in the excerpt or omit it
|focus | keyword to be highlighted with `<mark>` in the excerpt
