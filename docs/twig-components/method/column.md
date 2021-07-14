# column

`column` is a Twig filter to return the values from a single column in the input array.

```twig
{% set items = [{ 'fruit' : 'apple'}, {'fruit' : 'orange' }] %}

{% set fruits = items|column('fruit') %}

{# fruits now contains ['apple', 'orange'] #}
```


### Note
Internally, Twig uses the PHP array_column function.

## Arguments

<ul><li>name: The column name to extract</li></ul>
<br>
Source: [Twig](https://twig.symfony.com/column)