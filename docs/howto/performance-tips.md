---
title: Performance and finetuning for Bolt websites
level: intermediate
---
Performance and finetuning for Bolt websites
============================================

This page contains a few tips and pointers to optimize and tune your Bolt
website when putting it 'live'. When developing Bolt, you usually have different
settings than you would use in a production environment.

Use `config_local.yml`
----------------------

Regardless of how you 'deploy' a site with Bolt, you've undoubtedly bumped into
the nuisance of keeping environment specific settings in sync between your
development version, and the 'live' production site. To make this a bit easier,
you can use a `config_local.yml`, that you can place right next to the 'regular'
`config.yml`. Any setting you make in this file, will _overrule_ a setting made
in `config.yml`.

If you use a versioning tool like Git, you can put the `config.yml` file into
the repository, but you shouldn't commit `config_local.yml`. This way you can
bring most of the configuration under versioning control, but your database
credential isn't included.

You can edit this file through the Bolt backend as well, just like the regular
config. To get there, use the button on the edit screen for `config.yml`:

<a href="/files/howto_config_local.png" class="popup"><img src="/files/howto_config_local.png" width="571"></a><br>

Disable debug
-------------

Disable the debug toolbar, that gets appended to every page request. This
toolbar shows a _lot_ of useful information, but once a website is put into
production, you should turn this funtionality off:

```
debug: false
```

Doing this shaves a few milliseconds off each request, so your site will become
slightly faster.

The debug information is not visible to visitors who aren't logged in, but it's
good practice to take extra precautions by disabling the toolbar.

Make sure `debuglog` is disabled as well, and Bolt is set to display no errors.
We do this, so that whenever something bad happens (like a database that
crashes, or the server has some malfunction), no sensitive information will be
shown to the visitors of the site.

```
debug_error_level: 0

debuglog:
  enabled: false
```

Check mail settings
-------------------

Be sure to set up the mail settings correctly. If your site has any forms, make
sure they still work. If possible, use a proper 'smtp' server, instead of PHP's
plain 'mail()' fallback.


Set up thumbs
-------------

You can configure Bolt to save all requested thumbnails as files. To enable this
feature, do the following:

 - Create a folder `thumbs` in the web root of your website, and make sure it's
   writable to the web server.
 - Set `save_files: true` in the `thumbnails:` section of `config.yml`.

Doing this means that thumbnails will be saved as actual files, with the exact
same name as will show up in the url. By default Bolt caches the results of each
'thumbnail' request, so it doesn't have to resize images on each request, but
there _is_ a certain overhead in this. If files are saved to `thumbs/`, any
request to a thumbnail that's cached completely bypasses the PHP layer entirely,
which uses significantly less resources on the server.

Configure the backend path and other branding
---------------------------------------------

The default path to the Bolt backend is `/bolt`, but this can be configured in
`config.yml`. Doing this has a tiny benefit when it comes to security, because
bots and crawlers won't be able to use the default location to try for
passwords, but it also looks professional, for your clients.

The news shown on the dashboard can be pulled from an alternate source. Check
https://news.bolt.cm/ for an example of how this source should look. If you use
the bolt JSON extension (bolt/jsonaccess) as the source for the news you will
also need to fill out the news_variable.

You can also customize the backend favicon and the various apple-touch-icons.

```
branding:
  name: Bolt
  path: /admin
  provided_by: [ supercool@example.org, "Supercool Webdesign Co." ]
  news_source: http://news.example.org
  news_variable: news
  favicon: /files/icons/favicon.ico
  apple-touch-icon: /files/icons/apple-touch-icon.png
  apple-touch-icon-72x72: /files/icons/apple-touch-icon-72x72.png
  apple-touch-icon-114x114: /files/icons/apple-touch-icon-114x114.png
  apple-touch-icon-144x144: /files/icons/apple-touch-icon-144x144.png
```

This is what it will look like in the Bolt backend:

<a href="/files/howto-branding.png" class="popup"><img src="/files/howto-branding.png" width="433"></a><br>

Make sure Google can find the site
----------------------------------

If you've used a `robots.txt` to prevent Google from indexing the development
version of the site, make sure it's disabled in production.

To further increase the correct indexing of your site, make sure you have a
`sitemap.xml`, and that your HTML contains the required meta tags. Two
extensions to help with this are:

 - [Bolt SEO extension](https://market.bolt.cm/view/bobdenotter/seo)
 - [Sitemap](https://market.bolt.cm/view/bolt/sitemap)

If your site is accessible on more than one URL, or just with and without the
'www.'-prefix, you should set the canonical manually, to prevent duplicate
content in Google:

```
canonical: www.example.org
```

SQLite only: Running analyze on your database
---------------------------------------------

If you are using SQLite you can run the `analyze;` command on your database to
make expensive queries quicker. For more information on this please see the [issue](https://github.com/bolt/bolt/issues/5603)
on github or the details in the [SQLite docs](https://www.sqlite.org/lang_analyze.html).

Putting it all together
-----------------------

Combining the tips mentioned above, here's a full example of what your
`config_local.yml` could contain.

```
# Database credentials.
database:
  driver: mysql
  databasename: bolt
  username: database_user
  password: 'hunter42'

# Canonical URL
canonical: www.example.org

# caching settings
caching:
  config: true
  templates: true
  request: false
  duration: 10
  authenticated: false

# Thumbnail settings
thumbnails:
  default_thumbnail: [ 160, 120 ]
  default_image: [ 1000, 750 ]
  quality: 80
  cropping: crop
  notfound_image: view/img/default_notfound.png
  error_image: view/img/default_error.png
  save_files: true
  allow_upscale: false
  exif_orientation: true

# Branding options
branding:
 name: Bolt
 path: /admin
 provided_by: [ supercool@example.org, "Supercool Webdesign Co." ]
 news_source: http://news.example.org
 news_variable: news
 favicon: /files/icons/favicon.ico
 apple-touch-icon: /files/icons/apple-touch-icon.png
 apple-touch-icon-72x72: /files/icons/apple-touch-icon-72x72.png
 apple-touch-icon-114x114: /files/icons/apple-touch-icon-114x114.png
 apple-touch-icon-144x144: /files/icons/apple-touch-icon-144x144.png

# Debug settings
debug: false
debug_error_level: 0

debuglog:
  enabled: false

# Mail options
mailoptions:
  transport: smtp
  spool: true
  host: localhost
#  username: username
#  password: password
  port: 25
  encryption: null
  auth_mode: null

```



