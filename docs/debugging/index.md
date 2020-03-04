---
title: Debugging Bolt
short_title: Debugging
pages:
    - debug-bar
    - console-commands
    - dump-function
    - backtrace-function
---
Debugging Bolt
==============

## Configuring Bolt

When debugging in Bolt, often you'll need to adjust settings in your
`.env` file.

### Enabling debugging

Ensure you have debugging enabled:

```yaml
APP_DEBUG=1
```

<p class="warning"><strong>Warning:</strong> When <code>APP_DEBUG=1</code> is
set, some internal data can be visible during debugging. You should therefore
use caution with enabling debugging in a production environment.</p>

### Debug logging

The default application logger's messages are available in
`var/log/dev.log` if in dev environment. In the production environment, the log
is available in `var/log/prod.log`.

<p class="note"><strong>Note:</strong> This file's size can grow quickly.</p>

### Environment setting

When deploying a local Bolt site to the production environment, it is advised
to set Bolt's environment variable to production. The environment variable is
available in `.env` and can be set to

```yaml
APP_ENV=prod
```

for production environments, or

```yaml
APP_ENV=dev
```

when developing locally.

```yaml
strict_variables: true
```

## Twig

For debugging inside Twig templates themselves, see the [`dump`][dump] and
[`backtrace`][backtrace] sections.

Of course the [debug bar][debug-bar] has profiling information available when
hovering over the Twig profiler icon, or a listing of templates used, and a
render call graph that can be useful to track down templates that are causing
slow page rendering.

## PHP

Symfony's [debug Toolbar][debug-bar] provides comprehensive information on:

- Performance breakdown of the request/response cycle
- Request & response object data
- Exceptions & related trace data
- Event dispatcher listeners that were, and were not, called
- Database queries that were performed for the page load

### Basic

For very basic debugging on PHP problems, Bolt has its own [`dump`][dump]
and [`backtrace`][backtrace] functions available.

### Advanced

However, while more complex to set up, using `xdebug` in an IDE such as
[PhpStorm][xdebug-phpstorm], [Atom][xdebug-atom], [VSCode][xdebug-vscode],
or [Eclipse][xdebug-eclipse] will make debugging PHP code so much simpler.

Also of worthy note, PhpStorm has the [Symfony support plugin][symfony-plugin]
available, that makes getting PHPDoc information, code completion, and method
parameter checking work for all parts of Bolt's code.

Likewise, for VSCode we can recommend the [Intelephense][ip] extension. It is
less extensive in scope as the PHP support you get with PhpStorm, but it makes
a vast difference over "vanilla" VSCode.

#### Xdebug & Composer

If you are debugging Composer script use from the command line, be aware of two
things:
 - Composer disables xdebug by default at runtime
 - Running Composer from `composer.phar` will not work with xdebug

To work around this run Composer from the vendor directory like so:

```bash
COMPOSER_ALLOW_XDEBUG=true vendor/bin/composer run-script {script name}
```
[debug-bar]: debugging/debug-bar
[backtrace]: debugging/backtrace-function#twig
[dump]: debugging/dump-function
[ip]: https://intelephense.com/
[xdebug-phpstorm]: https://www.jetbrains.com/help/phpstorm/2017.1/configuring-xdebug.html#integrationWithProduct
[xdebug-atom]: https://atom.io/packages/php-debug
[xdebug-eclipse]: https://wiki.eclipse.org/Debugging_using_XDebug
[xdebug-vscode]: https://github.com/felixfbecker/vscode-php-debug
[symfony-plugin]: https://plugins.jetbrains.com/plugin/7219-symfony-support
