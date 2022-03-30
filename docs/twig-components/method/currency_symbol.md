# currency_symbol

`currency_symbol(locale = null)` is a Twig filter to return the currency symbol given its three-letter code:

```twig
{# € #}
{{ 'EUR'|currency_symbol }}
```

```twig
{# ¥ #}
{{ 'JPY'|currency_symbol }}
```

By default, the filter uses the current locale. You can pass it explicitly:
<br>
```twig
{# ¥ #}
{{ 'JPY'|currency_symbol('fr') }}
```

### Note</strong>
The currency_name filter is part of the IntlExtension which is not installed by default. Install it first:

```
$ composer require twig/intl-extra
```

Then, on Symfony projects, install the twig/extra-bundle:

```
$ composer require twig/extra-bundle</pre>
```

Otherwise, add the extension explicitly on the Twig environment:

```
use Twig\Extra\Intl\IntlExtension;

$twig = new \Twig\Environment(...);
$twig->addExtension(new IntlExtension());
```

## Arguments
- locale: The locale

<br>
Source: [Twig](https://twig.symfony.com/currency_symbol)
