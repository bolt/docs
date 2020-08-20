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
            mode: date # the default
```

## Example usage in templates:

```twig
{{ record.eventdate }}
```

## Options:

The field has options to change the appearance and functionality of the
field.

* `mode` Date type. Can be either `date` (default) or `datetime`