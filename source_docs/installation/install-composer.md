Install Bolt with Composer
=============================

If you've read through the previous installation options the principle has been
that Bolt is the primary application. With this latest version of Bolt we've
ensured that you can also install Bolt as a dependency of any other Composer
based project.

### Single command install

If you are starting a new project from scratch then we've made this very
simple. Just run the following from a command line:

```
composer create-project bolt/composer-install:^3.0 <MYPROJECT> --prefer-dist
```

Change `<MYPROJECT>` to the name of your project before running the installer.

The install process will ask you some questions about your required install
strategy, you can install Bolt inside a single directory, or you can install
the public assets inside a public directory and keep the application code
outside the web root.

Here's what you should see...

<video controls="controls">
  <source src="https://dl.dropboxusercontent.com/u/20154/composer-install-video.mp4" type="video/mp4">
</video>


### Adding to an existing Composer project

If you already have a Composer project setup then run this command inside the
root directory:

```
composer require bolt/bolt ^3.0 composer/composer:^1.0@beta`
```

If you use this method you will need to bootstrap Bolt yourself, depending on
when you want to dispatch requests to Bolt. For some ideas of how to setup a
bootstrap file see the [advanced installation](installation-advanced) page.

##### Why do I have to require composer/composer?

Bolt specifies the composer package as a required dependency, however, it does
not have a stable release. Composer (CLI) will fail installing Bolt, because it
cannot find a stable version of the composer package to install. You have to 
tell composer (CLI) that you are allowing a version of the composer package with 
a "beta" stability to be installed. This is done by requiring the composer package 
with a version suffixed with `@beta`. This has to be done in the root 
`composer.json` (yours), or else we would not be bothering you with this :).

Next Steps
----------

#### Permissions

Generally most server should be fine with the default permissions. However, if 
you require guidance on setting up permissions, see our [File System Permissions](permissions)
page. 

#### Finishing Set-up

After you've done this, skip to the section [Setting up Bolt](#setting-bolt).
