# template_from_string

`template_from_string(template, name = null)` is a Twig function to load a template from a string.

```twig
{{ include(template_from_string("Hello {{ name }}")) }}
{{ include(template_from_string(page.template)) }}
```

To ease debugging, you can also give the template a name that will be part of any related error message:

```twig
{{ include(template_from_string(page.template, "template for page " ~ page.name)) }}
```

<p class="note"><strong>Note:</strong> The template_from_string function is not available by default. You must add 
the \Twig\Extension\StringLoaderExtensionextension explicitly when creating your Twig environment:</p>

```twig
$twig = new \Twig\Environment(...);
$twig->addExtension(new \Twig\Extension\StringLoaderExtension());
```

<p class="note"><strong>Note:</strong> Even if you will probably always use the template_from_string function with 
the include function, you can use it with any tag or function that takes a template as an argument (like the embed or 
extends tags).</p>

##Arguments
- `template`: The template
- `name`: A name for the template

Source: [Twig](https://twig.symfony.com/doc/3.x/functions/template_from_string.html#template-from-string)