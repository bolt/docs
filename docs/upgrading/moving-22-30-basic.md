---
title: "Starting fresh (basic)"
---
Setting up a fresh Bolt install, moving content
===============================================

This page describes the process of setting up a fresh Bolt %%VERSION%% install,
and moving over all of your existing configuration, data, themes and uploaded
media.

Depending on how heavily customised your Bolt install is, you might need to
take additional steps into account. The [advanced upgrade guide][advanced] can
be found here.

Before you start, make sure you've made the preparations, as described
[here](moving-22-30).

Setting up Bolt 3
-----------------

Follow the instructions on how to [Install Bolt 3][cli]. You can pick any of
the mentioned methods, but we suggest using the simplest installation.

When you have a working install, move on to the next section

Copying over configuration
--------------------------

To get your new site working the same as the old one, you need to move over a
number of files. Copy the following files and folders from your backup to the
new site, overwriting what was created during the installation process.

 - `app/config/config.yml` (and perhaps `app/config/config_local.yml`)
 - `app/config/contenttypes.yml`
 - `app/config/menu.yml`
 - `app/config/permissions.yml`
 - `app/config/taxonomy.yml`
 - `app/config/extensions/` (and what's in there, if anything)
 - `app/database`
 - `files/` needs to be copied to `public/files/`
 - `theme/` needs to be copied to `public/theme/`

Note: Do *not* copy over your old Bolt 2.2 `routing.yml`

Clear the cache, and update the database:

```
php app/nut cache:clear
php app/nut database:update
```

After following these steps, log on to the bolt backend, and make sure
everything is still in working order.

Routing
-------

The Bolt 2.2 routing file is not compatible with Bolt %%VERSION%%. If you've
made modifications to this file, you'll need to make them again in the new
format.

Just open the file, and you'll see what the changes are. Consult the
documentation on [Routing][routing] for details.

Database
--------

The migration of the database should work right away: Either you've copied over
the SQLite database in `app/database/` in the previous step, or your copied
`app/config/config.yml` should point to the correct MySQL or PostgreSQL
database.

Extensions
----------

Go to the 'Extend' page in the Bolt backend and re-install your extensions.
This way you'll get the updated versions, if they're available.

In the previous step you've already copied over the configuration of the
extensions, so you won't have to re-configure them.

Your Theme
----------

The copied theme should work 'as is', unless you have modifications for a
specific extension that is not yet fully supported by Bolt %%VERSION%%. If this
is the case, you'll notice when you try to view the frontend of the website.

That concludes these steps. You should now have a fully working Bolt
%%VERSION%% website.

[cli]: ../installation/install-command-line
[routing]: ../templating/templates-routes#routing
[advanced]: moving-22-30-advanced
