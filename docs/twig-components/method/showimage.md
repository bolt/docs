# showimage

`showimage(width = null, height = null)` is a Twig filter to  insert an image in the HTML. You can optionally provide 
the width, height and cropping parameters, like you can do with the thumbnail filter.

```twig
{{ record.photo|showimage(800, 600) }}
or
{{ showimage("2020-03/foo.jpg", 800, 600) }}
```
