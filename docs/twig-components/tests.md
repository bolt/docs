---
title: Twig tests
---

Twig tests
==========

## json

Use this test to determine if a given variable is JSON.

Examples:

```twig
{% if var is json %}
    JSON: {{ var }}
{% else %}
    JSON: {{ var|json_encode }}
{% endif %}
```

```twig
{% if var is json %}
    Decoded: {{ var|json_decode }}
{% endif %}
```

## defined (for extensions)

Use this test to determine if a certain extension is available. You can use
this in your themes, when it's not apparent whether or not the user will have
a certain extension installed.

Examples:

```twig
{% if app.extensions.get('Bolt/FacebookComments') is defined %}
    {{ include(template_from_string("{{ facebookcomments() }}")) }}
{% endif %}
```

You can also use this to output a friendly warning to users of the template:

```twig
{% if app.extensions.get('Bolt/BoltForms') is defined %}
    {{ include(template_from_string("{{ boltforms('contact') }}")) }}
{% else %}
    <p>Warning: This theme suggests you install the 'BoltForms' extension.</p>
{% endif %}
```

Note: in the `{% if %}` tag you must use the `vendorname` and `extensionname`
of the extension as a string, so be sure to use quotation marks. If you're not
sure what the correct name is that you need to use, dump the installed
extensions to find out:

```twig
{{ dump(app.extensions.all()) }}
```

[widgets-page]: ../templating/widgets
[debugging-page]: ../debugging
[select-page]: ../fields/select
[locales-page]: ../other/locales
[linkintpl]: ../templating/linking-in-templates
[linkintpl-asset]: ../templating/linking-in-templates#using-asset-to-link-to-assets-or-files
[linkintpl-pathurl]: ../templating/linking-in-templates#using-path-and-url-to-link-to-named-routes
[linkintpl-current]: ../templating/linking-in-templates#linking-to-the-current-page
[twig]: http://twig.sensiolabs.org/doc/templates.html
[inc]: http://twig.sensiolabs.org/doc/functions/include.html
[inheritance]: http://twig.sensiolabs.org/doc/templates.html#template-inheritance
[number]: http://twig.sensiolabs.org/doc/filters/number_format.html
[popup]: http://dimsemenov.com/plugins/magnific-popup/
[strftime]: http://php.net/manual/en/function.strftime.php
[date]: http://php.net/manual/en/function.date.php
[for]: http://twig.sensiolabs.org/doc/tags/for.html
[switch]: http://php.net/manual/en/control-structures.switch.php
[extras]: ./twig-components/extras
