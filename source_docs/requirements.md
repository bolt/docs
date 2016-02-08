Requirements
===============

The system requirements for Bolt are modest, and it should run on any fairly
modern webserver:

  - PHP 5.5.9 or higher
  - Access to SQLite (which comes bundled with PHP), _or_ MySQL _or_
    PostgreSQL
  - Apache with `mod_rewrite` <strong>enabled</strong> (`.htaccess` files) or
    Nginx (virtual host configuration covered below)

<p class="note"><strong>Note:</strong> While Bolt 3 will work very well in
PHP 7, the included version of the error reporting package
<a href="http://filp.github.io/whoops/">Whoops</a> will in certain cases not.
This will probably not affect your experience. </p>

The PHP installation has a few additional requirements. On most servers these
are default settings, and Bolt should work out-of-the-box.

  - A minimum of 32MB of memory allocated to PHP
  - The PDO extension, to connect to a database
  - The cUrl extension
  - The GD Extension

Note the following PHP modules are known to conflict with Bolt and must be
disabled:

  - Zend Guard Loader
  - ionCube

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
