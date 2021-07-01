# logout_path

`logout_path(key = null)` is a Twig function to generate a relative logout URL for the given firewall. If no key is
provided, the URL is generated for the current firewall the user is logged into.

```twig
{{ logout_path(key = null) }}
```

key (optional)<br>
type: `string`

Source: [Twig](https://symfony.com/doc/current/reference/twig_reference.html#logout-path)