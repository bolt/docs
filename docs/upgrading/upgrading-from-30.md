---
title: Migrating from Bolt v3.7 to v5.0
---
Migrating from Bolt v3.7 to v5.0
=========================

Recently it has been announced the release of Bolt 5 and since Bolt 3 is reaching
end of life the 31st of December 2021, we have made this guide to make the migration process a bit more 
pleasant for you. 

Keep reading and happy Bolt migration! 

## Table of Content
1. Update to latest Bolt v3.7
2. Export data
3. Update to Bolt v5.0
4. Contenttype fields conversion
5. Conimex Extension and data import
6. Templates update

## Update to latest Bolt v3.7
If you are already running the latest Bolt 3.7 version you can skip this step and
continue reading on the next step "Export data".

Aren't you sure if you are running the latest release? You can check it out by running:

    composer outdated bolt/bolt

![Composer outdated command](images/latest-bolt-version-command.JPG)

Note the `latest` option in the screenshot. If the latest version is prompted in
green you are good to move forward with the migration. In case the latest version
is prompted in red you need to make sure to update to the latest version.

To update to the latest version run the following command:

    composer require bolt/bolt ^3.7 --update-with-dependencies

## Export data
Before getting into running any command to export the data make sure you
have a backup of the database of the site you are about to migrate.

Having said that, let's get the data exported by running the command below in the
root directory of the site:

    app/nut database:export --file=my_site_data_export.yml --users

![Export data command](images/export-warning-command.JPG)

This command is doing a couple of things:

- Using the `--file` option, it creates the `my_site_data_export.yml` file in the
  root directory with all the exported data.
- Using the `--users` option will export the data of the users and their credentials.

**Warning:** Since the users are being exported with their passwords and other private
data, keep the export file in a safe place. Do not share or commit this file to Git.

There are other handy options that can be used when exporting the data, such as:

- `--contenttype=CONTENTTYPE`: Contenttype name to export records for (can be used multiple times).
  Use this option if you want to have your data exported by Contenttype.
  For example `php app/nut database:export --contenttype=news --file=news.yml` will
  export all the records of the News Contenttype into the `news.yml` file
- `--directory=DIRECTORY`: A destination directory. The command will automatically
  generate file names. Use this option to export the data into a directory.
  For example: `php app/nut database:export --contenttype=news --directory=export/news.yml`

Those seem to be the options you would use the most but there exist other options
you might find interesting. You can check them up by running:

    app/nut database:export --help

![Export data command](images/export-command-options.JPG)

## Update to Bolt v5.0
Even though you could directly update your existing site from Bolt 3 to Bolt 5, we will use
a less complex approach which will also help to keep track of the old Bolt 3 installation
and the new Bolt 5 version.

### New Bolt 5 project install
Let's get started by installing a new Bolt 5 project. You can create a new Bolt 5 project by
running the command:

    composer create-project bolt/project myprojectname

`myprojectname` can be anything you like. This is just the name of the directory the installation
will be put in.

### Moving Bolt 3 files into Bolt 5 installation
Once you have installed the latest version of Bolt 5 move forward by copying relevant
files of your Bolt 3 site into the recently installed version 5.
In the table below you can see an overview of the list of directories and files to be copied and  
the location in the new version's structure.

| Bolt 3                                | Bolt 5                                      |
| ------------------------------------- | -------------------------------------------- |
| General config directory `app/config`               | `config/bolt`                  |
| Extensions config directory `app/config/extensions` | `config/extensions`            |
| Templates directory `public/theme/YOUR_THEME_NAME`  | `public/theme/YOUR_THEME_NAME` |
| Files directory `public/files`                      | `public/files`                 |
| Thumbnails directory `public/thumbs`                | `public/thumbs`                |

In case you have customized the default Bolt 3 `.htaccess` file in the `public` directory,
you will need to include the modification in the new Bolt 5 `public/.htaccess` file for your
site to properly work.

## Contenttype fields conversion
Now that we have allocated the files in the right directories is time to get your `contenttypes.yml`
file compatible with Bolt 5. Since new features has been added to fields and the definition of some Fields have
slightly changed, these fields need to be converted  so Bolt 5 understands the type of field you are
defining. It is not necessary to change all the fields but it is necessary to apply changes to the
following Fields.

#### Integer and Float fields
The integer and the float fields are known in Bolt 3 like shown below:
```yaml
# Bolt 3 Integer field definition
integerfield:
    type: integer

# Bolt 3 Float field definition
floatfield:
    type: float
```
These fields do no longer exist in Bolt 5. These types of fields have been combined into one Field called
[Number](https://docs.bolt.cm/4.0/fields/number "Bolt documentation: Number field")

It comes in with an option called `mode` where you can choose between `integer` or `float` to
save that type of data in your Database.

To migrate the data of an **Integer** field the new field definition will look like:
```yaml
# Bolt 5 integer Number field definition
integerfield:
    type: number
    mode: integer
```

To migrate the data of a **Float** field the new field definition will look like:
```yaml
# Bolt 5 float Number field definition
floatfield:
    type: number
    mode: float 
```

#### `recordsperpage` is now `records_per_page`

The `recordsperpage` setting for a content type has been changed (since Bolt 4) to use `snake_case` for consistency with other Bolt config items.

```yaml
# Bolt 3.x syntax
contenttype_posts:
  recordsperpage: 10

#Bolt 4.x+ syntax
contenttype_posts:
  records_per_page: 10
```

### Repeater and Block fields
The Repeater and Block fields do no longer exist in Bolt 5. The Collection and Set fields have been
introduced to take over the role the other fields played. Even though the look and feel is pretty
much the same as it was in earlier versions, the syntax to define these fields differs a little bit.
There is some documentation already written about [how to transform Repeater and Block fields](https://docs.bolt.cm/5.0/howto/transform-repeaters-to-sets-and-collections#jumpbutton)
that will help you out in migrating these fields for your site.

### Video field

The `video` field type from Bolt 3 has been dropped in favor of the more generic and all-encompassing [`embed` field type](https://docs.boltcms.io/5.0/fields/embed).

```yaml
# Bolt 3.x syntax
videofield:
    type: video

# Bolt 4.x syntax
videofield:
    type: embed
```

The `embed` type should be a drop-in replacement.

## Conimex Extension and data import
To get the exported data migrated you will need to install the [Conimex Extension](https://extensions.boltcms.io/package/bobdenotter-conimex "Conimex Extension: extensions.boltcms.io").

### Conimex Extension installation
Install the extension by running:

```shell script
    composer require bobdenOtter/conimex
```

### Configuring the database
Database configuration is done completely differently from Bolt 3. You no longer need to add
it in the `config.yml` or `config_file.yml` files were this configuration used to live.

In Bolt 5 the Database configuration is done in the `.env` and preferably in a `.env.local`
file. These files should never be shared or pushed to GitHub or similar, since they might hold
sensitive data.

In the root directory of the Bolt 5 installation create a new `.env.local` file. If you are on
Linux run `touch .env.local`

In this guide we will show an example of how to setup a MySQL database in the `.env.local`
configuration file. If you are using a different database you can read [Configuration / Database Configuration](https://docs.bolt.cm/4.0/configuration/database "Bolt Documentation")
or the `.env` config file to see how to configure SQLite or PostgresSQL databases.

See below the meaning of each configuration option:
```text
###> doctrine/doctrine-bundle ###
# Potential replacements:
# db_user - database username
# db_password - database password. If it contains special characters, you can quote it: "p@ss'w0rd"
# localhost - database host. Often 127.0.0.1 or localhost. Can also be a remote host
# 3306 / 5432 - port number for resp. MySQL and Postgres.
# data_name - Database name.
# serverVersion - The version of the Database

# MYSQL / MariaDB
DATABASE_URL=mysql://db_user:"db_password"@localhost:3306/db_name?serverVersion=5.7
###< doctrine/doctrine-bundle ###
```
After replacing the options with your Database credentials the configuration will look something like:

```text
DATABASE_URL=mysql://nestor:"fXcwundfQWS@"@localhost:3306/news2021?serverVersion=5.7
```

You can check if the database is configured properly by running the command:

    bin/console bolt:info

### Conimex import data
After the extension has been installed make sure you are at the root directory of your Bolt site.

Before you run the import make sure you move/copy the exported data file at the root directory of your Bolt
site before running the import command.

To migrate the data run the following command to execute the import process:

```shell script
    bin/console conimex:import my_site_data_export.yaml
```

Where `my_site_data_export.yaml` is the export `.yaml` file with the data to be migrated. This file
was created on the [Export data](#export-data) section of this document.

Depending on the amount of data to be migrated, this process may take a long time to be finished.

You will be notified in the command line when the migration is finished.

## Templates update

Your last step will be to migrate your templates. It could be the case that you are
using old Bolt 3 syntax and this needs to be changed. Some tips on where to put the
focus on are:

#### Linking
In Bolt 3 the Twig syntax to create a link was using something like:
```twig
<a href="{{ record.link }}">Read more</a>
```
In Bolt 5 the syntax is pretty similar but the pipe character (|) is used instead:
```twig
<a href="{{ record|link }}">Read more</a>
```

#### Accessing config values
Probably in some of your templates you might have accessed some values from your config files. 
In Bolt 3 this was done like: 
```twig
{{ app.config.get('general/sitename') }}
```
In Bolt 5 this is done like:
```twig
{{ config.get('general/sitename') }}
```

#### Twig spaceless tag
Change the Twig syntax of the `spaceless` tag.
In Bolt 3 the syntax was:
```twig
{% spaceless %} - {% end spaceless%} 
``` 
In Bolt 5 the syntax is:
```twig
{% apply spaceless %} - {% endapply %} 
``` 

#### Twig image function

In Bolt 3, you could render an image using the `image` function in your theme's twig templates:

```twig
<img src="{{ image(record.image, 600, 500) }}" alt="{{ record.imagealt }}" />
```

In Bolt 4.x and up, the new syntax is:

```
{{ showimage(record.image, 600, 500) }}
```

Note there's no need to write the `<img>` tag or define a separate `imagealt` field, since the `image` field type includes an alt text field, and the `showimage` twig function outputs the `<img>` tag for you.
