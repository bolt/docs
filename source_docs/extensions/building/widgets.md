Extension Building: Creating widgets
====================================

In Bolt you can add widgets to both the frontend as well as the backend of the application. Creating widgets in Bolt is pretty straightforward. It usually consists of two steps, especially if you're adding widgets to the 'frontend':

 - Configuring the widget to assign it to a position, being a named area in the
   template, where it's allowed to be shown.
 - Adding a widget position to your template or theme, making the widget show
   up in that position.

To register a widget for use in an extension, use the following.

```
    $widget = new \Bolt\Asset\Widget\Widget();
    $widget
        ->setZone('frontend')
        ->setLocation('..')
        ->setCallback([$this, 'functionName'])
        ->setCallbackArguments([])
        ->setDefer(true)
    ;
    $this->addWidget($widget);
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

Examples
--------

### Adding a button to the backend, right above the footer on every page

Initialise the widget:

```
        use Bolt\Asset\Widget\Widget;

        …

        $widget = new Widget();
        $widget
            ->setZone('backend')
            ->setLocation('footer')
            ->setCallback([$this, 'backendButton'])
        ;
        $this->addWidget($widget);
```

And add the callback function

```
    public function backendButton()
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
        $this->addWidget($widget);
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


[boltext]: http://extensions.bolt.cm/view/082a7153-8205-11e5-86fe-396a68cabe59
[read]: https://github.com/bolt/base-widget/blob/master/README.md
