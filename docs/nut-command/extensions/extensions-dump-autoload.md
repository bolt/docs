---
title: extensions:dump-autoload
level: intermediate
---
extensions:dump-autoload
========================

Nut's `extensions:dump-autoload` command update the extensions autoloader.

## Usage

```bash
    php ./bin/console extensions:dump-autoload
```


## Example

```bash
$ php ./bin/console extensions:dump-autoload

Rebuilding autoloaders… [DONE]
Generating optimized autoload files
> Bolt\Composer\EventListener\PackageEventListener::dump
```

