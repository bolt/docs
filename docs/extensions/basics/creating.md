---
title: Creating a New Extension
---
Extensions: Creating
=========================

Creating a Bolt Extension or Theme
----------------------------------

Extensions and themes that are published on the marketplace must follow a few
simple rules to allow them to hook into a Bolt installation. Information about
the package needs to be provided in JSON format in the root of a project.

To be hosted on the Bolt marketplace your project will need to be stored in a
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

First, create the folder for your own 'vendor', inside the `extensions/local`
folder. You should pick something that reflects your name or your company, not
necesarily the functionality of the extension. You'll need to already have
Composer installed. On the commandline, go to the `extensions/` folder and use
the following. Make sure you replace the last `<myvendorname>` and
`<newextname>` with the names you want for your new extension.

```
mkdir local
mkdir local/<myvendorname>
cd local/<myvendorname>
composer create-project --no-install bolt/bolt-extension-starter:^3.0 <newextname>
```

Once you've run the above commands, Composer will create a new directory with
the bare extension. You should then open the project in your editor and you will
need to make a few changes, giving your new extension the correct configuration
and namespaces. There are two files you need to edit immediately, `composer.json`,
and `src/ExtensionNameExtension.php`.

 1. Change the namespace at the top of `src/ExtensionNameExtension.php` to your
    own.
 2. Rename `src/ExtensionNameExtension.php` to match your extension's name **plus**
    the "Extension" suffix, e.g. `src/KoalaCatcherExtension.php`
 3. In `composer.json` change the name setting to your extension name eg:
    `myvendorname/extensionname`. For clarity, this should match the foldernames
    you've created a little earlier
 4. In `composer.json` give a description and a type, either `bolt-extension` or
    `bolt-theme`
 5. Add your contact information to the author section.
 7. In the autoload section update the PSR-4 namespace to the one you have used
    in your extension files

The above steps will get you started, and below is some more indepth information
about the configuration.

**Extended starter extension**

When you want a starter extension with more example code, create a new one from
this repository instead of the above one.

```
composer create-project --no-install bolt/bolt-extension-starter-extended:^3.0 <newextname>
```

Publishing Your Extension on the Marketplace
--------------------------------------------

Once you have the above file setup, make sure it is pushed up to your hosted
repository then visit [extensions.bolt.cm](http://extensions.bolt.cm) to
register your extension or theme on the Bolt Marketplace.

See [the testing and debugging instructions](/extensions/testing) for
further information about tagging and automated testing of your extension.
