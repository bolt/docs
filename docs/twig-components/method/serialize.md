# serialize

`serialize(format = "json", context = [])` is a Twig filter to accept any data that can be serialized by
the [Serializer component](https://symfony.com/components/Serializer) and returns a serialized string in the specified
format.

In the following example, the Twig template uses the `stimulus_controller()` function from
the [Symfony Stimulus Bridge](https://github.com/symfony/stimulus-bridge). If the template is passed a variable called
`product`, you can now serialize its contents to use it in the Stimulus function call:

```twig
{{ stimulus_controller('product-show', {
    product: product|serialize('json', { groups: 'product:read'})
}) }}
```

This would render something like this:

```twig
<div data-controller="product-show"
     data-product-show-product-value="{&quot;id&quot;:5,...}">
<div>
```

Source: [Twig](https://twig.symfony.com/serialize)