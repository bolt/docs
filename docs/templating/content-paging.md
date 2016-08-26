---
title: Paging content
---
Paging
======

When you have more records than you'd like to display on one page, you can add
paging. If you want to add paging to your template, add `allowpaging` to your
`setcontent` tag, and add a `pager` tag.

```
{% setcontent entries = "entries/latest/3" allowpaging %}

{% for entry in entries %}
    {{ entry.title }}
{% endfor %}

{{ pager() }}
```

If you have more than one block of records that you want to paginate on one
page, you can use their names in a parameter to keep them separate. Note that
if you start paging different ContentTypes by different amounts, you will get
unexpected results. If you have more than one ContentType on a page that you
wish to paginate, it's advised to use the same amount of records for all of the
`{% setcontent %}` tags.


```
{% setcontent myentries = "entries/latest/3" allowpaging %}

{{ pager('entries') }}

{% setcontent mypages = "pages/latest/6" allowpaging %}

{{ pager('pages') }}

```

<p class="note"><strong>Note:</strong> The parameter passed to the
<code>pager()</code> function must be the used ContentType, and not the
variable you've used to set the content to. </p>

You can add an optional parameter do determine how many 'neighboring' pages are
shown in the pager:

```
{{ pager('', 2) }} or: {{ pager('', 4) }}
```

By default, Bolt will output a simple yet functional pager. Be sure to add some
styles to your CSS to make it look right. These are the default rules:

```
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
```

If you'd like to define your own pager from scratch, just copy
`/app/theme_defaults/_sub_pager.twig` to your own theme folder, and rename it
to something like `_sub_mypager.twig`. Then, pass the name as an extra
parameter to the `pager` tag:

```
{{ pager('', 3, '_sub_mypager.twig') }}
```

