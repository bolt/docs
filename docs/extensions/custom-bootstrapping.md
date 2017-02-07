---
title: Custom Bootstrapping
level: advanced
---
Customising Bootstrapping
=========================

Whilst Bolt is designed to be simple for anyone to install, its core 
functionality is also modular and easy to configure for developers who are
comfortable making a few modifications to how Bolt is bootstrapped.

There are two ways your Bolt application is used, via web requests and via the
command line with `nut`. Because there are two entry points, bootstrapping is
done in a common `bootstrap.php` file. 

For a more in-depth understanding of Bolt's bootstrapping, examine the PHP code
in Bolt's own [bootstrap file][bs].

The basics of configuring a Bolt application
--------------------------------------------

One of the important functions of the bootstrap file is to read a loader 
configuration file in the root directory of your project. By customising this
configuration, you can modify things like paths, the application class to
use, and other services used by the application. This file can be either 
`.bolt.yml` or `.bolt.php`. 

By default, if found, Bolt uses `.bolt.yml` (recommended) or `.bolt.php` in the
project's root directory.

YAML works for simple values, and PHP supports programmatic logic if required.

Customising file system paths
-----------------------------

In order for paths to be customised and still have the standard index.php (web)
and nut (CLI) work, there needs to be a standard place these are defined.

Customisation of these paths is done in the `paths` key of either your
`.bolt.yml` or `.bolt.php` files.

Below are full examples of all available paths customised.

### Example 1a. YAML `.bolt.yml` file

```yaml
paths:
    cache: app/cache
    config: app/config
    database: app/database
    extensions: extensions
    extensions_config: %config%/extensions
    web: public
    files: %web%/files
    themes: %web%/theme
    bolt_assets: %web%/bolt-public/view
```

### Example 1b. PHP `.bolt.php` file

```php
<?php

return [
    'paths' => [
        'cache'             => 'app/cache',
        'config'            => 'app/config',
        'database'          => 'app/database',
        'extensions'        => 'extensions',
        'extensions_config' => '%config%/extensions',
        'web'               => 'public',
        'files'             => '%web%/files',
        'themes'            => '%web%/theme',
        'bolt_assets'       => '%web%/bolt-public/view',
    ],
];
```




Custom Application Class
------------------------

The Application class can be changed here as well. This allows you to modify
Bolt services or add your own.

In YAML, you can give the class name and we will create it for you. We will
still apply any path customization afterwards as well. 

```yaml
application: My\Application
```

In PHP, you can give the class name...

```php
<?php

return [
    'application' => My\Application::class,
];
```

For even more flexibly you can create the application yourself, or pull it in
from another bootstrap file you have. It’s important to note here that if you
give us an application object we'll assume it is ready to go. This means you'll
need to apply any path customizations yourself. See the next section for an 
example.

```php
<?php

// Create the application.
$app = new My\Application();

return [
    'application' => $app
];

// Alternatively, you can just return the pre-configured application object
return $app;
```


Adding your own providers
-------------------------

If you don't want to extend Bolt\Application but still want to register your
own services you can do that here. However, this can only be done with the PHP
file version and you have to create the application yourself.

This gives a lot of scope to extend and augment core functionality, since you
can either replace any core Bolt service, or as is described in the Silex
[TwigServiceProvider] documentation, you can extend any existing Bolt service
and add additional configurations to the service object.

```php
<?php

$resources = new Bolt\Configuration\Composer(__DIR__);
$resources->setPath('web', 'public');

$app = new Bolt\Application(['resources' => $resources]);

$app->initialize();

$app->register(new MyApp\Provider\ConsoleProvider());
$app->register(new MyApp\Provider\ControllerProvider());
$app->register(new MyApp\Provider\TwigProvider());

return $app;
```

You can make modifications to the services in the `$app` variable within this
scope, such as replacing an existing service, or [extend][] an existing one,
providing you do not attempt to either use the service, or access the `Request`
object/service.

Mounting Bolt on an existing application
----------------------------------------

A lot of work has been done on the internals of Bolt which allow it now to run
as a self- contained `HTTPKernelInterface` application without interfering with
any of the global namespace or constants. So if you use [StackPHP] (or similar)
you can mount Bolt onto a URL prefix as simply as this:

```php
// Assuming this is in public/index.php and Bolt is located in vendor/bolt/bolt/
$map = [
    '/another' => new AnotherApplication(),
    '/blog'    => require __DIR__ . '/../vendor/bolt/bolt/app/bootstrap.php'
];
$app = (new Stack\Builder())
    ->push('Stack\UrlMap', $map)
    ->resolve($app);

Stack\run($app);
```

This means that you can, for instance, use Bolt to manage one specific part of
a larger application set.

[StackPHP]: http://stackphp.com/
[TwigServiceProvider]: http://silex.sensiolabs.org/doc/providers/twig.html#customization
[extend]: https://github.com/silexphp/Pimple/tree/1.1#modifying-services-after-creation
[bs]: https://github.com/bolt/bolt/blob/3.x/app/bootstrap.php
