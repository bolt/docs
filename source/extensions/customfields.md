Extensions: Providing Custom Fields
===================================

To show some of the possiblilities available to extension developers this series
of tutorials goes through the process of creating an extension that adds specific
functionality to Bolt.

#### Task: Add a Colour Picker to Bolt

Wouldn't it be good if we could allow editors of your site to add a splash of colour to a page banner?

Possibly not, but that's no reason to not try, so we're going to add a new field type to Bolt that allows
content editors to pick a colour. Here's a step-by-step guide of how to build and test this extension.


#### Step 1: Configure the extension

As with all Bolt extensions we need to get started with a configuration `composer.json` file. So we make a new
directory for our extension called `bolt-colourpicker` and then within the directory type `git init`. This gets
us setup with a clean empty project.

Next comes the configuration, we'll keep things nice and simple so here's the essentials:

```
{
    "name": "bolt/colourpicker",
    "description": "An extension to add a colourpicker as a field type within Bolt",
    "type": "bolt-extension",
    "require": {
        "bolt/bolt": ">1.9,<=2.9.999"
    },
    "license": "MIT",
    "authors": [{"name": "Ross Riley", "email": "riley.ross@gmail.com"}
    ],
    "autoload": {
        "files": ["init.php"],
        "psr-4": {
            "Bolt\\Extensions\\Colourpicker\\": ""
        }
    }
}
```


Most of this file is providing meta information for the Marketplace, but the `autoload` section is important for loading
the extension. The files section defines the file that will be loaded first of all. 

If you've not yet used PSR-4 autoloading for your PHP code it's probably good at this point to see some examples from the 
standard docs <a href="https://github.com/php-fig/fig-standards/blob/master/accepted/PSR-4-autoloader-examples.md">here</a>.

#### The initialization File

Bolt will load up an initialization file which allows us to register our extension. As configured in the `composer.json` file
above we can now create a file called `init.php` that looks like this.

```
// init.php

use Bolt\Extensions\Colourpicker\Extension;

$app['extensions']->register(new Extension($app));
```

#### The Extension Class

Now it's time for the heavy lifting, we need to write our extension class. To conform to the standard Bolt Extension
interface we need to implement two methods on our class, the `initialize()` method and the `getName()` method.

First of all, here's the final version of the file that we need to make the extension, then we'll have a quick run-through
of why we need each of these setup commands.

```
// ./Extension.php

namespace Bolt\Extensions\Colourpicker;

use Bolt\Application;
use Bolt\BaseExtension;

class Extension extends BaseExtension
{
    
    public function __construct(Application $app)
    {
        parent::__construct($app);
        $this->app['config']->getFields()->addField(new ColourPickField());
        if ($this->app['config']->getWhichEnd()=='backend') {
            $this->app['htmlsnippets'] = true;
            $this->app['twig.loader.filesystem']->prependPath(__DIR__."/twig");
        }
    }
  

    public function initialize() {
        $this->addCss('assets/colourpicker.css');
        $this->addJavascript('assets/colourpicker.js', true);
        $this->addJavascript('assets/start.js', true);
    }

    public function getName()
    {
        return "colourpicker";
    }

}
```

Hopefully our `getName()` and `initalize()` methods should be fairly self-explanatory. Our colourpicker is primarily based on
the <a href="https://github.com/tkrotoff/jquery-simplecolorpicker">jQuery Simple Colorpicker</a> so we need to add both
the css and javascript assets to the Bolt markup, we also add a `start.js` file which will initalize the javascript. 

The constructor firstly calls the BaseExtension constructor, this is important if your extension needs to provide its own 
constructor method.

Next we add our own custom field onto the avaialable field object (we'll look at the makeup of this file in the next section).
The next line is an important line to remember if you want to provide additional functionality for Bolt, since a standard Bolt
app has two main areas; the frontend and the backend. The if statement `if ($this->app['config']->getWhichEnd()=='backend')` 
allows us to query which part of the app is currently loaded and only apply our functionality where relevant. Our line specifies
that the functionality we are adding only applies to the backend.

When we need to add custom js and css as we have done in the `initialize()` method we need to tell Bolt. The line
`$this->app['htmlsnippets'] = true;` enables them for this request.

Finally we want to add our extension's template directory to the system so that Bolt knows it needs to look here for templates.
The line `$this->app['twig.loader.filesystem']->prependPath(__DIR__."/twig");` puts the directory `twig` in our extension
onto the available list of directories.

#### The Template File

Finally we need a template file that specifies how our field looks in the content editor. Here's how our colourpicker
template takes shape:

```

{#=== Options ============================================================================#}

{% set attr_opt = {
    class:        field.class|default(''),
    name_id:      key,
    required:     field.required|default(false),
    readonly:     field.readonly|default(false)
}%}

{#=== FIELDSET ============================================================================#}

<fieldset class="colourpicker">
    <div class="col-sm-12">
        <div>
            <label class="control-label">{{field.label|default(key)}}</label>
        </div>
        <select data-colourpicker {{ macro.attr(attr_opt) }}>
            {% for key, value in field.values %}
                {% set isSelected =  (key == context.content.get(key|capitalize)) %}
                <option value="{{key}}"{% if isSelected %} selected="selected"{% endif %}>
                    {{value}}
                </option>
            {% endfor %}
        </select>
    </div>
</fieldset>
```

As you can see the field under the js is a select dropdown of colour options. When you define your own field, all of the options
specified in `contenttypes.yml` are available within the `field` object. Some of the potential values are accessed in the options
block. In the case of our colourpicker field, we will look for a list of `values` and use the key / value to build the option list. 


#### The Final Completed Extension

We now have a completed extension and can add it to our Bolt site. Firstly we need to add the field to our `contenttypes.yml`
file. We add a field like this:

```
    banner:
        type: colourpicker
        label: "Choose A Banner Colour"
        values: 
            "#000": Solid Black
            "#E1E1E1": Almost White
            "#444": Dark Grey
            "#FF0011": Bright Red
```


**Our new Colourpicker Field**

<img src="/files/extensions-tutorial-colourpicker.png"></a><br>


#### The Source Code

It's a good idea to look at the final source code for this extension to help you get started making a similar one.
There is a repository on <a href="https://github.com/rossriley/bolt-extension-colourpicker">Github here</a>.

