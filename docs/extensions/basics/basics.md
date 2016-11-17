---
title: Basics
level: intermediate
---
Extension Building: Basics
==========================

A basic Bolt extension requires the following elements:

  * A `composer.json` file to store the extension metadata
  * A  PHP file to operate as the loading/entry point
  * An optionaly `config.yml.dist` file that will be copied into the
    installation's `app/config/extensions/` directory
  * A `readme.md` Markdown file to explain to the users of the extension how to
    configure and use it.

Defining the Namespace
----------------------

The very first thing to note down is the PHP & Composer namespaces your extension
will use.

In Bolt, that will be constructed from the following:

  * Author name — A name, or nick name, or the person or company authoriing the extension
  * Extension name — A descriptive name for your extension

For the purposes of this documentation, we are going to give examples where the
author name is `DropBear` and the extension name is `KoalaCatcher`.

This would mean the namespaces would become:

| Type      | Namespace                                                        |
| --------- | ---------------------------------------------------------------- |
| PHP       | `Bolt\Extension\DropBear\KoalaCatcher`                           |
| Composer  | `dropbear/koalacatcher`                                          |

**NOTE:** Whenever used inside the `composer.json` file, the PHP namepace
should appear with two `\\` and not just one, as would be found in a PHP file.

File & Directory Layout
-----------------------

Extensions have a required base directory layout, so Bolt & PHP knows where to
find certain files.

The base layout looks like:

```
/
├─ composer.json
├─ readme.md
├─ config
│  └─ config.yml.dist
├─ src
│  └─ KoalaCatcherExtension.php
├─ templates
│  └─ koala.twig
├─ tests
└─ web
   └─ dropbear.jpg
   └─ koala.js
   └─ style.css
```

| File/Directory  | Description                              |
| --------------- | ---------------------------------------- |
| `composer.json` | All extension metadata: autoloading, author(s), keywords, etc. |
| `config/`       | Configuration base files (currently only config.yml.dist is supported) |
| `readme.md` | Markdown file to document use and configuration of the extension. |
| `src/`          | Extension's PHP code |
| `templates/`    | Twig templates. These should be kept separate from public assets |
| `tests/`        | Unit/acceptance test files |
| `web/`          | Public/web files: CSS, JavaScript, images, etc. |


Extension Loading File
----------------------

All of the extension's PHP files should live in the `src/` subdirectory, or
subdirectories under that.

The loading file should be named after the extension, and appended with
`Extension.php`. So for our example extension, the file would be
`KoalaCatcherExtension.php`.

Bolt will use that name internally to identify your extension, and make it
available via the extension service provider.

In its minimalist form, the loading file will contain the following:

```php
namespace Bolt\Extension\DropBear\KoalaCatcher;

use Bolt\Extension\SimpleExtension;

/**
 * An extension for catching koalas.
 *
 * @author Kenny Koala <kenny@dropbear.com.au>
 */
class KoalaCatcherExtension extends SimpleExtension
{
    // Extension code goes here.
}
```

The PHP class `Bolt\Extension\SimpleExtension` is an abstract class that
your extension can extend, that will take care of a lot of heavy lifting and code
on your behalf.

Composer's JSON File
--------------------

The final part of a basic extension that needs is the `composer.json` file.

Below is an sample file based on our extension's example.

```json
{
    "name": "dropbear/koalacatcher",
    "description": "Catch koalas",
    "type": "bolt-extension",
    "keywords": ["koala", "dropbear"],
    "require": {
        "bolt/bolt": "^%%VERSION%%"
    },
    "license": "MIT",
    "authors": [
        {
            "name": "Kenny Koala",
            "email": "kenny@dropbear.com.au"
        }
    ],
    "autoload": {
        "psr-4": {
            "Bolt\\Extension\\DropBear\\KoalaCatcher\\": "src"
        }
    },
    "extra": {
        "bolt-assets": "web",
        "bolt-class": "Bolt\\Extension\\DropBear\\KoalaCatcher\\KoalaCatcherExtension"
    }
}
```

  * `name` — Composer namespace of the extension
  * `description` — Brief summary of the extension
  * `type` — Should be either `bolt-extension` or `bolt-theme`
  * `require` — One of the requires **must** be a version constraint for Bolt,
    generally `"bolt/bolt": "^3.0"`
  * `autoload` — The `psr-4` section **must** reference the PHP namespace, and
    have a minimum of `"src"` provided as parameters
  * `extra` — This section **must** contain a `"bolt-class"` key, with a
    parameter of the Fully Qualified Class Name (FQCN) of your extension's
    loader file
