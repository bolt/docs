---
title: Pagination
---
Pagination
==========

You can use the `{{ pager }}` tag to create pagination elements for your
visitors to navigate between the different pages of a listing.

```twig
{{ pager(records) }}
```

Splits `records` into pages with a pager using the an optional `template`,
`class` and `surround`.

| Argument       | Description |
|----------------|-------------|
| `records`      | The content records to build the pager for. |
| `template`     | The relative path to the template used to generate the pager. The template must be located under `/templates`. Default value is `"helpers/_pager_basic.html.twig"`  |
| `class `       | An optional `class` parameter passed to the template. Default is `pagination`. |
| `surround`     | The amount of items to show around the 'current' one. "3" by default. |

```twig
{{ pager(blogposts, template = 'helpers/_pager_basic.html.twig', 'awesome-posts', 5) }}
```

You can define the template used for the pager yourself, or use one of the
default ones:

| Argument       | Description |
|----------------|-------------|
| `helpers/_pager_basic.html.twig` | A basic pager, without much opinionated styling |
| `helpers/_pager_bootstrap.html.twig`     | Works well, if you're building a theme based on Bootstrap   |
| `helpers/_pager_bulma.html.twig `       | Works well, if you're building a theme based on Bulma |

If you wish to create your own template, you can copy one of the above from
`vendor/bolt/core/templates/helpers/` to your own theme's template folder.
