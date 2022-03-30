# round

`round(precision = 0, method = "common")` is a Twig filter to round a number to a given precision:

```twig
{{ 42.55|round }}
{# outputs 43 #}

{{ 42.55|round(1, 'floor') }}
{# outputs 42.5 #}
```

The round filter takes two optional arguments; the first one specifies the precision (default is 0) and the second the rounding method (default is common):

- common rounds either up or down (rounds the value up to precision decimal places away from zero, when it is half way there -- making 1.5 into 2 and -1.5 into -2);
- ceil always rounds up;
- floor always rounds down.

<p class="note"><strong>Note:</strong>
The // operator is equivalent to |round(0, 'floor').
</p>

## Arguments

- precision: The rounding precision
- method: The rounding method

Source: [Twig](https://twig.symfony.com/round)
