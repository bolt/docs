---
title: Embed field
---
Embed field
===========

A generic built-in embed client, to facilitate embedding from different sources
like YouTube, Vimeo, SoundCloud, Twitter, Issuu or any other kind of media
provider that supports the OEmbed standard.


## Basic Configuration:

```yaml
        embedded:
            type: embed
```

## Example usage in templates:

To insert the HTML for the embed:

```twig
{{ record.embedded.html|raw }}
```

Additionally, the following properties are available:

```twig
{{ record.embedded.url }}
{{ record.embedded.width }}
{{ record.embedded.height }}
{{ record.embedded.title }}
{{ record.embedded.authorname }}
{{ record.embedded.authorurl }}
{{ record.embedded.thumbnail }}
```
