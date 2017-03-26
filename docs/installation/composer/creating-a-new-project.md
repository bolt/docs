---
title: Creating a new project
level: advanced
---
Creating a new Composer installation
====================================

If you are starting a new project from scratch then we've made this very
simple, and flexible.

Bolt's Composer based installs can be performed using either
`composer create-project` (recommended), or building your own `composer.json`
and path configuration file for more advanced control.

Composer `create-project` installs can be run interactively (installer will
prompt for configuration options), or automatically (installer will use default
configuration options, or alternatively options taken from environment variables).

An example of the process is shown here:

<iframe width="640" height="480" src="https://www.youtube.com/embed/AhNfk2C_RJo?rel=0&amp;controls=0&amp;showinfo=0" frameborder="0" allowfullscreen></iframe>

Create Project
--------------

### Interactive Install

To start an interactive install, navigate to the parent directory of your
desired project (site), and run the following from a command line:

```
composer create-project bolt/composer-install:^%%VERSION%% <MYPROJECT> --prefer-dist
```

**NOTE:** Change `<MYPROJECT>` to the name of your project before running the installer.

The install process will ask you some questions about your required install
strategy, you can install Bolt inside a single directory, or you can install the
public assets inside a public directory and keep the application code outside
the web root.

### Automated Install

To start an automated install, navigate to the parent directory of your desired
project (site), and run either of the following commands depending on what
options you desire.

### Default Options

To simply use default directory locations, you just apply the `--no-interaction`
parameter to the `composer create-project` command, e.g.

```
composer create-project bolt/composer-install:^%%VERSION%% <MYPROJECT> --prefer-dist --no-interaction
```

**NOTE:** Change `<MYPROJECT>` to the name of your project before running the installer.

### Customised Options

If you want an automated install with customised configuration options, you can set any, or all,
of the following variables and the installer will use them:
  * `BOLT_DIR_MODE` — An octal UNIX permission value, e.g. `0775`, `0755`, `0750` (*default*: `0775`)
  * `BOLT_WEB_DIR` — Root web directory name (*default*:  `public`)
  * `BOLT_THEME_DIR` — Theme directory name (*default*: `theme`)
  * `BOLT_FILES_DIR` — Files directory name (*default*: `files`)
  * `BOLT_CONFIG_DIR` — Configuration files directory name (*default*: `app/config`)
  * `BOLT_DATABASE_DIR` — Database directory name (*default*: `app/database`)
  * `BOLT_CACHE_DIR` — Cache directory name (*default*: `app/cache`)

An example with all options set would look like:
```
env BOLT_DIR_MODE=0755 BOLT_WEB_DIR=my_public_dir BOLT_THEME_DIR=my_theme_dir \
    BOLT_FILES_DIR=my_files_dir BOLT_CONFIG_DIR=my_config_dir \
    BOLT_DATABASE_DIR=my_database_dir BOLT_CACHE_DIR=my_cache_dir \
    composer create-project bolt/composer-install:^%%VERSION%% <MYPROJECT> \
    --prefer-dist --no-interaction
```

**NOTE:** Change `<MYPROJECT>` to the name of your project before running the installer.

### Initialise a Project

For complete flexibility over the installation of your Bolt site, you can create
your own `composer.json` file, and path configuration file.

```
$ mkdir example.com
$ cd example.com
```

### Configuration File

In order for paths to be customised and still have the standard index.php (web)
and nut (CLI) work, there needs to be a standard place these are defined.

This is either `bolt.yml` (recommended) or `bolt.php` in the project root.
YAML works for simple values and PHP supports any programmatic logic if
required.

An example `bolt.yml` would look like:

```
paths:
    cache: app/cache
    config: app/config
    database: app/database
    web: public
    themebase: public/theme
    files: public/files
    view: public/bolt-public/view
```

If you are creating a `bolt.php` file instead, it should return the following
array.

```php
    $config = [
        'application' => null,
        'resources'   => null,
        'paths'       => [
            'cache'     => 'app/cache',
            'config'    => 'app/config',
            'database'  => 'app/database',
            'web'       => 'public',
            'themebase' => 'public/theme',
            'files'     => 'public/files',
            'view'      => 'public/bolt-public/view',
        ],
    ];
```
This is a very advanced option, see Bolt's [bootstrap file][bs]
for more details.

### Composer JSON File

You will need to create a `composer.json` file with the following keys at a
minimum:

```
{
    "require": {
        "bolt/bolt": "^%%VERSION%%"
    },
    "minimum-stability": "beta",
    "prefer-stable": true,
    "scripts": {
        "post-install-cmd": [
            "Bolt\\Composer\\ScriptHandler::installAssets"
        ],
        "post-update-cmd": [
            "Bolt\\Composer\\ScriptHandler::installAssets"
        ],
        "post-create-project-cmd": [
            "Bolt\\Composer\\ScriptHandler::configureProject",
            "Bolt\\Composer\\ScriptHandler::installThemesAndFiles",
            "nut extensions:setup"
        ]
    }
}
```

### Required Folders

Run the following commands to create the required folders. If you defined a
different folder structure in `bolt.yml` or `bolt.php`, you have to adjust the
commands to fit your own folder structure.

```
mkdir -p app/cache
mkdir -p app/config
mkdir -p app/database
mkdir -p public/theme
mkdir -p public/files
mkdir -p public/bolt-public/view
mkdir -p public/thumbs
mkdir -p public/extensions
mkdir -p extensions
```

Finally run Composer to install the required libraries and configure the
installation:

```
composer install --no-scripts
composer run-script post-create-project-cmd
composer run-script post-install-cmd
```

### Permissions

Generally most server should be fine with the default permissions. However, if
you require guidance on setting up permissions, see our
[File System Permissions](../permissions) page.

### Finishing Set-up

After you've done this, skip to the section [Setting up Bolt](../../configuration/introduction).

[bs]: https://github.com/bolt/bolt/blob/master/app/bootstrap.php
