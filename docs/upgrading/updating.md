---
title: Updating / Upgrading Bolt
---
Updating / Upgrading Bolt
=========================

<p class="note"><strong>Note:</strong> This page is for updating an existing
Bolt 3 installation. If you are updating from Bolt 2.2, see <a href='moving-22-30'>
Upgrading a site from version 2.2 to %%VERSION%%</a> instead.</p>

As with all web-based applications, it's good practice to keep your site up to
date with the latest version. Bolt is built in such a way, that none of the
files that are used for the configuration are included in the distribution
files. In practice, this means that upgrading Bolt works almost the same way
as installing a new copy of bolt. 

If you run into issues after installing, you may have to 
[repeat setting the permissions](/installation/permissions#setting-permissions-quick-amp-easy)
on some directories.

Skip to the right section below:

Updating on the command line
----------------------------

If you're using the command line, updating a Bolt 3 installation is _really_ easy.

 - Check if you have a `composer.json` file. If you've installed from a distribution file, you might have to rename `composer.json.dist` to `composer.json`.
 - Make sure you have Composer. If not, get it [here](https://getcomposer.org/download/)
 - Run `php composer.phar update`.
 - After updating, you should clear the cache, and make sure the database is up
   to date.

Putting it all together:

```
php composer.phar update
php app/nut cache:clear
php app/nut database:update
```


Updating over (S)FTP
--------------------

Download the [latest version of Bolt][latest].

Extract the .zip file, and upload to your webhost using the (S)FTP client of
your choice.

<p class="note"><strong>Note:</strong> You want to <em>merge</em> folders and
not replace them. Most FTP clients will <em>merge</em> the folders you're
uploading, but some <em>replace</em> folders instead. Not sure what your client
does? Test this, before you accidentally wipe a folder and its contents.</p>

Updating a `git clone` install
------------------------------

If you've installed via Git, you can update by executing the following commands.

```
git pull
php composer.phar self-update
php composer.phar update
```

After updating, you should clear the cache, and make sure the database is up to
date.

```
php app/nut cache:clear
```

Check and update the database, with these commands:

```
php app/nut database:check
php app/nut database:update
```

[latest]: https://bolt.cm/distribution/bolt-latest.zip
