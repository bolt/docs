---
title: Autoloading
level: advanced
---
Autoloading
===========

### Initial Check

If you've installed Bolt via Composer, you will already have two files in your
site's root directory, `composer.json` and `composer.lock`. If those two files
exist, you can continue to the next section.

However, if you've installed via an archive file, you should have in your root
directory the files `composer.json.dist` and `composer.lock.dist`. Each of
these now needs to be renamed, minus the `.dist` extension.

```bash
$ cp composer.json.dist composer.json
$ cp composer.lock.dist composer.lock
```


### Updating `composer.json` autoload

You need to make one entry for each of your bundled extensions in your root
`composer.json` file, e.g.:

```json
    "autoload" : {
        "psr-4" : {
            "bolt/bolt": "^%%VERSION%%",
            "BundleBaseNamespace\\": "src/BundleBaseNamespace",
            "Acme\\OtherBundleBaseNamespace\\": "extensions/acme/frozbot/OtherBundleBaseNamespace"
        }
    }
```

The setup here is identical to how you would setup your own application. You
may well decide to move extensions to be part of your main Application
namespace, and location:


### Updating the autoloader

After updating the `autoload` section of your `composer.json` file, you will
need to update the project's autoloader.

First thing you will need, if you don't have it already, is a recent version of
Composer. To get this, see the [Composer Download][composer] page for
instructions.

Secondly, from the project's roots directory, run Composer with the
`dump-autoload` argument, e.g.:


```bash
$ composer dump-autoload
```

[composer]: https://getcomposer.org/download/
