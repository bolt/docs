---
title: Creating a New Extension
level: intermediate
---
Extensions: Creating
====================

Creating a Bolt Extension or Theme
----------------------------------

Extensions and themes that are published on the Marketplace must follow a few
simple rules to allow them to hook into a Bolt installation. Information about
the package needs to be provided in JSON format in the root of a project.

To be hosted on the Bolt Marketplace your project will need to be stored in a
VCS repository and publicly readable. If you want to install your own extensions
from somewhere other than the official Bolt marketplace then see the advanced
documentation page.

### PHP namespace

Extensions should use the PHP namespace of
`Bolt\Extension\{author name}\{extension name}\` e.g.
`Bolt\Extension\MyName\MyExtension\`.

### Using the Starter Package

To make getting setup with an extension as simple as possible there is a
skeleton extension package that can get you started.

The fastest way to build an extension is on your local workstation with an
install of Bolt, and create your new extension's git repository.

For this example, we'll assume that your new extension's git repository is
located at `/home/user/development/myextension/`, and the name of the
extension in **its** `composer.json` file is `myname/myextension`.

```
cd /home/user/development/
composer create-project --no-install bolt/bolt-extension-starter:^3.0 myextension
cd myextension
git init
git add .
git commit . -m "First commit of my new extension"
```

Once you've run the above commands, Composer will create a new directory with
the bare extension. You should then open the project in your editor and you will
need to make a few changes, giving your new extension the correct configuration
and namespaces. There are two files you need to edit immediately, `composer.json`,
and `src/ExtensionNameExtension.php`.

  1. Change the namespace at the top of `src/ExtensionNameExtension.php` to your
     own.
  2. Rename the class `ExtensionNameExtension` to match the name of your
     extension **plus** the "Extension" suffix, e.g. `KoalaCatcherExtension`
  3. Rename the file `src/ExtensionNameExtension.php` to match your extension's
     name **plus** the "Extension" suffix, e.g. `src/KoalaCatcherExtension.php`
  4. In `composer.json` change the name setting to your extension name eg:
     `myvendorname/extensionname`. For clarity, this should match the folder
     names you created earlier
  5. In `composer.json` give a description and a type, either `bolt-extension`
     or `bolt-theme`
  6. In `composer.json` add your contact information to the author section
  7. In the `autoload` section of `composer.json` update the PSR-4 namespace to
     the one you have used in your extension files
  8. In the `extra` section of `composer.json` update `bolt-class` to reflect
     the new namespace and class name (from steps 1 & 2).

The above steps will get you started, and below is some more in depth
information about the configuration.


### Installing the new extension

In order to make the extension installable via Composer, you will first need to
define the location of the extension's git repostitory in the `"repositories"`
section of your local Bolt site's `extensions/composer.json` file, e.g.


```json
    "repositories": {
        "packagist": false,
        "bolt": {
            "type": "composer",
            "url": "https://market.bolt.cm/satis/"
        },
        "myextension-git-repo": {
            "type": "path",
            "url": "/home/user/development/myextension/"
        }
    },
```

Note that the most important part above is the value give to the `"url":` key,
this value is the path to your extension's local git repository, and can be
either the full path (recommended) or a path relative to the location of the
`extensions/` directory.

Next you will need to update the `"minimum-stability"` value in your local Bolt
site's `extensions/composer.json` file, e.g.

```json
    "minimum-stability": "dev",
```

<p class="note"><strong>Note:</strong> This setting should also be changed in
your <code>app/config/config.yml</code> file as it will be overwritten the next
time you load the Extensions page in the Bolt back-end.</p>

This will allow you to install the current development version of your new
extension.

As the extension is in a local git repository, the version may be inferred by
the branch or tag that is currently checked out. Otherwise, the version should
be explicitly defined in the extension's `composer.json` file, e.g.

```json
    "version": "x.y.z",
```

If Composer cannot resolved the version by these means, it will assumed the
version to be `dev-master`.

Finally you can add your extension to the `"require"` section on your local
Bolt site's `extensions/composer.json` file, e.g.

```json
    "require": {
        "myname/myextension": "dev-master@dev"
    },
}
```

Once this is done, you can now either run `composer update` inside the
`extensions/` directory of your local Bolt site, or by pressing the
"Run all Updates" button on the Extensions page in the Bolt back-end.


Extended starter extension
--------------------------

When you want a starter extension with more example code, create a new one from
this repository instead of the above one.

```
composer create-project --no-install bolt/bolt-extension-starter-extended:^3.0 <newextname>
```


Publishing Your Extension on the Marketplace
--------------------------------------------

Once you have the above file setup, make sure it is pushed up to your hosted
repository then visit [market.bolt.cm](https://market.bolt.cm) to register your
extension or theme on the Bolt Marketplace.

For any screenshots of your extension or theme along with icons see
[Market Place Visual Assets Best Practices][visual-assets]

See [the testing and debugging instructions](testing) for further information
about tagging and automated testing of your extension.

[visual-assets]: ../../publishing-marketplace/visual-assets
