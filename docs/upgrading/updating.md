---
title: Updating Bolt
---
Updating Bolt
=============

<p class="note"><strong>Note:</strong> This page is for updating an existing
Bolt 5 installation. If you are updating form Bolt 4, see 
<a href='https://github.com/bolt/core/discussions/2318'>How to update from Bolt 
4.x to 5.0</a>.  
If you are updating from Bolt 3 or 2, see <a
href='upgrading-from-30'> Upgrading a site from version 2 / 3 to
%%VERSION%%</a> instead.</p>

As with all web-based applications, it's good practice to keep your site up to
date with the latest version. Bolt is built in such a way, that none of the
files that are used for the configuration are included in the distribution
files. In practice, this means that upgrading Bolt works almost the same way
as installing a new copy of bolt.

If you run into issues after installing, you may have to
[repeat setting the permissions][perms] on some directories.

Updating on the command line
----------------------------

If you're using the command line, updating a Bolt 5 installation is _really_
easy.

  - Check if you have a `composer.json` file.
  - Make sure you have Composer. If not, get it [here][composer]
  - Run `composer update` or `php composer.phar update`.
  - After updating, the cache will be cleared, and additional chores are done
    automatically.

To summarize:

```bash
composer update
```

Updating over (S)FTP
--------------------

If possible, avoid doing this. [todo: Write docs for this]

<!--
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
php bin/console cache:clear
```

Check and update the database, with these commands:

```
php bin/console database:check
php bin/console database:update
```
-->

[latest]: https://bolt.cm/distribution/bolt-latest.zip
[perms]: /installation/permissions#setting-permissions-quick-amp-easy
[composer]: https://getcomposer.org/download/
