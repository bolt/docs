Paging
======

When you have more records than you'd like to display on one page, you can add paging.

If you want to add paging to your template, add `allowpaging` to your `setcontent` tag, and add a `pager` tag.

<pre class="brush: html">
{% setcontent entries = "entries/latest/3" allowpaging %}

{% for entry in entries %}
    {{ entry.title }}
{% endfor %}

{{ pager() }}
</pre>

If you have more than one block of records that you want to paginate on one page, you can use their names in a parameter
to keep them seperate:

<pre class="brush: html">
{% setcontent entries = "entries/latest/3" allowpaging %}

{{ pager('entries') }}

{% setcontent mypages = "pages/latest/6" allowpaging %}

{{ pager('pages') }}

</pre>

You can add an optional parameter do determine how many 'neigbouring' pages are shown in the pager:

<pre class="brush: html"> {{ pager('', 2) }} or: {{ pager('', 4) }} </pre>

By default, Bolt will output a simple yet functional pager. Be sure to add some styles to your CSS to make it look
right. These are the default rules:

<pre class="brush: css">
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
</pre>

If you'd like to define your own pager from scratch, just copy `/app/view/_sub_pager.twig` to your own `view` folder,
and rename it to something like `_sub_mypager.twig`. Then, pass the name as an extra parameter to the `pager` tag:

<pre class="brush: html">
{{ pager('', 3, '_sub_mypager.twig') }}
</pre>

