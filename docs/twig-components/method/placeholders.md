# placeholders

`placeholders(?string $string = null, array $replacements = [])` is a Twig filter to set placeholders in your twig file.

For example: 

```twig
{{ 'This is a string'|placeholders('year' => date('Y')) }}
```
