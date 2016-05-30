---
title: Advanced installation details
---
Advanced Installation Options
=============================

Whilst Bolt is designed to be simple for anyone to install, its core
functionality is also modular and easy to configure for anyone who is
comfortable making a few modifications to their bootstrap code.

By default Bolt ships with its own bootstrap file which is responsible for
setting up and running a Bolt application. Most of the advanced configuration
options are best attained by taking over this responsibility in your own
application. In the root of your project you will see an `index.php` file that
should look like this:

```
require_once __DIR__ . '/app/bootstrap.php';
$app->run();
```

Ideally you would replace the path to bootstrap.php with a link to your own
bootstrap file, for example:

```
require_once __DIR__ . '/custom-bootstrap.php';
$app->run();
```

The basics of configuring a Bolt application
--------------------------------------------

The job of your custom bootstrap file is to provide a bootstrapped `$app`
object that the `index.php` file will then run. The simplest possible bootstrap
file will look like this, assuming that your bootstrap file is in the same
directory as your `index.php` file:

```
// custom-bootstrap.php
$configuration = new Bolt\Configuration\Standard(__DIR__);
$app = new Bolt\Application(array('resources'=>$configuration));
```


Installing Bolt as a composer package
-------------------------------------

As in the previous example, Bolt provides out of the box support for running as
an installed Composer package, you will however need to make a couple of
additions to your local `composer.json` file as well. Bootstrapping your app
looks very similar but we will use the `Composer` configuration class instead.

```
// custom-bootstrap.php
$configuration = new Bolt\Configuration\Composer(__DIR__);
$app = new Bolt\Application(array('resources'=>$configuration));
```

### Composer.json modifications

You also need to add the below to your `composer.json` file:

```json
    "scripts": {
        "post-install-cmd": [
            "Bolt\\Composer\\ScriptHandler::installAssets"
        ],
        "post-update-cmd": [
            "Bolt\\Composer\\ScriptHandler::installAssets"
        ]
    },

    "extra":{
        "bolt-web-dir": "./"
    }
```

This will take care of copying the required assets from the `vendor` directory
into your local project.

### Customising your configuration

Your configuration that is passed into the `Bolt\Application` constructor is
referred to throughout the execution of a Bolt app to decide what local
resources to use, for instance whenever a Bolt component wants to write to the
cache, it will ask your configuration what path to use. Here's a selection of
some of the things you can alter before an app is initialised.

```
// custom-bootstrap.php
$configuration = new Bolt\Configuration\Standard(__DIR__);

// Some customisations:
$configuration->setPath('cache',    'my/custom/cache');
$configuration->setPath('config',   'my/custom/config');
$configuration->setPath('database', 'my/custom/database');
$configuration->setPath('files',    'my/custom/filestore');
$configuration->setPath('web',      'my/public');

$app = new Bolt\Application(array('resources'=>$configuration));
```


Mounting Bolt on an existing Application
----------------------------------------

A lot of work has been done on the internals of Bolt which allow it now to run
as a self- contained `HTTPKernelInterface` application without interfering with
any of the global namespace or constants. So if you use [StackPHP](http://stackphp.com/) (or similar) you can mount Bolt onto a
url prefix as simply as this:

```
$map = [
    "/another" => new AnotherApplication(),
    "/blog" => new Bolt\Application(['resources'=>new Bolt\Configuration\Composer(__DIR__)])
];
$app = (new Stack\Builder())
    ->push('Stack\UrlMap', $map)
    ->resolve($app);
Stack\run($app);
```

This means that you can, for instance, use Bolt to manage one specific part of
a larger application set.

### Keeping Code out of the Web Root

The basic installation is designed to be flexible for those users that may be
limited to shared hosting environments. For this reason an out of the box
installation will install the entire Bolt application in a single root
directory.

As of version 2.0 the location of app resources is completely configurable so
you only need to store public assets inside the web root directory. We would
**strongly recommend** that you use this strategy if you have control over your
hosting environment.

If you are happy using the command line installer then the Composer installer
allows you to select a separate public directory and the rest of Bolt is stored
a level below. See the
<a href="/2.2/getting-started/installation-composer#single-command-install">full instructions here</a>.

If you'd rather use the standard distribution and just run your own bootstrap
then the following will have the same effect:

```
// root / bootstrap.php
$configuration = new Bolt\Configuration\Standard(__DIR__);
$configuration->setPath('web', 'public');
$app = new Bolt\Application(array('resources'=>$configuration));
```

