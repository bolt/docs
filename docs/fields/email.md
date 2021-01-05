---
title: Email field
---
Email field
===========

Simple HTML input with `type='email'`.

## Basic Configuration:

```yaml
        email:
            type: email
```

## Example usage in templates:

```twig
{{ record.email }}
```

## Options:

The field has a few options to change the functionality of the field. Please
check the [common options for all fields](common).

## Input Sanitisation

All content in this field type will be sanitised before it gets inserted into
the database. This means that only 'whitelisted' HTML like `<b>` and
`<img src="…">` is kept, while things like `<embed>` and `<script>` are scrubbed
from the field before being stored. As a site-implementor you can control the
whitelisted tags and attributes using the following section in `config.yaml`:

```yaml
htmlcleaner:
    allowed_tags: [ div, span, p, br, hr, s, u, strong, em, i, b, li, ul, ol, …, … ]
    allowed_attributes: [ id, class, style, name, value, href, src, alt, title, …, … ]
```

To disable sanitisation for this field, you can add `sanitise: false` to the field config, like so:

```yaml
        title:
            type: redactor
            sanitise: false
```
