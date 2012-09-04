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

Next, edit the database configuration, in 'app/config/config.yml'. At this time, only MySQL is supported. Set the database, username and password:

<pre class="brush: plain">
	database:
	  username: pilex
	  password: pilex%1
	  databasename: pilex
</pre> 

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

