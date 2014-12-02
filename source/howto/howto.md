HOWTOs and Recipes
===================

Installing Local Extensions
---------------------------

Bolt 2 supports installation of extensions that are not included on Bolt's extensions site.

There are a couple of caveats:
  - There is no autoloader by default
  - Must be located in `{web_root}/extensions/local/{author_name}/{extension_name}/`
  - They **will** be automatically enabled if the directories above exist and contain `init.php` and `Extension.php`
  - They **will not** appear in the Extend page in the *"Your Currently Installed Extensions"* section on your Bolt site

### Step 1

Create the directory for you extension in `{web_root}/extensions/local/{author_name}/{extension_name}/` 

Where:
 - `{web_root}` is the install location of your Bolt site
 - `{author_name}` is a lower-case, space-less name
 - `{extension_name}` is a lower-case, space-less name

### Step 2

Create an `Extension.php` file that contains something like this:

```
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
```

### Step 3

Create an `init.php` file that contains something like this:

```
use Bolt\Extension\MyName\MyExtension\Extension;

$app['extensions']->register(new Extension($app));
```

Simple menu
-----------

The following creates a simple menu in HTML, based on the last 4 pages. Only
pages where the chapter taxonomy is 'main' are selected, assuming there's a
taxonomy 'chapter'.

```
    <nav id="main">
    {% setcontent pages = 'pages/latest/4' where { 'taxonomy/chapter': 'main'}  %}

    {% for page in pages %}
        {% if loop.first %}<ul>{% endif %}
        <li><a href="{{ page|link }}" {% if page|current %}class="current"{% endif %}>{{ page.title|trimtext(12) }}</a></li>
        {% if loop.last %}</ul>{% endif %}
    {% else %}
        <em>No main navigation items. Add some Pages, and set the 'Chapter' to 'Main'.</em>
    {% endfor %}
    </nav>
```

<p class="note"><strong>Note:</strong> This is a specific sample. In general,
you're probably better off using Bolt's built in <a href="/menus">menu
functionality</a>.</p>
