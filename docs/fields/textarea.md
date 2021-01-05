---
title: Textarea field
---
Textarea field
==============

Simple text-input, for multi-line fields.

## Basic Configuration:

```yaml
        content:
            type: textarea
```

## Example usage in templates:

```twig
{{ record.content }}
```

## Options:

The field has a few options to change the functionality of the field.

* `allow_twig` can be set to true or false to control if twig may be used in the
  field
* `pattern` Use this to validate the field against a certain pattern.
* `placeholder` Placeholder text inside the input control.

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
            type: textarea
            sanitise: false
```
