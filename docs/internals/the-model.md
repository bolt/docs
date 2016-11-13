---
title: The 'Model'
level: advanced
---
The "Model"
===========

The way Bolt handles its ContentTypes is defined in the `contenttypes.yml` file,
which in turn determines the data-structure of the website.

Basically, whatever is defined in the ContentType gets added as columns to the
database that's configured in `config.yml`.

Whenever the 'dashboard' is displayed, Bolt checks if the definitions in
`contenttypes.yml` matches the database columns, and if it doesn't it urges
the user to go to the 'repair database' screen.

Even though Bolt strives to be as simple as possible, it makes sense to think of
Bolt as an [MVC application][mvc]. Silex provides the Controller part, the Twig
templates are the View and the ContentTypes define the Model part.

All access to the content and the ContentTypes is done through the Storage class.
Records of content have a Content class. Browse the files `src/Storage.php`
and `src/Content.php` for details.

[mvc]: https://en.wikipedia.org/wiki/Model-view-controller
