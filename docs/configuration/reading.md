---
title: Accessing & Reading Configuration
---
Accessing & Reading Configuration
=================================

Once an application has loaded then you are able to access configuration
parameters either in PHP code or via Twig templates within your active theme.
As part of the application boot process a few processing steps happen to
compile the final configuration and this includes merging any environment
specific overrides inside `_local.yaml`  suffixed files.

Accessing Configuration in PHP
------------------------------

The configuration service is made available on the Bolt application via `$app['config']`.
The primary method to read configuration variables is `$app['config']->get()`.
Since config variables can take the form of nested arrays then this method
allows you to traverse through the array structure by using the `slash`
separator.

Additionally there are prefixes to specify which configuration type you want to
read from.

These prefixes are:

| Section        | YAML file |
| ---------------| --------- |
| `general`      | `config.yaml` and `config_local.yaml`
| `contenttypes` | `contenttypes.yaml`
| `menu`         | `menu.yaml`
| `permissions`  | `permissions.yaml`
| `routing`      | `routing.yaml`
| `taxonomy`     | `taxonomy.yaml`
| `theme`        | `theme.yaml` (in the active theme directory)

"General" refers to the main configuration found in `config.yaml` and
`config_local.yaml`. For example to fetch the `locale` setting from the main
configuration, we can use: `$app['config']->get('general/locale');`

To traverse into an array we just need to specify it in the method call:
`$app['config']->get('general/database/driver');`

Accessing Configuration in Twig
-------------------------------

You can use the above method to read configuration values in Twig too, the
service is made available in all Twig templates via the `config` service. Usage
is otherwise the same as the PHP details above.

To print the relevant value:

```twig
{{ config.get('general/locale') }}
```

The `theme.yaml` can also be accessed directly, so it looks cleaner in the
template code:

```twig
{{ theme.foo }} // Outputs the `foo:` setting
```

Dynamic runtime values
----------------------

Occasionally you may want to provide and read dynamic values that can be
provided either via an environment variable or via another service that in turn
provides a value.

### Reading environment variables

Within the config files you can specify such values using the following syntax:

```yaml
    database:
        driver: mysql
        username: %APP_USERNAME%
        password: %APP_PASSWORD%
        databasename: %APP_DATABASE%
```

This is very convenient if you want to inject configuration into a staging or
production server, rather than having it in the configuration files that might
be stored in your versioning system.

The values will be swapped out at runtime for the value returned by `getenv()`,
like for example `getenv('APP_DB_HOST')` for `%APP_DB_HOST%`, if it is set.

<p class="note"><strong>Note:</strong> If you are using Nginx with PHP-FPM, you
will need to change the <code>clear_env</code> variable value to
<code>no</code> in the PHP configuration. Generally this configuration is in
<code>/etc/php5/fpm/pool.d/www.conf</code> commented as <code>;clear_env =
no</code>, just uncomment this line and restart php-fpm</p>

### Providing variables with a service

Similar to the environment lookup you can delegate the value to a service that
is defined on `$app`

Within the config file you can use the following syntax.

```yaml
    sitecolor: %colourservice%
    headercolumns: %layoutservice:header%
    bodycolumns: %layoutservice:body%
```

When referring to a service it must either be a callable and return a value
or in the case of a simple value (eg: `$app['config.example'] = 'example'`)
then this will be returned as is.

You are also able to pass one parameter to a callable, this is separated with
the `:` as in the example above.

The services as defined above would need to be implemented as in the examples
below:

```php
    $app['colourservice'] = function() {
        $colours = ['red', 'white', 'blue'];

        return $colours[array_rand($colours)];
    };

    $app['layoutservice'] = function($block) {
        if ($block === 'header') {
            return 4;
        }

        return 6;
    };
```
