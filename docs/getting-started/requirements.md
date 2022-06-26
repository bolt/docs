---
title: Requirements
---
Requirements
============

The system requirements for Bolt are modest, and it should run on any fairly
modern web server.

- PHP 7.2.9 or higher
- Access to SQLite (which comes bundled with PHP), _or_ MySQL/MariaDB.
  - MySQL 5.7.8 or higher
  - MariaDB 10.2.3 or higher
  - SQLite 3.17 (with JSON1), 3.38 or higher

The PHP installation has a few additional requirements. On most servers these
are installed by default, and Bolt should work out-of-the-box.

- A minimum of 32MB of memory allocated to PHP
- The following common PHP extensions:
  - pdo
  - mysqlnd (to use MySQL as a database)
  <!-- - pgsql (to use PostgreSQL as a database) -->
  - openssl
  - curl
  - gd
  - dom
  - intl (optional but recommended)
  - json
  - mbstring (optional but recommended)
  - opcache (optional but recommended)
  - posix
  - xml
  - simplexml
  - tokenizer
  - fileinfo
  - exif
  - zip

Note: The following PHP modules are known to conflict with Bolt and it's
underlying Symfony components, and must be disabled:

- Zend Guard Loader
- ionCube

<p class="note"><strong>Note:</strong> A Bolt server must be accessible by a
host name, or fully qualified domain name (FQDN), otherwise authentication will
not work. Using <code>localhost</code> as the host name should also work.
</br></br>
For developing sites, it is often useful to add a custom host name for the
development server to your local computer's hosts file.</p>

Webserver
---------

During development you can run Bolt using PHP's built-in webserver, the
[Symfony][cli] client, Docker, XAMPP, MAMP, or pretty much whatever you're used
to.
To run a Bolt site in production, you'll need apache with `mod_rewrite`
<strong>enabled</strong> (`.htaccess` files) or Nginx. See the chapter on
[webserver configuration][webserver] for details.

<p class="note"><strong>Note:</strong> This documentation makes the assumption
that you're setting up Bolt on a local development machine. Not on the server
where you intend to run a production website. If you do not have a local
development environment, we recommend taking the time to set this up. </p>

Browser requirements
--------------------

The Bolt backend was designed and built to work optimally in any modern
browser, both on Desktop and Mobile. Internet Explorer is not supported.
Use Firefox, Edge, Safari or Chrome.

<p class="note"><strong>Note:</strong> These requirements are completely
separated for websites that are built with Bolt. The templates that Bolt uses,
are developed the way you want them to be.</p>

[webserver]: ../installation/webserver/apache
[cli]: https://symfony.com/download
