---
title: Markdown field
---
Markdown field
==============

A markdown field. This gives you a markdown editor with a preview window.

You can read more about markdown [here](http://daringfireball.net/projects/markdown/).

## Basic Configuration:

```yaml
        content:
            type: markdown
```

## Example usage in templates:

A markdown fields contents need to be converted to html before using in
templates. You do this with the `|markdown` filter in twig, like this:

```twig
{{ record.content|markdown }}
```

## Input Sanitisation

All content in this field type will be sanitised before it gets inserted into
the database. This means that only 'whitelisted' HTML like `<b>` and
`<img src="…">` is kept, while things like `<embed>` and `<script>` are scrubbed
from the field before being stored. As a site-implementor you can control the
whitelisted tags and attributes using the following section in `config.yml`:

```yaml
htmlcleaner:
    allowed_tags: [ div, span, p, br, hr, s, u, strong, em, i, b, li, ul, ol, …, … ]
    allowed_attributes: [ id, class, style, name, value, href, src, alt, title, …, … ]
```

By design, you can _not_ disable the sanitation entirely. If you need to allow
the editors to insert unfiltered HTML or javascript, use a `type: textarea`
field instead.
