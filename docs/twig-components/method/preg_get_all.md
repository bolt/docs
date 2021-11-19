# preg_get_all

`preg_get_all(pattern, group = 0)` is a Twig filter to perform a regular expression match and return the group for all
matches.

```twig
First name: {{ client.fullname|preg_get_all('/^\S+/') }}
```

Source: [Jasny](https://github.com/jasny/twig-extensions)
