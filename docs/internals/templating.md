---
title: Templating
level: advanced
---
Templating
==========

All templating in Bolt is done through [Twig][twig].

Twig is a template library that's not only secure, fast and flexible, but it's
also elegant and concise, so it's easy to use for both 'developer' and 'frontend'
type persons.

Basically, everything that you can do 'vanilla' Twig, you can do in the Bolt
templates. We've added a few tags of our own. Browse
`src/Twig/TwigExtension.php` and `src/Twig/SetcontentTokenParser.php`
for details.

More information on this subject can be found in [Templates and Routes](../templating/templates-routes)
and [Content in Templates](../contenttypes/content-in-templates).

[twig]: http://twig.sensiolabs.org/
