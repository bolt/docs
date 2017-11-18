---
title: Manual download and extraction
---
Manual download and extraction
==============================

Download the latest version of Bolt as the regular or flattened distribution:

 - Recommended: [https://bolt.cm/distribution/bolt-latest.zip][latest]
 - Flat structure: [https://bolt.cm/distribution/bolt-latest-flat-structure.zip][latest-flat]

Extract the `.zip` file, and you can start developing locally, or upload the
files to your webhost using the (S)FTP client of your choice.

If you extract the file yourself, you'll also need to manually complete a step
of the installation that's normally done automatically by the installation
process: Rename some files so bolt can use them.

| Original name                              | Rename to       |            |
| ------------------------------------------ | --------------- | ---------- |
| `.bolt.yml.dist`                           | `.bolt.yml`     |
| `composer.json.dist`                       | `composer.json` | (optional)
| `composer.lock.dist`                       | `composer.lock` | (optional)
| `src/Site/CustomisationExtension.php.dist` | `src/Site/CustomisationExtension.php`

If you don't rename these files, Bolt will not be able to correctly detect the
"root" of the site, and will show an error page instead.

Tip: While it _is_ possible to upload the files to your webhost immediately,
and configure Bolt as-you-go, it is **strongly** recommended to develop your site
locally first. It's much quicker, you'll have a better overview of all that's
happening, and you can work on the project before it's accessible to the
public. You can use either the [built-in server][built-in-server], or set up a
development server using a free tool like [Xampp][xampp].

<p class="note"><strong>Note:</strong> Don't forget to upload the
<code>.htaccess</code> and <code>.bolt.yml</code> files, if you're using
Apache! Bolt won't work without it. </p>

If you can't find the file on your file system, download this
[<code>default.htaccess</code>](https://bolt.cm/distribution/default.htaccess)
file. Upload it to your server, and then rename it to <code>.htaccess</code>.

If you're on OSX and you don't see the file, it might be that your system is
set up to 'hide' hidden files, that start with a `.`-character.

You can usually still find it, when browsing local files using your (S)FTP
client.

Note: We recommend installing Bolt outside the web root, following commonly
accepted best practices setup for web applications. You can read more on this
[here][outside-why]. If this is not possible on your server environment, you
can use the so-called "[Flat distribution][flat]", as an alternative.

If you wish to manually alter the directory structure, so it fits your needs
better, see the section on [configuring Bolt's structure using `.bolt.yml`][bolt-yml].

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
├── composer.json
└── composer.lock
```

These are the folders that contain all of the Bolt code, resources and other
files. Most of them are placed outside of the so-called web root. Only the
folder `public/` needs to be accessible in the browser.

To do this, configure your web server to use the `public/` folder as the
web root. For more information about this, see the pages on configuring
[Apache][apache] or [Nginx][nginx].

If you bump into trouble setting this up, or you have no access to change your
web server's configuration, read the page
[Troubleshooting 'outside of the webroot'][webroot]. If this is not possible on
your server environment, you can use the so-called "[Flat distribution][flat]",
as an alternative.

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
[outside-why]: ../howto/troubleshooting-outside-webroot#what-s-the-point-of-doing-this
[flat]: ../howto/troubleshooting-outside-webroot#option-2-use-the-flat-structure-distribution
[latest]: https://bolt.cm/distribution/bolt-latest.zip
[latest-flat]: https://bolt.cm/distribution/bolt-latest-flat-structure.zip
[built-in-server]: ../howto/using-php-built-in-web-server
[xampp]: https://www.apachefriends.org/index.html
[bolt-yml]: ../extensions/custom-bootstrapping#the-basics-of-configuring-a-bolt-application
