# selectedchoice

`selectedchoice` is a Twig test to check if the current choice is equal to the `selected_value` or if the
current choice is in the array (when `selected_value` is an array).

```twig
<option {% if choice is selectedchoice(value) %}selected="selected"{% endif %}>
```

Source: [Forms](https://twig.symfony.com/selectedchoice)