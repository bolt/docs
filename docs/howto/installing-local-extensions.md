---
title: Installing Local Extensions
level: intermediate
---
Installing Local Extensions
===========================

Bolt supports installation of extensions that are not included on Bolt's
extensions site.

There are a couple of caveats:

- Must be located in `{site_root}/extensions/local/{author_name}/{extension_name}/`
- Updates are **not** available though the web UI

**Note:** If your local extension requires libraries from Packagist, simply add
them to the `composer.json` in the root directory of your Bolt install by
performing a `composer require author/package`.

Step 1
------

Create the directory for you extension in
`{site_root}/extensions/local/{author_name}/{extension_name}/`

Where:
 - `{site_root}` is the install location of your Bolt site
 - `{author_name}` is a lower-case, space-less name
 - `{extension_name}` is a lower-case, space-less name

Step 2
------

Create a `composer.json` to guarantee autoloading as:

```
{
    "name": "{author_name}/{extension_name}",
    "description": "A description about your extension should go here.",
    "type": "bolt-extension",
    "require": {
        "bolt/bolt": "^3.0"
    },
    "authors": [
        {
            "name": "Your Name",
            "email": "your@email.com"
        }
    ],
    "autoload": {
        "psr-4": {
            "Bolt\\Extension\\MyName\\MyExtension\\": "src/"
        }
    },
    "extra": {
        "bolt-assets": "web",
        "bolt-class": "Bolt\\Extension\\MyName\\MyExtension\\MyExtensionExtension"
    }
}

```
Where:
 - `{author_name}` is a lower-case, space-less name
 - `{extension_name}` is a lower-case, space-less name
 - `MyName` is a camel-case, space-less name
 - `MyExtension` is a camel-case, space-less name
 - The provided name spaces must use `\\` double backslash separators
 - The provided name spaces end with `\\` double backslash separators as per the
   PSR-4 standard
 - The path value may be either:
   - A string, e.g. `"src/"`, where only *one* directory is required
   - An array, e.g. `["", "src/"]`, where *multiple* directories are required

Step 3
------

Create an `src/MyExtensionExtension.php` file that contains something like this:

```
namespace Bolt\Extension\MyName\MyExtension;

use Bolt\Extension\SimpleExtension;

class MyExtensionExtension extends SimpleExtension
{
    // Extension code goes here.
}
```

Step 4
------

Bolt might access your public assets (javascripts, stylesheets, images, etc.).
For local extension, copy your assets manually to :
`/{public_root}/extensions/local/{author_name}/{extension_name}/`

Where:
 - `{public_root}` is the public folder of your Bolt site
 - `{author_name}` is a lower-case, space-less name
 - `{extension_name}` is a lower-case, space-less name

Updating/Importing
------------------

Many times developers create the extension locally and import changes and
updates (e.g. via `git pull`).

In doing this, the PHP namespace may change, potentially triggering a fatal
error because the autoloader does not get updated automatically, for performance
reasons.

If this occurs, there are several approaches to fixing this:

- Running `./app/nut extensions:dumpautoload` from your root directory
- Performing a `composer dumpautoload` in the `extensions/` directory of your
  Bolt install.
