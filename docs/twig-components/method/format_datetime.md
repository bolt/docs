# format_datetime

`format_datetime(dateFormat = "medium", timeFormat = "medium", pattern = "", timezone = null, calendar = "gregorian", locale = null)`
is a Twig filter to format a date time.

```twig
{# Aug 7, 2019, 11:39:12 PM #}
{{ '2019-08-07 23:39:12'|format_datetime() }}
```

You can tweak the output for the date part and the time part:

```twig
{# 23:39 #}
{{ '2019-08-07 23:39:12'|format_datetime('none', 'short', locale='fr') }}

{# 07/08/2019 #}
{{ '2019-08-07 23:39:12'|format_datetime('short', 'none', locale='fr') }}

{# mercredi 7 août 2019 23:39:12 UTC #}
{{ '2019-08-07 23:39:12'|format_datetime('full', 'full', locale='fr') }}
```

Supported values are: none, short, medium, long, and full.

For greater flexiblity, you can even define your own pattern (see the ICU user guide for supported patterns).

```twig
{# 11 oclock PM, GMT #}
{{ '2019-08-07 23:39:12'|format_datetime(pattern="hh 'oclock' a, zzzz") }}
```

By default, the filter uses the current locale. You can pass it explicitly:

```twig
{# 7 août 2019 23:39:12 #}
{{ '2019-08-07 23:39:12'|format_datetime(locale='fr') }}
```

### Note

The format_datetime filter is part of the IntlExtension which is not installed by default. Install it first:

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
- dateFormat: The date format
- timeFormat: The time format
- pattern: A date time pattern
- timezone: The date timezone
- calendar: The calendar (Gregorian by default)

Source: [Twig](https://twig.symfony.com/format_datetime)