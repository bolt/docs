# replace

`replace(from)` is a Twig filter to format a given string by replacing the placeholders (placeholders are free-form):

```twig
{{ "I like %this% and %that%."|replace({'%this%': foo, '%that%': "bar"}) }}


{# outputs I like foo and bar
if the foo parameter equals to the foo string. #}

{# using % as a delimiter is purely conventional and optional #}

{{ "I like this and --that--."|replace({'this': foo, '--that--': "bar"}) }}

{# outputs I like foo and bar #}
```

##Arguments

- from: The placeholder values

### See also
[format](https://twig.symfony.com/doc/3.x/filters/format.html)

Source: [Twig](https://twig.symfony.com/replace)