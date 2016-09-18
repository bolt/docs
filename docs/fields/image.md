---
title: Image
---
Image
=========

Simple image upload/select field.

### Basic Configuration:

```
cover:
    type: image
```

### Example usage in templates:

```
{{ record.cover|showimage() }}
```
or
```
{{ record.cover|thumbnail() }}
```
or
```
{{ record.cover|popup() }}
```
See [Bolt Template tags](../templates/templatetags) for more info.

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
cover:
    type: image
    attrib: [title, alt]
```

You can call these in your templates by using `{{ record.values.image.title }}`
or `{{ record.values.image.alt }}` and they will also be automatically used by
bolt's image functions.

