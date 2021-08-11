# app

`app = object(Symfony\Bridge\Twig\AppVariable)` is a Twig global. It contains:

| Name | Description |
|---|---|
|debug | Boolean indicating whether Debug is enabled or not
|environment | Indicating the current environment, like dev or prod
|request	|Instance of Symfony\Component\HttpFoundation\Request
|session	|Instance of Symfony\Component\HttpFoundation\Session\Session
|flashes	|Array of Session Flashes
|user	|Instance of Bolt\Entity\User
|tokenStorage	|Instance of Symfony's UsageTrackingTokenStorage
|requestStack	|Instance of Symfony\Component\HttpFoundation\RequestStack

```twig
{{ app.debug }}
```

Source: Bolt