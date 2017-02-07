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
