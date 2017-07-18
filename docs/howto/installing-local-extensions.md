---
title: Installing Local Extensions
level: intermediate
listed: false
---
Installing Local Extensions
===========================

Bolt supports extensions that are not included on Bolt's extensions site at
[market.bolt.cm][market]. Instead, these extensions are part of the "custom
code" for your project.

The major benefit of this is that you can easily "hack away" on an extension
when it's not relevant if it can be distributed later on. For example, a quick
proof-of-concept, or the addition of a simple Twig tag for a specific purpose.
This is especially true where the extension is application specific and doesn't
need to be shared across multiple Bolt sites.

There are a couple of caveats:

- Updates are **not** available though the web UI in Bolt's backend. This is
  simply because there's no link between your "local" extension, and wherever
  it might originate from.
- You are responsible for managing the location of assets, including specifying
  the location of supporting files and copying/storing web assets from the
  extensons `web/` folder to the public folder, like `public_html/`

Apart from that, the local extensions support all functionality that's found in
the "Real" extensions.

There are two ways to ensure a local extension gets picked up by the Bolt
installation:

 - [Extensions in your extensions/local folder][local-folder]
 - [Extensions in your base application][base-app]

Option 1 - Extensions in your extensions/local folder
-----------------------------------------------------

If you place a valid Bolt extension inside the `{site_root}/extensions/local` directory
then the class will be accessible to your Bolt app.

For example, if the local folder does not exist, then create it and inside
`extensions/local` make an additional folder, `[Extensionname]` and inside that
folder, create a `src/` folder, in which you can add a valid Bolt extension
class and save as `[Extensionname]Extension.php`.

Your extensions folder would look something like this, visualised as a tree:

```
extensions
├── local/
│   └── Listing/
│   │   ├── config/
│   │   ├── src/
│   │   │   └── ListingExtension.php
│   │   ├── templates/
│   │   └── README.md
├── vendor/
│   ├── …
│   └── …
├── composer.json
└── composer.lock
```

The `ListingExtension.php` could look like:

```php
<?php

namespace Local\Listing;

use Bolt\Extension\SimpleExtension;

class ListingExtension extends SimpleExtension
{

}
```

Note that this is a _very_ minimal example. For a more fleshed out example of a
Local Extension you can clone to use in your project, see the
[bolt/local-extension-boilerplate][boilerplate] repository.

After creating this file, you will then be able to reference your new extension
class as `MyBoltExtension\Extension`. In PHP code you could instantiate it via
the following, once Bolt is loaded: `$ext = new MyBoltExtension\Extension();`

Unlike with the option below, you don't have to modify the `composer.json` file.
It _is_ however your own responsibility to make sure the extension gets loaded.
See the [Updating the autoloader][autoloader] section below for details on how
to ensure this.

Option 2 - Extensions in your base application
----------------------------------------------

This method is best suited if your project is a composer-based install, or
you've set up your own bootstrap.

For the extension to load, the class must be autoloadable from the root
`composer.json`. If you already have a PSR-4 definition in your `composer.json`
then you can add your extension to the same path. If not, then you can add one
that looks something like this:

```json
    "autoload": {
        "psr-4": {
            "Local\\MyBoltApp\\": "src"
        }
    },
```

You can then reference your extension anywhere in the Bolt app and it will be
autoloadable. For instance, create a new extension class inside
`src/MyBoltApp/MyExtension.php` and now you will be able to refer to this
extension as `MyBoltApp\MyExtension`. If needed, you can instantiate it
in PHP code via: `$ext = new MyBoltApp\MyExtension();`.

Updating the autoloader
-----------------------

In order to be able to find your extension, you'll need to add it to the
autoloader. The easiest way to do this, is to add it to the autoloading section
in `composer.json` in the `extensions/` folder.

If the file `extensions/composer.json` does not exist yet, you should generate
it first. You can do so either by running `php app/nut extensions:setup` on the
command line, or by clicking the "Run all Updates" on the Extensions screen in
the Bolt backend.

Edit this:

```json
    "autoload": {
        "psr-4": {
            "Bolt\\Composer\\EventListener\\": "../vendor/…"
        }
    },
```

To contain the correct namespace and location for your extension. For example:

```json
    "autoload": {
        "psr-4": {
            "Local\\Listing\\": "local/Listing/src/",
            "Bolt\\Composer\\EventListener\\": "../vendor/…"
        }
    },
```

After saving the file, you should regenerate the autoloader by running
`php app/nut extensions:setup`. Alternatively, if you don't have access to the
command line, click the "Run all Updates" on the Extensions screen in the Bolt
backend.

Making Bolt load your Extension
-------------------------------

Bolt will load any extensions that are defined inside the `.bolt.yml` file in
the root of your project. To add your new extension,  you can edit the file to
look something like this:

```yaml
# inside .bolt.yml

extensions:
    - Local\Myextension\LocalExtensionOne
    - Local\Listing\ListingExtension
```

Note that each class defined as above eg: `Local\MyextOne\LocalExtensionOne`
must have been setup using one of the methods defined above. If you add them
without setting up the Autoloader first, stuff will break.

Alternatively, if you have a custom Bolt setup with your own bootstrap, instead
of the yaml style as described above, then you can add your extensions in PHP
code. This can be done in either `.bolt.php`, or in your own bootstrap file.

Example in `.bolt.php`:

```php
<?php
// inside .bolt.php

return [
    'extensions' => [
        new Local\MyExtension\LocalExtensionOne(),
        new Local\Listing\ListingExtension()
    ]
];
```

Example in your own bootstrap:

```php
<?php
// inside index.php

$app = new Application(); // create or get somehow

$app['extensions'] = $app->share(
    $app->extend(
        'extensions', 
        function ($extensions) {
            $extensions->add(new Local\MyExtension\LocalExtensionOne());
            $extensions->add(new Local\Listing\ListingExtension());
        
            return $extensions;
        }
    )
);

return $app;
```

Notes
-----

Local extensions set up this way can either be included in an existing version
control repository, or the extension can be tracked in its own. In case of the
latter, it might need to be included separately in the deploy process as well,
not unlike a proper Bolt extension. If the local extension is just added to the
git repository for the main project, this is probably not a big concern.

If your local extension requires libraries from Packagist.org, simply add
them to the `composer.json` in the root directory of your Bolt install by
performing a `composer require author/package`.

[autoloader]: #updating-the-autoloader
[boilerplate]: https://github.com/bolt/local-extension-boilerplate
[local-folder]: #option-1-extensions-in-your-extensions-local-folder
[base-app]: #option-2-extensions-in-your-base-application
[market]: https://market.bolt.cm
