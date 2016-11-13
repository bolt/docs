---
title: Bootstrapping
level: advanced
---
Bootstrapping
=============

As mentioned before, Bolt is a Silex application. As such, it is a good idea to
familiarize yourself with Silex, because when hacking the code or creating your
own extensions, you can basically do whatever can be done in Silex in general.

In the Bolt code, there is an ubiquitous `$app`, which is an instance of
`Bolt\Application`, which extends `\Silex\Application`. Basically, this is
'the application', and most of the components that are used in Bolt are created
as services via Dependency Injection.

If you want to know more about these subjects, we heartily recommend these
articles about Dependency Injection:

  - [An introduction to Pimple and Service Containers][intro]
  - [What is Dependency Injection?][depinj]

In Bolt, this `$app` will be available in the majority of the code, and so are
all of the services, libraries and variables that are part of the application.

All of these are created in `src/Application.php`. Read the code in that file,
to get a feeling for what can be accessed through the `$app` object. Most of the
services defined there are Symfony components, about which you can read on the
Silex Documentation page on [Service Providers][service], or on the
[Symfony Components page][comp].

The next largest group are the Bolt components. These can be recognized by the
`Bolt\` namespace. These components are autoloaded, and can be found in
`src/Bolt/`.

[intro]: https://jtreminio.com/2012/10/an-introduction-to-pimple-and-service-containers/
[depinj]: http://fabien.potencier.org/article/11/what-is-dependency-injection
[service]: http://silex.sensiolabs.org/documentation
[comp]: http://symfony.com/components
