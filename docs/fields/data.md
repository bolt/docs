---
title: Data field
---
Data field
============

The Data field is like a read-only textarea. It can be used to store data as-is
in the JSON format, if your website project has an API that creates Records
based on some external output. By using this field, the editors can _see_ the
field, but they can not _modify_ the data in it.

## Basic Configuration:

```yaml
        source:
            type: data
            label: 'Source data'
            postfix: The original data, as retrieved from the API
```

It'll look like this in the Bolt backend:

![Screenshot of Data Field](https://user-images.githubusercontent.com/1833361/91964690-bed2cd80-ed0f-11ea-81ba-9247d9a2dfeb.png)


## Example usage in templates:

```twig
{{ record.source }}
```
