# field_factory

`field_factory(name, definition = null)` is a Twig function to create a field on the fly with a name and optional definition.

|Parameter | Description
|---|---
|name | The name of the field
|definition | The definition of the field, same options as a field definition in `contenttypes.yaml`

```twig
{% set field = field_factory('title', { 'type': 'text', 'label' : 'Awesome title' }) %}
```

Source: [Forms](https://twig.symfony.com/field_factory)