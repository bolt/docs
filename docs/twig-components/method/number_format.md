# number_format

`number_format(decimal = null, decimalPoint = null, thousandSep = null)` is a Twig filter to format numbers. It is a
wrapper around PHP's [number_format](https://www.php.net/number_format) function:

```twig
{{ 200.35|number_format }}
```

You can control the number of decimal places, decimal point, and thousands separator using the additional arguments:

```twig
{{ 9800.333|number_format(2, '.', ',') }}
```

To format negative numbers or math calculation, wrap the previous statement with parentheses (needed because of Twig's
[precedence of operators](https://twig.symfony.com/doc/3.x/templates.html#twig-expressions)):

```twig
{{ -9800.333|number_format(2, '.', ',') }} {# outputs : -9 #}
{{ (-9800.333)|number_format(2, '.', ',') }} {# outputs : -9,800.33 #}
{{  1 + 0.2|number_format(2) }} {# outputs : 1.2 #}
{{ (1 + 0.2)|number_format(2) }} {# outputs : 1.20 #}
```

If no formatting options are provided then Twig will use the default formatting options of:

- 0 decimal places.
- . as the decimal point.
- , as the thousands separator.

These defaults can be changed through the core extension:

```twig
$twig = new \Twig\Environment($loader);
$twig->getExtension(\Twig\Extension\CoreExtension::class)->setNumberFormat(3, '.', ',');
```

The defaults set for number_format can be over-ridden upon each call using the additional parameters.

## Arguments

- decimal: The number of decimal points to display
- decimal_point: The character(s) to use for the decimal point
- thousand_sep: The character(s) to use for the thousands separator

Source: [Twig](https://twig.symfony.com/number_format)