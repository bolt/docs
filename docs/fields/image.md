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
{{ record.cover|image() }}
```
or
```twig
{{ record.cover|thumbnail() }}
```
or
```twig
{{ record.cover|popup() }}
```
See [Bolt Template tags](../templating/twig-functionality) for more info.

## Options:

The field has a few options to change the appearance and functionality of the
field.

* `extensions` Allows you to restrict users to only be able to upload files with
  certain file extensions.
* `alt` Can be used to set to `true` to create a field for the image alt attribute.
* `upload` Allows you to upload files for this field into a specified directory
  so they remain grouped. This directory will be created in `{%web%}/files/`

```yaml
        cover:
            type: image
            attrib: true
            extensions: [ gif, jpg, png ]
            upload: portfolio
```

You can call these in your templates by using `{{ record.cover.alt }}`
or `{{ record.cover.caption }}` and they will also be automatically used by
Bolt's image functions.
