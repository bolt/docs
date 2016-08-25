---
title: HTML
---
HTML
=========

A WYSIWYG HTML field. You can supply extra options to it to customize the
behaviour and appearance.

### Basic Configuration:

```
name:
    type: html
```

### Example usage in templates:

To print out the HTML field you just need to do in your templates
`{{ record.name }}`.

### Options:

The field has a few options to change the appearance and functionality of the
field.

* `allowtwig` can be set to true or false to control if twig may be used in the
  field
* `options` contains the options for the ckeditor wysiwyg editor. See below for
  an example and [here](http://docs.ckeditor.com/#!/api/CKEDITOR.config) for
  more info on possible options:

```
        name:
            type: html
            options:
                ckeditor:
                    height: 400
                    autoGrow_maxHeight: 400
                    autoGrow_onStartup: false
                    uiColor: '#BADA55'
                    autoGrow_minHeight: 300
```