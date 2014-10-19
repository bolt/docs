HOWTOs and Recipes
===================

Installing Local Extensions
---------------------------

Bolt 2 supports installation of extensions that are not included on Bolt's extensions site.

There are a couple of caveats:
  - There is no autoloader by default
  - Must be located in `{web_root}/extensions/local/{author_name}/{extension_name}/`

### Step 1

Create the directory for you extension in `{web_root}/extensions/local/{author_name}/{extension_name}/` 

Where:
 - `{web_root}` is the install location of your Bolt site
 - `{author_name}` is a lower-case, space-less name
 - `{extension_name}` is a lower-case, space-less name

### Step 2

Create an `Extension.php` file that contains something like this:

<pre class="brush: php">
namespace Bolt\Extension\MyName\MyExtension;

use Bolt;

class Extension extends \Bolt\BaseExtension
{

    public function getName()
    {
        return "MyExtension";
    }

    public function initialize()
    {
        // Your extension gets launched from here
    }
}
</pre>

### Step 3

Create an `init.php` file that contains something like this:

<pre class="brush: php">
use Bolt\Extension\MyName\MyExtension\Extension;

$app['extensions']->register(new Extension($app));
</pre>
