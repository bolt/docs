---
title: "Migrating Local Extensions for Bolt 3.3"
---
Migrating Local Extensions for Bolt 3.3
===========================================

Bolt 3.3 brings with it a fairly big refactor of local extensions and unavoidably
this will mean some breaking changes.

The good news is that by changing the approach a little we will hopefully make
it a lot easier to write and add local extensions to your applications.

#### The Essential Migration Steps

##### Autoloading
Local extensions are not autoloaded within the extensions directory any more
so you will need to add each local extensions directory to the root `composer.json`
file.

As an example, if you currently have a local extension at: `extensions/local/myname/myextension`
your extension class may either be in that directory, or perhaps inside a `src` directory.

Let's assume the class is in the root directory, you need to open your root composer.json
file and add this to the autoload/psr-4 section.

    "Bolt\\Extension\\Myname\\MyExtensionNamespace\\": "extensions/local/myname/myextension"
    
If you don't currently have a psr-4 section in your composer.json file, then add it
so it looks something like this

```json
    "autoload" : {
        "psr-4" : {
            "Bolt\\Extension\\Myname\\MyExtensionNamespace\\": "extensions/local/myname/myextension"
        }
    }
```

You need to make one entry for each of your local extensions, the setup here is identical to how you
would setup your own application and there's absolutely no need to keep your extensions inside `extensions/local`
any more. You may well decide to move extensions to be part of your main App namespace and if so
you can do something like the following...

```json
    "autoload" : {
        "psr-4" : {
            "MyCompany\\MyApp\\": "src"
        }
    }
```

With the above setup you can move local extensions to `src/Extension/` and access the class via
`new MyCompany\MyApp\Extension\SuperCoolExtension()`

##### Activation
Once your extensions can be autoloaded then one more step is needed to direct Bolt to load them.

If you have a `.bolt.yml` file at the root of your project you can define which extension classes
are loaded within that file. If you open the file as it is now then it will look something like this:

```yaml

paths:
    web: public
    themebase: public/theme
    files: public/files
    view: public/bolt-public/view
```

You will need to edit that file to list which extensions are loaded, note that it is the main 
extension class that needs to be specified. Assuming the autoload setup discussed in the last
section your new `.bolt.yml` will now look like:

```yaml

paths:
    web: public
    themebase: public/theme
    files: public/files
    view: public/bolt-public/view
extensions:
    - Bolt\Extension\Myname\MyExtensionNamespace\ExtensionClass
```

To clarify, the value you put in the yml file is exactly what you would use to instantiate the 
class, so in code the above is equivalent to `new Bolt\Extension\Myname\MyExtensionNamespace\ExtensionClass()`

If you used the other autoload structure discussed your file would look like this:

```yaml
paths:
    web: public
    themebase: public/theme
    files: public/files
    view: public/bolt-public/view
extensions:
    - MyCompany\MyApp\Extension\SuperCoolExtension
```

If you use a php file to bootstrap your Bolt application then you will also need to add each
extension using php code. Your bootstrap file is at `.bolt.php` and it currently probably looks
like this:

```php
$configuration = new MyApp\Configuration(__DIR__);
$app = new Bolt\Application(array('resources'=>$configuration));
// Any other application setup carries on here.....

// Adding your extension to Bolt
$app['extensions']->add(new Bolt\Extension\Myname\MyExtensionNamespace\ExtensionClass();

$app->initialize();

return $app;
```

#### Other Information

As you may have realised, the `composer.json` files are now no longer needed for local extensions
writing a Bolt extension is as simple as creating a class in your Application that implements
 `Bolt\Extension\ExtensionInterface` and adding the Fully Qualified Class Name to your `.bolt.yml`
file.

Once you have a local extension loaded in your application, the interface within the Bolt extensions
screen has also been adjusted to separate local extensions from those installed via the Market Place.
These local extensions will now appear underneath the other installed extensions.