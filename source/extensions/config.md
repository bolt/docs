Extensions: Configuration
=========================

## Creating a Bolt Extension or Theme

Extensions and themes that are published on the marketplace must follow a few simple rules
to allow them to hook into a Bolt installation. Information about the package needs to be
provided in JSON format in the root of a project.

To be hosted on the Bolt marketplace your project will need to be stored in a VCS
repository and publicly readable. If you want to install your own extensions from
somewhere other than the official Bolt marketplace then see the advanced documentation
page.

### PHP namespace

Extensions should use the PHP namespace of `Bolt\Extension\{author name}\{exension name}\` e.g. `Bolt\Extension\MyName\MyExtension\`

### Using the Starter Package

To make getting setup with an extension as simple as possible there is a skeleton
extension package that can get you started. You'll need to already have Composer installed
and then from the command line use the following, making sure you replace the last
parameter with the name you want for your new extension.

```
composer create-project --no-install bolt/bolt-extension-starter <newextname>
```

Once you've run the above command Composer will create a new directory, open the project
in your editor and you will need to make a few changes, giving your new extension the
correct configuration and namespaces. There are three files you need to edit,
`composer.json`, `init.php`, and `Extension.php`.

 1. Change the namespace at the top of `init.php` and `Extension.php` to your own.
 2. In `composer.json` change the name setting to your extension name eg:
    username/extensionname
 3. In `composer.json` give a description and a type, either `bolt-extension` or `bolt-
    theme`
 4. Add your information to the author section
 5. In the autoload section update the PSR-4 namespace to the one you have used in your
   `init.php` and `Extension.php` files

The above steps will get you started, and below is some more indepth information about the
configuration.


### The JSON file

You will need a file called `composer.json` in the root of your project. This tells Bolt
all the information it requires to display and install your extension or theme. To
demonstrate the format we are going to create a dummy extension called Bolt Widgets.
Here's how we create our `composer.json` file.

```
{
    "name": "bolt/widgets",
    "description": "Bolt widgets is an awesome extension that features widgets on your website",
    "type": "bolt-extension",
    "keywords": ["bolt", "widgets", "awesome"],
    "require": {
        "bolt/bolt": "&gt;=2.0,&lt;3.0"
    },
    "authors": [
        {
            "name": "Bolt",
            "email": "info@bolt.cm",
            "homepage": "http://bolt.cm"
        }
    ],
    "autoload": {
        "files": [
            "init.php"
        ],
        "psr-4": {
            "Bolt\\Extension\\MyName\\MyExtension\\": "src"
        }
    },
}
```


All of the above information is required in order for your extension to be valid to
publish on the Marketplace. Here's a step-by-step run through of what to put in each of the settings.

#### Name
The name needs to be unique, no two packages on the Marketplace can share a name. We
suggest that you use a username or company name as the first part and then a descriptive
name as the second for example: `myco/loremipsum`, `myco/funtheme`

#### Description
The description tells potential users of your extension or theme what is provided. Make
this as accurate and informative as you can.

#### Type
This identifies what type of package this is. For now the choices are `bolt-extension` or
`bolt-theme`, it is important that you choose the correct type since extensions and themes
are handled differently by Bolt.

#### Keywords
These help users to discover your extension on the Marketplace site and are also used for
grouping packages.

#### Require
This is an important setting since it specifies what versions of Bolt your extension is
compatible with, preventing users with an older or newer version from being able to
install a broken extension. If you are unsure as to which versions to support we would
recommend that you support the current major version, so for example if the current
version of Bolt is 2.x then use: `"bolt/bolt": ">=2.0,<3.0"` this means that any version
from 2.0 but not version 3.0 is supported.

Other possibilities would be: `"bolt/bolt": ">=2.3,<3.0"` or if you cannot support a range
and only one specific version `"bolt/bolt": "2.3"`. We wouldn't recommend this since it
will require you to manually update your extension with every new Bolt version, but there
may be occasions when it is necessary.

#### Authors
This gives users of your extension some information about the author. The email and
homepage can either be just your personal details or if you want to provide more indepth
documentation or a support address they can point to a specific extension site.

#### Autoload
This configuration does two things, firstly you need to provide a file that initialises
your extension, it's important that this file is kept as simple as possible, when it is
run it will be provided with a single variable `$app` which is an instance of the running
Bolt application. Here is the recommended file.

```
use Bolt\Extension\MyName\MyExtension\Extension;

$app['extensions']->register(new Extension());
```

Once the extension is registered, Bolt will take care of running the various hooks that
you can define within your Extension class.

The second option allows you to define a directory to autoload your classes from. We
recommend you use the same setting as in the example file: `"psr-4": {"Myextension\\": "src"}`
This means that all classes you store inside the `src` directory will be autoloaded correctly.

Note that Bolt will only support PSR-4 autoload namespaces. For examples see here:
<a href="www.php-fig.org/psr/psr-4/">http://www.php-fig.org/psr/psr-4/</a>


## Publishing Your Extension on the Marketplace

Once you have the above file setup, make sure it is pushed up to your hosted repository
then visit <a href="http://extensions.bolt.cm">extensions.bolt.cm</a> to register your
extension or theme on the Bolt Marketplace.
