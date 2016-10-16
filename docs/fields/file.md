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

* `extensions` Allows you to restrict users to only be able to upload files with
  certain file extensions.
  
```
        attachment:
            type: file
            extensions: [ png, pdf ]
```
