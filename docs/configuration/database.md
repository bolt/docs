---
title: Database Configuration
---
Configuring the Database
========================

Bolt supports three different database engines: SQLite, MySQL and PostgreSQL.
Each has its benefits and drawbacks.

  - **SQLite** - is a (file-based) database. Bolt stores the entire database as
    a file in the `var/database` directory. Since it's a regular file, it's
    easy to make backups of your database if you use SQLite. The main benefit
    of SQLite is that it requires no configuration, and as such, it works 'out
    of the box' on practically any web server. This is why it's Bolt's default
    choice.
  - **MySQL** - is perhaps the most well-known database engine, which is
    supported on the majority of web servers. MySQL is very well-known, and there
    are good third-party tools for maintenance, backup and migration.
  - **PostgreSQL** - is a very well-designed database engine, but not as widely
    available as MySQL.

Not sure which database to use? We suggest using MySQL if available, and SQLite
otherwise.

If you wish to edit the database configuration, you have to change the settings
in the `.env` file or as environment variables. Apart from SQLite, you can use
MySQL and PostgreSQL as database systems. Set the database, username and
password as Doctrine DSN / Database URLs:


```env
# SQLite (note: THREE slashes, if the path is absolute!)
DATABASE_URL=sqlite:///%kernel.project_dir%/var/data/bolt.sqlite

# MySQL
DATABASE_URL=mysql://root:"root%1"@127.0.0.1:3306/four

# MySQL
DATABASE_URL=pgsql://root:"root%1"@127.0.0.1:5432/four
```
<!--
```yaml
database:
    driver: mysql
    username: bolt
    password: password
    databasename: bolt
```

or:

```yaml
database:
    driver: postgres
    username: bolt
    password: password
    databasename: bolt
```

<p class="note"><strong>Note:</strong> The config file is in the YAML format,
  which means that the indentation is important. Make sure you leave leading
  spaces intact.</p>

If the hostname or port are something else than `localhost:3306`, you can add them like
this:

```yaml
database:
    driver: mysql
    username: bolt
    password: password
    databasename: bolt
    host: database.example.org
    port: 3306
```

The default prefix for the database tables is `bolt_`. You can change this with the `prefix` option like so:
```yaml
database:
    driver: mysql
    username: bolt
    password: password
    databasename: bolt
    prefix: yourapp
``` -->

Other settings can be changed in the `config.yml` file later on. Either
directly from the Bolt backend, or by making edits in the file itself using
your preferred editor.

After configuring the Database, run `bin/console bolt:setup`. This will create
and initialise the Database for you, then lets you create the first user, and
add some dummy content ("fixtures") to the database.

Alternatively, run the following commands in sequence to do it step by step:

```bash
bin/console doctrine:database:create
bin/console doctrine:schema:create
bin/console bolt:add-user
bin/console doctrine:fixtures:load
```

