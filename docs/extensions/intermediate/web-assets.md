---
title: Web Assets (CSS, JavaScript, Snippets & Widgets)
level: intermediate
---
Extension Building: Web Assets (CSS, JavaScript, Snippets & Widgets)
====================================================================

In this section, we'll explain how to use a Bolt extension to add web assets to
the target Bolt installation.

A web asset can be:

  * Cascading Style Sheet (CSS) files
  * JavaScript files
  * Snippets — A short fragment of HTML code for inserting in the DOM at
    required locations
  * Widget — A special mini function to generate HTML in predefined locations on
    a page

All asset files should be in your extension's `web/` directory, or a
sub directory of `web/`.

<p class="note"><strong>Note:</strong> Local extensions (often used for testing)
will not have their assets auto-copied to the web folder, see the <a href="../../howto/installing-local-extensions#step-4">how-to on the subject</a>
 for more info.</p>

<p class="note"><strong>Note:</strong> `setPriority` is subject to change in the next major release of Bolt.</p>

Registering Assets
------------------

The extension manager calls each extension's `registerAssets()` function to
retrieve an array of `\Bolt\Asset\AssetInterface` classes.

Bolt provides special class files for each of these, that are then registered on
a queue and only processed at final render of a page.

A simple example of an extension that registers some assets would look like:

```php
namespace Bolt\Extension\DropBear\KoalaCatcher;

use Bolt\Asset\File\JavaScript;
use Bolt\Asset\Snippet\Snippet;
use Bolt\Asset\File\Stylesheet;
use Bolt\Asset\Widget\Widget;
use Bolt\Extension\SimpleExtension;

/**
 * An extension for catching koalas.
 *
 * @author Kenny Koala <kenny@dropbear.com.au>
 */
class KoalaCatcherExtension extends SimpleExtension
{
    /**
     * {@inheritdoc}
     */
    protected function registerAssets()
    {
        return [
            new JavaScript('extension.js'),
            new Stylesheet('extension.css'),
            new Snippet(),
            new Widget(),
        ];
    }
}
```

Cascading Style Sheet (CSS) Files
---------------------------------

Style sheet asset objects for registration can be created using a
`Bolt\Asset\File\Stylesheet` class.

There are two ways to create these objects.

The first way is to simply pass the file name, relative to the extension's
`web/` directory. e.g.

```php
protected function registerAssets()
{
    return [
        new Stylesheet('koala.css'),
    ];
}
```

Style sheet classes have fluent setters for properties. So alternatively you can
create a blank object, and set the required properties. e.g.

```php
protected function registerAssets()
{
    $asset = Stylesheet::create()
        ->setFileName('koala.css')
        ->setLate(true)
        ->setPriority(5)
        ->setZone(Zone::BACKEND)
    ;

    return [
        $asset,
    ];
}
```

In the above example:

  * `create()` is a static factory method that returns a `Stylesheet` object
  * `setFileName()` sets the file name
  * `setLate(true)` tells the asset injector to insert the `<link rel="stylesheet" href="path/web/koala.css">`
    at the end of the HTML `<body>`
  * `setPriority(5)` tells the injector when to insert the stylesheet. Lower
     priorities are inserted first
  * `setZone(Zone::BACKEND)` tells the injector to insert the `<link rel="stylesheet" href="path/web/koala.css">`
    on back-end pages, instead of the default of front-end

<p class="note"><strong>Note:</strong> The <code>Stylesheet::create()</code>
method is only avaiable in Bolt 3.3+, to support older versions of Bolt use
<code>(new Stylesheet())</code>.</p>

**NOTE:** To use the `Zone` class parameter, you should add the following `use`
statement to your extension class file:

```php
use Bolt\Controller\Zone;
```


JavaScript Files
----------------

JavaScript asset objects for registration can be created using a
`Bolt\Asset\File\JavaScript` class.

There are two ways to create these objects.

The first way is to simply pass the file name, relative to the extension's
`web/` directory. e.g.

```php
protected function registerAssets()
{
    return [
        new JavaScript('dropbear.js'),
    ];
}
```

JavaScript classes have fluent setters for properties. So alternatively you can
create a blank object, and set the required properties. e.g.

```php
protected function registerAssets()
{
    $asset = JavaScript::create()
        >setFileName('dropbear.js')
        ->setLate(true)
        ->setPriority(5)
        ->setAttributes(['defer', 'async'])
        ->setZone(Zone::BACKEND)
    ;

    return [
        $asset,
    ];
}
```

In the above example:

  * `create()` is a static factory method that returns a `JavaScript` object
  * `setFileName()` sets the file name
  * `setLate(true)` tells the asset injector to insert the `<script src="path/web/dropbear.js"></script>`
     at the end of the HTML `<body>`
  * `setPriority(5)` tells the injector when to insert the script. Lower
     priorities are inserted first
  * `setAttributes(['defer', 'async'])` adds `defer` and `async` to the
    `<script>` tag
  * `setZone(Zone::BACKEND)` tells the injector to insert the `<script src="path/web/dropbear.js"></script>`
    on back-end pages, instead of the default of front-end

<p class="note"><strong>Note:</strong> The <code>JavaScript::create()</code>
method is only avaiable in Bolt 3.3+, to support older versions of Bolt use
<code>(new JavaScript())</code>.</p>

**NOTE:** To use the `Zone` class parameter, you should add the following `use`
statement to your extension class file:

```php
use Bolt\Controller\Zone;
```

Snippets
--------

A 'snippet' in the context of Bolt extensions is nothing more than a short
fragment of code, that gets inserted in a certain place in the templates on the
website.

This fragment can either be a string to be inserted directly, or it can be the
return value of a callback string.

Snippet asset objects for registration can be created using a
`Bolt\Asset\Snippet\Snippet` class.

Snippet classes have fluent setters for properties. e.g.
```php
protected function registerAssets()
{
    $asset = Snippet::create()
        ->setCallback([$this, 'callbackSnippet'])
        ->setLocation(Target::AFTER_META)
        ->setPriority(5)
    ;

    return [
        $asset,
    ];
}

public function callbackSnippet()
{
    return '<meta name="description" content="Get your koala catcher here!" />';
}
```

In the above example:

  * `create()` is a static factory method that returns a `JavaScript` object
  * `setCallback([$this, 'callbackSnippet'])` calls the extension's
    `callbackSnippet()` function during render to get the content of the snippet
  * `setLocation(Target::AFTER_META)` tells the asset injector to insert the
    snippet after other `<meta>`
  * `setPriority(5)` tells the injector when to insert the snippet. Lower
     priorities are inserted first

<p class="note"><strong>Note:</strong> The <code>Snippet::create()</code>
method is only avaiable in Bolt 3.3+, to support older versions of Bolt use
<code>(new Snippet())</code>.</p>

**NOTE:** To use the `Target` and `Zone` class parameters, you should add the
following `use` statements to your extension class file:

```php
use Bolt\Asset\Target;
use Bolt\Controller\Zone;
```

For more information on snippets, see the [Snippets][] page.


Widget
------

Widgets in Bolt are small blocks of content, that can be used to display content.

By design, the widget has no access to the context of the page it is being
displayed on. This is because a Widget is a small block of content that can be
placed on various locations on a website. This should work regardless of what's
on the page.

Or, to flip it around: If the contents of a widget would change according to
what's on the page, it would become a part of the page itself, and strictly
speaking it wouldn't be considered a 'widget' any more.

Widget asset objects for registration can be created using a `Bolt\Asset\Widget\Widget`
class.

Widget classes have fluent setters for properties. e.g.

```php
protected function registerAssets()
{
    $asset = Widget::create()
        ->setZone(Zone::FRONTEND)
        ->setLocation(Target::WIDGET_FRONT_FOOTER)
        ->setCallback([$this, 'callbackWidget'])
        ->setCallbackArguments(['arg1' => 'Kenny', 'arg2' => 'Koala'])
        ->setDefer(true)
        ->setPriority(5)
    ;

    return [
        $asset,
    ];
}

public function callbackWidget($arg1, $arg2)
{
    return $this->renderTemplate('koala.twig', [$arg1, $arg2]);
}

```

In the above example:

  * `create()` is a static factory method that returns a `Widget` object
  * `setZone(Zone::FRONTEND)` tells the asset injector to only act on the
     frontend
  * `setLocation(Target::AFTER_META)` tells the asset injector to insert
     the snippet after other `<meta>`
  * `setCallback([$this, 'callbackWidget'])` calls the extension's `callbackWidget()`
     function during render to get the content of the widget
  * `setCallbackArguments(['arg1' => 'Kenny', 'arg2' => 'Koala'])`
  * `setDefer(true)` defers rendering of the widget to a separate request,
     so it doesn't block the initial rendering of the page
  * `setPriority(5)` tells the injector when to insert the widget. Lower
     priorities are inserted first

<p class="note"><strong>Note:</strong> The <code>Widget::create()</code>
method is only avaiable in Bolt 3.3+, to support older versions of Bolt use
<code>(new Widget())</code>.</p>

**NOTE:** To use the `Target` and `Zone` class parameters, you should add the
following `use` statements to your extension class file:

```php
use Bolt\Asset\Target;
use Bolt\Controller\Zone;
```

For more information on widgets, see the [Widgets](../intermediate/widgets) page.
