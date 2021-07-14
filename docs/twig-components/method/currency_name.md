# currency_name

`currency_name(locale = null)`

The currency_name filter returns the currency name given its three-letter code:

```twig
{# Euro #}
{{ 'EUR'|currency_name }}
```

```twig
{# Japanese Yen #}
{{ 'JPY'|currency_name }}
```

By default, the filter uses the current locale. You can pass it explicitly:

```twig
{# yen japonais #}
{{ 'JPY'|currency_name('fr_FR') }}
```

### Note

The currency_name filter is part of the IntlExtension which is not installed by default. Install it first:
<br>
<pre style="background-color: black; color: white">$ composer require twig/intl-extra</pre>
<br>
Then, on Symfony projects, install the twig/extra-bundle:
<br>
<pre style="background-color: black; color: white">$ composer require twig/extra-bundle</pre>
<br>
Otherwise, add the extension explicitly on the Twig environment:

```twig
use Twig\Extra\Intl\IntlExtension;

$twig = new \Twig\Environment(...);
$twig->addExtension(new IntlExtension());
```

### Arguments

* locale: The locale

<br>
Source: [Twig](https://twig.symfony.com/currency_name)