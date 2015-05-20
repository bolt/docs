Bolt Internals
==============

<p class="meta">
    <strong>Bolt 2.3+</strong><br>
    The following functionality is only available in Bolt 2.3 and later,
    <a href="historical/bolt-internals">please see here</a> for details of
    older versions.
</p>

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
regardless of whether the request is for a page in the backend, frontend or
'asynchronous'.

Bolt's controllers are classified into 3 different 'zones':
* Frontend - `Bolt\Controller` namespace
* Backend - `Bolt\Controller\Backend` namespace
* Asynchronous - `Bolt\Controller\Async` namespace

### Frontend



#### Backend
The backend controllers are:
* Bolt\Controller\Backend\Authentication
  * Authentication specific
* Bolt\Controller\Backend\General
  * Generic routes for the backend such as the dashboard
* Bolt\Controller\Backend\Database
  * Database maintenance
* Bolt\Controller\Backend\Extend
  * Bolt extension management
* Bolt\Controller\Backend\FileManager
  * File maintenance and management
* Bolt\Controller\Backend\Log
  * System & content log maintenance and management
* Bolt\Controller\Backend\Records
  * Content record manipulation
* Bolt\Controller\Backend\Upload
  * File upload handling
* Bolt\Controller\Backend\Users
  * User maintenance and management

### Asynchronous
These are used for 'AJAXy' requests, like the 'Latest Activity' widget on the
dashboard.

* Bolt\Controller\Async\FilesystemManager
  * File and directory management
* Bolt\Controller\Async\General
  * General asynchronous routes
* Bolt\Controller\Async\Stack
  * Bolt's "stack" functionality
* Bolt\Controller\Async\SystemTests
  * System test functionality, such as sending test emails

### Controller Mounting
Controllers are collectively mounted/initialized in
`Bolt\Provider\ControllerServiceProvider` and exist as Dependency Injection
objects, e.g.
`$app['controller.foo']`

The general code path is:
* During the `Application::initialize()` a `ControllerServiceProvider` is
  registered
* In the `ControllerServiceProvider::register()` function the controller is
  added to the DI container via a closure, e.g.
```php
$app['controller.foo] = $app->share(function () {
   return new Controller\Foo();
});
```
* During `ControllerServiceProvider::boot()`:
  * `ControllerServiceProvider` adds itself as an event subscriber
  * `ControllerServiceProvider` dispatches a mount event to notify which
  controllers should be mounted
  * `ControllerServiceProvider`, being an EventSubscriber, gets this event
  dispatched to `ControllerServiceProvider::mount()` (this method replaces
  `Application::initMountpoints()`)
* `ControllerServiceProvider::mount()` then calls `Bolt\Events\MountEvent::mount($pathPrefix, $app['controller.foo'], $priority)`
  which adds the controller object from the DI container to the event:
```php
$event->mount('/my-route', $app['controller.foo'], 0);
```
* After the event is done dispatching, `MountEvent::finish` is called which:
  * Sorts the controllers based on priorities given
  * Actually mounts them to the `Bolt\Application`

## Middlewares (Request and Response Handling)



## Response Handling

As Response objects are manipulated using kernel events, do not use functions
like these:
  * session_*()
  * headers_*()
  * setcookie()

Where cookie or header manipulation is required, it should be done via the
`Response` object in an _after middleware_.

After middlewares can be created a couple different ways:
  * Creating a "Listener" class that implements `EventSubscriberInterface`. This
  class should be attached to the EventDispatcher at boot.
  * Calling `$app->after()` with an anonymous function.


Templating
----------
All templating in Bolt is done through [Twig][twig]. Twig
is a template library that's not only secure, fast and flexible, but it's also
elegant and concise, so it's easy to use for both 'developer' and 'frontend'
type persons. Basically, everything that you can do 'vanilla' Twig, you can do
in the Bolt templates. We've added a few tags of our own. Browse
`src/TwigExtension.php` and `src/SetcontentTokenParser.php`
for details.

More information on this subject can be found in [Templates and Routes](/templates-routes)
and [Content in Templates](/content-in-templates).

The "Model"
-----------
The way Bolt handles its Contenttypes is defined in the `contenttypes.yml` file,
which in turn determines the data-structure of the website. Basically, whatever
is defined in the contenttypes gets added as columns to the database that's
configured in `config.yml`. Whenever the 'dashboard' is displayed, Bolt checks
if the definitions in `contenttypes.yml` matches the database columns, and if it
doesn't it urges the user to go to the 'repair database' screen.

Even though Bolt strives to be as simple as possible, it makes sense to think of
Bolt as an [MVC application][mvc]. Silex provides the Controller part, the Twig
templates are the View and the Contenttypes define the Model part.

All access to the content and the contentypes is done through the Storage class.
Records of content have a Content class. Browse the files
`src/Storage.php` and `src/Content.php` for details.

Bootstrapping
-------------
As mentioned before, Bolt is a Silex application. As such, it is a good idea to
familiarize yourself with Silex, because when hacking the code or creating your
own extensions, you can basically do whatever can be done in Silex in general.
In the Bolt code, there is an ubiquitous `$app`, which is an instance of
`Bolt\Application`, which extends `\Silex\Application`. Basically, this is 'the
application', and most of the components that are used in Bolt are created as
services via Dependency Injection. If you want to know more about these
subjects, we heartily recommend these articles about Dependency Injection:

  - [An introduction to Pimple and Service Containers][intro]
  - [What is Dependency Injection?][depinj]

In Bolt, this `$app` will be available in the majority of the code, and so are
all of the services, libraries and variables that are part of the application.

All of these are created in `app/bootstrap.php`. Read the code in that file, to
get a feeling for what can be accessed through the `$app` object. Most of the
services defined there are Symfony components, about which you can read on the
Silex Documentation page on [Service Providers][service], or on the
[Symfony Components page][comp]. The next largest group are the Bolt components.
These can be recognized by the `Bolt\` namespace. These components are
autoloaded, and can be found in `src/`.

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
Symfony objects like `$app` or a variable that's `\Bolt\Application`. Since
these would be too large to render because of internal references and recursion,
they are not expanded further.

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
libraries that are accessible in the code through `$app`, and - if relevant -
how to use these in the templates.

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

### $app['paths']

The 'paths' array contains references to paths, folders and links for the
current website.

```
echo "<pre>\n" . dump($app['paths'], true) . "</pre>\n";
```

The path variables are also accessible in your templates:

```
    {{ dump(paths) }}
```

An example printout of the 'paths' might look like this:

```
array:34 [▼
  "root" => "/"
  "rootpath" => "/var/www/sites/bolt.cm/"
  "apppath" => "/var/www/sites/bolt.cm/app"
  "extensionsconfig" => "/var/www/sites/bolt.cm/app/config/extensions"
  "extensionsconfigpath" => "/var/www/sites/bolt.cm/app/config/extensions"
  "extensionspath" => "/var/www/sites/bolt.cm/extensions"
  "filespath" => "/var/www/sites/bolt.cm/files"
  "web" => "/var/www/sites/bolt.cm/."
  "webpath" => "/var/www/sites/bolt.cm/."
  "cache" => "/var/www/sites/bolt.cm/app/cache"
  "cachepath" => "/var/www/sites/bolt.cm/app/cache"
  "config" => "/var/www/sites/bolt.cm/app/config"
  "configpath" => "/var/www/sites/bolt.cm/app/config"
  "database" => "/var/www/sites/bolt.cm/app/database"
  "databasepath" => "/var/www/sites/bolt.cm/app/database"
  "themebase" => "/var/www/sites/bolt.cm/theme"
  "themebasepath" => "/var/www/sites/bolt.cm/theme"
  "themepath" => "/var/www/sites/bolt.cm/theme/base-2014"
  "templatespath" => "/var/www/sites/bolt.cm/theme/base-2014"
  "app" => "/app/"
  "extensions" => "/extensions/"
  "files" => "/files/"
  "async" => "/async/"
  "upload" => "/upload/"
  "bolt" => "/bolt/"
  "theme" => "/theme/base-2014/"
  "current" => "/"
  "canonicalurl" => "http://bolt.cm/pages/about"
  "currenturl" => "http://bolt.cm/pages/about"
  "hosturl" => "http://bolt.cm"
  "rooturl" => "http://bolt.cm/"
  "canonical" => "http://bolt.cm"
  "protocol" => "http"
  "hostname" => "bolt.cm"
]
```


### $app['db']

The 'db' object is a Doctrine Database Abstraction Layer object. Use it to query
"stuff" in the database. Because of the DBAL, you don't need to worry about
whether the site is set up as MySQL, PostgreSQL or SQLite. Just make sure to use
SQL/DQL that Doctrine understands. For more information, see this page on the
Doctrine DBAL: [Data Retrieval And Manipulation][dbal].

Example:

```
$tablename = $this->config['general']['database']['prefix'] . $contenttype;
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

Instance of `Bolt\Logger\Handler\SystemHandler`, and implements the PSR-3 logger
interface.

The function call utilised will set the log level, and can be any applicable one
of the following:
  * emergency()
  * alert()
  * critical()
  * error()
  * warning()
  * notice()
  * info()
  * debug()

Each of the functions takes two parameters, a string message and a context array.

The context array should, at a minimum, carry the 'event' key and a value of one
of the following:
  * authentication
  * config
  * content
  * cron
  * deprecated
  * exception
  * news
  * nut
  * security
  * storage
  * template
  * translation
  * twig
  * upload

Example use:

```
    $app['logger.system']->info('User logged in.', ['event' => 'authentication']);
```

For PHP exception handling, we use an additional key, 'exception' with the array
value being an \Exception class object.

Example use:

```
    $app['logger.system']->critical('Something went wrong', ['event' => 'exception', 'exception' => $e]);
```

See `src/Logger/Handler/SystemHandler.php` for details.

### $app['users']

Instance of `Bolt\Users`. See `src/Users.php` for details.


### $app['session']

Instance of Silex Session. See [Silex SessionServiceProvider][session] for
details.

Use this to set Flash messages: Messages that appear on the current or next
pageview, for the current user. Example:

```
$app['session']->setFlash('success', 'Something went A-OK.');
$app['session']->setFlash('info', 'A neutral message.');
$app['session']->setFlash('error', 'Something went horribly wrong.');
```

### $app['cache']

Instance of `Bolt\Cache`. See `src/Cache.php` for details.

### $app['extensions']

This is an instance of `Bolt\Extensions`. See the page on
[Bolt extensions](/extensions/introduction) for details.

### $app['twig']

This is an instance of Twig. A lot more information on this can be found both in
the Bolt documentation, as well as on the Twig website:

  - The [Twig website](http://twig.sensiolabs.org/)
  - [Templates in Bolt](/templates-routes)

Note: You should not directly use this object, normally. Instead, use
`$app['render']`. See below.

### $app['render']

This is an object used as a wrapper around Twig's render functionality. If
enabled, it also takes care of caching the results.

Most controllers return a rendered Twig template as a result, but you can also
render a (sub)template as HTML, process it further if needed, and return that as
part of an extension or callback.

Inspect the various controllers `app/app_backend.php`, `app/app_frontend.php`
and `app/app_async.php` for details. To use a template in your own code as part
of the result, see this example:

```
$html = $app['render']->render('assets/bla.twig', ['form' =>  $data]);
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
[ext]: /extensions/introduction
[twig]: http://twig.sensiolabs.org/
[mvc]: http://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller
[intro]: https://jtreminio.com/2012/10/an-introduction-to-pimple-and-service-containers/
[depinj]: http://fabien.potencier.org/article/11/what-is-dependency-injection
[service]: http://silex.sensiolabs.org/documentation
[back]: http://php.net/manual/en/function.debug-backtrace.php
[dbal]: http://docs.doctrine-project.org/projects/doctrine-dbal/en/latest/reference/data-retrieval-and-manipulation.html
[swift1]: http://silex.sensiolabs.org/doc/providers/swiftmailer.html
[swift2]: http://swiftmailer.org/
[session]: http://silex.sensiolabs.org/doc/providers/session.html
