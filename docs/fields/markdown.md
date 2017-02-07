---
title: Markdown field
---
Markdown field
==============

A markdown field. This gives you a markdown editor with a preview window.

You can read more about markdown [here](http://daringfireball.net/projects/markdown/).

## Basic Configuration:

```yaml
        content:
            type: markdown
```

## Example usage in templates:

A markdown fields contents need to be converted to html before using in
templates. You do this with the `|markdown` filter in twig, like this:

```twig
{{ record.content|markdown }}
```
