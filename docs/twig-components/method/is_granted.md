# is_granted

`is_granted(role, object = null, field = null)` is a Twig function to return `true` if the current user has the given
role.

Optionally, an object can be passed to be used by the voter. More information can be found
in [Access Control in Templates](https://symfony.com/doc/current/security.html#security-template).

```twig
{{ is_granted(role, object = null, field = null) }}
```

role<br>
type: `string`

object (optional)<br>
type: `object`

field (optional)<br>
type: `string`

Source: [Twig](https://symfony.com/doc/current/reference/twig_reference.html#is-granted)