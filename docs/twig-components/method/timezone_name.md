# timezone_name

`timezone_name(locale = null)` is a Twig filter to return the timezone name given a timezone identifier:

```twig
{# Central European Time (Paris) #}
{{ 'Europe/Paris'|timezone_name }}

{# Pacific Time (Los Angeles) #}
{{ 'America/Los_Angeles'|timezone_name }}
```

By default, the filter uses the current locale. You can pass it explicitly:

```twig
{# heure du Pacifique nord-américain (Los Angeles) #}
{{ 'America/Los_Angeles'|timezone_name('fr') }}
```

### Note

The timezone_name filter is part of the IntlExtension which is not installed by default. Install it first:

```twig
$ composer require twig/intl-extra
```

Then, on Symfony projects, install the twig/extra-bundle:

```twig
$ composer require twig/extra-bundle
```

Otherwise, add the extension explicitly on the Twig environment:

```twig
use Twig\Extra\Intl\IntlExtension;

$twig = new \Twig\Environment(...);
$twig->addExtension(new IntlExtension());
```

## Arguments

- locale: The locale

Source: [Twig](https://twig.symfony.com/timezone_name)