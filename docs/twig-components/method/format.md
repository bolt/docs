# format

`format(args)` is a Twig filter to format a given string by replacing the placeholders (placeholders follows the sprintf
notation):

```twig
{{ "I like %s and %s."|format(foo, "bar") }}

{# outputs I like foo and bar 

    if the foo parameter equals to the foo string. #} 
```

### See also

[replace](https://twig.symfony.com/doc/3.x/filters/replace.html)

Source: [Twig](https://twig.symfony.com/doc/3.x/filters/format.html)