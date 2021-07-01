# first

`first` is a Twig filter to return the first "element" of a sequence, a mapping, or a string:

```twig
{{ [1, 2, 3, 4]|first }}
{# outputs 1 #}

{{ { a: 1, b: 2, c: 3, d: 4 }|first }}
{# outputs 1 #}

{{ '1234'|first }}
{# outputs 1 #}
```

### Note

It also works with objects implementing the <a href="https://www.php.net/manual/en/class.traversable.php">
Traversable</a> interface.

Source: [Twig](https://twig.symfony.com/first)