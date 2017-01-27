---
title: Using the command-line
---
Quick-install, using the command-line
=====================================

If you have command-line access, you can easily install Bolt by executing a few
commands. First, create the directory where you want to install Bolt, if it
doesn't already exist. We recommend installing Bolt outside the web root, you
can read more on this [here][outside-why].

Enter the directory where you want to place the files, and execute the
following commands:

```bash
curl -O https://bolt.cm/distribution/bolt-latest.tar.gz
tar -xzf bolt-latest.tar.gz --strip-components=1
php app/nut setup:sync
```

If this set of commands didn't work because your server doesn't have `curl`, use `wget`
instead.

That's all!

Next Steps
----------

### Web server configuration

After extracting the Tar or Zip file, you'll end up with a structure, similar
to this:

```bash
.
├── app/
├── extensions/
├── public/
├── vendor/
├── README.md
├── composer.json.dist
└── composer.lock.dist
```

These are the folders that contain all of the Bolt code, resources and other
files. Most of them are placed outside of the so-called web root. Only the
'public' folder needs to be accessible in the browser. After the first
installation this folder is named  `public/` but as you read on, you will see
that you can rename it to `www/` or whatever your web server requires.

To do this, configure your webserver to use the `public/` folder as the
web root. For more information about this, see the pages on configuring
[Apache][apache] or [Nginx][nginx].

If you bump into trouble setting this up, or you have no access to
change your web server's configuration, read the page
[Troubleshooting 'outside of the webroot'][webroot].

### Permissions

Bolt needs to be able to write data to a number of folders. For example the
`cache/` folder, and the `files/` folder where uploaded images and other files
will be saved.

Generally, servers should be fine with the default permissions.
If your server needs to have the permissions set manually, you'll immediately
notice when opening your new install in a browser window, because you will
greeted by an error, and the message that you should fix this. If this happens,
and you require guidance on setting up permissions, see our
[File System Permissions](permissions) page.


### Finishing Set-up

After extracting the files, checking the folder structure and setting up the
vhost on your webserver, your Bolt installation should be good to go. Skip
to the section [Setting up Bolt](../configuration/introduction).

[apache]: ../installation/webserver/apache
[nginx]: ../installation/webserver/nginx
[webroot]: ../howto/troubleshooting-outside-webroot
[outside-why]: ../howto/troubleshooting-outside-webroot#what-s-the-point-of-doing-this
