---
title: Running Unit & Acceptance Tests
level: advanced
---
Running Unit & Acceptance Tests
===============================


Unit tests
----------

For running unit tests you need [PHPUnit](http://www.phpunit.de/), this can
be run from the `require-dev` install of PHPUnit that comes with Bolt:

```bash
    $ composer install --dev 
```

After installing, you can run the unit test suite by running:

```bash
    $ php vendor/bin/phpunit 
```

This can now also be done by using app/nut:

```bash
    $ php app/nut tests:run
```

Acceptance Tests
----------------

For running acceptance tests you need [CodeCeption](http://codeception.com/),
this can be run from the `require-dev` install of CodeCeption that comes with
Bolt:

```bash
    $ composer install --dev 
```

After installing, you can run the acceptance test suite by running:

```bash
    $ php vendor/bin/codecept build
    $ php vendor/bin/codecept run
```
