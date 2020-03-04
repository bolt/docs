---
title: Filelist field
---
Filelist field
==============

A simple list field type to upload/select files. Also contains a title text
field for each file.

## Basic Configuration:

```yaml
        attachments:
            type: filelist
```

## Example usage in templates:

```twig
{% for file in record.attachments %}
    <a href="/files/{{ file.filename }}">{{ file.title }}</a>
{% endfor %}
```

## Options:

The field has a one option to change the functionality of the field:

* `extensions` Allows you to restrict users to only be able to upload files
  with certain file extensions
* `upload` Allows you to upload files for this field into a specified directory
  so they remain grouped. This directory will be created in `{%web%}/files/`

```yaml
        attachments:
            type: filelist
            extensions: [ png, pdf ]
            upload: portfolio
```

## Default value

The `filelist` field can be instantiated with an array of files as default
value using the `default:` option like so:

```yaml
        documents:
            type: filelist
            default:
                0:
                    filename: "2019.pdf"
                    title: "2019 document"
                1:
                    filename: "2020.pdf"
                    title: "2020 document"
```