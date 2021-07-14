# raw

`raw` is a Twig filter to mark the value as being "safe", which means that in an environment with automatic escaping
enabled this variable will not be escaped if `raw` is the last filter applied to it:

```twig
{% autoescape %} 
    {{ var|raw }} {# var won't be escaped #} 
{% endautoescape %} 
```

Source: [Twig](https://twig.symfony.com/doc/3.x/filters/raw.html)