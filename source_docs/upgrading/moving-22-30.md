Moving a site from version 2.2 to 3.0
=====================================

This page provides an indepth guide of how to move an existing 2.2.x site up to the latest 3.0 release. Since this
is a major release you cannot assume that there will be no breaking changes and the complexity of the upgrade will
vary a lot depending on how much custom code you have in your current site.

You will definitely make the process smoother by taking the following precautions.

 1. Make sure you are on the latest stable release of the 2.2.x series
 2. Make sure that you do a full backup of the site database, uploaded files,
    config files and the extensions directory.
 3. If possible have your current install under git source control and test any
    changes on a new branch which can then easily be reverted.
 4. If you come across any undocumented issues, let us know by raising an issue
    on Github
 5. Check that the extensions you need have [versions available for Bolt 3.0][1]

Getting the latest version via composer
---------------------------------------

Go to your `composer.json` file in the root of your project and make the following modifications to the `require:` block.

```
"bolt/bolt": "^3.0@beta",
"bolt/filesystem": "^2.0@beta",
"bolt/thumbs": "^3.0@beta",
```

It's likely that you already have an entry for `bolt/bolt` so you will need to just adjust the version constraint.
If you don't have an entry for `filesystem` and `thumbs` you will need to add them too.

Once this is complete, run `composer update` to get the latest versions. The command should run and you'll now be running
on Bolt 3.0.

Getting the latest version via download
----------------------------------------

If you don't use composer to install Bolt then you can follow the instructions in the updating section. Once you have
the latest version installed you can return to this page.

Disabling your extensions
-------------------------

You'll need to use a command-line to do this part. Since extensions aren't compatible between major versions of Bolt
we'll need to disable all the current ones and then later in the process we can install ones that have a version
compatible with version 3.0. If you haven't done already it may be a good idea to keep a note of which extensions
you had installed, an easy way to see this is by looking in the `require` section of `extensions/composer.json`.

From within your extensions directory run the following two commands.

`rm -Rf ./vendor/`

`composer dump autoload`

This will disable any extensions from loading into Bolt and prevent any fatal
errors from incompatible extensions.

When you get to the frontend you may still have issues where you are calling
extension functions from within your theme twig templates. If this is the case
you may also have to temporarily comment these out until you have the relevant
extension installed and working.

Updating your Controllers
-------------------------

Bolt 3.0 has seen a major refactor and simplification of the Request -> Dispatch
-> Controller code so if your site uses a custom controller this is likely to be
the first set of errors you will run into.

Firstly controllers have moved to a new namespace, it's likely that if you have
a custom controller you will have extended the default Bolt frontend controller
which previously was at `Bolt\Controllers\Frontend`, this is a simple change,
you will need to change this to `Bolt\Controller\Frontend`.

In many cases this may be enough to get your app running, however if you are
calling any of the main Bolt frontend methods then the method signature has
changed and you will need to adjust the calls.

For instance you may see this error:

```
Catchable fatal error: Argument 1 passed to Bolt\Controller\Frontend::record() must be an instance of Symfony\Component\HttpFoundation\Request
```

This is because the methods now only receive a `Request` object rather than
passing in the entire Application object.

So the change will look like this:

Before: `parent::listing($app, $contenttypeslug);` or `parent::record($app, $contenttypeslug, $slug);`
After: `parent::listing($app['request'], $contenttypeslug);` or `parent::record($app['request'], $contenttypeslug, $slug);`

Some notes on removed or renamed services
-----------------------------------------

You may well be able to ignore this section if your site makes very few
alterations to the core behaviour of Bolt. If you see some fatal errors on
startup check the list below.

### Routing

The signature of the Bolt routing class has changed so if you see the below:

```
Catchable fatal error: Argument 1 passed to Bolt\Controller\Requirement::__construct() must be an instance of Bolt\Config, none given
```

You need to alter the construction to pass in the Bolt config object so this:
`$this->mount('', new Routing());` or `$app->mount('', new Routing());`
becomes
`$this->mount('', new Routing($this['config']));` or `$app->mount('', new Routing($app['config']));`

However doing the above leads to another error:

```
Error: Uncaught exception 'LogicException' with message 'The "mount" method
takes either a "ControllerCollection" or a "ControllerProviderInterface"
instance.
```

This highlights another change, that you will need to take one of two approaches
to refactor depending on what your original goal was in extending the native
routing.

### If you want to add additional routing requirements

If all you need to do is provide additional requirements (or override the
existing ones) then you are best served by extending or replacing the new
`$app['controller.requirement']` rather than calling `$app->mount()` method.
Here's an example:

```
$app['controller.requirement'] = $app->share(
    function ($app) {
        return new My\Custom\Routing($app['config']);
    }
)
```

Note that you'll also need to check your `routing.yml` file and make sure you
use the new service syntax `controller.requirement:myCustomCheck` rather than
the old-style static class calls.

### If you want to mount additional controllers

The `routing.yml` file can now point to a service to use as a controller so the
best advice is to modify your routing file to point to a custom mounted service
for instance:

```
customstuff:
    path: '/path-to-custom'
    defaults:
        _controller: 'controller.mycustomcontroller:doCustomStuff'
```

The routing file will then look for a controller mounted to
`$app['controller.mycustomcontroller']` and then look for the `doCustomStuff()`
method. You will need to make sure that this mounted service implements
`ControllerProviderInterface` and then you can safely remove any manual calls to
`$app->mount()`.

### Console

The console service has been removed in Bolt 3.0 if you see an error like:

```
Error: Uncaught exception 'InvalidArgumentException' with message 'Identifier
"console" is not defined.' in /vendor/pimple/pimple/lib/Pimple.php:187
```

You need to replace the reference to `$app['console']` with `$app['nut']` the
trace in the exception message should give you an indication of where the usage
is.

### Independent or Local Extensions

If your app uses local extensions or independently mounts them using
`$app['extensions']->register(new Extension())` or similar, then you will need
to make sure they conform to the new extensions structure for Bolt 3.0.

The most common error will be:

`Fatal error: Cannot override final method Bolt\Extension\AbstractExtension::getName()`

You can safely rename `getName()` to `getId()` or remove the method altogether
and allow Bolt to automatically name your extension.


[1]: http://extensions.bolt.cm/bolt3-ready