Code Quality
============

The larger a project gets, the harder it is to maintain a particular code
quality and standard. Every developer has his own coding style and way of
doing things. Although there must be enough space to not force people to
do their work in the way the author(s) of bolt think it should, it's
important to set particular bounds for people to operate within.

Dependency Management
---------------------
The de-facto dependency management tool for Github projects is
[Composer](http://getcomposer.org) We're not trying to re-invent the
wheel, so when possible, we use established and proven libraries to
support our development.

Code Standard
-------------
We aim to comply with [PSR-2](https://github.com/php-fig/fig-standards/blob/master/accepted/PSR-2-coding-style-guide.md).

Unit tests
----------
We use [PHPUnit](https://github.com/sebastianbergmann/phpunit) for unit
testing

Continuous Integration and Continuous Inspection
------------------------------------------------
For automatically running our unit tests and checking against various PHP
versions, we use [Travis CI](https://travis-ci.org). The configuration is
located in the
[.travis.yml](https://github.com/bolt/bolt/blob/master/.travis.yml) file.
The code standard, as well as some other helpful tools to get metrics
about the codebase are run by [Scrutinizer CI](https://scrutinizer-ci.com). 
The configuration is located in [.scrutinizer.yml](https://github.com/bolt/bolt/blob/master/.scrutinizer.yml)
