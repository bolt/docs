---
title: Imagelist
---
Imagelist
=========

A simple list field type to upload/select images. Also contains a title text
field for each image.

### Basic Configuration:

```
gallery:
    type: imagelist
```

### Example usage in templates:

This example will output a magnific popup gallery with thumbnails of all the
images:

```
{% for image in record.gallery %}
    {{ image|popup() }}
{% endfor %}
```

### Options:

The field has a one option to change the functionality of the field:

* `accept_file_types` Allows you to restrict users to only be able to uploads
  certain filetypes.
