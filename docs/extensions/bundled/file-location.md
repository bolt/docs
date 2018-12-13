---
title: File Location & Layout
level: intermediate
---
File Location & Layout
======================

The choice of location should be considered carefully, and according to both
your project and Bundle's design requirements.

As Bundles are just a part of your site project's code, their location is
relative to your site's root directory is flexible. Below are the
recommended locations for specific file types.


## PHP files

As opposed to extensions installed via the Marketplace, a Bundle's PHP code can
_theoretically_ live anywhere. However, it is strongly recommended that you put
your Bundle's PHP code either in the site root `src/` directory for a site with
a single Bundle, alternatively sites with multiple Bundles are best off
following a strategy such as `src/{bundle name}`

<p class="note"><strong>Note:</strong> Using a directory structure deeper than
two levels for the location of the loader class is possible, but not supported.
</p>


## Configuration files

Bundle configuration files are always located in the `app/config/extensions/`
directory, and are named after the lower case derived names of the Bundle
loader class and base namespace.

For example, if your loader class' fully qualified class name of `Alpha\Bravo`,
the Bundle name would be `Bravo` and the author name would be `Alpha` meaning
the configuration file must be named `bravo.alpha.yml`.


## Twig template files

As with PHP files, technically Twig template files can live anywhere under the
site's root. However for consistency and ease it is recommended to place them
either in your theme's directory or for Bundles installed under the site root
`src/` directory, the `templates/` directory is also a supported option.


## Web assets

Bundles make no special decisions around web assets, just add them to your web
root, or a subdirectory of your web root, and use relative paths.
