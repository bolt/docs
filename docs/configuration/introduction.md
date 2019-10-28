---
title: Setting up Bolt
---


**1** After installation, run `bin/console bolt:setup`

This will set up the database and the first user.

**2** Login to the Bolt backend on `yourdomain.ext/bolt`

You should now see Bolt's Dashboard screen.

<p class="tips"><strong>Tip:</strong> The Bolt backend is located at
<code>/bolt</code>, relative from the 'home' location of your website.</p>

If you get an error, see below for a number of possible causes and solutions.

### Internal Server Errors
If you're getting unspecified "Internal Server Errors", the most likely cause
is a missing or malfunctioning `.htaccess` file. See the section [Tweaking the
.htaccess file](../installation/webserver/apache) for tips.

If you still
encounter errors, check your vhost configuration and be sure that the
`AllowOverride` option is enabled.

### Permissions errors

If you get an error when opening your new install in a browser window, your server might need to have the permissions set manually.
See our [File System Permissions](permissions) page on how to fix this.

( Bolt needs to write data to a number of folders like `cache/` and
`files/`, where uploaded images and other files will be saved. )

## Database

By default, Bolt is configured to use an SQLite database. See
[configure the database](database), if you want to change this to MySQL
or PostgreSQL.

<p class="tips"><strong>Tip</strong> When you first open any Bolt page in your
browser, you will be redirected to a page like <tt>/bolt/userfirst</tt> to set up the first user.
<br>
<br>If you get a 'File not found'-error, you'll most likely have a <em>rewrites</em> error. See <a href="../howto/making-sure-htaccess-works">this page on .htaccess and mod_rewrite on apache </a> for help.</p>

### Fill with test content
You can generate some test content using the built-in [Loripsum](http://loripsum.net)
tool. This is a simple method to test-drive your theme quickly.

The geolocation fields requires you to set an api key, for more info see the comment in the main config and [this guide](https://developers.google.com/maps/documentation/javascript/get-api-key#get-an-api-key)
for how to get a key.






Configuration Files
-------------------

### Where the important files are located

When the basic installation is finished, these are the files where you edit the
Bolt configuration to build your website according to your specifications.
All files use the same YAML syntax, and can also be edited via the Bolt backend.

| YAML file                     | Description |
| ----------------------------- | ----------- |
| `config/bolt/config.yml`       | General configuration of your website.
| `config/bolt/contenttypes.yml` | The definitions of your contenttypes (pages, blog items etc.)
| `config/bolt/menu.yml`         | Configuration of the menu(s) for your website.
| `config/bolt/taxonomy.yml`     | Categories, chapters, tags etc. are defined here.
| `config/bolt/routing.yml`      | Configure custom urls for your website.
| `config/bolt/permissions.yml`  | Specify usergroups, users and their permissions here. For most websites, the default settings will be just fine.

There are two other locations where configuration files can be found:

| Folder                   | Description |
| ------------------------ | ----------- |
| `config/bolt/extensions/` | Config files of your installed extensions
| `public/theme/`          | In the folder for the active theme, there can optionally be a `theme.yml`.

To use the values in these files in your templates or PHP code, you'll need
to access them. See [Accessing & Reading Configuration][config-accessing] for more info.

### Different configurations per environment

Create a `config_local.yml` in the `config/bolt/` folder for settings that are only used on specific environments.

**Shared settings:** Put all settings you share over all environments in the default
`config.yml`, you can commit this in your version control system if wanted.

**Specific settings:**
Every setting which is different per environment, or which you do not want in
version control (like database and debug info), you put in `config_local.yml`. First
`config.yml` is loaded and then `config_local.yml`, so  that `config_local.yml`
can override any setting in `config.yml`.


<p class="tips">
Bolt will always load `config_local.yml` if it's available, so committing it to
version control isn't recommended, and be sure not to deploy it to a server it
is not needed on.</p>

<p class="tip"><strong>Tip:</strong> Disable <code>debug</code> in
<code>config.yml</code> and only enable <code>debug</code> in <code>config_local.yml</code>
on development servers.</p>

### Dynamic values for config settings

You can also set the value of a config setting dynamically at the
application runtime, rather than have it hardcoded in a config file.

Surround the value with `%` characters and the value will then be looked
up from the main Application container.

####Simple example

The Bolt version is set as a value on the app container.
You would normally access it with `$app['bolt_version']`.
To use it as a dynamic config variable add the following to `config.yml`:

```
mycustomversion: %bolt_version%
```

After compilation the value of `{{ config.get('mycustomversion') }}` will match
the value set on the main application container.

**Note:** at this point only string values are supported.

Configuration settings are namespaced. `{{ config.get('mycustomversion') }}`
may not be necessarily available in your Twig templates directly. In this particular example, use `{{ config.get('general/mycustomversion') }}`
to access the above variable in your template.

For more information
regarding this, see the [Bolt Internals](../internals/container-service-references#app-config)
documentation.

### Environment variables in config files

You can use environment variables in your configuration files, such as
`config.yml`.

Find detailed info on this in the section "Reading environment
variables" on the page [Accessing & Reading Configuration][config-env].

### Bug: Chrome and backend authentication

If you are using Chrome and using a IP based path, e.g. `192.168.60.10/public/bolt`,
unfortunately you will not be able to log in.

This is an issue with Chrome, as it is very strict with cookie domain paths and
destroys the cookie upon creation by Bolt. For further information, please see
GitHub issue [5746](https://github.com/bolt/bolt/issues/5746).

To work around the issue, use virtual hosts, e.g. `dev.somesite.com` to access
your Bolt installation.

Currently, Firefox and other browsers work correctly in this circumstance.

[config-accessing]: reading#accessing-configuration-in-php
[config-env]: reading#reading-environment-variables
