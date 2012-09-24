Installing Bolt
===============

This page explains the various ways of installing Bolt. You can either use the command-line, or your FTP-client to install it. The system requirements for Bolt are modest, and it should run on any fairly modern webserver: 

  - PHP 5.3.2 or higher
  - Access to SQLite (which comes bundled with PHP 5.3), _or_ MySQL _or_ PostgreSQL.
  - Apache with Mod_rewrite (.htaccess files) 

<p class="note"><strong>Note:</strong> Currently we only support Apache. Support for Lighttpd and/or Nginx will come in the near future, if there's demand.</p>

There are three ways to install Bolt: 

  - The easiest way, [from the command-line](#option-1-the-easy-way-using-the-command-line).
  - The traditional way, [using (S)FTP](#option-2-the-traditional-way-using-sftp).
  - The nerdy way, [for developers](#option-3-the-developer-way-using-git-and-composer).

Use one of the three methods described below to get the Bolt source files, and set them up on your webserver. After you've done this, skip to the section for [Setting up Bolt](#setting-up-bolt).

### Option 1: The easy way, using the command-line.

If you have command-line access, you can easily install Bolt by executing the following commands:

<pre class="brush: plain">
wget http://bolt.cm/distribution/bolt_latest.tgz 
tar -xzf bolt_latest.tgz
cd bolt
chmod -R 777 files/ app/database/ app/cache/ app/config/ theme/
</pre>

<p class="tip"><strong>Tip:</strong> For easier copy/pasting of the samples, doubleclick the code.</p>

That's all! After you've done this, skip to the section [Setting up Bolt](#setting-up-bolt). Alternatively, if this didn't work because your server doesn't have `wget`, use `curl -O` instead. 

### Option 2: The traditional way, using (S)FTP.

Download the latest version of Bolt from this location: 

[http://bolt.cm/distribution/bolt_latest.zip](http://bolt.cm/distribution/bolt_latest.zip)

Extract the .zip file, and upload to your webhost using the (S)FTP client of your choice. After you've done this, be sure to chmod the following folders (_with_ containing files) to 777, so they are readable and writable by Bolt:

- `app/cache/`
- `app/config/`
- `app/database/`
- `files/`
- `theme/`

Most FTP clients will allow you to do this quickly, using a 'include files' or 'apply to closed' option. 

<a href="/files/ftp-chmod.png" class="fancybox"><img src="/files/ftp-chmod.png" width="590"></a><br>

<p class="note"><strong>Note:</strong> Don't forget to upload the .htaccess file! Bolt won't work without it.</p>

After you've done this, skip to the section [Setting up Bolt](#setting-up-bolt).

### Option 3: The developer way, using git and composer.


If you want to install Bolt using git and composer, execute the following commands:

<pre class="brush: plain">
git clone git://github.com/bobdenotter/bolt.git bolt
cd bolt 
curl -s http://getcomposer.org/installer | php
php composer.phar install
</pre>

This will get the Bolt files, the Silex framework, and all required components. Most likely all files and folders will have the correct filerights, but if they don't, (re)set them using the following command in the `bolt/` folder: 

<pre class="brush: plain">
chmod -R 777 files/ app/database/ app/cache/ app/config/ theme/
</pre>


You can easily update your install, by execting the following commands. Whoohoo, living on the edge!!

<pre class="brush: plain">
git pull
cd bolt 
php composer.phar self-update
php composer.phar update
</pre>



Setting up Bolt
---------------

By default, Bolt is configured to use an SQLite database. If you want to change this to MySQL or PostgreSQL, see the section [below](#configuring-the-database). If not, just leave it as it is. 

Open your Bolt site in your browser, and you should be greeted by the screen to set up the first user. Do so, and log in to the Bolt Backend. You should now see the (empty) Dashboard screen, and you'll be able to add some dummy pages, using the built-in Loripsum tool. After you've done this, you should see some dummy content, and you're good to go! 


Configuring the Database
------------------------

The (file-based) SQLite database gets stored in the `app/` folder. Since it's a regular file, it's easy to make backups of your database if you use SQLite.

If you wish to edit the database configuration, you have to change the settings in `app/config/config.yml`. Apart from SQLite, you can use MySQL and Postgres as database backends. Set the database, username and password:

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

<p class="note"><strong>Note:</strong> The config file is in the YAML format, which means that the indentation is important. Make sure you leave leading spaces intact.</p>

If the hostname or port are something else than 'localhost:3306', you can add them like this:

<pre class="brush: plain">
	database:
	  username: bolt
	  password: bolt%1
	  databasename: bolt
	  host: database.example.org
	  port: 3307
</pre>

The other settings in the `config.yml` file can be changed later on, directly from the Bolt backend.

Open your Bolt site in your browser, and you should be greeted by the screen to set up the first user. Do so, and log in to the Bolt Backend. You should now see the (empty) Dashboard screen, and you'll be able to add some dummy pages, using the built-in Loripsum tool. After you've done this, you should see some dummy content, and you're good to go! 

