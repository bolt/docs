# min

`min(args)` is a Twig function to min returns the lowest value of a sequence, or a set of values:

```twig
{{ min(1, 3, 2) }}
{{ min([1, 3, 2]) }}
```

When called with a mapping, min ignores keys and only compares values:

```twig
{{ min({2: "e", 3: "a", 1: "b", 5: "d", 4: "c"}) }}
{# returns "a" #}
```

Source: [Twig](https://twig.symfony.com/min)