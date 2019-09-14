---
title: extensions:setup
level: intermediate
---
extensions:setup
================

Nut's `extensions:setup` command sets-up extension directories, `composer.json`
and required dependencies.


## Usage

```bash
    php ./bin/console extensions:setup
```


## Example

```bash
$ php ./bin/console extensions:setup

Creating/updating composer.json… [DONE]

Updating autoloaders… [DONE]
Generating optimized autoload files
> Bolt\Composer\EventListener\PackageEventListener::dump
```

