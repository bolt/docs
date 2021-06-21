# attribute

`attribute`

The attribute function can be used to access a "dynamic" attribute of a variable:

`{{ attribute(object, method) }}`<br>
`{{ attribute(object, method, arguments) }}`<br>
`{{ attribute(array, item) }}`<br>

In addition, the defined test can check for the existence of a dynamic attribute:

`{{ attribute(object, method) is defined ? 'Method exists' : 'Method does not exist' }}`

```
Note:

The resolution algorithm is the same as the one used for the . notation, except that the item can be any valid expression.
```


Source: [Twig](https://twig.symfony.com/attribute)