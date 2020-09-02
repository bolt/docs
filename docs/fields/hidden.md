---
title: Hidden field
---
Hidden field
============

The hidden field is like the text field, except it's hidden from the content
editor.

## Basic Configuration:

```yaml
        secret:
            type: hidden
```

## Example usage in templates:

```twig
{{ record.secret }}
```

## Hiding a field, still showing the pre- and postfix

Sometimes you might want to _not_ show a field, but still want to display some
information to the editor. For example to give them more detailed instructions
on how to use the current ContentType. The `type: hidden` field is not suited
for this, because it hides the entire Field. Instead, use a text field, and
hide its input. See an example on the [Text Field](./text) page.
