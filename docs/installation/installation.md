---
title: Installation
---
Installing Bolt
===============

With the release of Bolt 4 stable, there will be a number of ways to install
the application. For now, we recommend the **composer create-project** as the
fastest way to get an installation of Bolt up and running. If you don't have
composer yet, see [here][get-composer].

Set up a new Bolt 4 project, using the following command, replacing `myprojectname`
with your desired project's name.

```bash
composer create-project bolt/project myprojectname
```

Navigate into the newly created folder, and configure the database in `.env` or
your environment variables:

```env
# SQLite (note: THREE slashes, if the path is absolute!)
DATABASE_URL=sqlite:///%kernel.project_dir%/var/data/bolt.sqlite

# MySQL
DATABASE_URL=mysql://root:"root%1"@127.0.0.1:3306/four

# MySQL
DATABASE_URL=pgsql://root:"root%1"@127.0.0.1:5432/four
```

You can read more information about [configuring the database here][db-setup].

After configuring the Database, run `bin/console bolt:setup`. This will create
and initialise the Database for you, then lets you create the first user, and
add some dummy content ("fixtures") to the database.

Alternatively, run the following commands in sequence to do it step by step:

```bash
# In one go
bin/console bolt:setup

# As separate steps
bin/console doctrine:database:create
bin/console doctrine:schema:create
bin/console bolt:add-user
bin/console doctrine:fixtures:load
```

Run Bolt using the built-in webserver, Symfony CLI, Docker or your own
preferred webserver:

```bash
bin/console server:start
```

or…

```bash
symfony server:start -d
symfony open:local
```

or…

```bash
make docker-install
```

Finally, open the new installation in a browser. If you've used one of the
commands above, you'll find the frontpage at http://127.0.0.1:8000/

The Bolt admin panel can be found at http://127.0.0.1:8000/bolt

Log in using the credentials you created when setting up the first user.

[get-composer]: ./composer-create-project/install-composer
[db-setup]: ../configuration/database
