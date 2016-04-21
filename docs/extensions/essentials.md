---
title: The Basics of Extensions
---
Extensions: Essentials
======================

What can you do with Bolt extensions?
-------------------------------------

The functionality of Bolt can be extended by creating Extensions. The
possibilites are almost limitless but here are a few of the basic ideas that can
be accomplished:

 - Add Twig tags or modifiers, for use in the templates in your themes.
 - Add 'hooks' in the templates to either insert small snippets of HTML or the
   result of a callback-function in the templates after rendering.
 - Create custom fields that can be used in contenttypes.yml.
 - Create themes that other users can copy and use as a baseline.
 - Add custom upload handlers that support different filesystems.
 - Add a custom thumbnail generator that does more advanced creation of thumbs

A Bolt extension has to follow a few strict rules, so it can be auto-loaded by
Bolt and to make sure it won't interfere with other Bolt functionality or even
other Extensions. To do this, we have to keep the following rules:

 - An extension must be placed on the Extension Marketplace.
 - Each extension has its own PSR-4 namespace.
 - If the extension has its own configuration, it should be in a `config.yml`
   file in the extension folder.
 - The extension should come with a 'readme' file. It must be named `readme.md`,
   and is written in the Markdown format.
 - The `extension` defines two methods named `getName()`
   and `initialize()`.
 - The 'entry points' for callbacks and Twig functions and modifiers must be
   functions in the defined namespace. Additional code can be procedural or
   implemented in classes.

To get the hang of how extensions work, it's best to have a look for other popular
extensions on the Marketplace. They all have a link to the source code on the information
page..

Coding your extensions
----------------------

Because Bolt is written in PHP, it should be no surprise that the extensions
must also be written in PHP. Bolt is built upon the awesome
[Silex micro- framework][silex], and uses a lot of components from the
[Symfony framework][symfony]. When coding your extensions, you should use as
much of the functionality provided by Silex and the included components as
possible. Don't re-invent the wheel, and things like that.

See the chapter on [Bolt internals](/internals/bolt-internals) for a detailed overview of the
provided Bolt functionality, Silex objects and included libraries.

Bolt strives to adhere to [the PSR-2 coding style][psr2].
When writing your extensions, you should try to do the same.

The `initialize()` and `getName()` functions
-----------------------------------

Every extension needs to have a function named 'initialize()' in its registered
extension class. The initialize() function is called for each page request. It's
executed before content is retrieved from the database or the templates are
parsed. In general, the initialize() function is used to set up hooks or
functionality that is used later on in the process of outputting a page.

The `getName()` method tells Bolt how you want the extension to be referred to.
The initialized extension object will be mounted onto the main Bolt Application,
so, for instance, using the following method:

```
function getName()
{
    return "widgetpicker";
}
```

When the extension is registered a shareable instance of the extension will be
available at `$app['extensions.widgetpicker']`


### initialize()


The initialize() function is called for the initialisation of each active
extension. It's used to set up functionality to be used in the templates of for
Twig function. It looks like this:

```
function initialize()
{

        $this->addSnippet('endofbody', 'facebookScript');
        $this->addTwigFunction('facebooklike', 'facebookLike');
}
```


As you can see the function is called without a parameter, and basically
contains the entirety of the Bolt application and objects. As such, it is often
vital to attach your functionality to whatever it should be attached to. The
init function can return `true` or `false` to denote whether the initialisation
was successful.

In the case of `initialize()` it's often used to do the following:

  - Initialize a snippet, either as a 'string' or a 'callback function'
  - Add a Javascript and/or CSS file to the output of the frontend pages
  - Make sure jQuery is included, if needed by your extension
  - Initialize a Twig function or filter for use in the theme templates.

Initialize a snippet
--------------------

A 'snippet' in the context of Bolt extensions is nothing more than a short
fragment of code, that gets inserted in a certain place in the theme templates
on the frontend of the website. This fragment can either be a string to be
inserted directly, or it can be the return value of a callback string. The
`addSnippet()` function takes three parameters, with the third being
optional. The first is the position of the insertion point. The second one is
either a string to insert or the name of a callback function. The third,
optional parameter will be passed on to the callback function.

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

```
function initialize()
{
    $this->addSnippet('endofbody', '<!-- a snippet of HTML -->');
}
```

To insert a snippet using a callback function, use the following. You can pass
one extra optional variable, which can be a simple scalar or an array.

```
function initialize()
{
    $this->addSnippet('endofbody', 'snippetbar', $foo);
}

function snippetbar($foo)
{
    return "<b>Var is $foo.</b>";
}

```

However, don't use this to pass a 'live' version of `$app`. In the callback
function this will already be available as `$this->app`.


The most important locations have aliases that are mainly for ease of remembering:

 - `startofhead` is aliased to: `beforeheadmeta`, `beforeheadjs` and `beforeheadcss`
 - `endofhead` is aliased to: `afterheadmeta`, `afterheadjs` and `afterheadcss`
 - `startofbody`is aliased to: `beforebodyjs` and `beforebodycss`
 - `endofbody` is aliased to: `afterbodyjs` and `afterbodycss`


Add a CSS or Javascript file
----------------------------

You can use the `initialize()` function to add CSS or Javascript files to the
outputted HTML in the frontend. To do so, use the `addJavascript()` and
`addCSS()` functions:


```
function initialize()
{
    // Add CSS file
    $this->addCSS($this->app['resources']->getPath('extensions/Namespace/assets/namespace.css'));

    // Add javascript file
    $this->addJavascript(
        $this->app['resources']->getPath('extensions/Namespace/assets/namespace.js'),
        array('late' => true, 'priority' => 1000)
    );
}
```

Both of these functions take three parameters:

 - An absolute path to the desired .js or .css file. Use 
   `$this->app['resources']->getPath()` function to always get the correct
   path, regardless of how Bolt is installed. See the [Paths section in Internals](/internals/bolt-
   internals#app8216paths8217) for more details.
 - An (optional) associative array:
   - `late`     — Either `true` (end of the HTML `<body>`) or `false` (inside HTML `<head>`) 
   - `priority` — Loading priority, any _lower_ value will get inserted before, while any _higher_ value will get inserted later.
   - `attrib`   — A string containing either/or 'defer', and 'async'

Be careful though. If you insert dependant code before the relevant JavaScript
itself, this will cause breakage.

There's a special function for adding jQuery to the outputted HTML. A lot of
extensions might or might not require jQuery to function, and the developer of
the HTML might have already included it. 

If several extensions added additional jQuery includes, your HTML would quickly
become a mess at best. Most likely it will break, because having more than one
instance of jQuery might cause conflicts in your page. If your extension 
requires jQuery, use the following:

```
function initialize()
{
    $this->addJquery();
}
```

This will make sure jQuery is added to the outputted HTML, but only if it's not
included by the theme developer already. It also will not be included more than
once, even if several extensions have `addJquery()` in the
`initialize()`-function. 

It will correctly detect jQuery if it's already present in the templates,
whether the templates are using the minified version or not, and whether it's a
local version or one that's hosted on a remote CDN.

The version of jQuery included will be the one that ships with Bolt. This will
most likely be the most recent one, at the time of the release of the Bolt
version that you are running.

If you want to retrieve a list of all assets added by extensions. You can use
`getAssets()` in your extension. Like so,

```
$assets = $this->getAssets();
$assets['js']; // all js files
$assets['css']; // all css files
```

Or if you want to retrieve them in a twig template, use `app.extensions.assets`.

```
{{ dump(app.extensions.assets) }}
```

If you need to remove all other extensions assets you can call `clearAssets()`.
This should only be done on an extension specific route and as a last recourse
as it denies other extensions access to addAsset. An example where this might
be needed is if another extension causes javascript errors with your javascript
on a backend view.

```
$this->clearAssets();
```

Add a Twig function or filter
-----------------------------

Extensions can add Twig functions or filters to extend the templates used in the
frontend. This example will add a function `{{ foo() }}` to use in the frontend
templates:

```
function initialize()
{
    // Initialize the Twig function
    $this->addTwigFunction('foo', 'twigFoo');
}

/**
 * Twig function {{ foo("var1", "var2") }} in Namespace extension.
 */
function twigFoo($var1, $var2)
{
    return "Twig function Namespace.";
}
```

Note that the Namespace must be included with `'Namespace\twigFoo'`, even though
the function is defined within the namespace of the extension. This is because
during the rendering of the templates, it is called from the context of the
parsed Twig templates, so it won't be able to find the function if the namespace
was omitted.

You can also define a Twig filter for use in the frontend. The following example
will add a filter 'bar', that can be used in the templates like `{{ "foo"|bar }}`.

```
function initialize()
{

    // Initialize the Twig filter
    $this->addTwigFilter('foo', 'twigBar');

}

/**
 * Twig filter {{ "var1"|bar("var2") }} in Namespace extension.
 */
function twigBar($var1, $var2)
{

    $str =  "Twig filter Namespace.";
    return new \Twig_Markup($str, 'UTF-8');

}
```

Since these are just regular Twig functions/filters, you should familiarize
yourself with how Twig works. Read the chapter [Extending Twig][exttwig] in the
Twig documentation.

### Using Twig functions in content records

As you might know, Bolt has two 'sandboxed' Twig environments, to prevent
possible security exploits in the templates. This is to prevent having a
careless developer or implementor allow a user to insert Twig tags where they
should not. If you want your extension's Twig function to be available inside a
contenttype's record field, you will need to explicitly add an `isSafe()`
function to your `Extension.php` file, that simply returns `true`:

```
public function isSafe()
{
    return true;
}
```

Note: You will _also_ need to set `allowtwig` to `true`, in your contenttype
definition. If either one of them isn't set, the twig tag will not work inside
the content. This way you have maximum control over where it works, and where it
doesn't. See also 'Field Definitions' in the page '[Contenttypes and Records][ct+r]'.

Adding storage events
---------------------

These events are dispatched when content objects are saved or deleted. Currently
there are 4 events defined:

  - preSave - called before a content save
  - postSave - called after a content save
  - preDelete - called before a content delete
  - postDelete - called after a content delete

There are no events for specific content types. However you can use the passed
`\Bolt\Events\StorageEvent` to retrieve the following information:

  - $event->getId() - returns the id of the content
  - $event->getContentType() - returns the content type
  - $event->getContent() - returns the content object (only available in preSave/postSave)
  - $event->isCreate() - returns `true`, `false` or `null` depending on whether the content record was created, updated or deleted.
    - `true` - Record creation event
    - `false` - Record update event
    - `null` - Record deletion event

An example to log whenever a content has been saved.

```
$app['dispatcher']->addListener(\Bolt\Events\StorageEvents::POST_SAVE, array('MyClass', 'postSaveCallback'));

function postSaveCallback(\Bolt\Events\StorageEvent $event)
{
    $id = $event->getId();
    $contentType = $event->getContentType();
    $entry = date('Y-m-d H:i:s').' '.$contentType.' with id '.$id.' has been saved'."\n";
    file_put_contents('storage.log', $entry, FILE_APPEND);
}
```

Using your own `config.yml` file
--------------------------------

Extensions can use their own config files using the YAML format. It should be
named `config.yml.dist`, and it should be in the folder of your extension. Bolt will copy it as `{extension-name}.{vendor-name}.yml` into `/app/config/extensions` when it doesn't already exist there. The extension configuration will be automatically loaded. To use it in a snippet callback, or a Twig function or modifier, use it like this:

```
function foo()
{

    // Make sure a '$name' is set
    if (isset($this->config['name'])) {
        $name = $this->config['name'];
    } else {
        $name = "default name";
    }

    return "Hello, $name.";

}
```

Using the global configuration
------------------------------

Sometimes you might need a global configuration variable in your extension.
Usually you can read a global configuration variable like this:

```
function foo()
{
    $prefix = $this->app['config']->get('general/database/prefix', 'bolt_');
}
```


Overriding the default 'Content' class
--------------------------------------

Contenttypes can specify the class to be used for records of that contenttype.
This is useful for when you have a specific contenttype, and you would like to
provide extra functionality to that single contenttype.

An extension can then define that class, overriding / extending the default
behaviour of `\Bolt\Content`.

For example, in your contenttype, use:
```YAML
entries:
    name: Entries
    singular_name: Entry
    fields:
        title:
            type: text
            class: large
    (snip)
    class: \MyContent\Content
```

And in your extension, do:

```PHP
class Content extends \Bolt\Content
{
  function foo() {
    return "bar";
  }
}
```

Then, in your template, use:
```
  {{ entry.foo() }} /* prints 'bar' */
```


Further reading
---------------

If you want to delve deeper into what you can and cannot do with extensions, see
the chapter on [Bolt internals](/internals/bolt-internals) for a detailed
overview of the provided Bolt functionality, Silex objects and included
libraries.

[silex]: http://silex.sensiolabs.org
[symfony]: http://symfony.com/components
[psr2]: https://github.com/php-fig/fig-standards/blob/master/accepted/PSR-2-coding-style-guide.md
[exttwig]: http://twig.sensiolabs.org/doc/advanced.html
[ct+r]: /contenttypes-and-records#field-definitions
