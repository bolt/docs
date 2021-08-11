# yaml_encode

`yaml_encode(inline = 0, dumpObjects = 0)` is a Twig filter to Transform the input into YAML syntax.
See [Writing YAML Files](https://symfony.com/doc/current/components/yaml.html#components-yaml-dump) for more
information.

```twig
{{ input|yaml_encode(inline = 0, dumpObjects = false) }}
```

`input`<br>
type: `mixed`

`inline` (optional)<br>
type: `integer` default: `0`

`dumpObjects` (optional)<br>
type: `boolean` default: `false`

Source: [Twig](https://twig.symfony.com/yaml_encode)