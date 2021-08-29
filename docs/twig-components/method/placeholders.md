# placeholders

`placeholders(?string $string = null, array $replacements = [])` is a Twig filter to set placeholders in your twig file.

For example: 

```twig
{{ class|placeholders('year' => date('Y')) }}
```
