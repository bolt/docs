# svg

`svg` is a Twig filter to render an inlined SVG image. 

For example:

```Twig
{{ content.photo|svg }}
```

If `content.photo` is a svg image (see [image filter](https://docs.bolt.cm/4.0/twig-components/filters#image)), this 
filter will output the contents of the svg file as plain HTML, for example:

```twig
<svg height="100" width="100">
  <circle cx="50" cy="50" r="40" stroke="black" stroke-width="3" fill="red" />
  Sorry, your browser does not support inline SVG.
</svg>
```

If the `|svg` filter is called on a variable that is not a svg image, it will not output anything.

To render an inlined svg, and a standard `<img>` tag otherwise, use this:

```twig
{% if content.photo|split('.')|last == 'svg' %} {# if extension is `.svg` #}
    {{ content.photo|svg }}
{% else %}
    {{ content.photo|showimage }}
{% endif %}
```
