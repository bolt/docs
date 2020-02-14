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
{{ record.embedded.responsive }}
{{ record.embedded.responsive_inline }}
```

## Responsive options

An embed field can be set to responsive, thereby ignoring the `width` and `height` options. Bolt provides two responsive options.

### Responsive by class

```twig
{{ record.embedded.responsive|html }}
```

The example above will render the embedded `iframe` wrapped around a container parent as follows:

```html
<div class="embed-responsive">
    <iframe ... />
</div>
```

You can use this class to apply the responsive styling in css as you see fit.

### Responsive by inline styles

Alternatively, the `responsive_inline` value can be used to render a responsive embedded field, without any custom CSS required.

```twig
{{ record.embedded.responsive_inline|raw }}
```

will render the following:

```html
<div style="overflow: hidden; padding-bottom: 56.25%; position: relative; height: 0;">
    <iframe style="left: 0; top: 0; height: 100%; width: 100%; position: absolute;" ... />
</div>
```