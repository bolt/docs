# autoescape

`autoescape` 

Whether automatic escaping is enabled or not, mark a section of a template to be
escaped or not by using the `autoescape` tag:


{% autoescape %}
Everything will be automatically escaped in this block using the HTML strategy
{% endautoescape %}</pre>

<br>
`{% autoescape 'html' %}`

&emsp;Everything will be automatically escaped in this block using the HTML strategy
```twig
{% endautoescape %}
```
<br>
`{% autoescape 'js' %}`

&emsp;Everything will be automatically escaped in this block using the js escaping strategy

```twig
{% endautoescape %}
```

<br>
<pre style="width: auto">{% autoescape false %}</pre>

&emsp;Everything will be outputted as is in this block

<pre style="width: auto">{% endautoescape %}</pre>

<br>
When automatic escaping is
enabled everything is escaped by default except for values explicitly marked as safe. Those can be marked in the
template by using the <u>raw</u> filter:

<pre style="width: auto">{% autoescape %}
    {{ safe_value|raw }}
{% endautoescape %}</pre>

<br>
Functions returning template data (like macros and parent)
always return safe markup.

<div style="background-color: #f5f5f5;">
<p><strong>Note</strong></p>

<p>Twig is smart enough to not escape an already escaped value by the escape filter.</p>
</div>
<br>
<div style="background-color: #f5f5f5;">
<p><strong>Note</strong></p>

<p>Twig does not escape static expressions:</p>


<pre style="width: auto">{% set hello = "&lt;strong&gt;Hello&lt;/strong&gt;" %}
{{ hello }}
{{ "&lt;strong&gt;world&lt;/strong&gt;" }} </pre>


Will be rendered "&lt;strong&gt;Hello&lt;/strong&gt; <strong>world</strong>".
</div>

Note:

The chapter Twig for Developers gives more information about when and how automatic escaping is applied.


Source: [Twig](https://twig.symfony.com/autoescape)
