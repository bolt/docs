---
title: Available variables in Twig
---

Available variables in Twig
===========================

## app

```twig
{{ app.config.get('general/sitename') }}
```

```twig
{{ dump(app.config.get('general')) }}
```

### Request

The app variable also includes information about the request, accessible by:

```twig
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

Apart from the global `user` variable, the user can also be accessed using the app variable:

```twig
{% set user = app.user %}
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

## user

The global user variable is a copy of `{{ app.user }}` as discussed earlier.

```twig
{{ user.displayName }} # shows the logged in user's display name
{{ user.username }}
{{ user.email }}
{{ user.lastSeenAt }}
{{ user.locale }}
{{ user.disabled }} # true if user is disabled, otherwise false.
{{ user.roles }} # returns an array containing the user's roles
```

## config

The config global variable is used to access the configuration available in your `config.yaml` and `contenttypes.yaml` files.
It has a bunch of useful methods

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

### getContentType(contenttype)

Returns the configuration for the given contenttype.

```twig
{% homepage_config = config.getContentType('homepage') %}
```

## theme

The global theme variable contains the configuration for your current theme, as defined in `theme.yaml`.
For example, if you have configured your theme with a dark/light modes, here is how to access them:

```twig
{% set mode = theme.get('mode')
```

<p class="note"><strong>Note:</strong> Unlike the global <code>config</code>,
the global <code>theme</code> variable is a multi-dimensional array. Thus,
to access nested configurations, use <code>theme.get('level-1').get('level-2')</code>.</p>


[widgets-page]: ../templating/widgets
[debugging-page]: ../debugging
[select-page]: ../fields/select
[locales-page]: ../other/locales
[linkintpl]: ../templating/linking-in-templates
[linkintpl-asset]: ../templating/linking-in-templates#using-asset-to-link-to-assets-or-files
[linkintpl-pathurl]: ../templating/linking-in-templates#using-path-and-url-to-link-to-named-routes
[linkintpl-current]: ../templating/linking-in-templates#linking-to-the-current-page
[twig]: http://twig.sensiolabs.org/doc/templates.html
[inc]: http://twig.sensiolabs.org/doc/functions/include.html
[inheritance]: http://twig.sensiolabs.org/doc/templates.html#template-inheritance
[number]: http://twig.sensiolabs.org/doc/filters/number_format.html
[popup]: http://dimsemenov.com/plugins/magnific-popup/
[strftime]: http://php.net/manual/en/function.strftime.php
[date]: http://php.net/manual/en/function.date.php
[for]: http://twig.sensiolabs.org/doc/tags/for.html
[switch]: http://php.net/manual/en/control-structures.switch.php
[extras]: ./twig-components/extras
