# file_relative

`file_relative` is a Twig filter to transform the given absolute file path into a new file path relative to
project’s root directory.

```twig
{{ '/var/www/blog/templates/admin/index.html.twig'|file_relative }}
{# if project root dir is '/var/www/blog/', it returns 'templates/admin/index.html.twig' #}
```

If the given file path is out of the project directory, a null value will be returned.

Source: [Twig](https://symfony.com/doc/current/reference/twig_reference.html#file-relative)