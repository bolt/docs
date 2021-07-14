# shuffle

`shuffle` is a Twig filter to randomize the order of elements in an array and returns the result.

The new array will have different array keys. The existing keys are removed and new ones are assigned while randomizing the values of the array.

```twig
{% set newValue = value|shuffle %}
```

Source: [Twig](https://twig.symfony.com/shuffle)