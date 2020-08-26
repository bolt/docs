---
title: Introduction
---
The command line utility Console
================================

Bolt provides a powerful command line tool, based on the Symfony
[Console component][console].

<p class="note"><strong>Note:</strong> The <code>bin/console</code> command is
merely a convenient tool for those that do prefer the command line. Its use is
not required for normal use.</p>

Console is usualy located at `{site root}/bin/console`, and can be executed using your
PHP binary, for example to execute the `cache:clear` Console command:

```bash
$ php ./bin/console cache:clear

… or simply:

$ bin/console cache:clear

Cache cleared!
```

If you are familiar with working on the command line, you can perform tasks
like 'clearing the cache' or 'updating the database' without having to use
Bolt's web interface.

## Basics

## The command

Typing out a Console command is best done following this pattern:

```bash
$ php ./bin/console command [options] [arguments]
```

### Options and Arguments

Values passed to either can be required, a single value, or several values
separated by a space character.

Options are the parameters that are suffixed with `--`, e.g. `--help`. Unlike
argument, options can also not contain a user supplied value.

Some example of how an `example:command` command line would be built to be
executed by Console:

```bash
$ php ./bin/console example:command --option-without-value
$ php ./bin/console example:command SingleArgumentValue
$ php ./bin/console example:command --option-without-value SingleArgumentValue
$ php ./bin/console example:command --send-report true
$ php ./bin/console example:command --pets cats dogs --option-without-value
$ php ./bin/console example:command --pets cats dogs FirstArgumentValue SecondArgumentValue
```

### Default options

Console commands all have the following set of options that you can add to your
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

For example, to see Console's base help:

```bash
$ php ./bin/console --help
```

Alternatively, to get the help text for the `cache:clear` Console command:

```bash
$ php ./bin/console cache:clear --help
```

<p class="note"><strong>Note:</strong> If for any reason Console generates an
exception when running, you can re-run the command with the <code>-vvv</code>
option to generate a backtrace to assist in finding the root cause of the
problem.</p>

### Available commands

To see a list of available commands for a given Bolt installation, simply run
Console without any parameters:

```bash
$ php bin/console
```

### Current List

```yaml
Available commands:
  about                                   Displays information about the current project
  help                                    Displays help for a command
  list                                    Lists commands
 api
  api:graphql:export                      Export the GraphQL schema in Schema Definition Language (SDL)
  api:json-schema:generate                Generates the JSON Schema for a resource operation.
  api:openapi:export                      [api:swagger:export] Dump the OpenAPI documentation
 assets
  assets:install                          Installs bundles web assets under a public directory
 bolt
  bolt:add-user                           Creates users and stores them in the database
  bolt:copy-assets                        Copy built asset files into the project root
  bolt:copy-themes                        Copy theme files into the public/themes folder
  bolt:delete-user                        Deletes users from the database
  bolt:info                               Info about this Bolt Installation
  bolt:list-users                         Lists all the existing users
  bolt:reset-secret                       Reset the APP_SECRET for this Bolt site.
  bolt:setup                              Run Bolt setup / installation commands
 cache
  cache:clear                             Clears the cache
  cache:pool:clear                        Clears cache pools
  cache:pool:delete                       Deletes an item from a cache pool
  cache:pool:list                         List available cache pools
  cache:pool:prune                        Prunes cache pools
  cache:thumbs                            Clear Bolt's thumbnail cache folder
  cache:warmup                            Warms up an empty cache
 config
  config:dump-reference                   Dumps the default configuration for an extension
 debug
  debug:autowiring                        Lists classes/interfaces you can use for autowiring
  debug:config                            Dumps the current configuration for an extension
  debug:container                         Displays current services for an application
  debug:event-dispatcher                  Displays configured listeners for an application
  debug:form                              Displays form type information
  debug:router                            Displays current routes for an application
  debug:translation                       Displays translation messages information
  debug:twig                              Shows a list of twig functions, filters, globals and tests
 doctrine
  doctrine:cache:clear-collection-region  Clear a second-level cache collection region
  doctrine:cache:clear-entity-region      Clear a second-level cache entity region
  doctrine:cache:clear-metadata           Clears all metadata cache for an entity manager
  doctrine:cache:clear-query              Clears all query cache for an entity manager
  doctrine:cache:clear-query-region       Clear a second-level cache query region
  doctrine:cache:clear-result             Clears result cache for an entity manager
  doctrine:database:create                Creates the configured database
  doctrine:database:drop                  Drops the configured database
  doctrine:database:import                Import SQL file(s) directly to Database.
  doctrine:ensure-production-settings     Verify that Doctrine is properly configured for a production environment
  doctrine:fixtures:load                  Load data fixtures to your database
  doctrine:mapping:convert                [orm:convert:mapping] Convert mapping information between supported formats
  doctrine:mapping:import                 Imports mapping information from an existing database
  doctrine:mapping:info
  doctrine:migrations:diff                [diff] Generate a migration by comparing your current database to your mapping information.
  doctrine:migrations:dump-schema         [dump-schema] Dump the schema for your database to a migration.
  doctrine:migrations:execute             [execute] Execute a single migration version up or down manually.
  doctrine:migrations:generate            [generate] Generate a blank migration class.
  doctrine:migrations:latest              [latest] Outputs the latest version number
  doctrine:migrations:migrate             [migrate] Execute a migration to a specified version or the latest available version.
  doctrine:migrations:rollup              [rollup] Rollup migrations by deleting all tracked versions and insert the one version that exists.
  doctrine:migrations:status              [status] View the status of a set of migrations.
  doctrine:migrations:up-to-date          [up-to-date] Tells you if your schema is up-to-date.
  doctrine:migrations:version             [version] Manually add and delete migration versions from the version table.
  doctrine:query:dql                      Executes arbitrary DQL directly from the command line
  doctrine:query:sql                      Executes arbitrary SQL directly from the command line.
  doctrine:schema:create                  Executes (or dumps) the SQL needed to generate the database schema
  doctrine:schema:drop                    Executes (or dumps) the SQL needed to drop the current database schema
  doctrine:schema:update                  Executes (or dumps) the SQL needed to update the database schema to match the current mapping metadata
  doctrine:schema:validate                Validate the mapping files
 extensions
  extensions:configure                    Copy the config/config.yaml, config/services.yaml and config/routes.yaml files from extensions.
  extensions:list                         List installed Extensions
  extensions:services                     List services available in Extensions
  extensions:show                         Show details for an extension
 lint
  lint:container                          Ensures that arguments injected into services match type declarations
  lint:twig                               Lints a template and outputs encountered errors
  lint:xliff                              Lints a XLIFF file and outputs encountered errors
  lint:yaml                               Lints a file and outputs encountered errors
 make
  make:auth                               Creates a Guard authenticator of different flavors
  make:command                            Creates a new console command class
  make:controller                         Creates a new controller class
  make:crud                               Creates CRUD for Doctrine entity class
  make:docker:database                    Adds a database container to your docker-compose.yaml file.
  make:entity                             Creates or updates a Doctrine entity class, and optionally an API Platform resource
  make:fixtures                           Creates a new class to load Doctrine fixtures
  make:form                               Creates a new form class
  make:functional-test                    Creates a new functional test class
  make:message                            Creates a new message and handler
  make:messenger-middleware               Creates a new messenger middleware
  make:migration                          Creates a new migration based on database changes
  make:registration-form                  Creates a new registration form system
  make:reset-password                     Create controller, entity, and repositories for use with symfonycasts/reset-password-bundle.
  make:serializer:encoder                 Creates a new serializer encoder class
  make:serializer:normalizer              Creates a new serializer normalizer class
  make:subscriber                         Creates a new event subscriber class
  make:twig-extension                     Creates a new Twig extension class
  make:unit-test                          Creates a new unit test class
  make:user                               Creates a new security user class
  make:validator                          Creates a new validator and constraint class
  make:voter                              Creates a new security voter class
 router
  router:match                            Helps debug routes by simulating a path info match
 secrets
  secrets:decrypt-to-local                Decrypts all secrets and stores them in the local vault
  secrets:encrypt-from-local              Encrypts all local secrets to the vault
  secrets:generate-keys                   Generates new encryption keys
  secrets:list                            Lists all secrets
  secrets:remove                          Removes a secret from the vault
  secrets:set                             Sets a secret in the vault
 security
  security:check                          Checks security issues in your project dependencies
  security:encode-password                Encodes a password
 server
  server:dump                             Starts a dump server that collects and displays dumps in a single place
  server:log                              Starts a log server that displays logs in real time
  server:run                              Runs a local web server
  server:start                            Starts a local web server in the background
  server:status                           Outputs the status of the local web server
  server:stop                             Stops the local web server that was started with the server:start command
 translation
  translation:check-missing               Check that all translations for a given locale are extracted.
  translation:delete-obsolete             Delete all translations marked as obsolete.
  translation:download                    Replace local messages with messages from remote
  translation:extract                     Extract translations from source code.
  translation:status                      Show status about your translations.
  translation:sync                        Sync the translations with the remote storage
  translation:update                      Updates the translation file
```


### Adding your own Console command

Bolt enables you to extend Console, and add your own command, via a Bolt extension,
see the [Console Console Commands][Console-extension] section of the extension
documentation for more information.

[console]: http://symfony.com/doc/2.8/components/console.html
[Console-extension]: ../extensions/intermediate/Console-commands

