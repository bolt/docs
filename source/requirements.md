Requirements
===============

The system requirements for Bolt are modest, and it should run on any fairly
modern webserver:

  - PHP 5.3.3 or higher
  - Access to SQLite (which comes bundled with PHP 5.3), _or_ MySQL _or_
    PostgreSQL.
  - Apache with Mod_rewrite (`.htaccess` files) or Nginx (virtual host
    configuration covered below)

<p class="note"><strong>Note:</strong> Currently we only support Apache and
  Nginx. Support for Lighttpd will come in the near future, if there's demand.
  </p>

The PHP installation has a few additional requirements. On most servers these
are default settings, and Bolt should work out-of-the-box.

  - A minimum of 32mb of memory allocated to PHP
  - The PDO extension, to connect to a database
  - The cUrl extension
  - The GD Extension

Browser requirements
--------------------

The Bolt backend was designed and built to work optimally in any modern browser.

Desktop browsers:

  - Chrome 21 or later
  - Firefox 15 or later
  - Safari 6.0 or later
  - Internet Explorer 9 or later. (IE 8 works somewhat. A bit)

Mobile browsers:

  - Safari for iOS 6.0 or later
  - Chrome for iOS
  - Chrome for Android

<p class="note"><strong>Note:</strong> These requirements are completely
seperated for the websites that are built with Bolt. The templates that Bolt
uses are developed the way you need them to be. </p>
