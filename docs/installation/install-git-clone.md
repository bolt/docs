---
title: Clone the Git repository
level: advanced

---
Cloning directly from Git
=========================

<p class="warning"><strong>Warning:</strong> This method should only be used
for doing work directly on the internal Bolt code base, and is not supported as
a general installation option.</p>

Installing Bolt directly from the Git repository requires both Git and Composer
to be installed and working correctly. See this [GitHub page][git] for details
on setting up Git, and the [Composer Download][composer] page for instructions
on obtaining and setting up an up-to-date copy of Composer.

Additionally, you need to decide if you want to use a stable branch (bug-fixing
a stable or beta release), a feature branch for contributing a feature to the
next Bolt minor release, or the bleeding-edge master branch which will become
the next major version of Bolt.

At a high-level, the process is as follows:

1. Clone the repository
1. Checkout the required branch
1. Install dependant packages via Composer

For example, the following would clone the Bolt repository automatically
checking out the default branch, and installing dependant packages:

```bash
git clone git://github.com/bolt/bolt.git
cd bolt
composer install
```

<p class="note"><strong>Note:</strong> Bolt uses the current stable release
branch as its default when cloning the repository.</p>

For more information on core development, see the [Bolt core development][core-dev]
section of this documentation.

Choosing a Branch
-----------------

Bolt uses a cascading branch-merge strategy, so that changes such as bug fixes
made to the stable branch will cascade down to newer upcoming releases.

The overview of the branch layout is:

| Branch        | Description |
| ------------- | ----------- |
| `release/X.Y` | Stable (default) branch, e.g. `release/%%VERSION%%`
| `release/X.Z` | Beta release branch, usually one minor number higher than stable
| `3.x`         | v3 feature branch
| `master`      | Next major version development branch


### Stable Branch

For a checkout of the current stable (default) branch, execute the following
commands:

```bash
git clone git://github.com/bolt/bolt.git
cd bolt
```


### 3.x Feature Branch

For a checkout of the `3.x` feature branch, execute the following commands:

```bash
git clone git://github.com/bolt/bolt.git
cd bolt
git checkout 3.x
```


### 4.x (master) Unstable Branch

For a checkout of the next-generation bleeding-edge 4.x development `master`
branch, execute the following commands:

```bash
git clone git://github.com/bolt/bolt.git
cd bolt
git checkout master
```


Installing & Updating Dependencies
----------------------------------

To install package dependencies on a fresh clone, run:

```bash
composer install
```

To update Bolt's dependencies to their latest supported minor releases, or when
switching between branches, run:

```bash
composer update
```

<p class="note"><strong>Note:</strong> When changing branches it is generally
advised to re-run <code>composer update</code> as some dependencies may be
added in minor version, or be removed/replaced in major versions.</p>


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
[git]: https://help.github.com/articles/set-up-git/
[composer]: https://getcomposer.org/download/
[core-dev]: ../core-development
[webroot]: ../howto/troubleshooting-outside-webroot
