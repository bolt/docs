---
title: HTTP Cache
---
HTTP Cache
==========

Bolt comes with [Symfony HTTP Cache][] that will act as a simple reverse proxy
to cache rendered pages on disk for a period of time.

This can provide a performance boost on some pages, as means less work for the
werb server to do in order to serve the requested page repeatedly in a short
amount of time.

<p class="note"><strong>Note:</strong> Requests for logged on users will not
be cached.
</p>


Enabling
--------

To enable [Symfony HTTP Cache][] for your Bolt install, in your `config.yml`
file, find the `caching:` key, and enableing the `request` parameter.


```
caching:
    request: true
```


Fine Tuning Options
--------------------

There are several options that get passed to the cache, this can be set under
the `performance:` key in your `config.yml` file.

```
performance:
    http_cache:
        options:
            default_ttl: 8
            private_headers: [ Authorization, Cookie ]
            allow_reload: false
            allow_revalidate: false
            stale_while_revalidate: 2
            stale_if_error: 60
```


| Option                   | Description  |
| ------------------------ | ------------ |
| `default_ttl`            | The number of seconds that a cache entry should be considered fresh when no explicit freshness information is provided in a response. Explicit Cache-Control or Expires headers override this value. (default: 0)
| `private_headers`        | Set of request headers that trigger "private" cache-control behavior on responses that don't explicitly state whether the response is public or private via a Cache-Control directive. (default: Authorization and Cookie)
| `allow_reload`           | Specifies whether the client can force a cache reload by including a Cache-Control "no-cache" directive in the request. Set it to ``true`` for compliance with RFC 2616. (default: false)
| `allow_revalidate`       | Specifies whether the client can force a cache revalidate by including a Cache-Control "max-age=0" directive in the request. Set it to ``true`` for compliance with RFC 2616. (default: false)
| `stale_while_revalidate` | Specifies the default number of seconds (the granularity is the second as the Response TTL precision is a second) during which the cache can immediately return a stale response while it revalidates it in the background (default: 2). This setting is overridden by the stale-while-revalidate HTTP Cache-Control extension (see RFC 5861).
| `stale_if_error`         | Specifies the default number of seconds (the granularity is the second) during which the cache can serve a stale response when an error is encountered (default: 60). This setting is overridden by the stale-if-error HTTP Cache-Control extension (see RFC 5861).


For more information on these options, see the [Symfony HTTP Cache][] documentation page.


[Symfony HTTP Cache]: http://symfony.com/doc/2.8/http_cache.html
