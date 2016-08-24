---
title: Bolt Internals
---
Bolt Internals
==============

Bolt is an application built on top of the awesome [Silex micro-framework][silex],
and uses a lot of components from the [Symfony framework][comp]. Bolt strives to
adhere to [the PSR-2 coding style][psr2]. When writing your own
[Bolt extensions][ext], you should try to do the same.

This chapter serves as a reference guide for those who want to get the most out
of the templates, those who want to create extensions or basically anybody who's
curious what makes Bolt tick.

Routing
-------

Every request to a page on a Bolt website is routed to a Silex controller,
regardless of whether the request is for a page in the 'backend', 'frontend' or
'asynchronous'.

There are four files that contain the controller collections, located in
`src/Controllers/`: `Backend.php`, `Frontend.php`, `Async.php` and
`Routing.php`.

As such, they are all in the `\Bolt\Controllers` namespace. They are 'set up'
in `src/Application.php`.

* `Backend` routes are all pretty straightforward.
* `Async.php` routes are used for 'ajaxy' requests, like the
'latest activity' widget on the dashboard.
* `Routing` is the actual Controller that parses the routes found in `routing.yml`
* `Frontend` contains the methods for all standard routes as defined in `routes.yml`.

You can modify the `routing.yml` to suit your own needs. Examples are included.

Templating
----------
All templating in Bolt is done through [Twig][twig].

Twig is a template library that's not only secure, fast and flexible, but it's
also elegant and concise, so it's easy to use for both 'developer' and 'frontend'
type persons.

Basically, everything that you can do 'vanilla' Twig, you can do in the Bolt
templates. We've added a few tags of our own. Browse
`src/Twig/TwigExtension.php` and `src/Twig/SetcontentTokenParser.php`
for details.

More information on this subject can be found in [Templates and Routes](../templates/templates-routes)
and [Content in Templates](../templates/record-and-records).

The "Model"
-----------
The way Bolt handles its contenttypes is defined in the `contenttypes.yml` file,
which in turn determines the data-structure of the website.

Basically, whatever is defined in the contenttypes gets added as columns to the
database that's configured in `config.yml`.

Whenever the 'dashboard' is displayed, Bolt checks if the definitions in
`contenttypes.yml` matches the database columns, and if it doesn't it urges
the user to go to the 'repair database' screen.

Even though Bolt strives to be as simple as possible, it makes sense to think of
Bolt as an [MVC application][mvc]. Silex provides the Controller part, the Twig
templates are the View and the Contenttypes define the Model part.

All access to the content and the contentypes is done through the Storage class.
Records of content have a Content class. Browse the files `src/Storage.php`
and `src/Content.php` for details.

Bootstrapping
-------------
As mentioned before, Bolt is a Silex application. As such, it is a good idea to
familiarize yourself with Silex, because when hacking the code or creating your
own extensions, you can basically do whatever can be done in Silex in general.

In the Bolt code, there is an ubiquitous `$app`, which is an instance of
`Bolt\Application`, which extends `\Silex\Application`. Basically, this is
'the application', and most of the components that are used in Bolt are created
as services via Dependency Injection.

If you want to know more about these subjects, we heartily recommend these
articles about Dependency Injection:

  - [An introduction to Pimple and Service Containers][intro]
  - [What is Dependency Injection?][depinj]

In Bolt, this `$app` will be available in the majority of the code, and so are
all of the services, libraries and variables that are part of the application.

All of these are created in `src/Application.php`. Read the code in that file,
to get a feeling for what can be accessed through the `$app` object. Most of the
services defined there are Symfony components, about which you can read on the
Silex Documentation page on [Service Providers][service], or on the
[Symfony Components page][comp].

The next largest group are the Bolt components. These can be recognized by the
`Bolt\` namespace. These components are autoloaded, and can be found in
`src/Bolt/`.

Debug Bar and `dump()`
---------------------------------------
If you're about to go poking through the Bolt code, there are a few tools that
are simply invaluable for doing so.

### The debug Bar

If you're logged in, and 'debug: true' is set in `config.yml`, you'll see the
'Debug nut' in the lower right corner of all pages of both the frontend and the
backend of the Bolt website. Click it to open the Symfony profiler bar.

<a href="/files/toolbar.png" class="popup"><img src="/files/toolbar.png" style="width: 100%"></a><br>

This profiler bar contains a lot of useful information to see what's going on
behind the scenes. Click the different tabs to see information about the current
request, used templates, matched routes, used queries, server variables and a
lot more.

### `{{ dump() }}` and `dump()`

If you're coding and you want to get a quick look at whatever variable or object
you're trying to manipulate, you can dump its contents to the browser. In
templates, use the following:

```
    {{ dump(variable) }}
```

<p class="note"><strong>Note:</strong> Don't forget to set <code>debug:
true</code> in your <code>config.yml</code> file. Otherwise the
<code>dump()</code> will output nothing at all.</p>


The `variable` can be a normal variable, a Record or multiple records of
Content, or other stuff.

<a href="/files/content-example3.png" class="popup"><img src="/files/content-example3.png" style="width: 400px"></a><br>

In your code you can also dump variables and objects, like this:

```
    use Symfony\Component\VarDumper\VarDumper;

    VarDumper::dump($variable);
```

Or, using the (global) shortcut:


```
    dump($variable);
```

Like above, the `$variable` can be a normal variable, an object or whatever.

Note that Bolt has built-in protection for when you're tyring to 'dump' Silex or
Symfony objects like `$app` or a variable that's `\Bolt\Application`.

Since these would be too large to render because of internal references and
recursion, they are not expanded further.

### `{{ backtrace() }}`

Using this function you can get a backtrace throught the code to the current
point in the execution. Useful for when you're debugging something, and you're
not quite sure how you got here to begin with. In your templates, use the
following:

```
    {{ backtrace() }}
```

In your code you can also use backtrace, like this:

```
    use Symfony\Component\VarDumper\VarDumper;

    VarDumper::dump(debug_backtrace());
```

Or, using the (global) shortcut:


```
    dump(debug_backtrace());
```

The optional parameters denotes the options and maximum depth of the output of
the backtrace. See the page on php.net: [debug-backtrace.php()][back].


Object Reference
----------------

Below you'll find a reference for a lot of the objects, arrays, services and
libraries that are accessible in the code through `$app`, and, if relevant, how
to use these in the templates.

### `$app['config']`

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

### $app['resources']

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
    "root" => "/path/to/bolt"
    "rootpath" => "/path/to/bolt"
    "apppath" => "/path/to/bolt/app"
    "extensionsconfig" => "/path/to/bolt/app/config/extensions"
    "extensionsconfigpath" => "/path/to/bolt/app/config/extensions"
    "extensionspath" => "/path/to/bolt/extensions"
    "filespath" => "/path/to/bolt/files"
    "web"  => "/path/to/bolt/"
    "webpath" => "/path/to/bolt/"
    "cache" => "/path/to/bolt/app/cache"
    "cachepath" => "/path/to/bolt/appcache"
    "config" => "/path/to/bolt/app/config"
    "configpath" => "/path/to/bolt/app/config"
    "database" => "/path/to/bolt/app/database"
    "databasepath" => "/path/to/bolt/app/database"
    "themebase" => "/path/to/bolt/theme"
    "themebasepath" => "/path/to/bolt/theme"
    "themepath" => "/path/to/bolt/theme/base-2014"
    "templatespath" => "/path/to/bolt/theme/base-2014"
  ]
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
    "theme" => "/theme/base-2014/"
    "current" => "/"
    "canonicalurl" => "https://www.bolt.cm/page/about"
    "currenturl" => "https://bolt.cm/page/about"
    "hosturl" => "https://bolt.cm"
    "rooturl" => "https://bolt.cm/"
  ]
```

### $app['db']

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


### $app['mailer']

This is an instance of Swiftmailer.

- [http://silex.sensiolabs.org/doc/providers/swiftmailer.html][swift1]
- [http://swiftmailer.org/][swift2]


### $app['logger.system']

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

### $app['users']

Instance of `Bolt\Users`. See `src/Users.php` for details.


### $app['session']

Instance of Silex Session. See [Silex SessionServiceProvider][session] for
details.

Use this to set Flash messages: Messages that appear on the current or next
pageview, for the current user. Example:

```
$app['session']->getFlashBag()->set('success', 'Something went A-OK.');
$app['session']->getFlashBag()->set('info', 'A neutral message.');
$app['session']->getFlashBag()->set('error', 'Something went horribly wrong.');
```

### $app['cache']

Instance of `Bolt\Cache`. See `src/Cache.php` for details.

### $app['extensions']

This is an instance of `Bolt\Extensions`. See the page on
[Bolt extensions](../extensions/introduction) for details.

### $app['twig']

This is an instance of Twig. A lot more information on this can be found both in
the Bolt documentation, as well as on the Twig website:

  - The [Twig website](http://twig.sensiolabs.org/)
  - [Templates in Bolt](../templates/templates-routes)

Note: You should not directly use this object, normally. Instead, use
`$app['render']`. See below.

### $app['render']

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

[silex]: http://silex.sensiolabs.org
[comp]: http://symfony.com/components
[psr2]: https://github.com/php-fig/fig-standards/blob/master/accepted/PSR-2-coding-style-guide.md
[psr3]: https://github.com/php-fig/fig-standards/blob/master/accepted/PSR-3-logger-interface.md
[ext]: /extensions/introduction
[twig]: http://twig.sensiolabs.org/
[mvc]: https://en.wikipedia.org/wiki/Model-view-controller
[intro]: https://jtreminio.com/2012/10/an-introduction-to-pimple-and-service-containers/
[depinj]: http://fabien.potencier.org/article/11/what-is-dependency-injection
[service]: http://silex.sensiolabs.org/documentation
[back]: http://php.net/manual/en/function.debug-backtrace.php
[dbal]: http://docs.doctrine-project.org/projects/doctrine-dbal/en/latest/reference/data-retrieval-and-manipulation.html
[swift1]: http://silex.sensiolabs.org/doc/providers/swiftmailer.html
[swift2]: http://swiftmailer.org/
[session]: http://silex.sensiolabs.org/doc/providers/session.html


