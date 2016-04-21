---
title: Clone the git repository
---
Cloning directly from Git
=========================

If you want to install Bolt using Git and Composer, you need to decide if you
want to use a stable branch, or the bleeding-edge master branch.

Getting Composer
----------------

First thing you will need, if you don't have it already, is a recent version of Composer.

To get this, see the [Composer Download](https://getcomposer.org/download/) page for instructions.

Stable Branch
-------------

For a execute the following commands:

```bash
git clone git://github.com/bolt/bolt.git bolt
cd bolt
php composer.phar install
```

**Note:** Bolt uses the current stable release branch as its default when
cloning the repository.

Master (unstable) Branch
------------------------

```bash
git clone git://github.com/bolt/bolt.git bolt
cd bolt
git checkout master
php composer.phar install
```

Next Steps
----------

### Web server configuration

After extracting the tar file, you'll end up with a structure, similar to this:

```
.
├── app/
├── extensions/
├── public/
├── vendor/
├── README.md
├── composer.json
└── composer.lock
```

These are the folders that contain all of the Bolt code, resources and other
files. Most of them are placed outside of the so-called webroot. Only the
folder `public/` needs to be accessible in the browser.

To do this, configure your webserver to use the `public/` folder as the
webroot. For more information about this, see the pages on configuring
[Apache][apache] or [Nginx][nginx].

If you bump into trouble setting this up, or you have no access to
unchangeable in your web server's configuration, read the page
[Troubleshooting 'outside of the webroot'][webroot].


### Permissions

Generally most server should be fine with the default permissions. However, if
you require guidance on setting up permissions, see our [File System
Permissions](permissions) page.

### Finishing Set-up

After you've done this, skip to the section [Setting up Bolt](../configuration/introduction).

[apache]: ../configuration/web-server-apache
[nginx]: ../configuration/web-server-nginx
