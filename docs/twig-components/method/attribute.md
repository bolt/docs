# attribute

`attribute` is a Twig function that can be used to access a "dynamic" attribute of a variable:

`{{ attribute(object, method) }}
{{ attribute(object, method, arguments) }}
{{ attribute(array, item) }}`
<br><br>
In addition, the defined test can check for the existence of a dynamic attribute:

`{{ attribute(object, method) is defined ? 'Method exists' : 'Method does not exist' }}`



Source: [Twig](https://twig.symfony.com/attribute)