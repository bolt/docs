# preg_replace

`preg_replace(pattern, replacement = "", limit = -1)` is a Twig filter to make PHPs preg_replace() function available as
twig filter. 

Example usage:

```twig
{{ content.text|preg_replace('/[^a-z]+/', '_') }}
```

Source: [Jasny](https://github.com/jasny/twig-extensions)
