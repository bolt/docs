Bolt Internals
==============

Bolt is an application built on top of the awesome [Silex micro-
framework](http://silex.sensiolabs.org), and uses a lot of components from the
[Symfony framework](http://symfony.com/components). Bolt strives to adhere to
[the PSR-2 coding style](https://github.com/php-fig/fig-standards/blob/master/accepted/PSR-2-coding-style-guide.md). When writing your extensions, you should try to do the same.

This chapter serves as a reference guide for those who want to get the most out
of the templates, those who want to create extensions or basically anybody who's
curious what makes Bolt tick.

Routing
-------
Every request to a page on a Bolt website is routed to a Silex controller,
regardless of whether the request is for a page in the backend, frontend or
'asynchronous'.

There are four files that contain the controller collections, located in 
`app/src/Bolt/Controllers/`: `Backend.php`, `Frontend.php`, `Async.php` and `Routing.php`.
As such, they are all in the `\Bolt\Controllers` namespace. They are 'set up' in
`app/app.php`. The routes in `Backend.php` are all pretty straightforward. The
ones in `Async.php` are used for 'ajaxy' requests, like the 'latest activity'
widget on the dashboard. Next we have `Routing.php` and `Frontend.php`. The
first one is the actual Controller that parses the routes found in `routing.yml`
and the latter contains the methods for all standard routes as defined in
`routes.yml`. You can modify the `routing.yml` to suit your own needs. Examples
are included.

Templating
----------
All templating in Bolt is done through [Twig](http://twig.sensiolabs.org/). Twig
is a template library that's not only secure, fast and flexible, but it's also
elegant and concise, so it's easy to use for both 'developer' and 'frontend'
type persons. Basically, everything that you can do 'vanilla' Twig, you can do
in the Bolt templates. We've added a few tags of our own. Browse
`app/src/Bolt/TwigExtension.php` and `app/src/Bolt/SetcontentTokenParser.php`
for details.

More information on this subject can be found in [Templates and Routes](templates-routes) 
and [Content in Templates](content-in-templates).

The "Model"
-----------
The way Bolt handles its contenttypes is defined in the `contenttypes.yml` file,
which in turn determines the data-structure of the website. Basically, whatever
is defined in the contenttypes gets added as columns to the database that's
configured in `config.yml`. Whenever the 'dashboard' is displayed, Bolt checks
if the definitions in `contenttypes.yml` matches the database columns, and if it
doesn't it urges the user to go to the 'repair database' screen.

Even though Bolt strives to be as simple as possible, it makes sense to think of
Bolt as an [MVC application](http://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller). 
Silex provides the Controller part, the Twig templates are the View and the Contenttypes define the Model part.

All access to the content and the contentypes is done through the Storage class.
Records of content have a Content class. Browse the files
`app/src/Bolt/Storage.php` and `app/src/Bolt/Content.php` for details.

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

  - [An introduction to Pimple and Service Containers](https://jtreminio.com/2012/10/an-introduction-to-pimple-and-service-containers/)
  - [What is Dependency Injection?](http://fabien.potencier.org/article/11/what-is-dependency-injection)

In Bolt, this `$app` will be available in the majority of the code, and so are
all of the services, libraries and variables that are part of the application.

All of these are created in `app/bootstrap.php`. Read the code in that file, to
get a feeling for what can be accessed through the `$app` object. Most of the
services defined there are Symfony components, about which you can read on the
Silex Documentation page on [Service Providers](http://silex.sensiolabs.org/documentation), 
or on the [Symfony Components page](http://symfony.com/components). 
The next largest group are the Bolt components. These can be recognized by the `Bolt\` namespace. These
components are autoloaded, and can be found in `app/src/Bolt/`.

Debug Bar, {{ print() }} and dump()
-----------------------------------
If you're about to go poking through the Bolt code, there are a few tools that
are simply invaluable for doing so.

### The debug Bar

If you're logged in, and 'debug: true' is set in `config.yml`, you'll see the
'Debug nut' in the lower right corner of all pages of both the frontend and the
backend of the Bolt website. Click it to open the Symfony profiler bar.

<a href="/files/toolbar.png" class="fancybox"><img src="/files/toolbar.png" style="width: 100%"></a><br>

This profiler bar contains a lot of useful information to see what's going on
behind the scenes. Click the different tabs to see information about the
current request, used templates, matched routes, used queries, server variables
and a lot more.

Note that the debug bar is appended to all your frontend templates by default.
If you don't want the bar in a custom template, just use this, anywhere in the
template:

<pre class="brush: html">
    {{ debugbar(false) }}
</pre>

When creating an extension or custom controller, the debug is not added by
default. In your code you can enable or disable it using the following:

<pre class="brush: php">
$this->app['debugbar'] = false;
$this->app['debugbar'] = true;
</pre>

### {{ dump() }} and Dumper::dump()

If you're coding and you want to get a quick look at whatever variable or object
you're trying to manipulate, you can dump its contents to the browser. In
templates, use the following:

<pre class="brush: html">
    {{ dump(variable) }}
</pre>

The `variable` can be a normal variable, a Record or multiple records of
Content, or other stuff.

<a href="/files/content-example3.png" class="fancybox"><img src="/files/content-example3.png" style="width: 400px"></a><br>

In your code you can also dump variables and objects, like this:

<pre class="brush: php">
    \Dumper::dump($variable);
</pre>

Like above, the `$variable` can be a normal variable, an object or whatever.
Note that Bolt has built-in protection for when you're tyring to 'dump' Silex or
Symfony objects like `$app` or a variable that's `\Bolt\Application`. Since these
would be too large to render because of internal references and recursion, they
are not expanded further.

### {{ backtrace() }} and Dumper::backtrace()

Using this function you can get a backtrace throught the code to the current
point in the execution. Useful for when you're debugging something, and you're
not quite sure how you got here to begin with. In your templates, use the following: 

<pre class="brush: html">
    {{ backtrace() }}
</pre>

In your code you can also use backtrace, like this:

<pre class="brush: php">
    \Dumper::backtrace(10);
</pre>

The optional parameter denotes the maximum depth of the output of the backtrace. 


Object Reference
----------------

Below you'll find a reference for a lot of the objects, arrays, services and
libraries that are accessible in the code through `$app`, and - if relevant -
how to use these in the templates.

### $app['config']

This multi-dimensional array contains all the configuration settings from the
various `.yml` files in `app/config`. They are named like their YAML
counterparts: 'general' (for `config.yml`), 'contenttypes', 'taxonomy' and
'menu'.

You can get any setting through this array. For instance, to get the value for
'homepage_template', use this:

<pre class="brush: php">
$app['config']->get('general/homepage_template')
</pre>

These variables are also accessible in your templates:

<pre class="brush: html"> 
    {{ print(config.get('general/homepage_template')) }}
</pre>

Remember to use `{{ dump() }}` and `\Dumper::dump()` to dump these arrays to
inspect the current values.

### $app['paths']

The 'paths' array contains references to paths, folders and links in your current website.

<pre class="brush: php">
echo "&lt;pre>\n" . \Dumper::dump($app['paths'], true) . "&lt;/pre>\n";
</pre>

The path variables are also accessible in your templates:

<pre class="brush: html">
    {{ dump(paths) }}
</pre>

A sample printout of the 'paths' might look like this:

<pre class="brush: plain">
… arr(17) …
  hostname str(14) => bolt.localhost
  root str(1) => /
  rootpath str(21) => /Users/bob/Sites/bolt
  theme str(17) => /theme/base-2013/
  themepath str(37) => /Users/bob/Sites/bolt/theme/base-2013
  app str(5) => /app/
  apppath str(25) => /Users/bob/Sites/bolt/app
  bolt str(6) => /bolt/
  async str(7) => /async/
  files str(7) => /files/
  filespath str(27) => /Users/bob/Sites/bolt/files
  canonical str(14) => bolt.localhost
  current str(43) => /kitchensink/sed-residamus-inquit-si-placet
  hosturl str(21) => http://bolt.localhost
  rooturl str(22) => http://bolt.localhost/
  canonicalurl str(64) => http://bolt.localhost/kitchensink/sed-residamus-inquit-si-placet
  currenturl str(64) => http://bolt.localhost/kitchensink/sed-residamus-inquit-si-placet
</pre>


### $app['db']

The 'db' object is a Doctrine Database Abstraction Layer object. Use it to query
"stuff" in the database. Because of the DBAL, you don't need to worry about
whether the site is set up as MySQL, PostgreSQL or SQLite. Just make sure to use
SQL/DQL that Doctrine understands. For more information, see this page on the
Doctrine DBAL: 
[Data Retrieval And Manipulation](http://docs.doctrine-project.org/projects/doctrine-dbal/en/latest/reference/data-retrieval-and-manipulation.html)

Example:

<pre class="brush: php">
$tablename = $this->config['general']['database']['prefix'] . $contenttype;
$query = "UPDATE $tablename SET $field = ? WHERE id = ?";
$stmt = $app['db']->prepare($query);
$stmt->bindValue(1, $value);
$stmt->bindValue(2, $id);
$res = $stmt->execute();

echo "Result was: " . \Dumper::dump($res);
</pre>

Check `app/src/Bolt/Storage.php` for a lot of examples using the DBAL.


### $app['mailer']

This is an instance of Swiftmailer.

- [http://silex.sensiolabs.org/doc/providers/swiftmailer.html](http://silex.sensiolabs.org/doc/providers/swiftmailer.html)
- [http://swiftmailer.org/](http://swiftmailer.org/)


### $app['log']

Instance of Bolt\Log. See `app/src/Bolt/Log.php` for details.

Example:

<pre class="brush: php">
$app['log']->add("Login " . $request->get('username') , 2, '', 'login');
</pre>

The `add()` function takes four parameters:
- The message to log.
- The 'severity level' of the log entry.
- Optional '$content'. If you pass a Content record, it will be logged.
- 'code'. by passing a code you can group different log entries together.

If something is logged with a level of '3' or higher and a 'code', it will be
shown in the activity log on the dashboard screen. Otherwise it will only be
shown in the extended 'activity log' screen.

### $app['users']

Instance of Bolt\Users. See `app/src/Bolt/Users.php` for details.


### $app['session']

Instance of Silex Session. See 
[Silex SessionServiceProvider](http://silex.sensiolabs.org/doc/providers/session.html) for details.

Use this to set Flash messages: Messages that appear on the current or next
pageview, for the current user. Example:

<pre class="brush: php">
$app['session']->setFlash('success', 'Something went A-OK.');
$app['session']->setFlash('info', 'A neutral message.');
$app['session']->setFlash('error', 'Something went horribly wrong.');
</pre>

### $app['cache']

Instance of Bolt\Cache. See `app/src/Bolt/Cache.php` for details.

### $app['extensions']

This is an instance of Bolt\Extensions. See the page on [Bolt extensions](/extensions) for details.

### $app['twig']

This is an instance of Twig. A lot more information on this can be found both in
the Bolt documentation, as well as on the Twig website:

  - The [Twig website](http://twig.sensiolabs.org/)
  - [Templates in Bolt](templates)

Note: You should not directly use this object, normally. Instead, use `$app['render']`. 
See below.

### $app['render']

This is an object used as a wrapper around Twig's render functionality. If
enabled, it also takes care of caching the results.

Most controllers return a rendered Twig template as a result, but you can also
render a (sub)template as HTML, process it further if needed, and return that as
part of an extension or callback.

Inspect the various controllers `app/app_backend.php`, `app/app_frontend.php`
and `app/app_async.php` for details. To use a template in your own code as part
of the result, see this example:

<pre class="brush: php">
$html = $app['render']->render("assets/bla.twig", array('form' =>  $data));
</pre>

Note that the template file must be somewhere in (or below) the allowed folders
for Twig templates. There are currently three folders Twig looks in for files:

  - The `/theme/themename/` folder, where 'themename' is the current theme as set in `config.yml`.
  - The `/app/view` folder
  - The `/app/extensions` folder

