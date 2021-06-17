# autoescape

`autoescape` is a Twig tag to, whether automatic escaping is enabled or not, mark a section of a template to be
escaped or not by using the autoescape tag:

`{% autoescape %}`<br>
Everything will be automatically escaped in this block using the HTML strategy<br>
`{% endautoescape %}`

`{% autoescape 'html' %}`<br>
Everything will be automatically escaped in this block using the HTML strategy<br>
`{% endautoescape %}`

`{% autoescape 'js' %}`<br>
Everything will be automatically escaped in this block using the js escaping strategy<br>
`{% endautoescape %}`

`{% autoescape false %}`<br>
Everything will be outputted as is in this block<br>
`{% endautoescape %}` 

When automatic escaping is
enabled everything is escaped by default except for values explicitly marked as safe. Those can be marked in the
template by using the raw filter:

`{% autoescape %}`<br>
&emsp;`{{ safe_value|raw }}`<br>
`{% endautoescape %} `

Functions returning template data (like macros and parent)
always return safe markup.

Note

Twig is smart enough to not escape an already escaped value by the escape filter.

Note

Twig does not escape static expressions:

{% set hello = "<strong>Hello</strong>" %} {{ hello }} {{ "<strong>world</strong>" }} Will be rendered "<strong>
Hello</strong> world".

Note

The chapter Twig for Developers gives more information about when and how automatic escaping is applied.

Source: [Twig](https://twig.symfony.com/autoescape)