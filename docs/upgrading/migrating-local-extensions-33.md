---
title: "Migrating Local Extensions to Bundles for Bolt 3.3"
---
Migrating Local Extensions to Bundles for Bolt 3.3
==================================================

Bolt 3.3 brings with it the removal of "local extensions", and its replacement
with Bundles.

Unavoidably this will mean some breaking changes!

The good news is that by changing the approach a little we will hopefully make
it a lot easier to write and add Bundles to your applications.

## About Bundles

Before moving on with this guide, it is a good idea to have a read of the
documentation [section on Bundles][bundles].


## The Essential Migration Steps

### Update Extension Environment

If you've had local extensions installed, the extension `composer.json`
and autoloader need to be updated.

There are two ways to achieve this, first via Nut.

```bash
php ./app/nut extensions:setup
```

Alternatively you can visit the _Extensions_ page on your site's backend, and
in the right side panel under _Maintenance_, expand the _"Run all Update"_
drop down, select _"Rebuild Autoloader"_.


### Autoloading

Bundles, unlike old-style local extensions, autoloading configuration is not
handled _auto-magically_ by the Extensions Manager.

As a result, you will need to add each Bundle's directory to `composer.json`
in site's root directory. You need to open your root `composer.json` file and
add each Bundle's entry to the  to the `"psr-4"` sub-section of the
`"autoload"` section.

For example, if you currently have a local extension, `myname/myextension`,
located at `extensions/local/myname/myextension`, with your loader class inside
a `src` directory, and `Bolt\Extension\Myname\MyExtensionNamespace` as the
namespace.


```json
    "autoload" : {
        "psr-4" : {
            "bolt/bolt": "^%%VERSION%%",
            "Bolt\\Extension\\Myname\\MyExtensionNamespace\\": "extensions/local/myname/myextension"
        }
    }
```


For further information see the section of the Bundles documentation on
[configuring autoloading][autoloading].

<p class="note"><strong>Note:</strong> You must always remember to run
<code>composer dump-autoload</code> in your site's root directory after
making any changes to the <code>"autoload"</code> section of your site's
<code>composer.json</code>.</p>


### Activation

Once your extensions can be autoloaded then one more step is needed to direct
Bolt to load them.

Activating your Bundles so they will be loaded is now handled via either your
`.bolt.yml` or `.bolt.php` file.

For further information see the section of the Bundles documentation on
[configuring activation][activation].


[bundles]: ../extensions/bundled
[autoloading]: ../extensions/bundled/autoloading
[activation]: ../extensions/bundled/activation
