# format_currency

`format_currency(currency, attrs = [], locale = null)` is a Twig filter to format a number as a currency.

```twig
{# €1,000,000.00 #}
{{ '1000000'|format_currency('EUR') }}
```

You can pass attributes to tweak the output:

```twig
{# €12.34 #}
{{ '12.345'|format_currency('EUR', {rounding_mode: 'floor'}) }}

{# €1,000,000.0000 #}
{{ '1000000'|format_currency('EUR', {fraction_digit: 4}) }}
```

The list of supported options:

grouping_used;
- decimal_always_shown;
- max_integer_digit;
- min_integer_digit;
- integer_digit;
- max_fraction_digit;
- min_fraction_digit;
- fraction_digit;
- multiplier;
- grouping_size;
- rounding_mode;
- rounding_increment;
- format_width;
- padding_position;
- secondary_grouping_size;
- significant_digits_used;
- min_significant_digits_used;
- max_significant_digits_used;
- lenient_parse.

By default, the filter uses the current locale. You can pass it explicitly:

```twig
{# 1.000.000,00 € #}
{{ '1000000'|format_currency('EUR', locale='de') }}
```

### Note

The format_currency filter is part of the IntlExtension which is not installed by default. Install it first:

```
$ composer require twig/intl-extra
```

Then, on Symfony projects, install the twig/extra-bundle:

```
$ composer require twig/extra-bundle
```

Otherwise, add the extension explicitly on the Twig environment:

```
use Twig\Extra\Intl\IntlExtension;

$twig = new \Twig\Environment(...);
$twig->addExtension(new IntlExtension());
```

## Arguments
- currency: The currency
- attrs: A map of attributes
- locale: The locale

Source: [Twig](https://twig.symfony.com/format_currency)
