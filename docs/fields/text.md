---
title: Text field
---
Text field
==========

Simple text-input, for single-line fields.

## Basic Configuration:

```yaml
        name:
            type: text
```

## Example usage in templates:

```twig
{{ record.name }}
```

## Options:

The field has a few options to change the appearance and functionality of the
field.

* `class` Can be set to either of the:
  * `narrow` to make the field more narrow
  * `large` to make both the field and the font larger
* `allowtwig` can be set to true or false to control if twig may be used in the
  field
* `variant` set to `inline` to show the label next to the field instead of
  above it.
* `pattern` Use this to validate the field against a certain pattern.
