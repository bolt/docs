# thumbnail

`thumbnail(width = null, height = null, location = null, path = null, fit = null)` is a Twig filter to create a link to
an automatically generated thumbnail of a size of your choosing.

For example:

```twig
<img src="{{ content.image|thumbnail(320, 240) }}">
```

If `content.image` is an image in your `files`/ folder, like `foo.jpg`, this modifier will output a link like
`/thumbs/320x240/foo.jpg`. This is useful for creating absolute links to a thumbnail, regardless of whether Bolt is
installed in the root of your domain, a subdomain or a folder.

|Parameter    |Description
|---|---
|width    |The desired width of the resulting image. If empty, it will be relative to the height.
|height    |The desired height of the resulting image. If empty, it will be relative to the width.
|location    |An extra parameter to specify the location (folder) of the image on the server. Default is files, which is where the images are stored.
|path    |The path to the image within the current location.
|fit    |Specify the mode of cropping. See below.

The mode of cropping is important if you're requesting a thumbnail that has different proportions than the original
image. Valid options for cropping are:

- n ('contain', 'default') - Makes sure you always get an image that fits the specified width and height. The image is not
transformed, so it will be resized to fit the boundaries that are necessary. 
- m ('max') - Resizes the image to fit within
the width and height boundaries without cropping, distorting or altering the aspect ratio, and will also not increase
the size of the image if it is smaller than the output size. 
- f ('fill') - Resizes the image to fit within the width and
height boundaries without cropping or distorting the image, and the remaining space is filled with the background color.
The resulting image will match the constraining dimensions. 
- s ('stretch') - Stretches the image to fit the constraining
dimensions exactly. The resulting image will fill the dimensions, and will not maintain the aspect ratio of the input
image. 
- c ('crop') - Resizes the image to fill the width and height boundaries and crops any excess image data. The
resulting image will match the width and height constraints without distorting the image. 

Use the fit parameter like
this:

```twig
<img src="{{ content.image|thumbnail(width=100, height=100, fit="f") }}">
```

If you omit the width and height altogether, the thumbnail will use the 'default' size and cropping mode. Remember to
add quotes around the cropping mode.

```twig
<img src="{{ content.image|thumbnail }}">
```
