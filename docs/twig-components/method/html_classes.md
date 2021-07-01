# html_classes

`html_classes(args)` is a Twig function to return a string by conditionally joining class names together:

```twig
<p class="{{ html_classes('a-class', 'another-class', {
    'errored': object.errored,
    'finished': object.finished,
    'pending': object.pending,
}) }}">How are you doing?</p>
```

### Note

The html_classes function is part of the HtmlExtension which is not installed by default. Install it first:

```twig
$ composer require twig/html-extra
```

Then, on Symfony projects, install the twig/extra-bundle:

```twig
$ composer require twig/extra-bundle
```

Otherwise, add the extension explicitly on the Twig environment:

```twig
use Twig\Extra\Html\HtmlExtension;

$twig = new \Twig\Environment(...);
$twig->addExtension(new HtmlExtension());
```

Source: [Twig](https://twig.symfony.com/html_classes)