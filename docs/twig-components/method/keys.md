# keys

`keys` is a Twig filter to return the keys of an array. It is useful when you want to iterate over the keys of an array:

```twig
{% for key in array|keys %}
    ...
{% endfor %}
```

Source: [Twig](https://twig.symfony.com/keys)