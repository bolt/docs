# bool

`bool` is a Twig test to to test a value for being a bool (like `is_bool` in PHP).

It uses the mentioned PHP functions / comparisons internally, so you have the same behavior as in PHP.

```twig
{% if somevar is boolean %} {# no equivalent in Twig %} #}
{% endif %}
{% if somevar is bool %} {# same as boolean test above, alternate way to write it %} #}
{% endif %}
```

### Installation

```shell
composer require squirrelphp/twig-php-syntax
```

### Configuration

Add PhpSyntaxExtension to Twig:

```twig
$twig = new \Twig\Environment($loader);
$twig->addExtension(new \Squirrel\TwigPhpSyntax\PhpSyntaxExtension());
```

You can also have a look at the extension definition and create your own extension class to only include some of the
features, if you do not like all of them.

Symfony integration If you use `autoconfigure` (which is the default) you just need to load the PhpSyntaxExtension class
in `services.yaml` in the `config` directory of your project (the first four lines should already be there, just add the
line with the PhpSyntaxExtension class at the end of the file):

```twig
services:
_defaults:
autowire: true autoconfigure: true

    # Just add the following line, Symfony will register
    # the extension in Twig for you if Twig is installed
    Squirrel\TwigPhpSyntax\PhpSyntaxExtension: ~
```

If you do not use `autoconfigure`, you can add the twig extension tag to the service definition:

```twig
services:
Squirrel\TwigPhpSyntax\PhpSyntaxExtension:
tags:

- { name: twig.extension }
```

Source: [Squirrelphp](https://github.com/squirrelphp/twig-php-syntax)
