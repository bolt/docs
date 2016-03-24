Installing Local Extensions
===========================

Bolt supports installation of extensions that are not included on Bolt's
extensions site.

There are a couple of caveats:

- There is no autoloader by default
- Autoloading is available for Bolt 2.2+, but not guaranteed unless you have a
  properly defined `"psr-4"` section in your extension's composer.json file
- Must be located in `{web_root}/extensions/local/{author_name}/{extension_name}/`
- They **will** be automatically enabled if the directories above exist and
  contain `init.php` and `Extension.php`
- Updates are **not** available though the web UI

**Note:** If your local extension requires libraries from Packagist, simply add
them to the `composer.json` in the root directory of your Bolt install and
perform a `composer install`.

Step 1
------

Create the directory for you extension in
`{web_root}/extensions/local/{author_name}/{extension_name}/`

Where:
 - `{web_root}` is the install location of your Bolt site
 - `{author_name}` is a lower-case, space-less name
 - `{extension_name}` is a lower-case, space-less name

Step 2
------

Create a `composer.json` to guarantee autoloding as:

```
{
    "name": "{author_name}/{extension_name}",
    "description": "A description about your extension should go here.",
    "type": "bolt-extension",
    "require": {
        "bolt/bolt": ">=2.0.0,<3.0.0"
    },
    "authors": [
        {
            "name": "Your Name",
            "email": "your@email.com"
        }
    ],
    "autoload": {
        "files": [
            "init.php"
        ],
        "psr-4": {
            "Bolt\\Extension\\MyName\\MyExtension\\": ["", "src/"]
        }
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

Create an `Extension.php` file that contains something like this:

```
namespace Bolt\Extension\MyName\MyExtension;

use Bolt;

class Extension extends \Bolt\BaseExtension
{

    public function getName()
    {
        return "MyExtension";
    }

    public function initialize()
    {
        // Your extension gets launched from here
    }
}
```

Step 4
------

Create an `init.php` file that contains something like this:

```
use Bolt\Extension\MyName\MyExtension\Extension;

$app['extensions']->register(new Extension($app));
```
- Your extension should now appear in the Extend page in the *"Your Currently
    Installed Extensions"* section on your Bolt site

Updating/Importing
------------------

Many times developers create the extension locally and import changes and
updates (e.g. via `git pull`).

In doing this, the PHP namespace may change, potentially triggering a fatal
error because the autoloader does not get updated automatically, for performance
reasons.

If this occurs, there are several approaches to fixing this but the first thing
you should do is temporarily rename the extension's `init.php` file and try the
following in order:

- Dumping the Bolt cache using Nut `./app/nut cache:clear`, and then loading the
  backend. This will tell Bolt to rescan the local extension `composer.json`
  files for PSR-4 autoload data, import that into `extensions/composer.json` and
  rebuild the extension autoloader.
- Performing a `composer dumpautoload` in the `extensions/` directory of your
  Bolt install.

At this point, it should be safe to rename the `init.php` file back to normal
and enjoy your updated extension.

