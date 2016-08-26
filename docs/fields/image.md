---
title: Image
---
Image
=========

Simple image upload/select field.

### Basic Configuration:

```
name:
    type: image
```

### Example usage in templates:

```
{{ record.name|showimage() }}
```
or
```
{{ record.name|thumbnail() }}
```
or
```
{{ record.name|popup() }}
```
See [Bolt Template tags](../templating/templatetags) for more info.

### Options:

The field has a few options to change the appearance and functionality of the
field.

* `accept_file_types` Allows you to restrict users to only be able to uploads
  certain filetypes.
* `attrib` Can be set to either of the following:
  * `alt` Show a field for an alt text.
  * `title` Show a field for an title text.
  * `[title, alt]` Show both fields.

```
name:
    type: image
    attrib: [title, alt]
```

You can call these in your templates by using `{{ record.values.image.title }}`
or `{{ record.values.image.alt }}` and they will also be automatically used by
bolt's image functions.

