# localdate

`localdate(format = null, locale = null, timezone = null)` is a Twig filter to output a localized, readable version of a timestamp.

|Parameter	|Description
|---|---
|format	|`Optional` The format used to display. If not provided, the default date_format from config/config.yaml will be used instead.
|locale	|`Optional` The locale (language) in which to translate the date. If not provided, the default locale from config/services.yaml will be used instead.

<p class="tip">To check all available date formats, please refer to the official php documentation https://www.php.net/manual/en/function.date.php</p>

```twig
    {{ record.publishedAt|localdate }} {# Display published date with default format and locale #}
    {{ record.publishedAt|localdate(format='F j, Y H:i') }} {# Display published date with custom format and default locale #}
    {{ record.publishedAt|localdate(locale='nl') }} {# Display published date with default format and custom locale #}
    {{ record.publishedAt|localdate(format='F j, Y H:i', locale='nl') }} {# Display published date with default format and custom locale #}

    {{ "now"|localdate }} {# Display the current date and time #}
```
