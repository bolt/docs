# trans

`trans(arguments = [], domain = null, locale = null, count = null)` is a Twig filter to translate variable texts and
complex expressions.

```twig
{{ message|trans }}

{{ message|trans({'%name%': 'Fabien'}, 'app') }}
```

<p class="tip">
Using the translation tags or filters have the same effect, but with one subtle difference: automatic output escaping 
is only applied to translations using a filter. In other words, if you need to be sure that your translated message 
is not output escaped, you must apply the raw filter after the translation filter:</p>

```twig
{# text translated between tags is never escaped #}
{% trans %}
    <h3>foo</h3>
{% endtrans %}

{% set message = '<h3>foo</h3>' %}

{# strings and variables translated via a filter are escaped by default #}
{{ message|trans|raw }}
{{ '<h3>bar</h3>'|trans|raw }}
```
