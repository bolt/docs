---
title: Adding to an existing project
level: advanced
---
Adding to an existing Composer project
======================================

If you already have a Composer project setup then run this command inside the
root directory:

```
composer require bolt/bolt ^%%VERSION%%
```

If you use this method you will need to bootstrap Bolt yourself, depending on
when you want to dispatch requests to Bolt. For some ideas of how to set up a
bootstrap file see the [Creating your own Bootstrap](../../extensions/custom-bootstrapping) page.

Next Steps
----------

### Permissions

Bolt needs to be able to write data to a number of folders. For example the
`cache/` folder, and the `files/` folder where uploaded images and other files
will be saved.

Generally, servers should be fine with the default permissions.
If your server needs to have the permissions set manually, you'll immediately
notice when opening your new install in a browser window, because you will
greeted by an error, and the message that you should fix this. If this happens,
and you require guidance on setting up permissions, see our
[File System Permissions](../permissions) page.

### Finishing Set-up

After you've done this, skip to the section [Setting up Bolt](../../configuration/introduction).
