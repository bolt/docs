# impersonation_exit_path

`impersonation_exit_path(exitTo = null)` is a Twig function to generate a URL that you can visit to
exit [user impersonation](https://symfony.com/doc/current/security/impersonating_user.html). After exiting
impersonation, the user is redirected to the current URI. If you prefer to redirect to a different URI, define its value
in the `exitTo` argument.

If no user is being impersonated, the function returns an empty string.

```
{{ impersonation_exit_path(exitTo = null) }}
```

exitTo (optional)<br>
type: `string`

Source: [Twig](https://symfony.com/doc/current/reference/twig_reference.html#impersonation-exit-path)