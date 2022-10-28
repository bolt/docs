# json_encode

`json_encode(options, depth)` is a Twig filter to return the JSON representation of a value:

```twig
{{ data|json_encode() }}
```

<p class="note">

Internally, Twig uses the PHP [json_encode](https://www.php.net/json_encode) function.

## Arguments

- options: A bitmask
  of [json_encode options](https://www.php.net/manual/en/json.constants.php): `{{ data|json_encode(constant('JSON_PRETTY_PRINT')) }}`
  . Combine constants
  using [bitwise operators](https://twig.symfony.com/doc/3.x/templates.html#template_logic): `{{ data|json_encode(constant('JSON_PRETTY_PRINT') b-or constant('JSON_HEX_QUOT')) }}`

Source: [Twig](https://twig.symfony.com/json_encode)
