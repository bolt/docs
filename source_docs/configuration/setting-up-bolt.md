Setting up Bolt
===============

By default, Bolt is configured to use an SQLite database. You can
[configure the database](#configuring-database), if you want to change this to
MySQL or PostgreSQL.

Open your Bolt site in your browser, and you should be greeted by the screen to
set up the first user. If not, see below. If you do see the 'Create the first
user'-screen, do accordingly, and log in to the Bolt backend. You should now
see the (empty) Dashboard screen.

<p class="note"><strong>Note:</strong> When you first open a Bolt page in your browser, you will be redirected to a page like <tt>/bolt/userfirst</tt> where you can set up the first user. If you get a 'File not found'-error, this means your webserver isn't configured to handle rewrites correctly. If you're using Apache, see our page on <a href="/howto/making-sure-htaccess-works">Making sure .htaccess and mod_rewrite are working as they should</a>.</p>

If you want to get a quick way to see how your site looks with some content you
can add some generated pages using the built-in <a href="http://loripsum.net">
Loripsum</a> tool. This is a simple method to test-drive your theme quickly.

If you're getting unspecified "Internal Server Errors", the most likely cause
is a missing or malfunctioning `.htaccess` file. See the section [Tweaking the
.htaccess file](#apache-tweaking-htaccess-file) for tips. If you still
encounter errors, check your vhost configuration and be sure that the
AllowOverride option is enabled.

<p class="tip"><strong>Tip:</strong> The Bolt backend is located at
<code>/bolt</code>, relative from the 'home' location of your website.</p>

After the installation: where the important files are located
-------------------------------------------------------------
When the basic installation is finished, these are the files where you edit the Bolt configuration to build your website according to your specifications. All files use the same .yml syntax, and can also be edited via the Bolt backend.

  - `app/config/config.yml`  The file where all general configuration of your website is defined.
  - `app/config/contenttypes.yml` The definitions of your contenttypes, e.g. pages, blog items etc.
  - `app/config/menu.yml` The file that contains the menu(s) for your website.
  - `app/config/taxonomy.yml` Categories, chapters, tags etc. are defined here.
  - `app/config/routing.yml` The file where you can define custom urls for you website.
  - `app/config/permissions.yml` Here you can specify groups, users, etc. For most websites, the default permissions settings will be just fine.
  - `app/config/extensions/` If you install extensions, their config files will be located in this directory.

  - `theme/` Make a new directory here where you can put your own templates.


Configuring the Database
------------------------

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

```apache
database:
  driver: mysql
  username: bolt
  password: password
  databasename: bolt
```

or:

```apache
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

```apache
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

Different configs per environment
---------------------------

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


Dynamic values for config settings
----------------------------------

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



Apache: Tweaking the .htaccess file
---------------------------

Bolt requires the use of a `.htaccess` file to make sure requests like `page
/about-this- website` get routed to `index.php`, so it can be handled by Bolt.
By default, the file looks like this:

```apache
# Set the default handler.
DirectoryIndex index.php index.html index.htm

# Prevent directory listing
Options -Indexes

<FilesMatch "\.(yml|db|twig|md)$">
    <IfModule mod_authz_core.c>
        Require all denied
    </IfModule>
    <IfModule !mod_authz_core.c>
        Order deny,allow
        Deny from all
    </IfModule>
</FilesMatch>

<IfModule mod_rewrite.c>
  RewriteEngine on

  RewriteRule cache/ - [F]

  # Some servers require the RewriteBase to be set. If so, set to the correct directory.
  # RewriteBase /

  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteCond %{REQUEST_URI} !=/favicon.ico
  RewriteRule ^ ./index.php [L]
</IfModule>

```

In some cases it won't work without the `RewriteBase` line, and in some cases
it won't work _with_ it, depending on how your Apache is configured and the
location on your site on the server.

Anyway, if your site does not work, try uncommenting the `RewriteBase` line and
set it to the correct folder. For instance, if your Bolt site is located at
`example.org/test/`, set it to `RewriteBase /test/`.

Alternatively, if your server is running Apache 2.2.16 or higher, you might be
able to replace the entire `mod_rewrite` block from lines 22-35 with this
single line:

```apache
FallbackResource /index.php
```

If you have misplaced your `.htaccess` file, you can get a <a href="http://bolt.cm/distribution/default.htaccess">
new one here</a>, from our <a href="http://bolt.cm/distribution/">files distribution page</a>.
Be sure to rename it to `.htaccess`, though.

Nginx: Configuring the virtual host
-----------------------------------

Nginx is a high-performance web server that is capable of serving thousands of
request while using fewer resources than other servers like Apache. However, it
does not support `.htaccess` configuration, which many applications, such as
Bolt, require to work properly. Instead, we can configure the virtual server
block to handle the rewrites and such that Bolt requires.

Modify the virtual server block below to fit your needs:

```nginx
# Bolt virtual server
server {
    server_name mycoolsite.com www.mycoolsite.com;
    root /home/mycoolsite.com/public_html;
    index index.php;

    # The main Bolt website
    location / {
        try_files $uri $uri/ /index.php?$query_string;
    }

    # Generated thumbnail images
    location ~* /thumbs/(.*)$ {
        try_files $uri $uri/ /index.php?$query_string;
    }

    # Bolt backend access
    #
    # NOTE: If you set a custom branding path, you will need to change '/bolt/'
    #       here to match
    location ~* /bolt/(.*)$ {
        try_files $uri $uri/ /index.php?$query_string;
    }

    # Backend async routes
    location ~* /async/(.*)$ {
        try_files $uri $uri/ /index.php?$query_string;
    }

    # Enforce caching for certain file extension types
    location ~* \.(?:ico|css|js|gif|jpe?g|png|ttf|woff|woff2)$ {
        access_log off;
        expires 30d;
        add_header Pragma public;
        add_header Cache-Control "public, mustrevalidate, proxy-revalidate";
    }

    # Don't create logs for favicon.ico or robots.txt requests
    location = /(?:favicon.ico|robots.txt) {
        access_log off;
        log_not_found off;
    }

    # Block PHP files from being run in upload (files), app, theme and extension directories
    location ~* /(?:app|extensions|files|theme)/(.*)\.php$ {
        deny all;
    }

    # Block hidden files
    location ~ /\. {
        deny all;
    }

    # Block access to Sqlite database files
    location ~ /\.(?:db)$ {
        deny all;
    }

    # Block access to the app, cache & vendor directories
    location ~ /(?:app|src|tests|vendor) {
        deny all;
    }

    # Block access to certain JSON files
    location ~ /(?:bower|composer|jsdoc|package)\.json$ {
        deny all;
    }

    # Block access to Markdown, Twig & YAML files directly
    location ~* /(.*)\.(?:dist|markdown|md|twig|yaml|yml)$ {
        deny all;
    }

    location ~ \.php$ {
        fastcgi_pass 127.0.0.1:9000;
        fastcgi_index index.php;
        include fastcgi_params;
        fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
        fastcgi_param HTTPS off;
    }
}
```

**Note:** 502 Bad Gateway Errors

If you're using UNIX sockets instead of TCP ports on your PHP-FPM installation,
you will need to change the `fastcgi_pass` parameters to match what is set in
your PHP-FPM configuration's `listen = `, e.g.:

```
fastcgi_pass unix:/path/to/php-fpm/socket.sock;
```
