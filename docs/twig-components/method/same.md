# same

`same as` is a Twig test to check if a variable is the same as another variable. 

This is equivalent to === in PHP:

```twig
{% if foo.attribute is same as(false) %}
    the foo attribute really is the 'false' PHP value
{% endif %}
```

Source: [Twig](https://twig.symfony.com/doc/3.x/tests/sameas.html)
