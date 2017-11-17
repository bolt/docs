---
title: Accessing & Reading Configuration
---
Accessing & Reading Configuration
=================================

Once an application has loaded then you are able to access configuration
parameters either in PHP code or via Twig templates within your active theme.
As part of the application boot process a few processing steps happen to
compile the final configuration and this includes merging any environment
specific overrides inside `_local.yml`  suffixed files.

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

 - general
 - taxonomy
 - contenttypes
 - menu
 - routing
 - permissions
 - extensions

General refers to the main configuration found in `config.yml` so for example
to fetch the `locale` setting we can use: `$app['config']->get('general/locale');`

To traverse into an array we can use: `$app['config']->get('general/database/driver');`

Accessing Configuration in Twig
-------------------------------

You can use the above method to read configuration values in Twig too, the
service is made available in all Twig templates via the `config` service. Usage
is otherwise the same as the PHP details above.

To print the relevant value:

```twig
{{ config.get('general/locale') }}
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

When the Bolt application boots up the values are read from the system
environment if they exist.

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
