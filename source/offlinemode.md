Offline mode
============

Bolt comes with a small command line utility, named `nut`, that can be found in the `app/`-folder. If you are familiar
with working on the commandline, you can some tasks like 'clearing the cache' or 'updating the database' without having
to use the webinterface of Bolt. This utility is completely optional, so if you don't have access to the command line
on your server, you're not missing out on any essential functionality. It's merely a convenient tool for those that do
prefer the command line.

Right now, there are a few basic commands, but we're going to add more and more over time. 

When running `php app/nut` without any parameters, you'll see the help screen:

<pre class="brush:plain">
Console Tool

Usage:
  [options] command [arguments]

Options:
  --help           -h Display this help message.
  --quiet          -q Do not output any message.
  --verbose        -v Increase verbosity of messages.
  --version        -V Display this application version.
  --ansi              Force ANSI output.
  --no-ansi           Disable ANSI output.
  --no-interaction -n Do not ask any interactive question.

Available commands:
  help             Displays help for a command
  info             Display phpinfo().
  list             Lists commands
cache
  cache:clear      Clear the cache
database
  database:check   Check and repair/update the database.
log
  log:clear        Clear (truncate) the activitylog.
  log:trim         Trim the activitylog to recent/important items only.
nut
  nut:greet        Greet someone
tests
  tests:run        Runs all available tests
</pre>

Run any of these commands, to perform their actions, like `php app/nut cache:clear`. 

