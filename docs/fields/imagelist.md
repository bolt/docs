---
title: Imagelist field
---
Imagelist field
===============

A simple list field type to upload/select images. Also contains a title text
field for each image.

## Basic Configuration:

```yaml
        gallery:
            type: imagelist
```

## Example usage in templates:

This example will output a magnific popup gallery with thumbnails of all the
images:

```twig
{% for image in record.gallery %}
    {{ image|popup() }}
{% endfor %}
```

## Options:

The field has one option to change the functionality of the field:

* `extensions` Allows you to restrict users to only be able to upload files with
  certain file extensions.
* `upload` Allows you to upload files for this field into a specified directory so they remain grouped. You will have to create this directory manually in `public/files/`.

```yaml
        gallery:
            type: imagelist
            extensions: [ gif, jpg, png ]
        upload: portfolio
```

