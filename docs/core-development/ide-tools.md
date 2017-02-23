IDE Tools for developing Bolt
=============================

Currently the core team members use a combination of PhpStorm/IntelliJ, vim,
Atom, Sublime, Netbeans, and Visual Studio Code. There is probably even an 
emacs die-hard out there.

In no way should any of these this be seen as a requirement to develop on
Bolt's core code, but some tools will make your life easier.

This document currently covers the following IDEs:
  * PhpStorm & IntelliJ IDEA

## PhpStorm & IntelliJ IDEA

### Useful Plugins

* Silex/Pimple Plugin
* Symfony Plugin
* Twig Support

In particular, most developers will find the Silex plugin extremely useful, as
it will allow services stored in the application container to be treated by the
IDE in the same way that normal variables are, and provide auto-completion, 
hinting & code completion, to help avoid programmer mistakes.  
 
e.g. Clicking on `$app['twig']` would resolve like a normal variable to 
`\Twig_Environment`, and show appropriate data. Whereas `$app['twig']->render()`  
will show you information about the `render()` function and highlight missing
parameters, or incorrect parameter types, etc.

#### Silex/Pimple Plugin

##### Set-up

1. Install the plugin from JetBrains repositories:
   * Settings → Plugins → Browse repositories and search for "Silex"
2. Restart PhpStorm/IntelliJ
3. Enable the plugin:
   * Per-project:
     * Settings → Other Settings → Silex Plugin  → Click "Enable Plugin"
   * All projects:
     * Default Settings → Other Settings → Silex Plugin  → Click "Enable Plugin"

For more information, the plugin source repository can be [found on GitHub][silex-idea-plugin]


##### Editing the `~/.gitconfig`file

Edit the `.gitconfig` file in your user home directory, and under the `[core]`
section you can add the following:

```
[core]
    excludesfile = ~/.gitignore_global
```


##### Editing the `~/.gitignore_global` file

Edit the `.global` file in your user home directory, and add the following two
files:

```
dump.php
pimple.json
```


##### Installing Silex Pimple Dumper PHP package

First thing you will need to do is install `sorien/silex-pimple-dumper` as a 
**global** Composer package. 

```bash
composer global require sorien/silex-pimple-dumper:^1.0
```

For those not overly familiar with Composer, installing packages "globally"
will add them to you Composer configuration directory, located in your user
home directory.

<p class="note"><strong>Note:</strong> Older versions of Composer on UNIX based
systems (Linux & OS X) will use the directory <code>~/.composer</code>, whereas newer 
versions will create that directory in <code>~/.config/composer</code>.</p>


##### Creating the JSON generator file

Create the file `dump.php` in your Bolt directory and add:

```php
<?php

require_once getenv('HOME') . '/.composer/vendor/autoload.php';

/** @var \Silex\Application $app */
if (file_exists(__DIR__ . '/app/bootstrap.php')) {
    $app = require_once __DIR__ . '/app/bootstrap.php';
} elseif (file_exists(__DIR__ . '/vendor/bolt/bolt/app/bootstrap.php')) {
    $app = require_once __DIR__ . '/vendor/bolt/bolt/app/bootstrap.php';
} else {
    echo "ABORTING: bootstrap.php not found\n";
}
$app['pimpledump.output_dir'] = __DIR__;

$pdp = new Sorien\Provider\PimpleDumpProvider();
$app->register($pdp);
$app->boot();
$pdp->dump($app);
```

##### Usage

Simply run the `dump.php` file in the **root directory of your Bolt install**:

```bash
php dump.php
```

This will generate a `pimple.json` file in the root directory, that once the
extensions is enabled in PhpStorm or IntelliJ IDEA will provide that extension
with the information to make your work with Dependency Injection (DI) objects
far more pleasurable.

--- 

[silex-pimple-dumper]: https://github.com/Sorien/silex-pimple-dumper
[silex-idea-plugin]: https://github.com/Sorien/silex-idea-plugin
