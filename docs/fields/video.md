---
title: Video field
---
Video field
===========

A field for videos from external sources like youtube, vimeo and so on. Will
also show a preview beside the field.

When using this field more information about the video is available. To see the
values that are stored, use `{{ dump(page.video) }}`.

## Basic Configuration:

```yaml
        teaser:
            type: video
```

## Example usage in templates:

To insert the `<embed>`-code for the video, use:

```twig
{{ record.teaser.html }}
```

There's also a special 'responsive' HTML snippet available for videos. To insert
it, use the following, and add the required CSS to your stylesheet:

```twig
{{ record.teaser.responsive }}
```

```css
/**
 * Styles for 'responsive video embeds'
 */
.responsive-video {
  height: 0; padding-top: 25px; padding-bottom: 67.5%; margin-bottom: 10px; position: relative; overflow: hidden;
}
.responsive-video.vimeo {
  padding-top: 0;
}
.responsive-video.widescreen {
  padding-bottom: 57.25%;
}
.responsive-video embed, .responsive-video iframe, .responsive-video object, .responsive-video video {
  top: 0; left: 0; width: 100%; height: 100%; position: absolute;
}
@media (max-width: 767px) {
  .responsive-video {
    padding-top: 0;
  }
}
```
