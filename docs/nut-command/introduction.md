---
title: Introduction
---
The command line utility Nut
============================

Bolt provides a powerful command line tool, based on the Symfony
[Console component][console].

<p class="note"><strong>Note:</strong> The <code>nut</code> command is merely
a convenient tool for those that do prefer the command line. Its use is not
required for normal use.</p>

Nut is usualy located at `{site root}/app/nut`, and can be executed using your
PHP binary, for example to execute the `cache:clear` Nut command:

```bash
$ php ./app/nut cache:clear

Cache cleared!
```

If you are familiar with working on the command line, you can perform tasks
like 'clearing the cache' or 'updating the database' without having to use
Bolt's web interface.


### Basics

#### The command

Typing out a Nut command is best done following this pattern:

```bash
$ php ./app/nut command [options] [arguments]
```

#### Options and Arguments

Values passed to either can be required, a single value, or several values
separated by a space character.

Options are the parameters that are suffixed with `--`, e.g. `--help`. Unlike
argument, options can also not contain a user supplied value.

Some example of how an `example:command` command line would be built to be
executed by Nut:

```bash
$ php ./app/nut example:command --option-without-value
$ php ./app/nut example:command SingleArgumentValue
$ php ./app/nut example:command --option-without-value SingleArgumentValue
$ php ./app/nut example:command --send-report true
$ php ./app/nut example:command --pets cats dogs --option-without-value
$ php ./app/nut example:command --pets cats dogs FirstArgumentValue SecondArgumentValue
```


##### Default options

Nut commands all have the following set of options that you can add to your
command line:

```yaml
  -h, --help            Display this help message
  -q, --quiet           Do not output any message
  -V, --version         Display this application version
      --ansi            Force ANSI output
      --no-ansi         Disable ANSI output
  -n, --no-interaction  Do not ask any interactive question
  -v|vv|vvv, --verbose  Increase the verbosity of messages: 1 for normal output, 2 for more verbose output and 3 for debug
```

The `--help` option will give contextual help text, and is the most useful for
learning, or refreshing you memory on, command use.

For example, to see Nut's base help:

```bash
$ php ./app/nut --help
```

Alternatively, to get the help text for the `cache:clear` Nut command:

```bash
$ php ./app/nut cache:clear --help
```

<p class="note"><strong>Note:</strong> If for any reason Nut generates an
exception when running, you can re-run the command with the <code>-vvv</code>
option to generate a backtrace to assist in finding the root cause of the
problem.</p>


### Available commands

To see a list of available commands for a given Bolt installation, simply run
Nut without any parameters:

```bash
$ php app/nut
```


#### Current List

```yaml
  _completion               BASH completion hook.
  cron                      Cron virtual daemon
  extensions                Lists all installed extensions
  help                      Displays help for a command
  info                      Display phpinfo().
  list                      Lists commands
 cache
  cache:clear               Clear the cache
 config
  config:get                Get a value from config.yml.
  config:set                Set a value in config.yml.
 database
  database:check            Check the database for missing tables and/or columns.
  database:export           [EXPERIMENTAL] Export the database records to a YAML or JSON file.
  database:import           [EXPERIMENTAL] Import database records from a YAML or JSON file
  database:prefill          Pre-fill the database Lorem Ipsum records
  database:update           Repair and/or update the database.
 extensions
  extensions:disable        Uninstalls an extension.
  extensions:dump-autoload  Update the extensions autoloader.
  extensions:dumpautoload   Update the extensions autoloader.
  extensions:enable         Installs an extension by name and version.
  extensions:install        Installs an extension by name and version.
  extensions:setup          Set up extension directories, composer.json and required dependencies.
  extensions:uninstall      Uninstalls an extension.
  extensions:update         Updates extension(s).
 log
  log:clear                 Clear (truncate) the system & change logs.
  log:trim                  Trim the system & change logs.
 role
  role:add                  Add a certain role to a user.
  role:remove               Remove a certain role from a user.
 server
  server:run                Runs PHP built-in web server
 setup
  setup:sync                Synchronise a Bolt install private asset directories with the web root.
 tests
  tests:run                 Runs all available tests
 user
  user:add                  Add a new user.
  user:manage               Manage a user.
  user:reset-password       Reset a user password.
```


### Adding your own Nut command

Bolt enables you to extend Nut, and add your own command, via a Bolt extension,
see the [Nut Console Commands][nut-extension] section of the extension
documentation for more information.

[console]: http://symfony.com/doc/2.8/components/console.html
[nut-extension]: ../extensions/intermediate/nut-commands
