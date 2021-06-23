# country_timezones

`country_timezones(country)` is a Twig function to return the names of the timezones associated with a given country code:

```twig
{# Europe/Paris #}
{{ country_timezones('FR')|join(', ') }}
```

### Note
The country_timezones function is part of the IntlExtension which is not installed by default. Install it first:
<br>
<pre style="background-color: black; color: white">$ composer require twig/intl-extra</pre>
<br>
Then, on Symfony projects, install the twig/extra-bundle:
<br>
<pre style="background-color: black; color: white">$ composer require twig/extra-bundle</pre>
<br>
Otherwise, add the extension explicitly on the Twig environment:
<br>

```twig
use Twig\Extra\Intl\IntlExtension;

$twig = new \Twig\Environment(...);
$twig->addExtension(new IntlExtension());</pre>
```

<br>
Source: [Twig](https://twig.symfony.com/country_timezones)