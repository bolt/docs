# preg_grep

`preg_grep(pattern, flags = "")` is a Twig filter to perform a regular expression match and return an array of entries
that match the pattern.

```twig
{% set values = [..., ..., ...] %} 
{{ values|preg_grep("/^(\d+)?\.\d+$/");
```

Source: [Jasny](https://github.com/jasny/twig-extensions)
