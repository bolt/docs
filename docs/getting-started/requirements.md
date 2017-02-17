---
title: Requirements
---
Requirements
===============

The system requirements for Bolt are modest, and it should run on any fairly
modern webserver:

  - PHP 5.5.9 or higher
  - Access to SQLite (which comes bundled with PHP), _or_ MySQL _or_
    PostgreSQL
  - Apache with `mod_rewrite` <strong>enabled</strong> (`.htaccess` files) or
    Nginx (virtual host configuration covered below)

The PHP installation has a few additional requirements. On most servers these
are default settings, and Bolt should work out-of-the-box.

  - A minimum of 32MB of memory allocated to PHP
  - The following common PHP extensions:
    - pdo
    - mysqlnd (to use MySQL as a database)
    - pgsql (to use PostgreSQL as a database)
    - curl
    - gd
    - gmp
    - json
    - mbstring
    - opcache (optional)
    - posix
    - xml
    - fileinfo
    - exif
    - zip

Note: The following PHP modules are known to conflict with Bolt and it's 
underlying Symfony components, and must be disabled:

  - Zend Guard Loader
  - ionCube

<p class="note"><strong>Note:</strong> A Bolt server must be accessible by a
host name, or fully qualified domain name (FQDN), otherwise authentication will
not work. Using `localhost` as the host name should also work.
</br></br>
For developing sites, it is often useful to add a custom host name for the 
development server to your local computer's hosts file.</p>


Browser requirements
--------------------

The Bolt backend was designed and built to work optimally in any modern browser.

Desktop browsers:

  - Chrome 21 or later
  - Firefox 15 or later
  - Safari 6.0 or later
  - Internet Explorer 10 or later. (IE 9 works somewhat. A bit)

Mobile browsers:

  - Safari for iOS 6.0 or later
  - Chrome for iOS
  - Chrome for Android

<p class="note"><strong>Note:</strong> These requirements are completely
separated for websites that are built with Bolt. The templates that Bolt uses,
are developed the way you want them to be.</p>
