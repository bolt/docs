---
title: Building Bundles
level: intermediate
---
Building Bundles
================

## Bundle namespace

Bundles need to be defined inside their own base namespace. This namespace
is important to decide on first, as it will influence the target
directory location of your Bundle, and is needed for your _autoloading_,
and _activation_ configuration

<p class="note"><strong>Note:</strong> The last name in the namespace
path internally serves as the "author" name.</p>


## Bundle files location & layout

Bundles should be thought of as part of your site project's code, and as such
their location relative to your site's root directory is flexible.

For more information see the section on [Location & Layout][file-location] of
Bundles.


## Bundle loader class design

Your first architectural decision is the type of _extension loader_ class you
are going to use to define and load your Bundle.

You can choose to write your class, in order of difficulty, as:
  * Simplicity — Just extend `\Bolt\Extension\SimpleExtension` and your class
    loader will have immediate access to a "quick build" loader class
  * Lightweight — Extend `\Bolt\Extension\AbstractExtension` for an
    implementation of the `ExtensionInterface`
  * Full control — Build your own complete implementation of
    `\Bolt\Extension\ExtensionInterface`

<p class="note"><strong>Note:</strong> The Bundle's loader class name,
minus any "Extension" suffix, internally serves as the Bundle name.</p>

With a few minor exceptions, the [Basics][basics], [Intermediate][intermediate],
and [Advanced][advanced] sections on writing extensions are a good reference
point.


## Autoloader configuration

Loading of PHP classes is handled via PHP's autoloader and managed by
Composer. For more information see the section on [Autoloading][autoloading].


## Activation configuration

Once you have a bundled extension loaded in your application, the interface
within the Bolt extensions screen has also been adjusted to separate bundled
extensions from those installed via the Marketplace.

Your bundled extensions will now appear underneath the other installed
extensions. For more information see the section on [Activation][activation]


[file-location]: file-location
[autoloading]: autoloading
[activation]: activation
[basics]: ../basics/basics
[intermediate]: ../intermediate
[advanced]: ../advanced
