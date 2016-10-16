---
title: Templateselect
---
Templateselect
=========

Allows setting a template to use when rendering a specific record. Will allow
the record creator to specify any template in the root folder of the current
theme with a file name that does not begin with an underscore. If a specific
template is not chosen in the record editor, the record will be rendered with
the default template for that ContentType. If a templateselect field is used in
a reapeater or in templatefields it will not affect which template bolt uses to
render the record, but can still be used by the theme developer in the theme.

### Basic Configuration:

```
        template:
            type: templateselect
```

### Example usage in templates:

```
{{ record.template }}
```

### Options:

The field has a few options to change the functionality of the field.

* `filter` A glob pattern that decides which tempates to show. For example to only
  match templates that start with the word pages you can do like this:

```
        template:
            type: templateselect
            filter: 'pages*.twig'
```
