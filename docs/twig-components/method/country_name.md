# country_name

`country_name(locale = null)` is a Twig filter to return the country name given its ISO-3166 two-letter code:

```twig
{# France #}
{{ 'FR'|country_name }}
```
By default, the filter uses the current locale. You can pass it explicitly:

```twig
{# États-Unis #}
{{ 'US'|country_name('fr') }}
```

### Note
The country_name filter is part of the IntlExtension which is not installed by default. Install it first:

<pre style="background-color: black; color: white">$ composer require twig/intl-extra</pre>
<br>
Then, on Symfony projects, install the twig/extra-bundle:
<br>
<pre style="background-color: black; color: white">$ composer require twig/extra-bundle</pre>
<br>
Otherwise, add the extension explicitly on the Twig environment:

```
use Twig\Extra\Intl\IntlExtension;

$twig = new \Twig\Environment(...);
$twig->addExtension(new IntlExtension());
```

## Arguments
<ul>
<li>locale: The locale</li>
</ul>
<br>
Source: [Twig](https://twig.symfony.com/country_name)