# locale_name

`locale_name(locale = null)` is a Twig filter to return the locale name given its two-letter code:

```twig
{# German #}
{{ 'de'|locale_name }}
```

By default, the filter uses the current locale. You can pass it explicitly:

```twig
{# allemand #}
{{ 'de'|locale_name('fr') }}

{# français (Canada) #}
{{ 'fr_CA'|locale_name('fr_FR') }}
```

<p class="note"><strong>Note:</strong> The locale_name filter is part of the IntlExtension which is not installed by default. Install it first:</p>

`$ composer require twig/intl-extra`

Then, on Symfony projects, install the twig/extra-bundle:

`$ composer require twig/extra-bundle`

Otherwise, add the extension explicitly on the Twig environment:

```twig
use Twig\Extra\Intl\IntlExtension;

$twig = new \Twig\Environment(...);
$twig->addExtension(new IntlExtension());
```

## Arguments

`locale`: The locale

Source: [Twig](https://twig.symfony.com/doc/3.x/filters/locale_name.html)