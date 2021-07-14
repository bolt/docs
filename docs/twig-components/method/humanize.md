# humanize

`humanize` is a Twig filter to make a technical name human readable (i.e. replaces underscores by spaces or transforms
camelCase text like `helloWorld` to `hello world`and then capitalizes the string).

```twig
{{ text|humanize }}
```

text<br>
type: `string`

Source: [Twig](https://twig.symfony.com/humanize)