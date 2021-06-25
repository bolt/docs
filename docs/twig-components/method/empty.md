# empty

`empty` is a Twig test check if a variable is an empty string, an empty array, an empty hash, exactly false, or exactly null.

For objects that implement the Countable interface, empty will check the return value of the count() method.

For objects that implement the __toString() magic method (and not Countable), it will check if an empty string is returned.

```twig
{% if foo is empty %}
    ...
{% endif %}
```

Source: [Twig](https://twig.symfony.com/empty)