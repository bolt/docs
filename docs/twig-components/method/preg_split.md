# preg_split

`preg_split(pattern)` is a Twig filter to make PHPs preg_split() function available as Twig filter. It splits text into
an array using a regular expression.

```twig
{% set keywords = "hypertext language, programming" %}
{{ keywords|preg_split("/[\s,]+/" }}
```

The result will be:

```twig
[0] => hypertext
[1] => language
[2] => programming
```

Source: [Jasny](https://github.com/jasny/twig-extensions)
