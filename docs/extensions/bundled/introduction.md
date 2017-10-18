---
title: Introduction
level: intermediate
---
Introduction
============

## What is a Bundle

Bundled extensions, or "Bundles", should be thought of as _components_ that are
_specific_ to **your site project**.

Simply a Bundle is:

 - A PHP loader class located in the site `src/` directory* that implements
   `Bolt\Extension\ExtensionInterface` and adds your required functionality to
   the application container
 - A PSR-4 autoload entry, e.g. `"Bundle\\": "src/"`
 - An `extensions:` value in your `.bolt.yml` file, e.g.
   `- Bundle\Site\CustomisationExtension`

Every Bundle you implement for your site will have these properties.

Bundles are developed, managed, and deployed using the same tools and
methodologies you would normally use to deploy your Bolt site.

Bundles have a lot in common with regular extensions, such as you'd install
from the [Marketplace][market].

<p class="note"><strong>Note:</strong> Bundle PHP class files can live anywhere
on your project's filesystem. However for simplicity, and ease of understanding
documented examples, it is recommended that they are placed in either the
project's <code>src/</code> directory or a subdirectory thereof.</p>


## What a Bundle is not

Bundles are, by design, intended as PHP code that provides a collection of
**site-specific** functionality.

It is very important to note that, Bundles **do not**:

  * Manage updating of included web assets with public directories
  * Require a `composer.json` file
  * Auto-configure autoloading

<p class="note"><strong>Note:</strong> File types such as Twig templates, CSS,
and JavaScript, are normally better suited being located inside your site's
theme directory.</p>


## When & why to use a Bundle

Bundles are intended for:

 - Functionality that is specific to a site
 - Code that is intended to be committed to your project's version control

Bundles are **not** intended for:

 - Publishing on the Bolt Marketplace
 - Running extensions from the Bolt Marketplace


## Difference to Marketplace Extensions

Bundled extensions are completely self-managed in terms of configuration,
automatic set-up of CSS & JavaScript assets in public locations, etc.

One big difference between Bundles and normal extensions is that Bundles
**do not** require their own `composer.json` file.


## Getting Started

For an overview of a basic site based Bundle recipe see the [Bundle Quick Start][qs]
guide, or for the complete guide, see the [Building Bundles][building] page.

[qs]: quick-start
[building]: building-bundles
[market]: https://market.bolt.cm/
