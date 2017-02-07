---
title: Float field
---
Float field
===========

Simple field for inputting decimal numbers.

## Basic Configuration:

```yaml
        number:
            type: float
```

## Example usage in templates:

```twig
{{ record.number }}
```

## Options:

The field has a few options to change the functionality of the field.

* `min` The minimum accepted value.
* `max` The maximum accepted value.
* `step` How much to "step" the value up and down when using the browser
  controls.
