Project specific modifications
==============================

If you are working on a Bolt project, you can add your own code to create
custom functionalities. You can do this by adding this code to the `src/`
folder in your project. After initially setting up a new project, it looks like
this:

```bash
src/
├── Entity/
└── Kernel.php
```

The `Kernel.php` is Bolt's kernel, which extends Symfony's kernel. The `src/`
folder itself is configured to make `App\` classes available as services. With
Autowiring and Dependency Injection. The `Entity` folder is configured for
Doctrine Entity mappings.

For example, to make a very basic extension, create a new file called `src/Extension.php`:

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

Now, if you run the following, you should see the new extension listed in your terminal:

```bash
bin/console extensions:list

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

| Topic |    |
|-------|----|
| **Extension** | Bolt's BaseExtension class. Has some helpers and other functionality commonly used in an Extension scope |
| **Twig** |
| **Command** |
| **Listener** |
| **Widget** |
