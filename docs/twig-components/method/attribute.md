# attribute

`attribute` is a Twig function that can be used to access a "dynamic" attribute of a variable:

```twig
{{ attribute(object, method) }}
{{ attribute(object, method, arguments) }}
{{ attribute(array, item) }}
```

In addition, the defined test can check for the existence of a dynamic attribute:

```twig
{{ attribute(object, method) is defined ? 'Method exists' : 'Method does not exist' }}
```


### Note:

The resolution algorithm is the same as the one used for the . notation, except that the item can be any valid expression.



Source: [Twig](https://twig.symfony.com/attribute)