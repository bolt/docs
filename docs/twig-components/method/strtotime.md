# strtotime

`strtotime(now)` is a Twig filter to compare timestamps.

Comparing timestamps in templates when the data only has (date) strings is a bit cumbersome in Twig, as there is no 
strtotime filter - this library adds it exactly as it is in PHP:

```twig
{% if "2018-05-05"|strtotime > "2017-05-05"|strtotime %}
{# This is always true, as 2018 results in a larger timestamp integer than 2017 #}
{% endif %}

{% if post.date|strtotime > otherpost.date|strtotime %}
{# Compares the dates of post and otherpost. strtotime returns an integer 
or throws an InvalidArgumentException if strtotime returns false #}
{% endif %}

{# Sets next thursday as a timestamp variable, but also sets "now"
like in strtotime in PHP to define from where the timestamp is
calculated if it is a relative date and not an absolute date #}
{% set nextThusday = "next Thursday"|strtotime(now=sometimestamp) %}
```

Source: [Squirrelphp](https://github.com/squirrelphp/twig-php-syntax)
