---
title: Database Configuration
---
Configuring the Database
========================

Bolt supports three different database engines: SQLite, MySQL and PostgreSQL.
Each has its benefits and drawbacks.

  - **SQLite** - is a (file-based) database. Bolt stores the entire database as
    a file in the `app/database` directory. Since it's a regular file, it's
    easy to make backups of your database if you use SQLite. The main benefit
    of SQLite is that it requires no configuration, and as such, it works 'out
    of the box' on practically any webserver. This is why it's Bolt's default
    choice.
  - **MySQL** - is perhaps the most well-known database engine, which is
    supported on the majority of webservers. If your server supports it, we
    advise you to use MySQL instead of SQLite. Mainly because it's very well-
    known, and there are good third-party tools for maintenance, backup and
    migration.
  - **PostgreSQL** - is a very well-designed database engine, but not as widely
    available as MySQL.

Not sure which database to use? We suggest using MySQL if available, and SQLite
otherwise.

<p class="note"><strong>Note:</strong> If you've just installed Bolt, you might
not have the <code>config.yml</code>-file in <code>app/config</code> yet. You
will however have a <code>config.yml.dist</code>-file, in that same directory.
The first time Bolt is run, the <code>.yml.dist</code>-files will be
automatically copied to <code>.yml</code>-files. If you wish to do some
configuration <em>before</em> you first run Bolt, just copy
<code>config.yml.dist</code> to <code>config.yml</code> manually.</p>

If you wish to edit the database configuration, you have to change the settings
in `app/config/config.yml`. Apart from SQLite, you can use MySQL and PostgreSQL
as database systems. Set the database, username and password:

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

Support for PostgreSQL is experimental, so use with caution.

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

Other settings in the `config.yml` file can be changed later on, directly from
the Bolt backend.

Open your Bolt site in your browser, and you should be greeted by the screen to
set up the first user. Do so, and log in to the Bolt Backend. You should now
see the (empty) Dashboard screen, and you'll be able to add some dummy pages,
using the built-in Loripsum tool. After you've done this, you should see some
dummy content, and you're good to go!
