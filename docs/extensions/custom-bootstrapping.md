---
title: Custom Bootstrapping
---
Creating your own Bootstrap
=============================

Whilst Bolt is designed to be simple for anyone to install, its core
functionality is also modular and easy to configure for developers who are
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
bootstrap file, by convention it is best to name this `bolt.php` since that filename
is looked for automatically by other Bolt components. For example:

```
$app = require __DIR__ . '/../bolt.php';
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
// bolt.php
$configuration = new Bolt\Configuration\Composer(__DIR__);
$configuration->setPath("web", "public");

$app = new Bolt\Application(array('resources'=>$configuration));
$app->initialize();

return $app;
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
// Assuming this is in public/index.php and the above bolt.php file is in the root folder
$map = [
    "/another" => new AnotherApplication(),
    "/blog" => include '../bolt.php'
];
$app = (new Stack\Builder())
    ->push('Stack\UrlMap', $map)
    ->resolve($app);
Stack\run($app);
```

This means that you can, for instance, use Bolt to manage one specific part of
a larger application set.

Adding your own providers
-------------------------

If you are looking to add your own modifications to the Bolt application itself then you
will need to create a custom bootstrap file as described above. Before the call to 
`initialize` though you can then proceed to mount additional providers onto the Bolt app.

This gives a lot of scope to extend and augment core functionality, since you can either
replace any core Bolt service, or as is described [here](http://silex.sensiolabs.org/doc/providers/twig.html#customization)
you can extend any existing Bolt service and add additional configurations to the 
service object.

By way of an example:

```
# bolt.php
$configuration = new Bolt\Configuration\Composer(__DIR__);
$configuration->setPath("web", "public");

$app = new Bolt\Application(array('resources'=>$configuration));
$app->register(new MyApp\Provider\ConsoleProvider());
$app->register(new MyApp\Provider\ControllerProvider());
$app->register(new MyApp\Provider\TwigProvider());
$app->initialize();

return $app;
```

Here we assume that our local app registers the namespace `MyApp` and we just register our
custom providers onto the Bolt app before initialize.

If you've used the recommended naming convention and put this file at `bolt.php` in the root
of the Bolt folder, then your app will also be correctly be booted in the `nut` console app
so we can provide additional console commands in the `MyApp\Provider\ConsoleProvider` class
and these will be available when you run `vendor/bin/nut` from the root of your Bolt app.
