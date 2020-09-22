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

* `extensions` Allows you to restrict users to only be able to upload files
  with certain file extensions
* `upload` Allows you to upload files for this field into a specified directory
  so they remain grouped. See also the [`upload_location` setting][upload_location].

```yaml
        gallery:
            type: imagelist
            extensions: [ gif, jpg, png ]
            upload: portfolio
```

<!--
## Default value

The `imagelist` field can be instantiated with an array of images as default
value using the `default:` option like so:

```yaml
        carousel:
            type: imagelist
            default:
                0:
                    filename: "cat.jpg"
                1:
                    filename: "dog.jpg"
```
-->

[upload_location]: ../../configuration/settings#upload-location