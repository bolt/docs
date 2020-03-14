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
  - **MySQL** (and the similar **MariaDB**) - is perhaps the most well-known
    database engine, which is supported on the majority of web servers. MySQL is
    very well-known, and there are good third-party tools for maintenance,
    backup and migration.
  - **PostgreSQL** - is a very well-designed database engine, but not as widely
    available as MySQL.

Not sure which database to use? We suggest using MySQL if available, and SQLite
otherwise.

If you wish to edit the database configuration, you have to change the settings
in the `.env` file or as environment variables. Apart from SQLite, you can use
MySQL(MariaDB) and PostgreSQL as database systems. Set the database, username
and password as Doctrine DSN / Database URLs:


```env
# SQLite (note: _three_ slashes)
DATABASE_URL=sqlite:///%kernel.project_dir%/var/data/bolt.sqlite

# MYSQL / MariaDB
#DATABASE_URL=mysql://db_user:"db_password"@localhost:3306/db_name

# Postgres
#DATABASE_URL=postgresql://db_user:"db_password"@localhost:5432/db_name?serverVersion=11"
```

Other settings can be changed in the `config.yml` file later on. Either
directly from the Bolt backend, or by making edits in the file itself using
your preferred editor.

After configuring the Database, run `bin/console bolt:setup`. This will create
and initialise the Database for you, then lets you create the first user, and
add some dummy content ("fixtures") to the database.

Alternatively, run the following commands in sequence to do it step by step:

```bash
bin/console doctrine:database:create --if-not-exists
bin/console doctrine:schema:create
bin/console bolt:add-user
bin/console doctrine:fixtures:load
```

