# file_excerpt

`file_excerpt(line, srcContext = 3)` is a Twig filter to generate an excerpt of a code file around the given `line`
number. The `srcContext` argument defines the total number of lines to display around the given line number (use `-1` to
display the whole file).

```twig
{{ file|file_excerpt(line, srcContext = 3) }}
```

Source: [Twig](https://symfony.com/doc/current/reference/twig_reference.html#file-excerpt)