---
title: Integer
---
Integer
=========

Simple field for inputting whole numbers.

### Basic Configuration:

```
number:
    type: integer
```

### Example usage in templates:

```
{{ record.number }}
```

### Options:

The field has a few options to change the functionality of the field.

* `min` The minimum accepted value.
* `max` The maximum accepted value.
* `step` How much to "step" the value up and down when using the browser
  controls.