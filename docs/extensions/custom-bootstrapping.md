---
title: Custom Bootstrapping
---
Creating your own Bootstrap
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
$app = require dirname(__FILE__) . '/../vendor/bolt/bolt/app/web.php';
if ($app === false) {
    return false;
}
$app->run();
```

Ideally you would replace the path to bootstrap.php with a link to your own
bootstrap file, by convention it is best to name this `.bolt.php` since that filename
is looked for automatically by other Bolt components. For example:

```
$app = require __DIR__ . '/../.bolt.php';
if ($app === false) {
    return false;
}
$app->run();
```

The basics of configuring a Bolt application
--------------------------------------------

The job of your custom bootstrap file is to provide a bootstrapped `$app`
object that the `index.php` file will then run. The simplest possible bootstrap
file will look like this, assuming that your bootstrap file is in the 
project root one level down from your `index.php` file in `./public`:

```
<?php
// .bolt.php
$configuration = new Bolt\Configuration\Composer(__DIR__);
$configuration->setPath("web", "public");

$app = new Bolt\Application(array('resources'=>$configuration));

$app->initialize();
$config = [
    'application' => $app,
    'resources' => null,
];

return $config;
```

You can make any modifications you like to the `$app` variable within
your bootstrap, or to keep things well organised you can register your
own extensions or providers onto the app.

All you need to ensure is that you return an array with an `application`
key set to an instance of your Bolt app.

Mounting Bolt on an existing Application
----------------------------------------

A lot of work has been done on the internals of Bolt which allow it now to run
as a self- contained `HTTPKernelInterface` application without interfering with
any of the global namespace or constants. So if you use
[StackPHP](http://stackphp.com/) (or similar) you can mount Bolt onto a url
prefix as simply as this:

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
