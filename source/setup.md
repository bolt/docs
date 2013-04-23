Installing Bolt
===============

This page explains the various ways of installing Bolt. You can either use the command-line or your FTP-client to
install it. The system requirements for Bolt are modest, and it should run on any fairly modern webserver:

  - PHP 5.3.2 or higher
  - Access to SQLite (which comes bundled with PHP 5.3), _or_ MySQL _or_
    PostgreSQL.
  - Apache with Mod_rewrite (.htaccess files) or Nginx (virtual host configuration covered below)

<p class="note"><strong>Note:</strong> Currently we only support Apache and Nginx.
  Support for Lighttpd will come in the near future, if there's
  demand.</p>

There are three ways to install Bolt:

  - The easiest way, [from the command-line](#option-1-the-easy-way-using-the-command-line).
  - The traditional way, [using (S)FTP](#option-2-the-traditional-way-using-sftp).
  - The nerdy way, [for developers](#option-3-the-developer-way-using-git-and-composer).

Use one of the three methods described below to get the Bolt source files, and set them up on your webserver. After
you've done this, skip to the section for [Setting up Bolt](#setting-up-bolt).

### Option 1: The easy way, using the command-line.

If you have command-line access, you can easily install Bolt by executing a few commands. First, create the folder where you want to install Bolt, if it doesn't already exist. Enter the folder, and execute the following commands:

<pre class="brush: plain">
curl -O http://bolt.cm/distribution/bolt_latest.tgz
tar -xzf bolt_latest.tgz
chmod -R 777 files/ app/database/ app/cache/ app/config/ theme/
</pre>

<p class="tip"><strong>Tip:</strong> For easier copy/pasting of the samples, doubleclick the code.</p>

Bolt needs to be able to read and write certain folders like the cache and the template folders. On most servers the webserver runs in a different group than your useraccount, so to give
Bolt write access to these files you have to use the chmod statement.

It depends on the exact server configuration if you will need to use `777` or if another setting is better. If you wish
to know for sure, ask your hosting provider.

That's all! After you've done this, skip to the section [Setting up Bolt](#setting-up-bolt). Alternatively, if this
didn't work because your server doesn't have `curl`, use `wget` instead.

### Option 2: The traditional way, using (S)FTP.

Download the latest version of Bolt from this location:

[http://bolt.cm/distribution/bolt_latest.zip](http://bolt.cm/distribution/bolt_latest.zip)

Extract the .zip file, and upload to your webhost using the (S)FTP client of your choice. After you've done this, be
sure to chmod the following folders (_with_ containing files) to `777`, so they are readable and writable by Bolt:

- `app/cache/`
- `app/config/`
- `app/database/`
- `files/`
- `theme/`

Most FTP clients will allow you to do this quickly, using a 'include files' or 'apply to enclosed' option. It depends on
the exact server configuration if you will need to use `777` or if another setting is better. If you wish to know for
sure, ask your hosting provider.

<a href="/files/ftp-chmod.png" class="fancybox"><img src="/files/ftp-chmod.png" width="590"></a><br>

<p class="note"><strong>Note:</strong> Don't forget to upload the .htaccess file!
  Bolt won't work without it. If you can't find the file on your filesystem, download this <a href="http://bolt.cm/distribution/default.htaccess"><code>default.htaccess</code></a> file. Upload it to your server, and then rename it to <code>.htaccess.</code></p>

After you've done this, skip to the section [Setting up Bolt](#setting-up-bolt).

### Option 3: The developer way, using git and composer.


If you want to install Bolt using Git and Composer, execute the following commands:

<pre class="brush: plain">
git clone git://github.com/bolt/bolt.git bolt
cd bolt
curl -s http://getcomposer.org/installer | php
php composer.phar install
</pre>

This will get the Bolt files, the Silex framework, and all required components. Most likely all files and folders will
have the correct filerights, but if they don't, (re)set them using the following command in the `bolt/` folder:

<pre class="brush: plain">
chmod -R 777 files/ app/database/ app/cache/ app/config/ theme/
</pre>

It depends on the exact server configuration if you will need to use `777` or if another setting is better. If you wish
to know for sure, ask your hosting provider.

You can easily update your install, by executing the following commands. Whoohoo, living on the edge!!

<pre class="brush: plain">
git pull
cd bolt
php composer.phar self-update
php composer.phar update
</pre>



Setting up Bolt
---------------

By default, Bolt is configured to use an SQLite database. If you want to change this to MySQL or PostgreSQL, see the
section [below](#configuring-the-database). If not, just leave it as it is.

Open your Bolt site in your browser, and you should be greeted by the screen to set up the first user. If not, see
below. If you do see the 'Create the first user'-screen, do accordingly, and log in to the Bolt Backend. You should now
see the (empty) Dashboard screen, and you are able to add some dummy pages using the built-in Loripsum tool. After
you've done this, you should see some dummy content, and you're good to go!

If you're getting unspecified "Internal Server Errors", the most likely cause is a missing or malfunctioning `.htaccess`
file. See [here](#tweaking-the-htaccess-file) for tips.
If you still encounter errors, check your vhost configuration and be sure that the AllowOverride option is enabled.

Configuring the Database
------------------------

The (file-based) SQLite database gets stored in the `app/` folder. Since it's a regular file, it's easy to make backups
of your database if you use SQLite.

If you wish to edit the database configuration, you have to change the settings in `app/config/config.yml`. Apart from
SQLite, you can use MySQL and Postgres as database backends. Set the database, username and password:

<pre class="brush: plain">
  database:
    driver: mysql
    username: bolt
    password: password
    databasename: bolt
</pre>

or:

<pre class="brush: plain">
  database:
    driver: postgres
    username: bolt
    password: password
    databasename: bolt
</pre>

Support for Postgres is experimental, so use with caution.

<p class="note"><strong>Note:</strong> The config file is in the YAML format, which means that the indentation is
  important. Make sure you leave leading spaces intact.</p>

If the hostname or port are something else than 'localhost:3306', you can add them like this:

<pre class="brush: plain">
	database:
	  username: bolt
	  password: bolt%1
	  databasename: bolt
	  host: database.example.org
	  port: 3306
</pre>

The other settings in the `config.yml` file can be changed later on, directly from the Bolt backend.

Open your Bolt site in your browser, and you should be greeted by the screen to set up the first user. Do so, and log in
to the Bolt Backend. You should now see the (empty) Dashboard screen, and you'll be able to add some dummy pages, using
the built-in Loripsum tool. After you've done this, you should see some dummy
content, and you're good to go!

Different configs per environment
---------------------------

When you have multiple environments for the same site, like development/staging/production, you'll want parts of the
config to be the same, and some different per environment. You'll probably have different database info and debug settings.
This can be accomplished by splitting the `config.yml` file. Put all settings you shared over all environments in the
default `config.yml`, you can commit this in your version control system if wanted. Every setting which is different per
environment, or which you do not want in version control (like database info), you put in `config_local.yml` and this file
differs per environment and is NOT added to version control. First `config.yml` is loaded and then `config_local.yml`, both
files are merged so `config_local.yml` can override any setting in `config.yml`. You might disable debug in `config.yml`
and only in development enable debug in `config_local.yml`.

Apache: Tweaking the .htaccess file
---------------------------

Bolt requires the use of a .htaccess file to make sure requests like `page/about-this-website` get routed to the
index.php, so it can be handled by Bolt. By default, the file looks like this:

<pre class="brush: plain">
# Set the default handler.
DirectoryIndex index.php index.html index.htm

&lt;FilesMatch "\.(yml)$">
    Order deny,allow
    Deny from all
&lt;/FilesMatch>

&lt;IfModule mod_rewrite.c>
  RewriteEngine on

  # Some servers require the RewriteBase to be set. If so, set to the correct
  folder.
  # RewriteBase /
  RewriteRule ^thumbs/(.*)?$ ./app/classes/timthumb.php [L]

  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteCond %{REQUEST_URI} !=/favicon.ico
  RewriteRule ^ ./index.php [L]

&lt;/IfModule>

</pre>

In some cases it won't work without the `RewriteBase` line, and in some cases it won't work _with_ it, depending on how
your Apache is configured and the location on your site on the server. Isn't Apache configuration great?

Anyhow, if your site doesn't work, try uncommenting the `RewriteBase` line and set it to the correct folder. For
instance, if your Bolt site is located at `example.org/test/`, set it to `RewriteBase /test/`.

Alternatively, if your server is running Apache 2.2.16 or higher, you might be able to replace the entire `mod_rewrite`
block from lines 17-20 with this single line:

<pre class="brush: plain">
FallbackResource /index.php
</pre>

If you have misplaced your `.htaccess` file, you can get a <a href="http://bolt.cm/distribution/default.htaccess">new one here</a>, from our <a href="http://bolt.cm/distribution/">files distribution page</a>. Be sure to rename it to `.htaccess`, though. 

Nginx: Configuring the virtual host
----------------------------

Nginx is a high-performance web server that is capable of serving thousands of request while using fewer resources than other servers like Apache. However, it does not support .htaccess configuration, which many applications, such as Bolt, require to work properly. Instead, we can configure the virtual server block to handle the rewrites and such that Bolt requires.

Modify the virtual server block below to fit your needs:

<pre class="brush: plain">
# Bolt virtual server
server {
    server_name mycoolsite.com www.mycoolsite.com;
    root /home/mycoolsite.com/public_html;
    index index.php;

    location / {
        try_files $uri $uri/ /index.php$query_string;
    }

    location ~* /thumbs/(.*)$ {
        try_files $uri $uri/ /app/classes/timthumb.php$query_string;
    }

    location ~* \.(?:ico|css|js|gif|jpe?g|png|ttf|woff)$ {
        access_log off;
        expires 30d;
        add_header Pragma public;
        add_header Cache-Control "public, mustrevalidate, proxy-revalidate";
    }

    location = /robots.txt { access_log off; log_not_found off; }
    location = /favicon.ico { access_log off; log_not_found off; }

    location ~ \.php$ {
        fastcgi_pass 127.0.0.1:9000;
        fastcgi_index index.php;
        include fastcgi_params;
        fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
        fastcgi_param HTTPS off;
    }

    location ~ /\.ht {
        deny all;
    }

    location /app {
        deny all;
    }

    location ~ /vendor {
        deny all;
    }

    location ~ \.db$ {
        deny all;
    }
}
</pre>
