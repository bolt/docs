# preg_filter

`preg_filter(pattern, replacement = "", limit = -1)` is a Twig filter to perform a regular expression search and
replace, returning only matched subjects (like PHP's `preg_filter()` function).

`preg_filter` is identical to `preg_replace` except it only returns the (possibly transformed) subjects where there was
a match.

```twig
 {% for item in items|preg_filter('/-test$/', 'invert') %}
    <li>{{ item }}</li>
  {% endfor %}
```

Source: [Jasny](https://github.com/jasny/twig-extensions)
