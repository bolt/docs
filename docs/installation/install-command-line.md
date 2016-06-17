---
title: Using the command-line
---
Quick-install, using the command-line
=====================================

If you have command-line access, you can easily install Bolt by executing a few
commands. First, create the directory where you want to install Bolt, if it
doesn't already exist. We recommend installing Bolt outside the webroot, you
can read more on this [here][outside-why].

Enter the directory where you want to place the files, and execute the
following commands:

```bash
curl -O https://bolt.cm/distribution/bolt-latest.tar.gz
tar -xzf bolt-latest.tar.gz --strip-components=1
```

If this didn't work because your server doesn't have `curl`, use `wget`
instead.

That's all!

Next Steps
----------

### Web server configuration

After extracting the Tar or Zip file, you'll end up with a structure, similar
to this:

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
'public' folder needs to be accessible in the browser. After the first
installation this folder is named  `public/` but as you read on, you will see
that you can rename it to `www/` or whatever your web server requires.

To do this, configure your webserver to use the `public/` folder as the
webroot. For more information about this, see the pages on configuring
[Apache][apache] or [Nginx][nginx].

If you bump into trouble setting this up, or you have no access to
unchangeable in your web server's configuration, read the page
[Troubleshooting 'outside of the webroot'][webroot].

### Permissions

Generally most servers should be fine with the default permissions. However, if
you require guidance on setting up permissions, see our
[File System Permissions](permissions) page.

### Finishing Set-up

After you've done this, skip to the section [Setting up Bolt](../configuration/introduction).

[apache]: ../configuration/web-server-apache
[nginx]: ../configuration/web-server-nginx
[webroot]: ../howto/troubleshooting-outside-webroot
[outside-why]: ../howto/troubleshooting-outside-webroot#what-s-the-point-of-doing-this
