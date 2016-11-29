---
title: Thumbnails
---
Thumbnails
==========

Bolt comes with a thumbnail system which allows you to scale and crop your images.
This is particularly useful if images need to fit into a specific layout.
The reduced file size can also increase the performance of your site.

The thumbnail settings are defined in `config.yml` under the `thumbnails` key.
Here is an example with the default settings:

```yaml
thumbnails:
    default_thumbnail: [ 160, 120 ]
    default_image: [ 1000, 750 ]
    quality: 80
    cropping: crop
    notfound_image: view/img/default_notfound.png
    error_image: view/img/default_error.png
    save_files: false
    allow_upscale: false
    exif_orientation: true
    only_aliases: false
#    browser_cache_time: 2592000
```

Settings
--------

| Setting | Explanation |
| --- | --- |
| `default_thumbnail` | The default size of images, when using `{{ record.image|thumbnail() }}`. |
| `default_image` | The default size of images, when using `{{ record.image|image() }}`. |
| `quality` | Should be between `0` (horrible, small file) and `100` (best, huge file). |
| `cropping` | One of either `crop`, `fit`, `borders` or `resize`. |
| `notfound_image` | Path to the image that will be shown if the thumbnailer can't find the given image. |
| `error_image` | Path to the image that will be shown if an error occurs during the thumbnail generation. |
| `save_files` | Can be either `true` or `false`. If true, it saves generated thumbnails to disk so they don't need to be generated again. |
| `allow_upscale` | Can be either `true` or `false`. If true, the thumbnailer can make images bigger than the original. |
| `exif_orientation` | Can be either `true` or `false`. If true, the thumbnailer will use the image orientation from its EXIF data. |
| `only_aliases` | Can be either `true` or `false`. If true, all thumbnail requests that don't match an alias will be blocked |
| `browser_cache_time` | Sets the amount of seconds that the browser will cache images for. Set it to activate browser caching. |

Thumbnail Aliases
-----------------

With thumbnail aliases, you can define thumbnail sizes which are specific for
your theme, like a `teaser` or `cover` thumbnail. This not only makes them easy
to change at any time, but also prevents people from flooding your cache or
server space with automatically generated thumbnails.

Example thumbnail alias usage:

```twig
{{ image|thumbnail('alias') }}
```

### Defining Thumbnail Aliases

Because thumbnail aliases are very theme specific,
they will be defined in the `theme.yml` of your theme.

Here is a little example with a `teaser` and a `cover` alias:

```yaml
thumbnails:
    aliases:
        teaser:
            size: [400, 300]
            cropping: crop
        cover:
            size: [600, 400]
            cropping: crop
```

As you can see, each alias has a new setting called `size` where you define the
width and the height of the thumbnails. You can also define how they will be
cropped.

Basic usage is straightforward:

```twig
{{ record.image|thumbnail(400, 300, 'c') }}

becomes:

{{ record.image|thumbnail('teaser') }}
```

For further examples on how to use the thumbnail alias with your code, please
see the [template tag documentation][].

### Preventing non-alias Thumbnails

With the `only_aliases` setting in the general thumbnail configuration, you can
prevent the generation of thumbnails that don't belong to an alias. This is
useful to secure your server from automatically generated thumbnails that could
flood your cache.

When developing a site with this feature turned on, there are two things to note:

 - If you're logged on, thumbnails not using an alias will still work. Test them
   'incognito', or when logged off.
 - Images that are already generated might still be served from cache. Flush the
   cache, if you're seeing stale images.

[template tag documentation]: https://docs.bolt.cm/templating/templatetags#thumbnail
