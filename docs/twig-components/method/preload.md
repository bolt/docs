# preload

`preload(uri, attributes = [])` is a Twig function to preload an asset by wrapping it with the preload() function.

```twig
<head>
    <!-- ... -->
    <link rel="preload" href="{{ preload(asset('build/app.css')) }}">
</head>
```

To do that, first install the WebLink component:

```twig
composer require symfony/web-link
```

Source: [Symfony](https://symfony.com/doc/current/web_link.html#preloading-assets)