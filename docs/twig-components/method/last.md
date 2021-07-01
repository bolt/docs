# last

`last` is a Twig filter to return the last "element" of a sequence, a mapping, or a string:

```twig
{{ [1, 2, 3, 4]|last }}
{# outputs 4 #}

{{ { a: 1, b: 2, c: 3, d: 4 }|last }}
{# outputs 4 #}

{{ '1234'|last }}
{# outputs 4 #}
```

### Note

It also works with objects implementing the [Traversable](https://www.php.net/manual/en/class.traversable.php) interface.

Source: [Twig](https://twig.symfony.com/last)