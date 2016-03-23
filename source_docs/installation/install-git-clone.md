Cloning directly from Git
=========================

If you want to install Bolt using Git and Composer, you need to decide if you
want to use a stable branch, or the bleeding-edge master branch.

### Getting Composer

First thing you will need, if you don't have it already, is a recent version of Composer.

To get this, see the [Composer Download](https://getcomposer.org/download/) page for instructions.

### Stable Branch

For a execute the following commands:

```bash
git clone git://github.com/bolt/bolt.git bolt
cd bolt
php composer.phar install
```

**Note:** Bolt uses the current stable release branch as its default when 
cloning the repository.

### Master (unstable) Branch

```bash
git clone git://github.com/bolt/bolt.git bolt
cd bolt
git checkout master
php composer.phar install
```

Next Steps
----------

#### Permissions

Generally most server should be fine with the default permissions. However, if 
you require guidance on setting up permissions, see our [File System Permissions](permissions)
page. 

#### Finishing Set-up

After you've done this, skip to the section [Setting up Bolt](#setting-bolt).
