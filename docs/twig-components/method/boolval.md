# boolval

`boolval` is a Twig filter to convert a variable to a boolval. Converting a variable to a specific type is not something
Twig encourages and it probably should be avoided, if possible. Yet there are situations where you just want to convert
something to an integer or string so you can be sure a comparison is type safe or that there is no unexpected behavior
because one value has the wrong type.

```twig
{% if 1|boolval === true %}
Convert 1 to a boolean - this if block is being executed
{% endif %}
```

These filters mainly behave like the ones in PHP (and use the corresponding PHP functions internally), but there is some
additional behavior to detect or avoid likely errors:

- only scalar values, null and objects with a __toString method are allowed, so if you use any of these filters with an
  array or an object that cannot be cast to a string it will throw an exception
- null will return 0 for intval, '' for strval, false for boolval and 0.0 for floatval (just like in PHP)
- objects with a __toString method will be converted to a string first (using the __toString method), and only after
  that intval, boolval and floatval will be used
- boolval should be used with caution, as if you give it any non-numeric string it will return true, yet empty strings
  and "0" will return false. boolval is here more for completeness, as it is probably the least useful conversion
  function in PHP. The recommendation is to use the other three functions instead of using boolval if possible.

Source: [Squirrelphp](https://github.com/squirrelphp/twig-php-syntax)