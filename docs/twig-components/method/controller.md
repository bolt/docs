# controller

`controller(controller, attributes = [], query = [])` is a Twig function to return an instance of ControllerReference to
be used with functions
like [render()](https://symfony.com/doc/current/reference/twig_reference.html#reference-twig-function-render) and
[render_esi()](https://symfony.com/doc/current/reference/twig_reference.html#reference-twig-function-render-esi).

```twig
{{ controller(controller, attributes = [], query = []) }}
```

`controller`<br>
type: `string`

`attributes` (optional)<br>
type: `array` default: `[]`

`query` (optional)<br>
type: `array` default: `[]`

Source: [Symfony](https://symfony.com/doc/current/reference/twig_reference.html#controller)