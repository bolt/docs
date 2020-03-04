---
title: Language selector
---
Language selector
=================

Use this to insert a toggle for the different languages defined in the site.

```twig
{% include 'helpers/_languageselect.html.twig' %}
```

Or, to output a `<select>` element, instead of an unordered list, use:

```twig
{% include 'helpers/_languageselect.html.twig' with {'type': 'select'} %}
```

All locales are available through the `locales()` helper twig functions, which
returns a Collection. `locales()` returns all locales configured in the
ContentTypes. Alternatively you can fetch all locales available in Bolt, using
`locales(all = true)`

```twig
{{ dump(locales()) }}
{% set locales = locales() %}
```

The current locale is in the Request object, which is an instance of
`Symfony\Component\HttpFoundation\Request`

```twig
{{ dump(app.request.getLocale()) }}
```