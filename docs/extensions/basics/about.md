---
title: About
level: intermediate
---
Extensions: Essentials
======================

What can you do with Bolt extensions?
-------------------------------------

The functionality of Bolt can be extended by creating Extensions. The
possibilities are almost limitless but here are a few of the basic ideas that can
be accomplished:

 - Add Twig tags or modifiers, for use in the templates in your themes.
 - Add 'hooks' in the templates to either insert small snippets of HTML or the
   result of a callback-function in the templates after rendering.
 - Create custom fields that can be used in contenttypes.yml.
 - Create themes that other users can copy and use as a baseline.
 - Add custom upload handlers that support different filesystems.
 - Add a custom thumbnail generator that does more advanced creation of thumbs

A Bolt extension has to follow a few strict rules, so it can be auto-loaded by
Bolt and to make sure it won't interfere with other Bolt functionality or even
other Extensions.

To do this, we have to keep the following rules:

 - Each extension has its own PSR-4 namespace.
 - If the extension has its own configuration file, the default should be in a
   `config/config.yml.dist` file in the extension folder.
 - The extension should come with a 'readme' file. It must be named
 `README.md`, and is written in the Markdown format.
 - The extension loader class should either extend `\Bolt\Extension\SimpleExtension`,
  or implements `\Bolt\Extension\ExtensionInterface` (see `\Bolt\Extension\AbstractExtension`)
 - The 'entry points' for callbacks and Twig functions and modifiers must be functions in the defined namespace.
   Additional code can be procedural or implemented in classes.

To get the hang of how extensions work, there are a few resource/examples extensions that can be used to follow:

  - [Starter](https://github.com/bolt/bolt-extension-starter/)
  - ["Extended" Starter](https://github.com/bolt/bolt-extension-starter-extended/)
  - [Stencil](https://github.com/bolt/bolt-extension-stencil/)

The two "starter" extensions are commented with lots of information and are good learning resources. The "stencil" extension however is just that, something you can make a copy of and remove everything you don't need.

It may also be worth look for other popular extensions on the Marketplace. They all have a link to the source code on the information page.

Coding your extensions
----------------------

Because Bolt is written in PHP, it should be no surprise that the extensions
must also be written in PHP. Bolt is built upon the awesome
[Silex micro- framework][silex], and uses a lot of components from the
[Symfony framework][symfony].

When coding your extensions, you should use as much of the functionality
provided by Silex and the included components as possible. Don't re-invent
the wheel, and things like that.

See the chapter on [Bolt internals](../../internals/container-service-references) for a detailed overview of the
provided Bolt functionality, Silex objects and included libraries.

Bolt strives to adhere to [the PSR-2 coding style][psr2].
When writing your extensions, you should try to do the same.


Getting Started
---------------

To create your extension the easiest way is to create a Composer project from the Starter Extension:
```
composer create-project --no-install bolt/bolt-extension-starter:^3.0 <newextname>
```

If you're wanting something geared a little toward learning about different parts of a Bolt extension, you will be better of creating a "sample" extension from the Extended Starter Extension
```
composer create-project --no-install bolt/bolt-extension-starter-extended:^3.0 <newextname>
```

Finally, once you're comfortable with creating extensions and you want a more complete baseline to start new extensions from, you can use the Stencil
```
composer create-project --no-install bolt/bolt-extension-stencil:^3.0 <newextname>
```

Further reading
---------------

If you want to delve deeper into what you can and cannot do with extensions, see
the chapter on [Bolt internals](../../internals/container-service-references) for a detailed
overview of the provided Bolt functionality, Silex objects and included
libraries.

[silex]: http://silex.sensiolabs.org
[symfony]: http://symfony.com/components
[psr2]: https://github.com/php-fig/fig-standards/blob/master/accepted/PSR-2-coding-style-guide.md
[exttwig]: http://twig.sensiolabs.org/doc/advanced.html
