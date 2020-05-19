Bolt Extensions
===============

## Introduction

A Bolt extension is actually a composer package, that has a few specific
properties that make it recognizable as such. In practice, this means you can
develop a Bolt extension just like you would a 'normal' Composer package.

Developing an extension usually is done in the following steps:

- Create a git repository, and make a local clone
- Submit it to Packagist
- Set it up so you can work with it in your local development environment, and
  Bolt recognizes it
- Work on the extension, until it's Done™.
- Add the required attributes to the extension's `composer.json`. And add a nice
  screenshot for good measure.
- Tag a release on Github / Gitlab / Bitbucket, and see it show up on the [Extensions site][ext-site].

Alternatively, you can start working on your extension as a project extension
([described here][project]), and then convert it to a proper extension at a
convenient time. It works pretty much the same, so you can pick whatever suits
your workflow best.

## Create a git repository

You probably already know how to do this. You can create a git repository at
Github, which is most often used, but Gitlab or Bitbucket will work just as
well. You can now make a clone of that repository, on your local development
environment. Make sure to clone this repository _outside_ of the project you're
working on. It might seem tempting to simply clone it into your `vendor/`
folder, but that will not work.

<p class="note"> <strong>Note:</strong> This chapter assumes you'll be using
Studio to work on Extensions locally, but you're free to use another method, if
you prefer. Using Studio is explained below. </p>

Something like this works well:

```bash
.
├── my-awesome-extension/
│   ├── config/
│   ├── src/
│   ├── templates/
│   ├── LICENSE
│   ├── README.md
│   └── composer.json
└── myprojectname/
    ├── bin/
    ├── config/
    ├── public_html/
    ├── src/
    ├── var/
    ├── vendor/
    ├── LICENSE
    ├── README.md
    ├── composer.json
    ├── symfony.lock
    └── …
```

This way you'll set it up so you can work on your project _and_ the extension,
and they will interfere with eachother as little as possible.

<p class="tip"> <strong>Tip:</strong> You might notice that the structure of the
folders that hold the extension and the Bolt project are quite similar. This is
no coincidence: Both with Bolt and Extensions alike, we follow the default
Symfony project structure as much as feasible. </p>

To get a headstart, you can also clone the [reference-extension][ref-ext], and
use that as a starting point.

As a bare minimum, your new git repository should contain an `Extension.php`, a
`composer.json` and a `.gitignore` file.

Create a file `src/Extension.php`, like this:

```php
<?php

namespace BobDenOtter\MyAwesomeExtension;

use Bolt\Extension\BaseExtension;

class Extension extends BaseExtension
{
    public function getName(): string
    {
        return 'My Awesome Extension';
    }
}
```

Create a `composer.json`, like this:

```json
{
    "name": "bobdenotter/my-awesome-extension",
    "description": "Put a nice and succinct description of your extension here.",
    "type": "bolt-extension",
    "license": "MIT",
    "authors": [
        {
            "name": "YourNameHere",
            "email": "youremail@acme.com"
        }
    ],
    "require": {
        "php": ">=7.1.3",
        "twig/twig": "^2.12 | ^3.0"
    },
    "require-dev": {
        "bolt/core": "^4.0.0"
    },
    "autoload": {
        "psr-4": {
            "BobDenOtter\\MyAwesomeExtension\\": "src/"
        }
    },
    "minimum-stability": "dev",
    "prefer-stable": true,
    "extra": {
        "entrypoint": "BobDenOtter\\MyAwesomeExtension\\Extension"
    }
}
```

Make sure the `"name"` is set correctly. This is _often_ the same as the last
part of where it's hosted at Github or Gitlab, but it doesn't have to be. In
fact, it's the vendow name plus the project name. The vendor name is mandatory
and should be unique to your projects. The namespaces used in the
`autoload/psr-4` and `extra/entrypoint` attributes should also be unique, and
match the `name`. The notation is different, though: the `name` must be
snake-case (lowercase only, hyphens allowed), whilst the namespace must be
CamelCase.

<p class="note"> <strong>Note:</strong> You can determine the namespace
yourself, but the de facto standard is to have it as a "vendor namespace",
followed by a "project namespace". Later on you'll use this <em>exact</em>
namespace in your PHP code. </p>

The type is set to `bolt-extension`. This will make Bolt, Packagist and the
Extensions site recognize it as a proper Bolt extension.

To prevent clutter in your repo, you should also add a `.gitignore` file:

```gitignore
### Platfom-specific files
.DS_Store
thumbs.db
Vagrantfile
.vagrant*
.idea
.vscode/*
appveyor.yml

### Local files
vendor/
composer.lock
var/
```

Next, commit these files to git, and push the changes to the remote git
repository.

## Submit to Packagist

The next step is to submit your package to Packagist, the Composer packages
repository. This might seem early to do, but it's a required step, if you're
going to be using Studio (in the next step).

After you've committed your files to git, go to [packagist.org][packagist]. Log
in using an existing account, connect with your Github account, or create a new
one. After you've done this, you can [submit][submit] a new package. Simply
fill out the full URL of your git repository, and click the button.

If all went well, you can confirm the next step, and you'll now have published
likely tell you why it didn't, enabling you to fix the error and to try again.
your extension-to-be on Packagist. If it didn't go through, Packagist will most

<p class="note"><strong>Note:</strong> You're submitting our package to
Packagist already, but it won't show up on the Bolt Extension website until
you've tagged a release in your git repository.</p>

## Set it up locally

Normally, you can install a Bolt extension by running `composer req foo/bar`,
but if you're planning on developing an extension, that's not the best way to
go. If you do, the extension will 'forget' it's a git repository, and every
time you'll run composer update, you will overwrite your local changes.

You can solve this by using [path repositories][path-repo] in your
`composer.json`, but in practice this can be quite a hassle. In this chapter
we'll use Studio to do the heavy lifting for us.

You can install Studio using the [instructions on their git
repository][studio]. After installation, you can add your extension-to-be to
your project, by running `studio load ../my-awesome-extension` from your
project root:

```bash
$ studio load ../my-awesome-extension

 [OK] Packages matching the path ../my-awesome-extension will now be loaded by Composer.

```

Now, Composer will treat our local repository as a common Composer package.
Install it using `composer req bobdenotter/my-awesome-extension`.

```bash
$ composer req bobdenotter/my-awesome-extension:dev-master

Using version dev-master for bobdenotter/my-awesome-extension
./composer.json has been updated
[Studio] Loading path ../my-awesome-extension
…
Package operations: 1 install, 0 updates, 0 removals
  - Installing bobdenotter/my-awesome-extension (dev-master): Source already present
…
Executing script cache:clear [OK]
Executing script assets:install public [OK]
Executing script bolt:copy-assets [OK]
```

Obviously, you should tweak the two commands above to match your set up, using
the correct path and package `name`. Note the
additional `:dev-master` in the command below. This explicitly instructs
composer to install the master branch, which is then picked up by Studio to
work on in parallel.

Note: If you get a message like this: 

```
  [InvalidArgumentException]
  Could not find a matching version of package foo/bar-qux. Check the package 
  spelling, your version constraint and that the package is available in a stability 
  which matches your minimum-stability (dev).
  ```

Then you might have been too quick. It usually takes a few minutes for Composer to
index the package, and make it available. Just try it again after a minute or two. 

After you've installed the local extension, you can verify that Bolt recognizes
it correctly, by running the following:

```bash
$ bin/console extensions:list

 Currently installed extensions:
 ------------------------------------------ --------------------------
  Class                                      Extension name
 ------------------------------------------ --------------------------
  …                                          …
  BobDenOtter\MyAwesomeExtension\Extension   My Awesome Extension
 ------------------------------------------ --------------------------
```

## Work on the extension

This is the obvious part. You now have a working set up, and you can work on
your extension, until you feel it's ready for release. In the following
chapters you can read about the `BaseExtension`, `BaseWidget`, and the other
things you can do with Bolt Extensions.

[studio]: https://github.com/franzliedke/studio#installation
[ext-site]: https://extensions.boltcms.io
[project]: ../extensions/project
[ref-ext]: https://github.com/bolt/reference-extension
[path-repo]: https://getcomposer.org/doc/05-repositories.md#path
[packagist]: https://packagist.org
[submit]: https://packagist.org/packages/submit
