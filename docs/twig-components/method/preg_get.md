# preg_get

`preg_get(pattern, group = 0)` is a Twig filter to perform a regular expression match and returns the matched group.

```twig
First name: {{ client.fullname|preg_get('/^\S+/') }}
```

Source: [Jasny](https://github.com/jasny/twig-extensions)
