---
title: Hidden field
---
Hidden field
============

The hidden field is like the text field, 
except the difference that it's being hidden from the content editor.

### Basic Configuration:

```yaml
        secret:
            type: hidden
```

### Example usage in templates:

```twig
{{ record.secret }}
```
