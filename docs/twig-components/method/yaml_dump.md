# yaml_dump

`yaml_dump(inline = 0, dumpObjects = 0)` is a Twig filter that does the same
as [yaml_encode()](https://symfony.com/doc/current/reference/yaml_encode), but includes the type in the output.

```twig
{{ value|yaml_dump(inline = 0, dumpObjects = false) }}
```

`value`<br>type: `mixed`

`inline` (optional)<br>
type: `integer` default: `0`

`dumpObjects` (optional)<br>
type: `boolean` default: `false`

Source: [Twig](https://symfony.com/doc/current/reference/twig_reference.html#yaml-dump)