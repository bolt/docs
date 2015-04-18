Writing unit tests for an extension
===================================

If you would like to write unit tests for an extension you can very easily
piggy-back onto the Bolt core classes to test how the extension interacts with a
Bolt application.

There are a few things you will need to add to your extension to get setup.

Step 1: Modifications to composer.json
--------------------------------------

A few simple additions are needed to get Bolt installed as a dependency and your
tests namespaced. Use the following as an example, changing the name of your
test directory to suit.

```
{
    "name": "bolt/colourpicker",
    "description": "An extension to add a colourpicker as a field type within Bolt",
    "type": "bolt-extension",
    "require": {
        "bolt/bolt": ">1.9,<3.0.0"
    },
    "license": "MIT",
    "authors": [{"name": "Ross Riley", "email": "riley.ross@gmail.com"}
    ],
    "keywords": [
        "backend", "field", "colourpicker"
    ],
    "minimum-stability":"dev",
    "prefer-stable":true,
    "autoload": {
        "files": [
            "init.php"
        ],
        "psr-4": {
            "Bolt\\Extensions\\Bolt\\Colourpicker\\": "",
            "Bolt\\Extensions\\Bolt\\Colourpicker\\Tests\\": "tests"
        }
    },

    "extra": {
        "bolt-assets": "assets",
        "bolt-screenshots": [
            "screenshot.png"
        ]
    }
}

```

In the above example the important things to note are the `minimum-stability`
and `prefer-stable` settings. Then an additional PSR-4 namespace is added to
load tests from the `./tests` directory.

Step 2: Create a phpunit.xml.dist file
--------------------------------------

The example file below configures `PHPUnit`, place it in the root of the project
and adjust where needed.

```
<?xml version="1.0" encoding="UTF-8"?>
<phpunit backupGlobals="false"
         backupStaticAttributes="false"
         bootstrap="tests/bootstrap.php"
         colors="true"
         convertErrorsToExceptions="true"
         convertNoticesToExceptions="true"
         convertWarningsToExceptions="true"
         processIsolation="false"
         stopOnFailure="false"
         syntaxCheck="false">
    <testsuites>
        <testsuite name="unit">
            <directory>tests</directory>
        </testsuite>
    </testsuites>
    <filter>
        <blacklist>
            <directory>vendor</directory>
        </blacklist>
    </filter>
</phpunit>
```

You can note we refer to a test-bootsrap.php file that doesn't exist yet.

Step 3: Create a bootstrap.php file
-----------------------------------

This sets up a tmp dir to store required Bolt files and sets a couple of
constants.

Create the file `tests/bootstrap.php` containing the following:

```
<?php

define('TEST_ROOT',    __DIR__ . '/tmp');
define('PHPUNIT_ROOT', realpath(dirname(__DIR__) . '/vendor/bolt/bolt/tests/phpunit/unit/'));
define('BOLT_AUTOLOAD',  realpath(dirname(__DIR__) . '/vendor/autoload.php'));

@mkdir(TEST_ROOT . '/app/cache', 0777, true);
@mkdir(TEST_ROOT . '/app/config', 0777, true);
@mkdir(TEST_ROOT . '/app/database', 0777, true);

require_once BOLT_AUTOLOAD;
```

Step 4: Modify your init.php file
---------------------------------

Because we are executing the extension in a different context to normal, the
extension loader will not be included in the normal way so we need to add a
check to ignore the normal initialize if a Bolt app context is not provided.

All you need to do is add the below if isset condition around the extension
register line, for example:


```
namespace Bolt\Extensions\Bolt\Colourpicker;

if (isset($app)) {
    $app['extensions']->register(new Extension($app));
}
```

Step 5: Write some tests that extends `BoltUnitTest`
---------------------------------------------------

Here's the simplest test you can write, we test that the extension gets
registered correctly to the containing Bolt application.

For example, in `tests/ColourpickerTest.php` you can add:

```
<?php

namespace Bolt\Extensions\Bolt\Colourpicker\Tests;

use Bolt\Tests\BoltUnitTest;
use Bolt\Extensions\Bolt\Colourpicker\Extension;

/**
 * This test ensures the Colourpicker Loads correctly.
 *
 **/

class ColourpickerTest extends BoltUnitTest
{
    public function testExtensionLoads()
    {
        $app = $this->getApp();
        $extension = new Extension($app);
        $app['extensions']->register( $extension );
        $name = $extension->getName();
        $this->assertSame($name, 'colourpicker');
        $this->assertSame($extension, $app["extensions.$name"]);
    }
}

```

Step 6: Update `.gitignore`
---------------------------

Add the following to your `.gitignore` file:

```
composer.lock
vendor/
tests/tmp/
```

**NOTE:** Adding the `composer.lock` file is optional if you wish to commit that
but as extensions are not installed as a root package in Bolt, it will have no
effect.

Step 7: Now you can run your tests
----------------------------------

Make sure you have done a `composer update` so your dependencies are up to date,
then simply run `phpunit` from the root of your extension.
