---
title: Requirements
---
Requirements
============

###System requirements

  - PHP 7.1.3 or higher
  - Access to SQLite (which comes bundled with PHP), _or_ MySQL _or_
    PostgreSQL

###PHP requirements

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

The following PHP modules are known to conflict with Bolt and it's
underlying Symfony components, and must be **disabled**:

  - Zend Guard Loader
  - ionCube

<p class="tips"><strong>Tips:</strong> A Bolt server must be accessible by a
host name or fully qualified domain name (FQDN), for authentication to work.
Using `localhost` as the host name also works.
<br><br>
For developing sites, you may add a custom host name for the
development server to your own hosts file.</p>

Webserver
---------

**Development:** You can run Bolt using PHP's built-in webserver, the
[Symfony][cli] client, Docker, XAMPP, MAMP, or pretty much whatever you're used
to.

**Production:** To run a Bolt site in production, you'll need apache with `mod_rewrite`
<strong>enabled</strong> (`.htaccess` files) or Nginx. See [webserver configuration][webserver] for details.

Browser requirements
--------------------

**Bolt backend:** The Bolt backend is built to work optimally in any modern
browser, both on Desktop and Mobile.

**Sites built in Bolt:** The browser requirements are completely separated for websites that are built with Bolt.
The websites you build on Bolt can be modified to be supported in any browser you want.


[webserver]: installation/webserver/nginx
[cli]: https://symfony.com/download
