---
title: Introduction
level: advanced
---
Introduction
============

Bundled extensions, or "Bundles", should be thought of as _components_ that are
_specific_ to **your site project(s)**. As such, developed, managed, and
deployed using the same tools and methodologies you would deploy your Bolt site
would normally.

Writing a Bundle has a lot in common with writing a regular extension, such as
you'd find, and install, from the [Market Place][market]. In that, as simple as
creating a class in your Application that implements
`Bolt\Extension\ExtensionInterface`.

However, it is very important to note that, Bundles **do not**:
  * Manage updating of web included web assets with public directories
  * Require a `composer.json` file
  * Auto-configure autoloading

<p class="note"><strong>Note:</strong> Bundles are, by design, intended
as a collection of <strong>site-specific</strong>, functionality
enhancing PHP code. File types such as Twig templates, CSS, and
JavaScript, are better suited being located inside your site's theme
directory.</p>


### Getting Started

The initial design & build of a Bundle has the following aspects that we
highlight below:
  * [Bundle files location & layout](#bundle-files-location-amp-layout)
  * [Bundle loader class design](#bundle-loader-class-design)
  * [Bundle namespace](#bundle-namespace)
  * [Building the Bundle](#building-the-bundle)
  * [Autoloading configuration](#autoloading-configuration)
  * [Activation configuration](#activation-configuration)


#### Bundle namespace

Bundles need to defined inside their own base namespace. This namespace
is important to decide on first, as it will influence the target
directory location of your Bundle, and is needed for your _autoloading_,
and _activation_ configuration

<p class="note"><strong>Note:</strong> The last name in the namespace
path internally serves as the "author" name.</p>


#### Bundle files location & layout

Bundles should be thought of as part of your site project's code, and as such
their location relative to your site's root directory is flexible.

The choice of location should be considered carefully, and according to both
your project and Bundle's design requirements.

For further reading, see the [Bundle file location][file-location] section.


#### Bundle loader class design

Your first architectural decision is the type of _extension loader_ class you
are going to use to define and load your Bundle.

You can chose to write your class, in order of difficulty, as:
  * Simplicity — Just extend `\Bolt\Extension\SimpleExtension` and your class
    loader will have immediate access to a "quick build" loader class
  * Lightweight — Extend `\Bolt\Extension\AbstractExtension` for an
    implementation of the `ExtensionInterface`
  * Full control — Build your own complete implementation of
    `\Bolt\Extension\ExtensionInterface`

<p class="note"><strong>Note:</strong> The Bundle's loader class name,
minus any "Extension" suffix, internally serves as the Bundle name.</p>


#### Building the Bundle

With a few minor exceptions, the [Basics][extensions-basics],
[Intermediate][extensions-intermediate], and
[Advanced][extensions-advanced] sections on writing extensions are a
good reference point.


#### Autoloading configuration

[Autoloading section][autoloading]


#### Activation configuration

Once you have a bundled extension loaded in your application, the interface
within the Bolt extensions screen has also been adjusted to separate bundled
extensions from those installed via the Market Place.

Your bundled extensions will now appear underneath the other installed
extensions.

[Activation section][activation]


Difference to Market Place Extensions
-------------------------------------

<p class="note"><strong>Note:</strong> One big difference between bundled and
normal extensions, is that bundled extensions <strong>do not</strong> require
their own <code>composer.json</code> file.</p>

Bundled extensions are completely self-managed in terms of configuration,
automatic set-up of CSS & JavaScript assets in public locations, etc.

[file-location]: bundled/file-location
[autoloading]: bundled/autoloading
[activation]: bundled/activation
[extensions-basics]: ../basics/basics
[extensions-intermediate]: ../basics/intermediate
[extensions-advanced]: ../basics/advanced
[market]: https://market.bolt.cm/
