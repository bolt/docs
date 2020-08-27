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


For more on running unit and behavioural tests, please follow the instructions in
the `bolt/core` repository on GitHub [here](https://github.com/bolt/core#testing)
