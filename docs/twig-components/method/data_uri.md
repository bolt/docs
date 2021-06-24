# data_uri

`data_uri(mime = null, parameters = [])` is a Twig filter to generate a URL using the data scheme as defined in RFC
2397:

```twig
{{ image_data|data_uri }}

{{ source('path_to_image')|data_uri }}

{# force the mime type, disable the guessing of the mime type #}
{{ image_data|data_uri(mime="image/svg") }}

{# also works with plain text #}
{{ '<b>foobar</b>'|data_uri(mime="text/html") }}

{# add some extra parameters #}
{{ '<b>foobar</b>'|data_uri(mime="text/html", parameters={charset: "ascii"}) }}
```

### Note

The data_uri filter is part of the HtmlExtension which is not installed by default. Install it first:

<pre style="background-color: black; color: white">$ composer require twig/html-extra</pre>
Then, on Symfony projects, install the twig/extra-bundle:

<pre style="background-color: black; color: white">$ composer require twig/extra-bundle</pre>
Otherwise, add the extension explicitly on the Twig environment:

```twig
use Twig\Extra\Html\HtmlExtension;

$twig = new \Twig\Environment(...);
$twig->addExtension(new HtmlExtension());
```

### Note

The filter does not perform any length validation on purpose (limit depends on the usage context), validation should be
done before calling this filter.

## Arguments

- mime: The mime type
- parameters: An array of parameters

Source: [Twig](https://twig.symfony.com/data_uri)