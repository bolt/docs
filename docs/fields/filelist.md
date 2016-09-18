---
title: Filelist
---
Filelist
=========

A simple list field type to upload/select files. Also contains a title text
field for each file.

### Basic Configuration:

```
attachments:
    type: filelist
```

### Example usage in templates:

```
{% for file in record.attachments %}
    <a href="{{ file.filename }}">{{ file.title }}</a>
{% endfor %}
```

### Options:

The field has a one option to change the functionality of the field:

* `accept_file_types` Allows you to restrict users to only be able to uploads
  certain filetypes.
