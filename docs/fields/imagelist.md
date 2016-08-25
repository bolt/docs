---
title: Imagelist
---
Imagelist
=========

A simple list fieldtype to upload/select images. Also contains a title text
field for each image.

### Basic Configuration:

```
name:
    type: imagelist
```

### Example usage in templates:

```
{% for image in record.imagelist %}
    {{ image|popup() }}
{% endfor %}
```

### Options:

The field has a one option to change the functionality of the field:

* `accept_file_types` Allows you to restrict users to only be able to uploads
  certain filetypes.
