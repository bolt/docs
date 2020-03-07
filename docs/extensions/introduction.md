---
title: "Introduction"
short_title: Extending Bolt
level: advanced

---

Extending Bolt: Introduction
==============

This chapter has information about the two major ways to write custom code for
(and "on top of") Bolt. Namely, developing extensions as well as adding custom
to a specific Bolt project.

As you undoubtedly have discovered by now, Bolt 4 is a Symfony application
through and through. This means that for extending the functionality, we
heavily borrow from the tools and ecosystem that the Symfony network provides.

- Bolt extensions are true Composer packages. If you create a Bolt extension,
  you can add it to packagist, and it will show up on the
  [Extensions site][extensions]. You can install and remove it from a Bolt
  project using `composer require` and `composer delete`.
- Custom code for a specific project can be put in the `src/` folder. This
  follows the default Symfony project structure, and this folder is set up for
  Dependency Injection and Autowiring of Services.

Apart from the information contained in this chapter, it's very useful if you
have some experience about PHP, as well as Symfony. Here's some recommended
resources, if you want to brush up on your knowledge:

PHP in general:

- A good free book is [PHP Pandas][phpandas].
- There is a _lot_ of information in [PHP the Right Way][phptrw], but it can
  also seem daunting and overwhelming. Likewise for [Learn modern PHP][odan].
- Be sure to grasp the concept of Dependency Injection, because its widely used
  in Symfony and Bolt. See [Dependency Injection: Huh?][di].
- Obviously, the official documentation is very helpful: [php.net][docs]

Symfony specific:

- Symfony's documentation is very extensive. Great resource, for users of all
  levels of expertise alike: [Symfony documentation][sf-docs].
- There's a new [Symfony: the fast track][book] book, written by Symfony's lead
  developer. Currently, you can purchase it from the site, but supposedly it'll
  be published online in the near future as well.
- [Symfonycasts][sfcasts] has great video tutorials on all things Symfony.

Other than that, make sure you have a proper local development setup.

[book]: https://symfony.com/book
[di]: https://code.tutsplus.com/tutorials/dependency-injection-huh--net-26903
[docs]: https://www.php.net/docs.php
[extensions]: https://extensions.boltcms.io
[odan]: https://odan.github.io/learn-php/
[phpandas]: https://daylerees.com/php-pandas/
[phptrw]: https://phptherightway.com/
[sf-docs]: https://symfony.com/doc/current/index.html#gsc.tab=0
[sfcasts]: https://symfonycasts.com/tracks/symfony