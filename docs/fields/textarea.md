---
title: Textarea field
---
Textarea field
==============

Simple text-input, for multi-line fields.

## Basic Configuration:

```yaml
        content:
            type: textarea
```

## Example usage in templates:

```twig
{{ record.content }}
```

## Options:

The field has a few options to change the functionality of the field.

* `allowtwig` can be set to true or false to control if twig may be used in the
  field
* `pattern` Use this to validate the field against a certain pattern.
* `searchable` Set to `false` to prevent this field from being checked for search results.

## Input Sanitisation

All content in this field type will be inserted into the database as-is. No
sanitisation will take place. This means that if you need to allow the editors
to insert unfiltered HTML or javascript in the content, you can do so using
this field type.

On the other hand, if you do want the extra failsafe of having the input
filtered before it gets saved in the database, use a `type: text`, `type: html`
or `type: markdown` field instead.
