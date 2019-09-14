---
title: Setting Up Bolt Sites to be Easily Extendable
level: intermediate
listed: true
---
Setting Up Bolt Sites to be Easily Extendable
=====================================================

When you first start on a project with Bolt it's generally quite easy to
customise most frontend and even backend features to behave how you need it to.
Inevitably though throughout the build and even continuous lifecycle of a
project you'll get requests for features or behaviours to be added that can't
be done with an out-of-the-box install.

There is the extension marketplace where Bolt users share features to enhance
Bolt but if you can't find exactly what you need then it's often essential to
add your own customisations.

Since version 3.4 Bolt has made it much easier to do this with the addition of
**Bundles** which are small extensions that sit locally on your project without
needing to be submitted to the public extensions marketplace.

There's a very simple process that everyone can take to make it much easier to
add this custom functionality to a project and it's often best to do this at
the start of a project so it's easy to add extra features as you go along.


### Step 1: Use the Bolt Composer install package

With each new release of Bolt there's also an update to the composer install
package so installing via this process is the best way to ensure your project
structure is correct. All you need to do from a command-line is run:

```
composer create-project bolt/composer-install:^3.5 <MYPROJECT> --prefer-dist
```

%%VERSION%% is the current latest release but you can change that as each new
release is made. Also change `<MYPROJECT>` to the name of your project, Bolt
will then install a new project in the current directory named whatever you
setup there.


### Step 2. Create a Bolt Configuration File

Bolt looks for a file named `.bolt.yml` in the root of your project where you
can define extensions and other adjustments to Bolt's default behaviour. If you
don't already have this then create it.


### Step 3. Enable the Customisation Bundle

If you installed Bolt via the composer install method then you just need to add
this to your empty `.bolt.yml` file.

```yaml
extensions:
    - Bundle\Site\CustomisationExtension
```

This tells Bolt that you are going to add custom functionality to the file
located in `src/Site/CustomisationExtension.php`. At the moment that file is
empty but in the future we will be able to add custom code in there.


### Step 4. Make your own Application class

This may not be necessary for all projects but for more experienced developers
it's always good to remember that Bolt can be used as a dependency of your main
application, just as Bolt extends a Silex application and adds functionality on
top, you can extend Bolt and add any custom behaviour you like. You can also
add a custom Application class to your Bolt config too, here's the steps to do
it.

First create your application class, make an empty file at `src/Site/Application.php`

In that file put the following code:

```php
<?php

namespace Bundle\Site;

use Bolt\Application as Bolt;

class Application extends Bolt
{
}

```

Secondly open up your `.bolt.yml` file and add this new section underneath
where we previously defined our extensions.

```yaml
application: Bundle\Site\Application
```

That's all there is to it, obviously now our custom Application class does not
do anything on top of what Bolt does, but we now have the structure setup to
change it in the future.


### Step 5. Overriding the Frontend Controller

A common request is to add an extra page or URL to the site that does some
custom functionality that can't be handled in a Bolt page. As with the
application class above, if we swap out the default controller for our own
class, then we can easily add our own controller actions. For more advanced
developers this also allows you to override the default behaviour of Bolt's
built-in actions.

Firstly we create an empty controller class at `src/Site/FrontendController.php`

Inside that file use the following code:

```php
<?php

namespace Bundle\Site;

use Bolt\Controller\Frontend as BoltController;

class FrontendController extends BoltController {

}
```

Again, at this stage our controller is empty but in the future we will be able
to add our own behaviours into this class.

Finally we need to tell Bolt to use our controller rather than the built-in
one, to do this we go back to the custom Application class we created in the
step above. Open up the file at `src/Site/Application.php` and update it to
look like this:

```php
<?php

namespace Bundle\Site;

use Bolt\Application as Bolt;

class Application extends Bolt
{
    public function initProviders()
    {
        parent::initProviders();
        $this['controller.frontend'] = $this->share(
            function () {
                return new FrontendController();
            }
        );
    }
}
```

You will see we've added a new method that overrides Bolt's default
`initProviders()` method.

All we do is call the parent method so the default providers all still get
loaded, then after Bolt has set itself up, we jump in and overwrite the
`controller.frontend` service to point to our own controller instead.

You can do this for any Built-in Bolt service but that is something you can
explore in the future.


### How to Use Your New Extendable Structure

Finally here's a couple of simple examples of how to do basic additions.
Firstly we'll add a new custom page to our site that sits outside of Bolt.

In routing (`config/bolt/routing.yml) add this:

```yml
helloworldpage:
    path: /hello-world
    defaults:
        _controller: controller.frontend:helloWorld
```

and then add this inside the body of the class in `src/Site/FrontendController.php`

```php
    public function helloWorld(Request $request)
    {
        return new Symfony\Component\HttpFoundation\Response('<h1>Hello World!<h1>');
    }
```

Now you can visit `http://yoursite.com/hello-world` and see your new custom
page.

It's worth remembering that now you have your extension class defined you can
use it to do all the things described in the documentation,
[the basics are here][basics] and some slightly more advanced ideas are
discussed in [the intermediate section][intermediate].

For this example we'll make a new Twig filter, in our templates we sometimes
want to really shout about our content so we want a filter that we can use like
this: `{{ record.title|shout }}` which will turn `Our Latest News` into
`OUR LATEST NEWS!!`

All we need to do is add a couple of methods to our Customisation class. Open
the file at `src/Site/CustomisationExtension.php` and adjust it to look like
this:

```php
<?php

namespace Bundle\Site;

use Bolt\Extension\SimpleExtension;

class CustomisationExtension extends SimpleExtension
{
    protected function registerTwigFilters()
    {
        return [
            'shout' => 'shoutFilter',
        ];
    }

    public function shoutFilter($text)
    {
        return strtoupper($text) . '!!';
    }

}

```

That's all you need to do in order to get your basic Twig filter working, now
go into a Bolt template and start making your content louder.


[basics]: ../extensions/basics
[intermediate]: ../extensions/intermediate
