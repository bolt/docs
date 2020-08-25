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

The configuration service is made available on the Bolt application via the `Bolt\Configuration\Config` class.
You can obtain an instance of the configuration by autowiring the `Bolt\Configuration\Config` service:

```php
<?php

use Bolt\Configuration\Config;

class ExampleClass
{
    public function __construct(Config $config)
    {
        $sitename = $config->get('general/sitename');
    }
}
```

The primary method to read configuration variables is `$config->get()`.
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

"General" refers to the main configuration found in `config.yaml`. 
`config_local.yaml`.

To traverse into an array we just need to specify it in the method call:
`$config->get('general/thumbnails/quality');`

Accessing Configuration in Twig
-------------------------------

You can use the above method to read configuration values in Twig too, the
service is made available in all Twig templates via the `config` service. Usage
is otherwise the same as the PHP details above.

To print the relevant value:

```twig
{{ config.get('general/thumbnails/quality') }}
```

The `theme.yaml` can also be accessed directly, so it looks cleaner in the
template code:

```twig
{{ theme.foo }} // Outputs the `foo:` setting
```
