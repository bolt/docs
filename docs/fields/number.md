---
title: Float field
---
Number field
===========

Simple field for inputting numbers.

## Basic Configuration:

```yaml
        number:
            type: number
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
* `placeholder` Placeholder text inside the input control.
* `mode` Number type. Can be either `float` or `integer`
