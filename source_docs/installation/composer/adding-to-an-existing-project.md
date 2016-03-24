Adding to an existing Composer project
======================================

If you already have a Composer project setup then run this command inside the
root directory:

```
composer require bolt/bolt ^3.0 composer/composer:^1.0@beta`
```

If you use this method you will need to bootstrap Bolt yourself, depending on
when you want to dispatch requests to Bolt. For some ideas of how to set up a
bootstrap file see the [advanced installation](installation-advanced) page.

### Why do I have to require composer/composer?

Bolt specifies the composer package as a required dependency, however, it does
not have a stable release. Composer (CLI) will fail installing Bolt, because it
cannot find a stable version of the composer package to install. You have to
tell composer (CLI) that you are allowing a version of the composer package with
a "beta" stability to be installed. This is done by requiring the composer package
with a version suffixed with `@beta`. This has to be done in the root
`composer.json` (yours), or else we would not be bothering you with this :).


Next Steps
----------

### Permissions

Generally most server should be fine with the default permissions. However, if
you require guidance on setting up permissions, see our [File System Permissions](permissions)
page.

### Finishing Set-up

After you've done this, skip to the section [Setting up Bolt](../../configuration/introduction).
