# relative_path

`relative_path(path)` is a Twig function to return the relative path from the passed absolute URL. 

For example, assume you’re on the following page in your app: http://example.com/products/hover-board.

```twig
{{ relative_path('http://example.com/human.txt') }}
{# ../human.txt #}

{{ relative_path('http://example.com/products/products_icon.png') }}
{# products_icon.png #}
```

Source: [Symfony](https://symfony.com/doc/current/reference/twig_reference.html#relative-path)