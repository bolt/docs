# extension

`extension` is a Twig test to test if an extension is installed.

For example:

```twig
{% if 'Bolt Configuration Notices Widget' is extension %}
    {{ your code }}
{% endif %}
