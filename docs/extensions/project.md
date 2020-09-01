Project specific modifications
==============================

If you are working on a Bolt project, you can add your own code to create
custom functionalities. This means that if you're working on a project that
requires custom functionality, you are not required to create an extension. You
can incorporate your code in the Project, since Bolt is a standard Symfony
application.

You can do this by adding your custom code to the `src/` folder in your
project. After initially setting up a new project, it looks like this:

```bash
src/
├── Entity/
└── Kernel.php
```

The `Kernel.php` is Bolt's kernel, which extends Symfony's kernel. The `src/`
folder itself is configured in `config/services.yaml` to make `App\` classes
available as services. This includes full Autowiring and Dependency Injection
for your own classes. The `Entity` folder is configured for Doctrine Entity
mappings.

For example, to make a very basic extension, simply create a new file called
`src/Foobar.php` with the following contents:

```php
<?php

namespace App;

use Bolt\Extension\BaseExtension;

class Foobar extends BaseExtension
{
    public function getName(): string
    {
        return "A very simple extension";
    }

    public function initialize(): void
    {
        dump('it works!');
    }
}
```

<p class="note"><strong>Note:</strong> The name of the PHP class and the filename
should match. Like <code>class Foobar</code> and <code>Foobar.php</code> in the
example above. It's also case sensitive, so don't mix up "Foobar" and "FooBar".
</p>

Now, if you run the following, you should see the new extension listed in your terminal:

```bash
$ bin/console extensions:list

 Currently installed extensions:
 --------------------------------------- -----------------------------------
  Class                                   Extension name
 --------------------------------------- -----------------------------------
  App\Foobar                              A very simple extension
  BobdenOtter\WeatherWidget\Extension     Dashboard Weather Widget
  Bolt\NewsWidget\Extension               Dashboard News Widget
 --------------------------------------- -----------------------------------
 ```

 If you open the project in a browser window, you'll see there's a `dump`
 statement (under the little crosshair icon) in the Debug Toolbar, saying "It
 works!".

See the page on [BaseExtension](baseextension) for more details on how it works.

