---
title: Introduction
---
The command line utility Nut
============================

Bolt comes with a small command line utility, named `nut`, that can be found in
the `app/`-folder. If you are familiar with working on the commandline, you can
some tasks like 'clearing the cache' or 'updating the database' without having
to use the webinterface of Bolt. This utility is completely optional, so if you
don't have access to the command line on your server, you're not missing out on
any essential functionality. It's merely a convenient tool for those that do
prefer the command line.

Right now, there are a few basic commands, but we're going to add more and more
over time.

When running `php app/nut` without any parameters, you'll see the help screen:

```yaml
Usage:
  command [options] [arguments]

Options:
  -h, --help            Display this help message
  -q, --quiet           Do not output any message
  -V, --version         Display this application version
      --ansi            Force ANSI output
      --no-ansi         Disable ANSI output
  -n, --no-interaction  Do not ask any interactive question
  -v|vv|vvv, --verbose  Increase the verbosity of messages: 1 for normal output, 2 for more verbose output and 3 for debug

Available commands:
  _completion               BASH completion hook.
  cron                      Cron virtual daemon
  extensions                Lists all installed extensions
  help                      Displays help for a command
  info                      Display phpinfo().
  init                      Greet the user (and perform initial setup tasks).
  list                      Lists commands
 cache
  cache:clear               Clear the cache
 config
  config:get                Get a value from a config file
  config:set                Set a value in a config file
 database
  database:check            Check the database for missing tables and/or columns.
  database:export           [EXPERIMENTAL] Export the database records to a YAML or JSON file.
  database:import           [EXPERIMENTAL] Import database records from a YAML or JSON file
  database:prefill          Pre-fill the database Lorem Ipsum records
  database:update           Repair and/or update the database.
 debug
  debug:events              Dumps event listeners.
  debug:providers           Dumps service providers and their order.
  debug:router              System route debug dumper.
  debug:service-providers   Dumps service providers and their order.
  debug:twig                Shows a list of twig functions, filters, globals and tests
 extensions
  extensions:disable        Uninstalls an extension.
  extensions:dump-autoload  Update the extensions autoloader.
  extensions:dumpautoload   Update the extensions autoloader.
  extensions:enable         Installs an extension by name and version.
  extensions:install        Installs an extension by name and version.
  extensions:setup          Set up extension directories, and create/update composer.json.
  extensions:uninstall      Uninstalls an extension.
  extensions:update         Updates extension(s).
 lint
  lint:twig                 Lints a template and outputs encountered errors
 log
  log:clear                 Clear (truncate) the system & change logs.
  log:trim                  Trim the system & change logs.
 pimple
  pimple:dump               Pimple container dumper for PhpStorm & IntelliJ IDEA.
 role
  role:add                  Add a certain role to a user.
  role:remove               Remove a certain role from a user.
 router
  router:match              Helps debug routes by simulating a URI path match
 server
  server:run                Runs PHP built-in web server
 setup
  setup:sync                Synchronise a Bolt install private asset directories with the web root.
 tests
  tests:run                 Runs all available tests
 twig
  twig:lint                 Lints a template and outputs encountered errors
 user
  user:add                  Add a new user.
  user:manage               Manage a user.
  user:reset-password       Reset a user password.
```

Run any of these commands, to perform their actions, like `php app/nut cache:clear`.
