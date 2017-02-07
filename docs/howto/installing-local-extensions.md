---
title: Installing Local Extensions
level: intermediate
---
Installing Local Extensions
===========================

Bolt supports installation of extensions that are not included on Bolt's
extensions site.

There are a couple of caveats:

- Updates are **not** available though the web UI
- You are responsible for managing the location of assets, including specifying
the location of supporting files and copying/storing web assets in the public
folder

**Note:** If your local extension requires libraries from Packagist, simply add
them to the `composer.json` in the root directory of your Bolt install by
performing a `composer require author/package`.

Option 1 - Extensions in your base application
------

If you are using the composer install method for Bolt whereby Bolt is installed
as a dependency of your main application then it makes sense for some
extensions to be maintained as part of your application's source code.

This is especially true where the extension is application specific and doesn't
need to be shared across multiple Bolt sites.

For the extension to load the class must be autoloadable from the root composer.json
if you already have a PSR-4 definition in your composer.json then you can add your
extension to the same path, if not then you can add one that may look something
like this:

```json
    "autoload": {
        "psr-4": {
            "MyBoltApp\\": "src"
        }
    },
```

You can then reference your extension anywhere in the Bolt app and it will be
autoloadable. For instance, create a new extension class inside 
`src/MyBoltApp/MyExtension.php` and now you will be able to refer to this 
extension as `MyBoltApp\MyExtension` if you wanted to you could instantiate it
in php code via: `$ext = new MyBoltApp\MyExtension();`

Option 2 - Extensions in your extensions/local folder
------

As an extra convenience, Bolt provides a pre-configured directory where you can 
store and reference extension classes without needing to modify the composer.json
file. If you place a valid Bolt extension inside the `extensions/local` directory
then the class will be accessible to your Bolt app.

For example, if the local folder does not exist, then create it and inside
`extensions/local` make an additional folder, `MyBoltExtension` and inside that folder
add a valid Bolt extension class and save as `Extension.php`.

You will then be able to reference your new extension class as 
`MyBoltExtension\Extension`. In php code you could instantiate it (once Bolt is loaded)
via: `$ext = new MyBoltExtension\Extension();`


Loading your Extension
------

Bolt will load any extensions that are defined inside the `.bolt.yml` file in the
root of your project. For example you can edit the file to look something like
this:

```yaml
# .bolt.yml

extensions:
    - MyextOne\LocalExtensionOne
    - MyextTwo\LocalExtensionTwo
    - MyextThree\LocalExtensionThree
```

Note that each class defined as above eg: `MyextOne\LocalExtensionOne` must have been
setup using one of the methods defined above.

If you use a php autoloader instead of the yaml style one above then you can add
your extensions in PHP code. For each extension to load call the following:
```php
</php
// inside .bolt.php

$app['extensions']->add(new MyextOne\LocalExtensionOne());
$app['extensions']->add(new MyextTwo\LocalExtensionTwo());
$app['extensions']->add(new MyextThree\LocalExtensionThree());
```
