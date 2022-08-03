---
title: Code Quality
---
Code Quality
============

The larger a project gets, the harder it is to maintain a particular code
quality and standard. Every developer has his own coding style and way of doing
things. Although there must be enough space to not force people to do their work
in the way the author(s) of bolt think it should, it's important to set
particular bounds for people to operate within.

Dependency Management
---------------------
The de-facto dependency management tool for GitHub projects is
[Composer][composer] We're not trying to re-invent the wheel, so when possible,
we use established and proven libraries to support our development.

Code Standard
-------------
We aim to comply with [PSR-12][psr12].

Testing
----------
We use [PHPUnit][phpunit] for unit testing, and [Cypress][cypress] for
acceptance and functional testing.

Continuous Integration and Continuous Inspection
------------------------------------------------
For automatically running our unit tests and checking against various PHP
versions, we use [Github CI][githubci]. The configuration is located in the
[.github][dotgithub] folder. The code standard, as well as some other helpful
tools to get metrics about the codebase are run by
[Easy Coding Standard][ecs]. The configuration is located in
[ecs.php][ecs.php]


[composer]: http://getcomposer.org
[cypress]: https://www.cypress.io/
[psr12]: https://www.php-fig.org/psr/psr-12/
[phpunit]: https://github.com/sebastianbergmann/phpunit
[githubci]: https://docs.github.com/en/actions/automating-builds-and-tests/about-continuous-integration
[dotgithub]: https://github.com/bolt/core/tree/master/.github
[ecs]: https://tomasvotruba.com/blog/2017/05/03/combine-power-of-php-code-sniffer-and-php-cs-fixer-in-3-lines/
[ecs.php]: https://github.com/bolt/core/blob/master/ecs.php
