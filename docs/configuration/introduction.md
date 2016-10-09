---
title: Setting up Bolt
---
Setting up Bolt
===============

To get started with setting up the first Admin user in your new Bolt install,
open the Bolt site in your browser. You should be greeted by the screen to
create the first user. If you see this 'Create the first user' screen, do so
accordingly. After you've created the first 'Administrator' user, you will be
automatically logged in to the Bolt backend. You should now see the (empty)
Dashboard screen.

If this is not the case, but you see an error page instead, see below for a
number of possible causes and solutions.

By default, Bolt is configured to use an SQLite database. See
[configure the database](database), if you want to change this to either MySQL
or PostgreSQL.

<p class="note"><strong>Note:</strong> When you first open any Bolt page in your
browser, you will be redirected to a page like <tt>/bolt/userfirst</tt> where
you can set up the first user. If you get a 'File not found'-error, this means
your webserver isn't configured to handle rewrites correctly. If you're using
Apache, see our page on <a href="../howto/making-sure-htaccess-works">Making
sure .htaccess and mod_rewrite are working as they should</a>.</p>

### Permissions (reminder)

Bolt needs to be able to write data to a number of folders like `cache/` and
`files/`, where uploaded images and other files will be saved. If your server
needs to have the permissions set manually, you'll notice when opening your new
install in a browser window, because you will greeted by an error. If this
happens, see our [File System Permissions](permissions) page on how to fix this.

If you want to get a quick way to see how your site looks with some content you
can add some generated pages using the built-in [Loripsum](http://loripsum.net)
tool. This is a simple method to test-drive your theme quickly.

<p class="tip"><strong>Tip:</strong> The geolocation fields requires you
set an api key, for more info see the comment in the main config and
[this guide](https://developers.google.com/maps/documentation/javascript/get-api-key#get-an-api-key)
for how to get a key</p>

If you're getting unspecified "Internal Server Errors", the most likely cause
is a missing or malfunctioning `.htaccess` file. See the section [Tweaking the
.htaccess file](../installation/webserver/apache) for tips. If you still
encounter errors, check your vhost configuration and be sure that the
AllowOverride option is enabled.

<p class="tip"><strong>Tip:</strong> The Bolt backend is located at
<code>/bolt</code>, relative from the 'home' location of your website.</p>

Configuration Files
-------------------

### Where the important files are located

When the basic installation is finished, these are the files where you edit the
Bolt configuration to build your website according to your specifications.
All files use the same .yml syntax, and can also be edited via the Bolt backend.

  - `app/config/config.yml`  The file where all general configuration of your website is defined.
  - `app/config/contenttypes.yml` The definitions of your contenttypes, e.g. pages, blog items etc.
  - `app/config/menu.yml` The file that contains the menu(s) for your website.
  - `app/config/taxonomy.yml` Categories, chapters, tags etc. are defined here.
  - `app/config/routing.yml` The file where you can define custom urls for you website.
  - `app/config/permissions.yml` Here you can specify groups, users, etc. For most websites, the default permissions settings will be just fine.
  - `app/config/extensions/` If you install extensions, their config files will be located in this directory.
  - `public/theme/` Make a new directory here where you can put your own templates.

### Different configs per environment

When you have multiple environments for the same site, like development,
staging, or production, you'll want parts of the config to be the same, and
some different per environment. You'll probably have different database info
and debug settings. This can be accomplished by splitting the `config.yml`
file. Put all settings you share over all environments in the default
`config.yml`, you can commit this in your version control system if wanted.
Every setting which is different per environment, or which you do not want in
version control (like database info), you put in `config_local.yml`. First
`config.yml` is loaded and then `config_local.yml`, so  that `config_local.yml`
can override any setting in `config.yml`.

**Note:**
Bolt will always load `config_local.yml` if it's available, so committing it to
version control isn't recommended, and be sure not to deploy it to a server it
is not needed on.

<p class="tip"><strong>Tip:</strong> You might want to disable <code>debug</code> in
<code>config.yml</code> and only enable <code>debug</code> in <code>config_local.yml</code>
on development servers.</p>


### Dynamic values for config settings

Occasionally you may want to set the value of a config setting dynamically at the
application runtime, rather than have it hardcoded in a config file.

To take advantage of this feature you can surround the value with `%` characters
and the value will then be looked up from the main Application container.

As a simple example the Bolt version is set as a value on the app container,
you can access it normally with `$app['bolt_version']` if you wanted to use
this as a dynamic config variable you could do the following in `config.yml`

```
mycustomversion: %bolt_version%
```

after compilation the value of `{{ config.get('mycustomversion') }}` will match
the value set on the main application container.

Note that at this point only string values are supported.

Note that configuration settings are namespaced. `{{ config.get('mycustomversion') }}`
may not be necessarily available in your Twig templates directly. For more information
regarding this, please refer to the [Bolt Internals](../internals/container-service-references#app-config)
documentation. In this particular example, use `{{ config.get('general/mycustomversion') }}`
to access the above variable in your template.

### Regarding Chrome and backend authentication

If you are using Chrome and using a IP based path, e.g. `192.168.60.10/public/bolt`,
unfortunately you will not be able to log in.

This is an issue with Chrome, as it is very strict with cookie domain paths and
destroys the cookie upon creation by Bolt. For further information, please see
GitHub issue [5746](https://github.com/bolt/bolt/issues/5746).

To work around the issue, use virtual hosts, e.g. `dev.somesite.com` to access
your Bolt installation.

Currently, Firefox and other browsers work correctly in this circumstance.
