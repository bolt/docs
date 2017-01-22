Troubleshooting 'Outside of the web root'
========================================

Sometimes, especially on shared web hosts, it's not very simple to change the
web server configuration to point to the `public` folder that comes with the
archive install files that you can download as `.tgz` or `.zip` files.

Finally, at the end of this page, there's a brief explanation of _why_ it is
important to keep your files outside of the web root:
[What's the point of doing this?][point]

Preface: Make sure permissions are correct
------------------------------------------

Before getting started, make sure that all file permissions are set correctly.
If you get an error message like this:

```
The root path /home/example/domains/example.org is not readable.
```

You should _first_ fix the permissions, and only then start working on one of
the possible solutions listed below. See the page for instructions on
[setting up file permissions][permissions] for your setup.

Option 1: Configure Apache or Nginx
-----------------------------------

If you have access to Apache or Nginx's configuration files, you can modify
those to use the `public` folder as web root. For more information about this,
see the pages on configuring [Apache][apache] or [Nginx][nginx].

Sometimes this is even possible from the web hosting Control Panel, like Plesk
or DirectAdmin.

Option 2: Use the 'flat structure' distribution
-----------------------------------------------

The packaged distribution comes in two varieties: The 'recommended' setup, with
the bulk of the code files outside of the web root, and a so-called 'flat
structure' distribution, without this requirement. If you are bumping into
issues where you can't place files outside of the web root, you can grab the
flat structure distribution from:

 - [bolt-latest-flat-structure.tar.gz][flat-tgz] or
 - [bolt-latest-flat-structure.zip][flat-zip]

This version of Bolt has the following structure, you can place entirely inside
your web root.

This will result in a structure that looks like this.

```
.
└── example.org
    └── public_html/
        ├── app/
        ├── extensions/
        ├── files/
        ├── theme/
        ├── thumbs/
        ├── vendor/
        ├── .bolt.yml
        ├── .gitignore
        ├── .htaccess
        ├── README.md
        └── index.php
```

Note: This version of Bolt is provided as a fallback for users who have no
control over their webserver setup. If at all possible, we strongly recommend
to use the 'regular' version, with all code outside of the web root.

Option 3: Create a symlink to the `public` folder
-------------------------------------------------

Often you'll have a folder structure like this, on your web host. As you can
see, it doesn't have a `public` folder, but a `www` folder instead. Sometimes
this is called `public_html`, `html`, `web` or `DEFAULT`. This example works
the same, just substitute `www` for whatever your web root is called.

```
.
└── example.org/
    ├── logs/
    ├── stats/
    └── www/
```

To get Bolt working, do the following:

 - Upload the entire distribution file, into the same folder that the 'web root'
   is in.
 - remove the `www` folder.
 - Create a symbolic link to the `public` folder: `ln -s public www`.

The result in the folder will look like this:

```
.
└── example.org
    ├── .bolt.yml
    ├── app/
    ├── extensions/
    ├── logs/
    ├── public/
    ├── README.md
    ├── stats/
    ├── vendor/
    └── www -> public
```

After this, you should be good-to-go, and Bolt will work correctly.

Option 4: Configure Bolt to use the server's configuration
----------------------------------------------------------

Often you'll have a folder structure like this, on your web host. As you can
see, it doesn't have a `public` folder, but a `www` folder instead. Sometimes
this is called `public_html`, `html`, `web` or `DEFAULT`. This example works
the same, just substitute `www` for whatever your web root is called.

```
.
└── example.org/
    ├── logs/
    ├── stats/
    └── www/
```

To get Bolt working, do the following:
 - Upload the entire distribution file, into the same folder that the 'web root'
   is in.
 - remove the `www` folder, and rename your `public` folder to `www`.
 - Edit the (hidden) file `.bolt.yml`, and set the web root correctly. Note the
   'www' in the last four lines in the example below:

```
paths:
    cache: app/cache
    config: app/config
    database: app/database
    web: www
    themebase: www/theme
    files: www/files
    view: www/bolt-public/view
```

The result in the folder will look like this:

```
.
└── example.org
    ├── .bolt.yml
    ├── app/
    ├── extensions/
    ├── logs/
    ├── README.md
    ├── stats/
    ├── vendor/
    └── www/
```

After this, you should be good-to-go, and Bolt will work correctly.

Option 5: Use `.htaccess` to change the web root
------------------------------------------------

As a last resort, you can modify the `.htaccess` file to 'proxy' the `public/`
folder. This is described in a tip from [Siteground][sg].

Let's say that by default your website is loaded from the `public_html` folder
of your account. This `public_html` directory is effectively the web root
folder or document root folder. If you've placed all Bolt files in this folder,
and want to 'serve' Bolt's `public` to be displayed when you type your domain
name, add the following lines to the `.htaccess` file in the `public_html`
folder:

```
RewriteEngine on
RewriteCond %{HTTP_HOST} ^domain-name.com$ [NC,OR]
RewriteCond %{HTTP_HOST} ^www.domain-name.com$
RewriteCond %{REQUEST_URI} !^/?public/
RewriteRule (.*) /public/$1 [L]
```

In the above lines you should replace `domain-name.com` with the hostname of
your site.

Option 6: Move the files outside of the `public` folder
---------------------------------------------

If you are hell-bent on flattening the file structure , you can do that as
well. Follow the following steps:

First, move _all_ files and folders from `public/` one level up. Don't forget
to include the `.htaccess` file in there. Then remove the `public` folder.

You will now have a structure that looks like this.

```
.
└── example.org
    ├── app/
    ├── bolt-public/
    ├── extensions/
    ├── files/
    ├── theme/
    ├── thumbs/
    ├── vendor/
    ├── .bolt.yml
    ├── .gitignore
    ├── .htaccess
    ├── README.md
    └── index.php
```

Edit your `.bolt.yml`, so that Bolt knows about the changed structure,
basically removing `public/` from it:

```
paths:
    cache: app/cache
    config: app/config
    database: app/database
    web: .
    themebase: theme
    files: files
    view: bolt-public/view
```

Finally, edit `index.php`, so the bootstrapping can load successfully. Find the
line with the `require` in it, and change it like this:

```
$app = require dirname(__FILE__) . '/vendor/bolt/bolt/app/web.php';
```

What's the point of doing this?
-------------------------------

Sometimes people ask if we're not making things 'needlessly more complex' by
putting most of Bolt's files outside of the web root. While we agree that it
might be a very minor nuisance if it's the first time you're doing it like
this, we _do_ believe this is a very good practice.

### Security

The major benefit is security: It's widely accepted to be "best practice" to
keep as many PHP files outside of the web root as possible. What we're doing by
putting files outside the web root is basically making sure they are *not*
accessible through a web browser. Simply put, everything that's not readily
accessible from the outside world is that much harder to exploit. As you might
know, Bolt uses Composer and a lot of external packages. While all of these
packages are tested thoroughly by a lot of developers, there's always a chance
that a security issue might slip through the cracks. If this happens, and the
'security issue' is not accessible at all, your website and your visitors will
still be safe.

The same holds true for your configuration files: These files will contain
Database credentials, privacy-sensitive information and perhaps key/secret
pairs for some external API. While you can 'protect' these files with
`.htaccess` or your Nginx configuration, it's still more secure to keep these
files in a location where they aren't accessible at all.

### Maintenance benefits

The Symfony framework uses a similar structure by default, and
we're following their example: [How to Override Symfony's default Directory
Structure][sfdir]

Doing this makes maintenance and upgrading more straightforward, because your
custom files are only in a few distinct places. All other files can just be
replaced, without having to worry about overwriting your configuration files,
for example.

[sfdir]: http://symfony.com/doc/current/cookbook/configuration/override_dir_structure.html
[apache]: ../installation/webserver/apache
[nginx]: ../installation/webserver/nginx
[permissions]: ../installation/permissions
[point]: #what-s-the-point-of-doing-this
[sg]: https://www.siteground.com/kb/how_to_change_my_document_root_folder_using_an_htaccess_file/
[flat-zip]: https://bolt.cm/distribution/bolt-latest-flat-structure.zip
[flat-tgz]: https://bolt.cm/distribution/bolt-latest-flat-structure.tar.gz
