# url_encode

`url_encode` is a Twig filter to encode a given string as URL segment or an array as query string:

```twig
{{ "path-seg*ment"|url_encode }}
{# outputs "path-seg%2Ament" #}

{{ "string with spaces"|url_encode }}
{# outputs "string%20with%20spaces" #}

{{ {'param': 'value', 'foo': 'bar'}|url_encode }}
{# outputs "param=value&foo=bar" #}
```

<p class="note"><strong>Note: </strong>Internally, Twig uses the PHP rawurlencode or the http_build_query function.</p>

Source: [Twig](https://twig.symfony.com/doc/3.x/filters/url_encode.html)