# format_date

`format_date(dateFormat = "medium", pattern = "", timezone = null, calendar = "gregorian", locale = null)` is a Twig
filter to format a date. It behaves in the exact same way as
the [format_datetime](https://twig.symfony.com/doc/3.x/filters/format_datetime.html) filter, but without the time.

### note

The format_date filter is part of the IntlExtension which is not installed by default. Install it first:

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
- pattern: A date time pattern
- timezone: The date timezone
- calendar: The calendar (Gregorian by default)

Source: [Twig](https://twig.symfony.com/format_date)