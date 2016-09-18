---
title: File
---
File
=========

Simple file upload/select field.

### Basic Configuration:

```
attachment:
    type: file
```

### Example usage in templates:

```
{{ record.attachment }}
```

### Options:

The field has a few options to change the appearance and functionality of the
field.

* `accept_file_types` Allows you to restrict users to only be able to uploads
  certain filetypes.
