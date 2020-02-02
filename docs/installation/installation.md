---
title: Installation
---
Installing Bolt
===============

With the release of Bolt 4 stable, there will be a number of ways to install
the application. For now, we recommend the **composer create-project** as the
fastest way to get an installation of Bolt up and running. If you don't have
composer yet, see [here][get-composer].

<p class="note"><strong>Note:</strong> This documentation makes the assumption
that you're setting up Bolt on a local development machine. Not on the server
where you intend to run a production website. If you do not have a local
development environment, we recommend taking the time to set this up. </p>

Set up a new Bolt 4 project, using the following command, replacing
`myprojectname` with your desired project's name.

```bash
composer create-project bolt/project myprojectname
```

Navigate into the newly created folder, and configure the database in `.env` or
your environment variables, replacing `db_user`, `db_password` and `db_name`
where appropriate:

```env
# SQLite (note: _three_ slashes)
DATABASE_URL=sqlite:///%kernel.project_dir%/var/data/bolt.sqlite

# MYSQL / MariaDB
#DATABASE_URL=mysql://db_user:"db_password"@localhost:3306/db_name

# Postgres
#DATABASE_URL=postgresql://db_user:"db_password"@localhost:5432/db_name?serverVersion=11"

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

Starting a webserver
--------------------

You can run Bolt locally using the built-in webserver, [Symfony CLI][cli],
Docker or your own preferred webserver. If you choose to set up a web server
yourself, you can either set up something like [Mamp, Xampp, Laragon][local] or
otherwise there's docs for [Apache][apache] and [Nginx][nginx].

<p class="note"><strong>Note:</strong> The folder you've just created has a
<code>public/</code> folder. This is the actual web root of the site. If you're
not using one of the options below, but are configuring a webserver yourself,
make sure you use <code>public/</code> as the web root. Bolt does <em>not</em>
support putting all of its files inside the webroot itself, as that is
considered to be a bad practice.</p>

Start PHP's built-in webserver…

```bash
bin/console server:start
```

or use the Symfony CLI ([download here][cli]) …

```bash
symfony serve -d
symfony open:local
```

or use Docker…

```bash
make docker-install
```

Finally, open the new installation in a browser. If you've used one of the
commands above, you'll find the frontpage at http://127.0.0.1:8000/

The Bolt admin panel can be found at http://127.0.0.1:8000/bolt

Log in using the credentials you created when setting up the first user.

[cli]: https://symfony.com/download
[get-composer]: ./composer-create-project/install-composer
[db-setup]: ../configuration/database
[local]: https://www.slant.co/topics/5299/versus/~laragon_vs_xampp_vs_mamp
[apache]: webserver/apache
[nginx]: webserver/nginx
