---
title: Checkbox field
---
Checkbox field
==============

Simple checkbox input.

## Basic Configuration:

```yaml
        showteaser:
            type: checkbox
```

## Example usage in templates:

```twig
{% if record.showteaser %}
    <p>Teaser here ...</p>
{% endif %}
```

## Options:

The field has one option to change the appearance of the field:

* `variant` set to `inline` to show the label next to the field instead of
  above it.
