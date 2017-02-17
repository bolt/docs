---
title: Container Service References
level: advanced
---
Container Service References
============================

Below you'll find a reference for a lot of the objects, arrays, services and
libraries that are accessible in the code through `$app`, and, if relevant, how
to use these in the templates.

## $app['config']

This multi-dimensional array contains all the configuration settings from the
various `.yml` files in `app/config`. They are named like their YAML
counterparts: 'general' (for `config.yml`), 'contenttypes', 'taxonomy' and
'menu'.

You can get any setting through this array. For instance, to get the value for
'homepage_template', use this:

```
$app['config']->get('general/homepage_template')
```

These variables are also accessible in your templates:

```
    {{ dump(config.get('general/homepage_template')) }}
```

Remember to use `{{ dump() }}` and `dump()` to dump these arrays to
inspect the current values.

## $app['resources']

The 'resources' object contains an instance of the `Bolt\Configuration\ResourceManager`
class.

This obejct is most useful for obtaining and managing references to paths,
folders and links in your current website.

File system paths are fetched/set by:

```
$app['resources']->getPath()
$app['resources']->setPath()
```

URL paths are fetched/set by:

```
$app['resources']->getUrl()
$app['resources']->setUrl()
```

File system paths available are:

```
    # Most often used.. 
    "root" => "/path/to/bolt"
    "web"  => "/path/to/bolt/public/"    
    "apppath" => "/path/to/bolt/app"
    "extensionspath" => "/path/to/bolt/extensions"
    "config" => "/path/to/bolt/app/config"
    "cache" => "/path/to/bolt/app/cache"
    "themebase" => "/path/to/bolt/theme"
    "themepath" => "/path/to/bolt/theme/base-2016"
    
    # Other defined paths
    "rootpath" => "/path/to/bolt"
    "extensionsconfig" => "/path/to/bolt/app/config/extensions"
    "extensionsconfigpath" => "/path/to/bolt/app/config/extensions"
    "filespath" => "/path/to/bolt/files"
    "webpath" => "/path/to/bolt/public/"
    "cachepath" => "/path/to/bolt/app/cache"
    "configpath" => "/path/to/bolt/app/config"
    "database" => "/path/to/bolt/app/database"
    "databasepath" => "/path/to/bolt/app/database"
    "themebasepath" => "/path/to/bolt/theme"
    "themepath" => "/path/to/bolt/theme/base-2016"
    "templatespath" => "/path/to/bolt/theme/base-2016"
```

URL paths available are:

```
    "root" => "/"
    "app" => "/app/"
    "extensions" => "/extensions/"
    "files" => "/files/"
    "async" => "/async/"
    "upload" => "/upload/"
    "bolt" => "/bolt/"
    "theme" => "/theme/base-2016/"
    "current" => "/"
    "canonicalurl" => "https://www.bolt.cm/page/about"
    "currenturl" => "https://bolt.cm/page/about"
    "hosturl" => "https://bolt.cm"
    "rooturl" => "https://bolt.cm/"
```

The paths are available in Twig templates under the deprecated `{{ paths }}`
variable. Because this variable is deprecated, its use is discouraged. Use the
`{{ asset() }}` and `{{ path() }}` tags instead. See
[asset](../templating/templatetags#asset) and
[path](../templating/templatetags#path).

## $app['db']

The 'db' object is a Doctrine Database Abstraction Layer object. Use it to query
"stuff" in the database.

Because of the DBAL, you don't need to worry about whether the site is set up as
MySQL, PostgreSQL or SQLite. Just make sure to use SQL/DQL that Doctrine
understands. For more information, see this page on the Doctrine DBAL:
[Data Retrieval And Manipulation][dbal].

Example:

```
$tablename = $app['config']->get('general/database/prefix') . $contenttype;
$query = "UPDATE $tablename SET $field = ? WHERE id = ?";
$stmt = $app['db']->prepare($query);
$stmt->bindValue(1, $value);
$stmt->bindValue(2, $id);
$res = $stmt->execute();

echo "Result was: " . dump($res);
```

Check `src/Storage.php` for a lot of examples using the DBAL.


## $app['mailer']

This is an instance of Swiftmailer.

- [http://silex.sensiolabs.org/doc/providers/swiftmailer.html][swift1]
- [http://swiftmailer.org/][swift2]


## $app['logger.system']

Instance of `Monolog\Logger` and implements the [PSR-3][psr3] logging interface

Example:

```
$message = 'Login: ' . $request->get('username');
$app['logger.system']->info($message, array('event' => 'authentication'));
```

Logger calls can be any of:
  * emergency()
  * alert()
  * critical()
  * error()
  * warning()
  * notice()
  * info()
  * debug()

The first parameter is a message string.

The second parameter is the context array, and must contain an `event` key with
a value of any of the following:
  * authentication
  * config
  * content
  * cron
  * deprecated
  * exception
  * extension
  * news
  * nut
  * security
  * storage
  * template
  * translation
  * twig
  * upload

## $app['users']

Instance of `Bolt\Users`. See `src/Users.php` for details.


## $app['session']

Instance of Silex Session. See [Silex SessionServiceProvider][session] for
details.

Use this to set Flash messages: Messages that appear on the current or next
pageview, for the current user. Example:

```
$app['session']->getFlashBag()->set('success', 'Something went A-OK.');
$app['session']->getFlashBag()->set('info', 'A neutral message.');
$app['session']->getFlashBag()->set('error', 'Something went horribly wrong.');
```

## $app['cache']

Instance of `Bolt\Cache`. See `src/Cache.php` for details.

## $app['extensions']

This is an instance of `Bolt\Extensions`. See the page on
[Bolt extensions](../extensions/introduction) for details.

## $app['twig']

This is an instance of Twig. A lot more information on this can be found both in
the Bolt documentation, as well as on the Twig website:

  - The [Twig website](http://twig.sensiolabs.org/)
  - [Templates in Bolt](../templating/templates-routes)

Note: You should not directly use this object, normally. Instead, use
`$app['render']`. See below.

## $app['render']

This is an object used as a wrapper around Twig's render functionality. If
enabled, it also takes care of caching the results.

Most controllers return a rendered Twig template as a result, but you can also
render a (sub)template as HTML, process it further if needed, and return that as
part of an extension or callback.

Inspect the various controllers for details. To use a template in your own code
as part of the result, see this example:

```
$html = $app['render']->render("assets/bla.twig", array('form' =>  $data));
```

Note that the template file must be somewhere in (or below) the allowed folders
for Twig templates. There are currently three folders Twig looks in for files:

  - The `/theme/themename/` folder, where 'themename' is the current theme as set in `config.yml`.
  - The `/app/view` folder
  - The `/app/extensions` folder

If you're using custom Twig templates in your extensions, you need to add an
extra path, so Twig knows where to find these templates. You _could_ create a
new Twig instance, but that would also mean losing the global scope. Often,
it's easier to add the current path of your extension, and use that:

```php
$this->app['twig.loader.filesystem']->addPath(__DIR__);
$html = $this->app['render']->render(
        'assets/myextension_bar.twig',
        array(
            'foo' => $foo,
            'config' => $this->config
        )
    );
return $html;
```

[session]: http://silex.sensiolabs.org/doc/providers/session.html
[psr3]: https://github.com/php-fig/fig-standards/blob/master/accepted/PSR-3-logger-interface.md
[swift1]: http://silex.sensiolabs.org/doc/providers/swiftmailer.html
[swift2]: http://swiftmailer.org/
[dbal]: http://docs.doctrine-project.org/projects/doctrine-dbal/en/latest/reference/data-retrieval-and-manipulation.html
