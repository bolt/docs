---
title: Data field
---
Data field
============

The Data field is like a read-only textarea. It can be used to store data as-is
in the JSON format, if your website project has an API that creates Records
based on some external output. By using this field, the editors can _see_ the
field, but they can not _modify_ the data in it.

## Basic Configuration:

```yaml
        source:
            type: data
            label: 'Source data'
            postfix: The original data, as retrieved from the API
```

It'll look like this in the Bolt backend:

![Screenshot of Data Field](https://user-images.githubusercontent.com/1833361/91964690-bed2cd80-ed0f-11ea-81ba-9247d9a2dfeb.png)


## Example usage in templates:

```twig
{{ record.source }}
```

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
            type: data
            sanitise: false
```
