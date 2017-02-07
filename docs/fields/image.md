---
title: Image field
---
Image field
===========

Simple image upload/select field.

## Basic Configuration:

```yaml
        cover:
            type: image
```

## Example usage in templates:

```twig
{{ record.cover|showimage() }}
```
or
```twig
{{ record.cover|thumbnail() }}
```
or
```twig
{{ record.cover|popup() }}
```
See [Bolt Template tags](../templating/templatetags) for more info.

## Options:

The field has a few options to change the appearance and functionality of the
field.

* `extensions` Allows you to restrict users to only be able to upload files with
  certain file extensions.
* `attrib` Can be set to either of the following:
  * `alt` Show a field for an alt text.
  * `title` Show a field for an title text.
  * `[title, alt]` Show both fields.

```yaml
        cover:
            type: image
            attrib: [title, alt]
            extensions: [ gif, jpg, png ]
```

You can call these in your templates by using `{{ record.values.image.title }}`
or `{{ record.values.image.alt }}` and they will also be automatically used by
bolt's image functions.
