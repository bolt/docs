---
title: Creating a new project
level: advanced
---
Creating a new Composer installation
====================================

If you are starting a new project from scratch, then we've made this very
simple, and flexible. Bolt's Composer based installs can be performed using
either `composer create-project` (recommended), or building your own
`composer.json` and path configuration file for more advanced control.

Composer `create-project` installs can be run interactively or fully automatic.
In the first case, the installer will prompt for configuration options. With
the automatic mode, the installer will not prompt for choices, but rather use
default configuration options or options taken from environment variables.

An example of the process is shown here:

<script type="text/javascript" src="https://asciinema.org/a/129088.js" id="asciicast-129088" async></script>


Create Project
--------------

### Interactive Install

To start an interactive install, navigate to the parent directory of your
desired project (site), and run the following from a command line:

```
composer create-project bolt/composer-install:%%VERSION%%.x <MYPROJECT> --prefer-dist
```

**NOTE:** Change `<MYPROJECT>` to the name of your project before running the
installer.

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

If you want an automated install with customised configuration options, you can
set any, or all, of the following variables and the installer will use them:

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

This is a very advanced option, see [Customising Bootstrapping][bootstrapping]
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
different folder structure in `.bolt.yml` or `.bolt.php`, you have to adjust the
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

Bolt needs to be able to write data to a number of folders. For example the
`cache/` folder, and the `files/` folder where uploaded images and other files
will be saved.

Generally, servers should be fine with the default permissions.
If your server needs to have the permissions set manually, you'll immediately
notice when opening your new install in a browser window, because you will
greeted by an error, and the message that you should fix this. If this happens,
and you require guidance on setting up permissions, see our
[File System Permissions](../permissions) page.

### Finishing Set-up

After you've done this, skip to the section [Setting up Bolt][config].


Deploying to Different PHP Versions
-----------------------------------

If you are developing on versions of PHP such as PHP 7, but deploying to hosts
running PHP 5, you can run into problems with libraries that use PHP
functionality not available in earlier releases.

A common example are the Doctrine libraries, as the project doesn't follow
strict semantic versioning for PHP release versions.

If you need to prepare a Composer based install for a specific PHP version, add
the following to the site's root `composer.json` file:

```json
    "config": {
        "platform": {
            "php": "5.5"
        }
    }
```

This lets you fake platform packages (i.e. PHP and PHP extensions) allowing you
to emulate your production environment, or define your target platform in the
Composer project configuration.

After making these changes, run `composer update` to get the correct versions of
packages. Be sure to omit the `--ignore-version-reqs` flag, because using that
will override these settings.

[bootstrapping]: ../../extensions/custom-bootstrapping
[config]: ../../configuration/introduction

