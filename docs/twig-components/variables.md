---
title: Available variables in Twig
---

Available variables in Twig
===========================

To see all variables defined in the current page, use

```twig
# To output all variables in place in the HTML output
{{ dump() }}

# To output all variables in the Symfony toolbar
{% dump() %}
```

## App

App is an instance of `Symfony\Bridge\Twig\Appvariable`. It contains:

| Name           | Description |
|----------------|-------------|
| `debug`        | Boolean indicating whether Debug is enabled or not |
| `environment`  | Indicating the current environment, like `dev` or `prod` |
| `request`      | Instance of `Symfony\Component\HttpFoundation\Request` |
| `session`      | Instance of `Symfony\Component\HttpFoundation\Session\Session` |
| `flashes`      | Array of Session Flashes |
| `user`         | Instance of `Bolt\Entity\User` |
| `tokenStorage` | Instance of Symfony's `UsageTrackingTokenStorage` |
| `requestStack` | Instance of `Symfony\Component\HttpFoundation\RequestStack` |

```twig
{{ app.debug }}
```

### Request

The app variable also includes information about the request, accessible by:

```twig
{{ dump(app.request) }}
{% set request = app.request %}
{% set method = request.method %}
{% set host = request.headers.host %}
```

### Session

The session can be accessed through the app variable:

```twig
{% set session = app.session %}
```

### User

Apart from the global `user` variable, the user can also be accessed using the
app variable:

```twig
{% set user = app.user %}
```

```twig
{{ user.displayName }} # shows the logged in user's display name
{{ user.username }}
{{ user.email }}
{{ user.lastSeenAt }}
{{ user.locale }}
{{ user.disabled }} # true if user is disabled, otherwise false.
{{ user.roles }} # returns an array containing the user's roles
```

### Environment

The current environment, as set in your `.env` file, can be accessed:

```twig
{% environment = app.environment %} # in dev, it returns 'dev'. For production, it will return 'prod'
```

For more info on `app`, check the Symfony app variable.

### Flashes

Symfony's flashes can be accessed through the global app variable:

```twig
{% for message in app.flashes('notice') %}
    <div class="flash-notice">
        {{ message }}
    </div>
{% endfor %}
```

## Config

The config global variable is used to access the configuration available in
your `config.yaml` and `contenttypes.yaml` files. It has a bunch of useful
methods

### get(path)

Returns a config value using a path

```twig
{% set sitename = config.get('general/sitename') %}
{% set accepted_file_types = config.get('general/accept_file_types') %}
```

### has(path)

Returns true if config matches path, and false otherwise.

```twig
{% set has_sitename = config.get('general/sitename') %} # returns true
{% set has_fakedummy = config.get('fake/dummy) %} # returns false
```

### contentType(contenttype)

Returns the configuration for the given contenttype.

```twig
{% set homepage_config = config.contentType('homepage') %}
```

## Theme

The global theme variable contains the configuration for your current theme, as
defined in `theme.yaml`. For example, if you have configured your theme with a
dark/light modes, here is how to access them:

```twig
{% set mode = theme.get('mode') %}
```

<p class="note"><strong>Note:</strong> Unlike the global <code>config</code>,
the global <code>theme</code> variable is a multi-dimensional array. Thus,
to access nested configurations, use <code>theme.get('level-1').get('level-2')</code>.</p>

## Record

Most pages will have a global 'record' defined that corresponds to the current page. For more information on this, see [Record and Records][record]


---
[record]: ../templating/record-and-records

