---
title: Float
---
Float
=========

Simple field for inputting decimal numbers.

### Basic Configuration:

```
name:
    type: float
```

### Example usage in templates:

```
{{ record.name }}
```

### Options:

The field has a few options to change the functionality of the field.

* `min` The minimum accepted value.
* `max` The maximum accepted value.
* `step` How much to "step" the value up and down when using the browser
  controls.