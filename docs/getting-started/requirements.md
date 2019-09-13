---
title: Requirements
---
Requirements
============

The system requirements for Bolt are modest, and it should run on any fairly
modern web server.

  - PHP 7.1.3 or higher
  - Access to SQLite (which comes bundled with PHP), _or_ MySQL _or_
    PostgreSQL

The PHP installation has a few additional requirements. On most servers these
are default settings, and Bolt should work out-of-the-box.

  - A minimum of 32MB of memory allocated to PHP
  - The following common PHP extensions:
    - pdo
    - mysqlnd (to use MySQL as a database)
    - pgsql (to use PostgreSQL as a database)
    - openssl
    - curl
    - gd
    - intl (optional but recommended)
    - json
    - mbstring (optional but recommended)
    - opcache (optional but recommended)
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

Webserver
---------

During development you can run Bolt using PHP's built-in webserver, the
[Symfony][cli] client, Docker, XAMPP, MAMP, or pretty much whatever you're used
to. \
To run a Bolt site in production, you'll need apache with `mod_rewrite`
<strong>enabled</strong> (`.htaccess` files) or Nginx. See the chapter on
[webserver configuration][webserver] for details.

Browser requirements
--------------------

The Bolt backend was designed and built to work optimally in any modern
browser, both on Desktop and Mobile. Internet Explorer is not really supported.
Use Edge, Firefox or Chrome.

<p class="note"><strong>Note:</strong> These requirements are completely
separated for websites that are built with Bolt. The templates that Bolt uses,
are developed the way you want them to be.</p>

[webserver]: installation/webserver/nginx
[cli]: https://symfony.com/download
