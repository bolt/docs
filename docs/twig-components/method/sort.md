# sort

`sort(arrow = null)` is a Twig filter to sort an array:

```twig
{% for user in users|sort %}
    ...
{% endfor %}
```

### Note

Internally, Twig uses the PHP [asort](https://www.php.net/asort) function to maintain index association. It supports
Traversable objects by transforming those to arrays.

You can pass an arrow function to sort the array:

```twig
{% set fruits = [
    { name: 'Apples', quantity: 5 }, 
    { name: 'Oranges', quantity: 2 }, 
    { name: 'Grapes', quantity: 4 },
] %}

{% for fruit in fruits|sort((a, b) => a.quantity <=> b.quantity)|column('name') %} 
    {{ fruit }} 
{% endfor %}

{# output in this order: Oranges, Grapes, Apples #} 
```

Note the usage of the [spaceship](https://www.php.net/manual/en/language.operators.comparison.php) operator to simplify
the comparison.

## Arguments

- arrow: An arrow function

Source: [Twig](https://twig.symfony.com/sort)