---
title: Debugging Bolt
short_title: Debugging
pages:
    - debug-bar
    - dump-function
    - backtrace-function
---
Debugging Bolt
==============

Sections:
  - [Configuring Bolt](#configuring-bolt)
  - [Twig](#twig)
  - [PHP](#php)

### Configuring Bolt

When debugging in Bolt, often you'll need to adjust settings in your
`app/config/config.yml` file.

#### Enabling debugging

Ensure you have debugging enabled:
```yaml
debug: true
```

<p class="warning"><strong>Warning:</strong> When <code>debug: true</code> is
set, some internal data can be visible during debugging. You should therefore
use caution with enabling debugging in a production environment.</p>

#### Setting debug error level

It is also advised to set the debug error level to show all errors:

```yaml
debug_error_level: -1
```

#### Enabling debug logging

Enabling the debug log writes the default application logger's messages to
`app/cache/bolt-debug.log`.

```yaml
debuglog:
    enabled: true
```

<p class="note"><strong>Note:</strong> This file's size can grow quickly.</p>

#### Enabling debugging while logged off

If you're debugging problems on a development server, and are missing a login
token, the debug bar, and dumping functions will not appear.

Setting `debug_show_loggedoff` will enable the debug bar, and dump output
always.

```yaml
debug_show_loggedoff: true
```

<p class="warning"><strong>Warning:</strong> This should only be enabled in
non-production environments.</p>

### Twig

When writing and debugging Twig templates in Bolt, enable `strict_variables` in
your `app/config/config.yml` file, making Twig be strict on the use of
undeclared variables.

```yaml
strict_variables: true
```

For debugging inside Twig templates themselves, see the [`dump`][dump-twig] and
[`backtrace`][backtrace-twig] sections.


Of course the [debug bar][debug-bar] has profiling information available when
hovering over the Twig profiler icon, or a listing of templates used, and a
render call graph that can be useful to track down templates that are causing
slow page rendering.

### PHP

The [debug bar][debug-bar] provides comprehensive information on:

  * Performance breakdown of the request/response cycle
  * Request & response object data
  * Exceptions & related trace data
  * Event dispatcher listeners that were, and were not, called
  * Database queries that were performed for the page load

#### Basic

For very basic debugging on PHP problems, Bolt has its own [`dump`][dump-php]
and [`backtrace`][backtrace-php] functions available.

#### Advanced

However, while more complex to set up, using `xdebug` in an IDE such as
[PhpStorm][xdebug-phpstorm], [Atom][xdebug-atom], [VSCode][xdebug-vscode],
or [Eclipse][xdebug-eclipse] will make debugging PHP code so much simpler.

Also of worthy note, PhpStorm has the [Silex Pimple plugin][pimple-plugin]
available, that makes getting PHPDoc information, code completion, and method
parameter checking all work for keys on `$app`.


[debug-bar]: debugging/debug-bar
[dump-twig]: debugging/dump-function#twig
[backtrace-twig]: debugging/backtrace-function#php
[dump-php]: debugging/dump-function#twig
[backtrace-php]: debugging/backtrace-function#php

[xdebug-phpstorm]: https://www.jetbrains.com/help/phpstorm/2017.1/configuring-xdebug.html#integrationWithProduct
[xdebug-atom]: https://atom.io/packages/php-debug
[xdebug-eclipse]: https://wiki.eclipse.org/Debugging_using_XDebug
[xdebug-vscode]: https://github.com/felixfbecker/vscode-php-debug
[pimple-plugin]: https://plugins.jetbrains.com/plugin/7809-silex-pimple-plugin
