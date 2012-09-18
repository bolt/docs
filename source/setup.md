Installing Pilex
================

For now, the easiest way to install Pilex, is using composer, on the command line:

<pre class="brush: plain">
	git clone git://github.com/bobdenotter/pilex.git pilex
	cd pilex 
	curl -s http://getcomposer.org/installer | php
	php composer.phar install
</pre>

This will get the Pilex files, the Silex framework, and all required components. 

By default, Pilex is configured to use an SQLite database. If you want to change this, see the section below. If not, just leave it as it is. 

Open your Pilex site in your browser, and you should be greeted by the screen to set up the first user. Do so, and log in to the Pilex Backend. You should now be instructed to go to 'database repair', and you'll be able to add some dummy pages, using the built-in Loripsum tool. After you've done this, you should see some dummy content, and you're good to go! 

Configuring the database
------------------------

To edit the database configuration, you have to change the settings in 'app/config/config.yml'. Apart from SQLite, you can use MySQL and Postgres as database backends. Set the database, username and password:

<pre class="brush: plain">
  database:
    driver: mysql
    username: pilex
    password: password
    databasename: pilex
</pre> 

<pre class="brush: plain">
  database:
    driver: postgres
    username: pilex
    password: password
    databasename: pilex
</pre> 

Support for Postgres is experimental, so use with caution.

The (file-based) SQLite database gets stored in the `/app/` folder. Since it's a regular file, it's easy to make backups of your database if you use SQLite.

<p class="note"><strong>Note:</strong> The config file is in the YAML format, which means that the indentation is important. Make sure you leave leading spaces intact.</p>

If the hostname or port are something else than 'localhost:3306', you can add them like this:

<pre class="brush: plain">
	database:
	  username: pilex
	  password: pilex%1
	  databasename: pilex
	  host: database.example.org
	  port: 3307
</pre>

The other settings in the config.yml file can be changed later on, directly from the Pilex backend.

Open your Pilex site in your browser, and you should be greeted by the screen to set up the first user. Do so, and log in to the Pilex Backend. You should now be instructed to go to 'database repair', and you'll be able to add some dummy pages, using the built-in Loripsum tool. 

The other settings in the config.yml file can be changed later on, directly from the Pilex backend.

