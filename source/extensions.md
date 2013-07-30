Creating Bolt extensions
========================

The functionality of Bolt can be extended by creating Extensions. Currently you can create extensions to do the
following:

 - Add Twig tags or modifiers, for use in the templates in your themes.
 - Add 'hooks' in the templates to either insert small snippets of HTML or the result of a callback-function in the
   templates after rendering.

In a later stage we'll be adding fucntionality for extensions to create your own controllers for extending functionality
in the frontend, as well as creating the possibility to have extensions add their own screens in the Bolt backend
interface.

A Bolt extension has to follow a few strict rules, so it can be auto-loaded by Bolt and to make sure it won't interfere
with other Bolt functionality or even other Extensions. To do this, we have to keep the following rules:

 - An extension must be placed in the `app/extensions` folder.
 - Each extension has its own namespace. The namespace must be in BumpyCase
 - The name of the Folder in `app/extensions` must be the same as the namespace.
 - The main code of the extension is in a file named `extension.php`. This is the file that is autoloaded for active extensions.
 - If the extension has its own configuration, it should be in a `config.yml` file in the extension folder.
 - The extension should come with a 'readme' file. It must be named `readme.md`, and is written in the Markdown format.
 - The `extension` sets the namespace and defines two functions named `info()` and `init()`.
 - Additional code for the extension can be placed in te `extension.php` file or in files included from `extension.php`.
 - The 'entry points' for callbacks and Twig functions and modifiers must be functions in the defined namespace.
   Additional code can be procedural or implemented in classes.

To get the hang of how extensions work, it's best to browse the extensions that are included with Bolt by default. They
are all pretty simple and straightforward. To get started with writing your own extension, we strongly suggest to create
the boilerplate code for your extension with our [Extension Wizard](http://extension-wizard.bolt.cm/).

Link: [http://extension-wizard.bolt.cm/](http://extension-wizard.bolt.cm/)

Using the wizard it's trivially easy to create a the boilerplate code for an extension. This boilerplate code can be put
in your `app/extensions` code, and can be further developed into a fully functional extension.

Coding your extensions
----------------------

Because Bolt is written in PHP, it should be no surprise that the extensions must also be written in PHP. Bolt is built
upon the awesome [Silex micro-framework](http://silex.sensiolabs.org), and uses a lot of components from the [Symfony
framework](http://symfony.com/components). When coding your extensions, you should use as much of the functionality provided by
Silex and the included components as possible. Don't re-invent the wheel, and things like that.

See the chapter on [Bolt internals](/internals) for a detailed overview of the provided Bolt functionality, Silex
objects and included libraries.

Bolt strives to adhere to [the PSR-2 coding style](https://github.com/php-fig/fig-standards/blob/master/accepted/PSR-2-coding-style-guide.md). When writing your extensions, you should try to do the same.

The `info()` and `init()` functions
-----------------------------------

Every extension needs to have a function 'info()' and a function 'init()' in its `extension.php`. The 'info()' fucntion
is used by Bolt to gather information about the available extensions, which is displayed on the Extensions page in the
Bolt Backend. The init() function is called for each pagerequest. It's executed before content is retrieved from the database or the templates are parsed. 
In general, the init() function is used to set up hooks or functionality that is used later on in the process of outputting a page. 

As mentioned before: to get started on an extension quickly, you should use our [Extension Wizard](http://extension-wizard.bolt.cm/) to create the boilerplate code for your extension.

### info()

The info function looks something like this: 

<pre class="brush: php">
function info()
{

    $data = array(
        'name' =>"Facebook Like Button",
        'description' => "A small extension to add a 'Facebook Like'-button ...",
        'author' => "Bob den Otter",
        'link' => "http://bolt.cm",
        'version' => "1.0",
        'required_bolt_version' => "0.8",
        'highest_bolt_version' => "0.8",
        'type' => "Twig function",
        'first_releasedate' => "2012-10-10",
        'latest_releasedate' => "2012-10-19",
    );

    return $data;

}
</pre>

Most of these options will be self-explanatory. Some notes:

 - The name and description are used to display the information on the Extensions screen in the Bolt interface.
 - The version number should use the "major.minor.release" notation, so that it can be used with `php_version()`.
 - The `required_bolt_version` is the lowest version of Bolt that is required to use the extension. 
 - The `highest_bolt_version` is the highest version number of Bolt that the extension was tested on. In practice, this should be the most recent version of Bolt, when developing the extension. 
 - "type" is not used currently, except for display on the Extensions screen. 
 - The First release date is the date of the first release of the extension, and shouldn't change. 
 - The Latest releasedate should be updated for each release of the extension.

### init()

The init() function is called for the initialisation of each active extension. It's used to set up functionality to be used in the templates of for Twig function. 
It looks like this: 

<pre class="brush: php">
function init($app)
{

    // Make sure the script is inserted as well..
    $app['extensions']->insertSnippet('endofbody', 'NameSpaceFoo\snippetbar');

    $app['twig']->addFunction('facebooklike', new \Twig_Function_Function('NameSpaceFoo\twigbar'));

    return true;
}
</pre>

As you can see the function is called with `$app` as a parameter, which is an instance of `\Silex\Application`, and basically contains the entirety of the Bolt application and objects. As such, it is often vital to attach your functionality to whatever it should be attached to. The init function can return `true` or `false` to denote whether the initialisation was successful.

In the case of `init()` it's often used to do the following: 

  - Initialise a snippet, either as a 'string' or a 'callback function'
  - Add a Javascript and/or CSS file to the output of the frontend pages
  - Make sure jQuery is included, if needed by your extension
  - Initialise a Twig function or filter for use in the theme templates.

If you use our [Extension Wizard](http://extension-wizard.bolt.cm/) to create the boilerplate code for your extension, the `init()` function will be already set up with the correct functionality.

Initialise a snippet
--------------------

A 'snippet' in the context of Bolt extensions is nothing more than a short fragment of code, that gets inserted in a certain place in the theme templates on the frontend of the website. This fragment can either be a string to be inserted directly, or it can be the return value of a callback string. The `insertSnippet()` function takes three parameters, with the third being optional. The first is the position of the insertion point. The second one is either a string to insert or the name of a callback function. The third, optional parameter will be passed on to the callback function. 

Snippets can be inserted in several places in the outputted HTML:

 - `startofhead` - after the `<head>`-tag.
 - `aftermeta` - after the last `<meta [..] >`-tag.
 - `aftercss` - after the last `<link [..] >`-tag.
 - `beforejs` - before the first `<script [..] >`-tag.
 - `afterjs` - after the last `<script [..] >`-tag.
 - `endofhead` - before the `</head>`-tag.
 - `startofbody` - after the `<body>`-tag.
 - `endofbody` - before the `</body>`-tag.
 - `endofhtml` - before the `</html>`-tag.
 - `afterhtml` - after the `</html>`-tag.

To insert a string snippet, use: 

<pre class="brush: php">
function init($app)
{
    $app['extensions']->insertSnippet('endofbody', '&lt;!-- a snippet of HTML -->');
}
</pre>

To insert a snippet using a callback function, use:  

<pre class="brush: php">
function init($app)
{
    $app['extensions']->insertSnippet('endofbody', 'NameSpaceFoo\snippetbar');
}

function snippetbar() 
{
    return "&lt;b>Some HTML&lt;/b>";
}

</pre>

Note that the callback must include the namespace of the extensions, even though it's defined within the namespace of the extension. This is because during the execution of the callback, it is called from the context of `Bolt\Extension`, so it won't be able to find the function if the namespace was omitted. 

To pass extra variables to the callback function, initialise them as follows: 

<pre class="brush: php">
function init($app)
{
    $app['extensions']->insertSnippet('endofbody', 'NameSpaceFoo\snippetbar', $foo);
}

function snippetbar($foo) 
{
    return "&lt;b>Var is $foo.&lt;/b>";
}

</pre>

However, don't use this to pass a 'live' version of `$app`. You should get it from the global scope instead. We might replace this with a more elegant solution down the road, but for now this will have to suffice: 

<pre class="brush: php">
function snippetbar($foo) 
{
    global $app;

    return "&lt;b>Var is $foo.&lt;/b>";
}

</pre>

Add a CSS or Javascript file
----------------------------

You can use the `init()` function to add CSS or Javascript files to the outputted HTML in the frontend. To do so, use the `addJavascript()` and `addCSS()` functions: 


<pre class="brush: php">
function init($app)
{

    // Add javascript file
    $app['extensions']->addJavascript($app['paths']['app'] . "extensions/Namespace/assets/namespace.js");

    // Add CSS file
    $app['extensions']->addCSS($app['paths']['app'] . "extensions/Namespace/assets/namespace.css");

}
</pre>

both of these functions take one parameter: An absolute path to the desired .js or .css file. Use the `$app['paths']['app']` variable to always get the correct path, regardless of how Bolt is installed. See the (Paths section in Internals](/internals#paths) for more details.

There's a special function for adding jQuery to the outputted HTML. A lot of extensions might or might not require jQuery to function, and the developer of the HTML might have already included it. If several extensions added additional jQuery includes, your HTML would quickly become a mess at best. Most likely it will break, because having more than one instance of jQuery might cause conflicts in your page. 
If your extension requires jQuery, use the following:

<pre class="brush: php">
function init($app)
{

    $app['extensions']->addJquery();

}
</pre>

This will make sure jQuery is added to the outputted HTML, but only if it's not included by the theme developer already. It also will not be included more than once, even if several extensions have `addJquery()` in the `init()`-function. It will correctly detect jQuery if it's already present in the templates, whether the templates are using the minified version or not, and whether it's a local version or one that's hosted on a remote CDN.

The version of jQuery included will be the one that ships with Bolt. This will most likely be the most recent one, at the time of the release of the Bolt version that you are running. 

#### Add a Twig function or filter

Extensions can add Twig functions or filters to extend the templates used in the frontend. This example will add a function `{{ foo() }}` to use in the frontend templates:

<pre class="brush: php">
function init($app)
{

    // Initialize the Twig function
    $app['twig']->addFunction('foo', new \Twig_Function_Function('Namespace\twigFoo'));

}

/**
 * Twig function {{ foo("var1", "var2") }} in Namespace extension.
 */
function twigFoo($var1, $var2)
{

    return "Twig function Namespace.";

}
</pre>

Note that the Namespace must be included with `'Namespace\twigFoo'`, even though the function is defined within the namespace of the extension. This is because during the rendering of the templates, it is called from the context of the parsed Twig templates, so it won't be able to find the function if the namespace was omitted. 

You can also define a Twig filter for use in the frontend. The following example will add a filter 'bar', that can be used in the templates like `{{ "foo"|bar }}`. 

<pre class="brush: php">
function init($app)
{

    // Initialize the Twig filter
    $app['twig']->addFilter('bar', new \Twig_Filter_Function('Namespace\twigBar'));

}

/**
 * Twig filter {{ "var1"|bar("var2") }} in Namespace extension.
 */
function twigBar($var1, $var2)
{

    return "Twig filter Namespace.";

}
</pre>

Since these are just regular Twig functions/filters, you should familiarize yourself with how Twig works. Read the chapter [Extending Twig](http://twig.sensiolabs.org/doc/advanced.html) in the Twig documentation. 


Storage Events
--------------

These events are dispatched when content objects are saved or deleted.
Currently there are 4 events defined:

  - preSave - called before a content save
  - postSave - called after a content save
  - preDelete - called before a content delete
  - postDelete - called after a content delete

There are no events for specific content types. However you can use the passed \Bolt\StorageEvent to retrieve the following information:

  - $event->getId() - returns the id of the content
  - $event->getContentType() - returns the content type
  - $event->getContent() - returns the content (only available in preSave/postSave)

An example to log whenever a content has been saved.

<pre class="brush: php">
$app['dispatcher']->addListener(\Bolt\StorageEvents::postSave, 'postSave');

function postSave(\Bolt\StorageEvent $event)
{
    $entry = date('Y-m-d H:i:s').' '.$event->getContentType().' with id '.$event->getId().' has been saved'."\n";
    file_put_contents('storage.log', $entry, FILE_APPEND);
}
</pre>



Using your own `config.yml` file
--------------------------------

Extensions can use their own config files using the YAML format. It should be named `config.yml`, and it should be in the folder of your extension. To use it in a snippet callback, or a Twig function or modifier, use it like this: 

<pre class="brush: php">
function foo()
{

    $yamlparser = new \Symfony\Component\Yaml\Parser();
    $config = $yamlparser->parse(file_get_contents(__DIR__.'/config.yml'));

    // Make sure a '$name' is set
    if (isset($config['name'])) {
        $name = $config['name'];
    } else {
        $name = "default name"
    }

    return "Hello, $name.";

}
</pre>

Further reading
---------------

If you want to delve deeper into what you can and cannot do with extensions, see the chapter on [Bolt internals](/internals) for a detailed overview of the provided Bolt functionality, Silex objects and included libraries.

