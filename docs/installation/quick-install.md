---
title: Quick install
---
Quick install: Composer-based distribution
==========================================

If you have command-line access, you can easily install Bolt by executing a few
commands. The "Quick install" is a Composer-based distribution package that
allows you to rapidly set up a Bolt installation, making use of the command
line and the official distribution files. After initial setup it can be updated
using this same method, or by simply running `composer update` in the project
folder.

First, create the directory where you want to install Bolt, if it
doesn't already exist.

Enter the directory where you want to place the files, and execute the
following commands:

```bash
curl -O https://bolt.cm/distribution/bolt-latest.tar.gz
tar -xzf bolt-latest.tar.gz --strip-components=1
php app/nut init
```

View this short screencast, to see it in action:

<script type="text/javascript" src="https://asciinema.org/a/129086.js" id="asciicast-129086" async></script>

If this set of commands didn't work because your server doesn't have `curl`,
use `wget` instead.

That's all!

Note: We recommend installing Bolt outside the web root, following commonly
accepted best practices setup for web applications. You can read more on this
[here][outside-why]. If this is not possible on your server environment, you
can use the so-called "[Flat distribution][flat]", as an alternative.

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

To do this, configure your web server to use the `public/` folder as the
web root. For more information about this, see the pages on configuring
[Apache][apache] or [Nginx][nginx], or simply use the bundled configuration
for PHP's built-in server:

```
php app/nut server:run
```

If you bump into trouble setting this up, or you have no access to change your
web server's configuration, read the page
[Troubleshooting 'outside of the webroot'][webroot]. If this is not possible on
your server environment, you can use the so-called "[Flat distribution][flat]",
as an alternative.

If you wish to manually alter the directory structure, so it fits your needs
better, see the section on [configuring Bolt's structure using `.bolt.yml`][bolt-yml].

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
vhost on your web server, your Bolt installation should be good to go. Skip
to the section [Setting up Bolt](../configuration/introduction).

[apache]: ../installation/webserver/apache
[nginx]: ../installation/webserver/nginx
[webroot]: ../howto/troubleshooting-outside-webroot
[outside-why]: ../howto/troubleshooting-outside-webroot#what-s-the-point-of-doing-this
[flat]: ../howto/troubleshooting-outside-webroot#option-2-use-the-flat-structure-distribution
[bolt-yml]: ../extensions/custom-bootstrapping#the-basics-of-configuring-a-bolt-application
