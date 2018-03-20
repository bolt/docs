---
title: HTML field
---
HTML field
==========

A WYSIWYG HTML field. You can supply extra options to it to customize the
behaviour and appearance.

## Basic Configuration:

```yaml
        content:
            type: html
```

## Example usage in templates:

To print out the HTML field you just need to do in your templates:

```twig
{{ record.content }}
```

## Options:

The field has a few options to change the appearance and functionality of the
field.

* `allowtwig` can be set to true or false to control if twig may be used in the
  field
* `searchable` Set to `false` to prevent this field from being checked for search results.
* `options` contains the options for the <abbr title="What You See Is What You Get">WYSIWYG</abbr>
  editor. See below for an example and the [CKEditor API][ckeditor] for more
  information on possible options:

```yaml
        content:
            type: html
            options:
                ckeditor:
                    entities: true # this enables special characters to be stored as their HTML entity
                    entities_latin: true # this enables Latin characters to be stored as their HTML entity - eg when true, £ is stored as &pound;
                    height: 400
                    autoGrow_maxHeight: 400
                    autoGrow_onStartup: false
                    uiColor: '#BADA55'
                    autoGrow_minHeight: 300
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


[ckeditor]: http://docs.ckeditor.com/#!/api/CKEDITOR.config
