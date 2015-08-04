Running Bolt using PHP's built-in web server
============================================

For development and testing purposes it is ofter useful to use PHP's built-in
web server rather than setting up Apache or Ningx.

The approach to achieving this varies slightly depending on how Bolt is installed
locally.

Git & Zip Installs 
------------------

Simply navigate to your Bolt directory and issue the command:

```
/usr/bin/php -S localhost:80 -t . index.php
```


Composer Installs
-----------------

Using a Composer install of Bolt is a little more complicated, due to the need 
for redirects, but still rather straightforward.

In your Bolt root directory create a file called `local.php` and add the following: 

```php
<?php

if (preg_match('/^\/(?:thumbs)/', $_SERVER["REQUEST_URI"])) {
    include __DIR__ . '/index.php';
} elseif (preg_match('/\.(?:png|jpg|jpeg|gif|css|js|ico|ttf|woff|woff2)$/', $_SERVER["REQUEST_URI"])) {
    return false;
} elseif (preg_match('/\.(?:ttf|woff|woff2)?/', $_SERVER["REQUEST_URI"])) {
    return false;
} else {
    include __DIR__ . '/index.php';
}
```
The you can run the web server with this command:

```
/usr/bin/php -S localhost:8123 -t . local.php
```

**NOTE:** Currently the editing of YAML and Twig files via the admin pages doesn't work.
