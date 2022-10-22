---
title: "Configuration, services and routes"
short_title: Configuration, services and routes
level: advanced
---


## config.yaml
Often times when building an extension, you will need to an extension
configuration file, where the people using your extension will configure
how the extension behaves.

By default, Bolt will parse a yaml configuration file available for use in 
the source code of your extension, similar to Bolt's own `config.yaml`.
To use this, simply create a `config/config.yaml` file.

The config will then be available in any class in your extension, for example:

```php
<?php

declare(strict_types=1);

namespace Acme\ExampleExtension;

use Bolt\Extension\ExtensionRegistry;


class ExampleClassWithConfig
{
    /** @var ExtensionRegistry */
    private $registry;

    public function __construct(ExtensionRegistry $registry)
    {
        $this->registry = $registry;
    }

    public function getConfig(): array
    {
        $extension = $this->registry->getExtension(Extension::class);

        return $extension->getConfig();
    }

}
```

<p class="note">If you include the <code>config/config.yaml</code> in your package,
it will be copied when your extension is installed. You can use this to
provide default configuration for your extension.</p>

## Services

Any class which is within a Bolt extension is automatically added as an autowired
and autoconfigured service. For more on services, check 
[the official documentation](https://symfony.com/doc/current/service_container.html).

In some instances, it is necessary to override the service definition. To do so, put
your custom services definition inside `config/services.yaml`, for example:

```yaml
services:
  _defaults:
    autowire: true
    autoconfigure: true
  Bolt\UsersExtension\ProtectedListingController:
    decorates: Bolt\Controller\Frontend\ListingController
    arguments: ['@.inner']
    tags: ['controller.service_arguments']

  Bolt\UsersExtension\ProtectedDetailController:
    decorates: Bolt\Controller\Frontend\DetailController
    arguments: ['@.inner']
    tags: ['controller.service_arguments']

  Bolt\UsersExtension\Controller\AccessAwareController:
    tags: ['controller.service_arguments']
```

The `config/services.yaml` file is copied every time an extension is installed
`composer require myname/myextension` and updated `composer update myname/myextension`.

Thus, if you tag multiple releases for your extension, you can alter the contents of the 
`config/services.yaml` file knowing they will be copied across as needed for the 
relevant version.

## Routes

If your extension needs to define custom routes, these should be defined inside
`config/routes.yaml`, for example:

```yaml
users_extension_controllers:
  resource: '../../vendor/bolt/users/src/'
  type: annotation
```

For more on routes, check 
[the official documentation](https://symfony.com/doc/current/routing.html).

The `config/routes.yaml` file is copied every time an extension is installed
`composer require myname/myextension` and updated `composer update myname/myextension`.

Thus, if you tag multiple releases for your extension, you can alter the contents of the 
`config/routes.yaml` file knowing they will be copied across as needed for the 
relevant version.