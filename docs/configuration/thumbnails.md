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
| `browser_cache_time` | Sets the amount of seconds that the browser will cache images for. Set it to activate browser caching. |

