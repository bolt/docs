Writing unit tests for an extension
===================================

If you would like to write unit tests for an extension you can very easily piggy-back
onto the Bolt core classes to test how the extension interacts with a Bolt application.

There are a few things you will need to add to your extension to get setup. 

#### Step 1: Modifications to composer.json

A few simple additions are needed to get Bolt installed as a dependency and your tests namespaced.
Use the following as an example, changing the name of your test directory to suit. 

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
            "Bolt\\Extensions\\Colourpicker\\": "",
            "Bolt\\Extensions\\Colourpicker\\Tests\\": "tests"
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

In the above example the important things to note are the `minimum-stability` and `prefer-stable` settings.

Then an additional PSR-4 namespace is added to load tests from the `./tests` directory.


#### Step 2: Create a phpunit.xml file

The example file below configures `phpunit`, place it in the root of the project and adjust where needed.

```
<?xml version="1.0" encoding="UTF-8"?>
<phpunit backupGlobals="false"
         backupStaticAttributes="false"
         bootstrap="test-bootstrap.php"
         colors="true"
         convertErrorsToExceptions="true"
         convertNoticesToExceptions="true"
         convertWarningsToExceptions="true"
         processIsolation="false"
         stopOnFailure="false"
         syntaxCheck="false"
        >
</phpunit>

```

You can note we refer to a test-bootsrap.php file that doesn't exist yet.

#### Step 3: Create a bootstrap file

This sets up a tmp dir to store required Bolt files and sets a couple of constants.

```
define('TEST_ROOT', __DIR__.'/tmp');
define('PHPUNIT_ROOT', __DIR__);
@mkdir('tmp/app/cache', 0777, true);
@mkdir('tmp/app/config', 0777, true);
@mkdir('tmp/app/database', 0777, true);
require 'vendor/autoload.php';
```

#### Step 4: Modify your init.php file

Because we are executing the extension in a different context to normal, the extension loader
will not be included in the normal way so we need to add a check to ignore the normal initialize
if a Bolt app context is not provided.

All you need to do is add the below if isset condition around the extension register line, for example:


```
namespace Bolt\Extensions\Colourpicker;

if (isset($app)) {
    $app['extensions']->register(new Extension($app));
}
```

#### Step 5: Write some tests that extends BoltUnitTest

Here's the simplest test you can write, we test that the extension gets registered correctly to the
containing Bolt app.


```
// in tests/ColourpickerTest.php

namespace Bolt\Extensions\Colourpicker\Tests;

use Bolt\Tests\BoltUnitTest;
use Bolt\Extensions\Colourpicker\Extension;

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
        $this->assertSame($extension, $app['extensions.colourpicker']);
    }
}

```

#### Step 6: Now you can run your tests.

Make sure you have done a `composer update` so your dependencies are up to date, then simply 
run `phpunit` from the root of your extension.



