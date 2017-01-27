---
title: The traditional way, using (S)FTP
---
The traditional way, using (S)FTP
=================================

Download the [latest version of Bolt](https://bolt.cm/distribution/bolt-latest.zip).

Extract the .zip file, and upload to your webhost using the (S)FTP client of
your choice.

<p class="note"><strong>Note:</strong> Don't forget to upload the
<code>.htaccess</code> file, if you're using Apache! Bolt won't work without it.
</p>

If you can't find the file on your file system, download this
[<code>default.htaccess</code>](https://bolt.cm/distribution/default.htaccess)
file. Upload it to your server, and then rename it to <code>.htaccess</code>.

If you're on OSX and you don't see the file, it might be that your system is
set up to 'hide' hidden files, that start with a `.`-character.

You can usually still find it, when browsing local files using your FTP
client.

Next Steps
----------

### Web server configuration

After extracting the Tar or Zip file, you'll end up with a structure, similar to this:

```bash
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
files. Most of them are placed outside of the so-called web root. Only the
folder `public/` needs to be accessible in the browser.

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

After you've done this, skip to the section [Setting up Bolt](../configuration/introduction).

[apache]: ../installation/webserver/apache
[nginx]: ../installation/webserver/nginx
[webroot]: ../howto/troubleshooting-outside-webroot
