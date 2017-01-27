---
title: Clone the git repository
level: advanced

---
Cloning directly from Git
=========================

If you want to install Bolt using Git and Composer, you need to decide if you
want to use a stable branch, or the bleeding-edge master branch.

Getting Composer
----------------

First thing you will need, if you don't have it already, is a recent version of
Composer. To get this, see the [Composer Download][composer] page for
instructions.

Stable Branch
-------------

For a checkout of the current 'default' branch, execute the following commands:

```bash
git clone git://github.com/bolt/bolt.git bolt
cd bolt
php composer.phar install
```

**Note:** Bolt uses the current stable release branch as its default when
cloning the repository.

Master (unstable) Branch
------------------------

For a checkout of the bleeding-edge 'master' branch, execute the following
commands:

```bash
git clone git://github.com/bolt/bolt.git bolt
cd bolt
git checkout master
php composer.phar install
```

Next Steps
----------

### Web server configuration

After extracting the tar file, you'll end up with a structure, containing the
bolt files. These are the folders that contain all of the Bolt code, resources
and other files. Unlike the other methods of installation, all of them are placed in the top level of the so-called web root. The created `bolt/` folder where you've made the git checkout needs to be accessible in the browser.

To do this, configure your webserver to use the `bolt/` folder as the
web root. For more information about this, see the pages on configuring
[Apache][apache] or [Nginx][nginx].

If you bump into trouble setting this up, or you have no access to
change your web server's configuration, read the page
[Troubleshooting 'outside of the webroot'][webroot].

### Permissions

Generally most servers should be fine with the default permissions. However, if
you require guidance on setting up permissions, see our [File System
Permissions](permissions) page.

### Finishing Set-up

After you've done this, skip to the section [Setting up Bolt](../configuration/introduction).

[apache]: ../installation/webserver/apache
[nginx]: ../installation/webserver/nginx
[composer]: https://getcomposer.org/download/
[webroot]: ../howto/troubleshooting-outside-webroot
