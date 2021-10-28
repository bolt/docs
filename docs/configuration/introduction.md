---
title: Setting up Bolt
---

After installation you can run the `bin/console bolt:setup` command, that will
set up the database and the first user. You can then log in to the Bolt
backend. You should now see Bolt's Dashboard screen.

<p class="tip"><strong>Tip:</strong> By default, the Bolt backend is located
at <code>/bolt</code>, relative from the 'home' location of your website.</p>

If you get an error, see below for a number of possible causes and solutions.

### Internal Server Errors

If you're getting unspecified "Internal Server Errors", the most likely cause
is a missing or malfunctioning `.htaccess` file. See the section [Tweaking the
.htaccess file](../installation/webserver/apache) for tips.

If you still encounter errors, check your vhost configuration and be sure that
the `AllowOverride` option is enabled.

### Permissions errors

Bolt needs to write data to a number of folders like `var/` and
`files/`, where uploaded images and other files will be saved.

If you get an error when opening your new install in a browser window, your
server might need to have the permissions set manually. See our
[File System Permissions](permissions) page on how to fix this.

## Database

By default, Bolt is configured to use an SQLite database. See
[configure the database](database), if you want to change this to MySQL
or MariaDB.

<p class="tip"><strong>Tip</strong> When you first open any Bolt page in your
browser, you will be redirected to a page like <tt>/bolt/login</tt>. <br>If you
get a 'File not found'-error, you'll most likely have a <em>rewrites</em>
error. See <a href="../howto/making-sure-htaccess-works">this page on .htaccess
and mod_rewrite on apache </a> for help.</p>

<p class="note"><strong>Note</strong> If you're using SQLite, ensure the
database file is writable for the webserver's user. Read more about it on the
<a href="../installation/permissions"> File system permissions</a> page.</p>

## Fill with test content

You can generate some test content using the built-in Fixtures (also known as
"Dummy content") tool. This is a simple method to test-drive your theme
quickly. You can add these fixtures with this command:

```bash
bin/console doctrine:fixtures:load
```

<!--
The geolocation fields requires you to set an api key, for more info see the
comment in the main config and [this
guide](https://developers.google.com/maps/documentation/javascript/get-api-key#get-an-api-key)
for how to get a key.
-->

Configuration Files
-------------------

### Where the important files are located

When the basic installation is finished, these are the files where you edit the
Bolt configuration to build your website according to your specifications. All
files use the same YAML syntax, and can also be edited via the Bolt backend.

| YAML file                       | Description |
| ------------------------------- | ----------- |
| `config/bolt/config.yaml`       | General configuration of your website.
| `config/bolt/contenttypes.yaml` | The definitions of your contenttypes (pages, blog items etc.)
| `config/bolt/menu.yaml`         | Configuration of the menu(s) for your website.
| `config/bolt/taxonomy.yaml`     | Categories, chapters, tags etc. are defined here.
| `config/routes.yaml`      | Configure custom urls for your website.

<!--| `config/bolt/permissions.yaml`  | Specify usergroups, users and their permissions here. For most websites, the default settings will be just fine. -->

There are a few other locations where configuration files can be found:

| Folder                | Description |
| --------------------- | ----------- |
| `.env`                | Configration settings for the environment (including the DEV / PROD switch, and database settings)
| `config/extensions/`  | Config files of your installed extensions
| `config/`             | All configuration files for the underlying Symfony application
| `public/theme/`       | In the folder for the active theme, there can optionally be a `theme.yaml`.

To use the values in these files in your templates or PHP code, you'll need to
access them. See [Accessing & Reading Configuration][config-accessing] for more
info.

### Different configurations per environment

Create a `config_local.yaml` in the `config/bolt/` folder for settings that are
only used on specific environments.

**Shared settings:** Put all settings you share over all environments in the
default `config.yaml`, you can commit this in your version control system if
wanted.

**Specific settings:** Every setting which is different per environment, or
which you do not want in version control (like database and debug info), you
put in `config_local.yaml`. First `config.yaml` is loaded and then
`config_local.yaml`, so that `config_local.yaml` can override any setting in
`config.yaml`.

<p class="tip">
Bolt will load <code>config_local.yaml</code> if it's available, and silently
disregard it otherwise. Committing it to version control isn't recommended, and
be sure not to deploy it to a server it is not needed on.</p>

<p class="tip"><strong>Tip:</strong> Set <code>APP_ENV=prod</code> and
<code>APP_DEBUG=0</code> in <code>.env</code> on production servers! </p>

### Dynamic values for config settings

You can also set the value of a config setting dynamically at the
application runtime, rather than have it hardcoded in a config file.

This way you define settings either in the `.env` file and their ilk, or in a
server's **environment** settings. This is used for the database settings, as
well as for toggling the 'environments'.

You can also use Symfony's methods to use different configurations per
environment. See the Symfony docs on [Managing Multiple .env Files][sf-env].

#### Example

If you've added a setting to your environment, you can make it avaliable for
use in Bolt (both for extensions, as well as in templates), by adding it to
`config.yaml`. It might sound like a bit of extra work, but this way you have
the benefit of using an ENV variable, but ease of use of a normal configuration
setting. For example:

```env
FOO=bar
```

To use it as a dynamic config variable add the following to `config.yaml`:

```yaml
foo: '%env(FOO)%'
```

This setting will now be available for use in your code using
`$config->get('general/foo')`, and you can access it in your Twig templates as
`{{ config.get('general/foo') }}`.

For more information regarding this, see the [Bolt Internals][internals]
documentation.

[config-accessing]: reading#accessing-configuration-in-php
[config-env]: reading#reading-environment-variables
[sf-env]: https://symfony.com/doc/current/configuration.html#configuration-environments
[internals]: ../internals/container-service-references#app-config)
