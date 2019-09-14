---
title: Quick Start
level: intermediate
---
Quick Start
===========

This guide will step through an example of the required steps to create your
first Bundle. It should be noted that there is quite a bit of flexibility and
customisation that can be done with a Bundle, but for the sake of simplicity
the example will adhere to the following:

 - The Bundles' PHP loader class will be called `CustomisationExtension` in a file
   named `src/Site/CustomisationExtension.php`
 - The PHP code for this Bundle will use the namespace of `Bundle\Site`

For more information see the [Building Bundles page](building-bundles).


Bundle Extension Class
----------------------

Bolt extensions & Bundles all require a PHP class that acts as a load for your
extension's configuration logic.

In its simplest form, our loader class `src/Site/CustomisationExtension.php` would
look like this.

```php
<?php

namespace Bundle\Site;

use Bolt\Extension\SimpleExtension;

/**
 * Site bundle extension loader.
 */
class CustomisationExtension extends SimpleExtension
{
}
```

<p class="note"><strong>Note:</strong> the class name must match the file name.</p>


Composer Autoloader
-------------------

In order for PHP to be able to find your Bundle, it requires a [`psr-4`][psr-4]
entry in the [`autoload`][autoload] section your site's `composer.json` file.

The end result would look similar to this:

```php
{
    "require": {
        "php": "^5.5.9 || ^7.0",
        "bolt/bolt": "^%%VERSION%%",
        "passwordlib/passwordlib": "^1.0@beta"
    },
    "minimum-stability": "beta",
    "prefer-stable": true,
    "scripts": {
        "post-install-cmd": [
            "Bolt\\Composer\\ScriptHandler::installAssets"
        ],
        "post-update-cmd": [
            "Bolt\\Composer\\ScriptHandler::updateProject",
            "Bolt\\Composer\\ScriptHandler::installAssets"
        ],
        "post-create-project-cmd": [
            "Bolt\\Composer\\ScriptHandler::configureProject",
            "Bolt\\Composer\\ScriptHandler::installThemesAndFiles",
            "nut extensions:setup"
        ]
    },
    "autoload": {
        "psr-4": {
            "Bundle\\": "src/"
        }
    }
}
```

The important things to note are:
 - PHP namespace of your classes, in this example we are using `Bundle\Site`
 - Backslashes `\` in namespaces **must** be doubled, i.e. `\\`
 - Namespaces **must** end with two backslashes, i.e. `\\`
 - The directory path specified **must** contain the loader class file, in
   this example the file is located in `src/Site`

[Composer][composer] can then be run with the `dump-autoload` command, e.g.

```
composer dump-autoload
```

Using default options, running the `dump-autoload` command will create the file
`vendor/composer/autoload_psr4.php` that you can interrogate should you need to
see the end result.


Activating the Bundle
---------------------

Finally, you need to add an entry to your `.bolt.yml` in the root of your site.
By default this file does not exist, so you may need to create it yourself.

For each Bundle, simply add a line under the `extensions` key, with the fully
qualified class name of the loader class.

```yml
extensions:
    - Bundle\Site\CustomisationExtension
```


Configuring the Bundle
----------------------

Configuration settings for your bundle will be read from a YAML file in
the `config/bolt/extensions/` directory called `customisation.bundle.yml`.


Adding Functionality
--------------------

At this stage your Bundled Extension should now be able to be seen in the
"Bundled Extensions" section of your Extensions page. Now it is time to add
the functionality you desire.

For details on how to build extension logic into your new Bundle, see the
"Extending Bolt" [Intermediate][intermediate] & [Advanced][advanced] sections.


[composer]: https://getcomposer.org/download/
[autoload]: https://getcomposer.org/doc/04-schema.md#psr-4
[psr-4]: http://www.php-fig.org/psr/psr-4/
[intermediate]: /extensions/intermediate
[advanced]: /extensions/advanced
