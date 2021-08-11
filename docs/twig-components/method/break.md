# break

`break` is a Twig tag to break loops in Twig

This library adds break and continue and they work exactly as in PHP:

```twig
{% foreach list as entry %}
{% if loop.index > 10 %}
{% break %}
{% endif %}
{% endforeach %}
```

You can use break with a number to break out of multiple loops, just like in PHP: (continue does not support this)

```twig
{% foreach list as sublist %}
{% foreach sublist as entry %}
{% if loop.index > 10 %}
{% break 2 %} {# breaks out of both foreach loops #}
{% endif %}
{% endforeach %}
{% endforeach %}
```

While you can often circumvent the usage of `break` and `continue` in Twig, it sometimes leads to additional nesting and
more complicated code. Just one `break` or `continue` can clarify behavior and intent in these instances. Yet I would
advise to use `break` and `continue` sparingly.

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