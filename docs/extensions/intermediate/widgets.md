---
title: Creating widgets
level: advanced
---
Extension Building: Creating widgets
====================================

In Bolt you can add widgets to both the frontend as well as the backend of the application. Creating widgets in Bolt is pretty straightforward. It usually consists of two steps, especially if you're adding widgets to the 'frontend':

 - Configuring the widget to assign it to a position, being a named area in the
   template, where it's allowed to be shown.
 - Adding a widget position to your template or theme, making the widget show
   up in that position.

To register a widget for use in an extension, use the following.

```
    protected function registerAssets()
    {
        $widgetObj = new \Bolt\Asset\Widget\Widget();
        $widgetObj
            ->setZone('frontend')
            ->setLocation('..')
            ->setCallback([$this, 'functionName'])
            ->setCallbackArguments([])
            ->setDefer(true)
        ;

        return [ $widgetObj ];
    }
```

If `defer` is true, the rendering of the widget is done in a seperate request,
so it doesn't potentially block the rendering of the page. It does this by
writing out an empty `<div>`, into which the rendered HTML is inserted via an
ajax call.

The cache duration, if set using `->setCacheDuration()`, keeps the rendered
widget in cache for a set amount of time. This can be useful if the widget
takes some time to render, but doesn't display real time information.

Note: It is the responsibility of the developer of the widget to check for
authentication of a widget that is rendered 'defered' via Ajax.

Note: You should not use 'defer' for the `login_top`, `login_middle` and
`login_bottom` positions. If you use defer on those, they will not show up when
you're not already logged on.

Locations
---------

You are free to choose any name for the position in the 'frontend', but it is
good practice to stick with the default names if possible. This way it'll be
easier for developers to use extensions in your theme, without having to dig
through the template code to find which widget areas are defined.

For the 'backend', you should stick to the names listed below, because these
are the only ones that are used.

Commonly used widget positions for the frontend are:

 - main_top
 - main_break
 - main_bottom
 - aside_top
 - aside_middle
 - aside_bottom
 - footer


Defined positions for the backend are:

 - dashboard_aside_top
 - dashboard_aside_middle
 - dashboard_aside_bottom
 - dashboard_below_header
 - dashboard_bottom
 - overview_aside_top
 - overview_aside_middle
 - overview_aside_bottom
 - overview_below_header
 - overview_bottom
 - editcontent_aside_top
 - editcontent_aside_middle
 - editcontent_aside_bottom
 - editcontent_below_header
 - editcontent_bottom
 - files_below_header
 - files_bottom
 - editfile_below_header
 - editfile_bottom
 - login_top
 - login_middle
 - login_bottom
 - edituser_aside_top
 - edituser_aside_bottom
 - edituser_below_header
 - edituser_bottom
 - users_aside_top
 - users_aside_bottom
 - users_below_header
 - users_bottom

Styling widgets, using CSS
--------------------------

See the page [Using Widgets][widgets], for more information.

Using widgets in templates / themes
-----------------------------------

See the page [Using Widgets][widgets], for more information.

Getting the global context
--------------------------

A Bolt widget has no so-called context, by design. Normally, a widget can be
used on a number of locations in a website, as chosen by the implementor of the
theme. As such, when developing the widget, we shouldn't make assumptions as to
where it's being used.

In rare cases you might still need to get the context from the Twig templates,
in order to provide a contextual widget. To do this, use the following, before
rendering your widget's template:

```php
    public function widgetCallback($widget)
    {
        $app = $this->getContainer();

        // Data to pass into the widget
        $data = [
            'record'  => $record,
            'widget'  => $widget,
            'content' => $widget['content'],
        ];

        // Grab the current Twig globals, and prepare to pass them back in. 
        $data = array_merge($data, $app['twig']->getGlobals());

        return $this->renderTemplate($widget['template'], $data);
    } 
```

<p class="note"><strong>Note:</strong> This 'trick' will only work for widgets that are not deferred.</p>


Examples
--------

### Adding a button to the frontend, right above the footer on every page

Initialise the widget:

```
        use Bolt\Asset\Widget\Widget;

        …

        $widget = new Widget();
        $widget
            ->setZone('frontend')
            ->setLocation('footer')
            ->setCallback([$this, 'frontendButton'])
        ;
```

And add the callback function

```
    public function frontendButton()
    {

        $html = sprintf("<a href='%s' class='btn btn-default'><i class='fa fa-%s'></i> &nbsp;%s</a>",
            $this->app['url_generator']->generate('dashboard'),
            'heart',
            'Click me!'
            );

        return $html;
    }
```

### Adding a widget to the sidebar on the dashboard

Add the widget:

```
        $widget = new \Bolt\Asset\Widget\Widget();
        $widget
            ->setZone('backend')
            ->setLocation('dashboard_aside_top')
            ->setCallback([$this, 'backendDashboard'])
        ;
```

Add the callback function:

```
    public function backendDashboard()
    {
        $currentuser = $this->app['users']->getCurrentUser();
        $twigvars = [ 'title' => "Hello, " . $currentuser['displayname'] ];

        // Render the template, and return the results
        return $this->renderTemplate('dashboard_widget_aside.twig', $twigvars);
    }
```

And create a template file like `templates/dashboard_widget_aside.twig`:

```
<div class="panel panel-default panel-news">
    <div class="panel-heading">
        <i class="fa fa-fw fa-smile-o"></i>
        {{ title }}
    </div>

    <div class="panel-body">
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Et certamen honestum et disputatio splendida! omnis est enim de virtutis dignitate contentio.
        </p>

        <p>
            <a href="{{ path('dashboard') }}" class="btn btn-secondary">
                <i class="fa fa-music"></i>
                Click me!
            </a>
            <a href="{{ path('about') }}" class="btn btn-default">
                <i class="fa fa-thumbs-up"></i>
                No, click me!
            </a>
        </p>

    </div>
</div>
```

The result of this is:

![screenshot 2015-10-18 09 57 07](https://cloud.githubusercontent.com/assets/1833361/10563205/b7cc1a62-757f-11e5-9b03-bdf3974e9040.png)

To see a real-world example of Widgets in an extension, be sure to inspect the
Base Widget extension as a decent example. The extension can be installed
directly from Bolt's 'Extras' menu. More information about the extension can be
found on the [Bolt extensions website][boltext]. The full [readme can be found
here][read].

[widgets]: ../../templating/widgets
[boltext]: http://extensions.bolt.cm/view/082a7153-8205-11e5-86fe-396a68cabe59
[read]: https://github.com/bolt/base-widget/blob/master/README.md
