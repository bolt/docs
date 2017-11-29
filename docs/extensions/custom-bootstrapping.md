---
title: Custom Bootstrapping
level: advanced
---
Customising Bootstrapping
=========================

Whilst Bolt is designed to be simple for anyone to install, its core
functionality is also modular and easy to configure for developers who are
comfortable making a few modifications to how Bolt is bootstrapped.

The basics of configuring a Bolt application
--------------------------------------------

There are two ways your Bolt application is used, via web requests and via
the command line with nut. Because there are two entry points, bootstrap
configuration/customization needs to be done in a standard place.

This is with a configuration file in the root directory of your project.
This file can be either `.bolt.yml` or `.bolt.php`.
With this file you can modify things like paths, the application class to use,
add other services used by the application, and add custom extensions.

Bolt looks for `.bolt.yml` first, then `.bolt.php`. The YAML file is recommended,
but PHP can be used if programmatic logic is required.

Customising file system paths
-----------------------------

Below are full examples of all available paths customised.

### Example 1a. YAML `.bolt.yml` file

```yaml
paths:
    cache: %app%/cache
    config: %app%/config
    database: %app%/database
    extensions: %site%/extensions
    extensions_config: %config%/extensions
    web: %site%/public
    files: %web%/files
    themes: %web%/theme
    bolt_assets: %web%/bolt-public
```

### Example 1b. PHP `.bolt.php` file

```php
<?php

return [
    'paths' => [
        'cache'             => '%app%/cache',
        'config'            => '%app%/config',
        'database'          => '%app%/database',
        'extensions'        => '%site%/extensions',
        'extensions_config' => '%config%/extensions',
        'web'               => '%site%/public',
        'files'             => '%web%/files',
        'themes'            => '%web%/theme',
        'bolt_assets'       => '%web%/bolt-public/view',
    ],
];
```


Adding your own service providers
---------------------------------

Adding your own service provider gives a lot of scope to add your own services
or replace/[extend][] any existing service.

<p class="note"><strong>Note:</strong> Bolt does call Composer's autoloader
before this file, but it is up to you to configure <code>composer.json</code>
to autoload these classes.</p>

```yaml
# .bolt.yml
services:
    - MyApp\Provider\CustomProvider
```

```php
<?php // .bolt.php

return [
    'services' => [
        MyApp\Provider\CustomProvider::class
        // or
        new MyApp\Provider\CustomProvider()
    ]
];
```


Custom Application Class
------------------------

The Application class can be changed here as well. This allows you to modify
Bolt services or add your own, although using the `services` described above
is recommended instead.

In YAML, you can give the class name and we will create it for you. We will
still apply any other customization afterwards as well.

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
give us an application _object_ we'll assume it is ready to go. This means you
will need to apply any other customizations yourself.

```php
<?php

// Create the application.
$app = new My\Application();

return [
    'application' => $app
];

// You can also just return the application object as a shortcut
return $app;
```

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
[extend]: https://github.com/silexphp/Pimple/tree/1.1#modifying-services-after-creation
