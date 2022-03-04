---
title: Templateselect field
---
Templateselect field
====================

Allows setting a template to use when rendering a specific record. This will
allow the record creator to specify any template inside the root folder of the
current theme with a file name that does not begin with an underscore. If a
specific template is not chosen in the record editor, the record will be
rendered with the default template for that ContentType.

A `templateselect` field is not meant for use inside Sets or Collection fields.
If you do use it, the (potentially multiple) Templateselect fields will not
affect which template Bolt uses to render the record, but they can still be
used by the theme developer in the theme.

## Basic Configuration:

```yaml
        template:
            type: templateselect
```

## Example usage in templates:

```twig
{{ record.template }}
```

## Options:

The field has the options to change which templates are shown from the current
theme folder. By default these are all files ending in `.twig`, but _don't_
start with an underscore (`_`). So, a file like `_partial_menu.twig` isn't
shown.

### Template Filter

Using the `filter` options, you can provide a glob pattern that decides which
templates to show. For example: to only match `twig` templates that start with
the word "pages" you can do this:

```yaml
        template:
            type: templateselect
            filter: 'pages*.twig'
```

Alternatively, you can set this to a regular expression:

```yaml
        template:
            type: templateselect
            filter: '/^[^_].*twig$/'
```

### Template Path

To show twig templates from a custom directory, use the `path` option:

```yaml
        template:
            label: "Header Layout"
            type: templateselect
            path: 'partials/header/'
```

<p class="note"><strong>Note:</strong> The path must reside inside the theme's template directory defined via <code>template_directory</code> in your <code>theme.yml</code> theme's config file. Templates outside of this template directory will not be displayed, regardless of the <code>path</code> setting.</p>
