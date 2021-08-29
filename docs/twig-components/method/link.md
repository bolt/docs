# link

`link($text, $uri, $attributes)` is a Twig function to display link details. It accepts as first parameter the text and as second parameter the uri.

Examples:

```twig
{{ link(item.title, item.uri, { 'class':['foo', 'bar', 'baz']} ) }}
```

Source: [Twig](https://www.drupal.org/docs/theming-drupal/twig-in-drupal/functions-in-twig-templates#block-system-main-menu)
