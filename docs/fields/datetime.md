---
title: Datetime field
---
Datetime field
==============

Datetime picker widget, to select a date and a time.

## Basic Configuration:

```yaml
        eventdate:
            type: datetime
```

## Example usage in templates:

```twig
{{ record.eventdate }}
```

## Options:

The field has a few options to change the appearance and functionality of the
field.

* `class` set to `wide` to show the field extra wide, filling out the column.
* `options` contains some options for the datetimepicker, see below for an
  example:

```yaml
        eventdate:
            type: datetime
            options:
                datetimepicker:
                    changeMonth: true
                    changeYear: true
                    yearRange: "-100:-0"
```
