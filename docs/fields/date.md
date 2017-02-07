---
title: Date field
---
Date field
==========

Datepicker widget, to select a date.

## Basic Configuration:

```yaml
        eventdate:
            type: date
```

## Example usage in templates:

```twig
{{ record.eventdate }}
```

## Options:

The field has a few options to change the appearance and functionality of the
field.

* `class` set to `wide` to show the field extra wide, filling out the column.
* `options` contains some options for the datepicker, see below for an example:

```yaml
        eventdate:
            type: date
            options:
                datepicker:
                    changeMonth: true
                    changeYear: true
                    yearRange: "-100:-0"
```
