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
The de-facto dependency management tool for Github projects is
[Composer][composer] We're not trying to re-invent the wheel, so when possible,
we use established and proven libraries to support our development.

Code Standard
-------------
We aim to comply with [PSR-2][psr2].

Testing
----------
We use [PHPUnit][phpunit] for unit testing, and [Codeception][codeception] for
acceptance and functional testing.

Continuous Integration and Continuous Inspection
------------------------------------------------
For automatically running our unit tests and checking against various PHP
versions, we use [Travis CI][travis]. The configuration is located in the
[.travis.yml][t.yml] file. The code standard, as well as some other helpful
tools to get metrics about the codebase are run by
[Scrutinizer CI][scrutinizer]. The configuration is located in
[.scrutinizer.yml][s.yml]


[composer]: http://getcomposer.org
[psr2]: https://github.com/php-fig/fig-standards/blob/master/accepted/PSR-2-coding-style-guide.md
[phpunit]: https://github.com/sebastianbergmann/phpunit
[codeception]: http://codeception.com/
[travis]: https://travis-ci.org
[t.yml]: https://github.com/bolt/bolt/blob/master/.travis.yml
[scrutinizer]: https://scrutinizer-ci.com
[s.yml]: https://github.com/bolt/bolt/blob/master/.scrutinizer.yml
