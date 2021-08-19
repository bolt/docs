# reduce

`reduce(arrow, initial = null)` is a Twig filter to iteratively reduce a sequence or a mapping to a single value using 
an arrow function, so as to reduce it to a single value. The arrow function receives the return value of the previous 
iteration and the current value of the sequence or mapping.

```twig
{% set numbers = [1, 2, 3] %}

{{ numbers|reduce((carry, v) => carry + v) }}
{# output 6 #}
```

The reduce filter takes an initial value as a second argument:

```twig
{{ numbers|reduce((carry, v) => carry + v, 10) }}
{# output 16 #}
```

<p class="note"><strong>Note:</strong> the arrow function has access to the current context.</p>

## Arguments
- `arrow`: The arrow function
- `initial`: The initial value

Source: [Twig](https://twig.symfony.com/doc/3.x/filters/reduce.html)
