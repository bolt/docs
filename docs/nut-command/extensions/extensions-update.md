---
title: extensions:update
level: intermediate
---
extensions:update
=================

Nut's `extensions:update` command updates installed extension(s).

## Usage

```bash
    php ./bin/console extensions:update [<name>]
```


## Arguments

| Argument | Description |
|----------|-------------|
| name     | Name of the extension to update


## Example

### Updating BoltForms


```bash
$ php ./bin/console extensions:update bolt/boltforms

Starting update of bolt/boltforms:… [DONE]
Loading composer repositories with package information
Updating dependencies
Package operations: 0 installs, 1 update, 0 removals
  - Updating bolt/boltforms (v3.0.1 => v3.1.0): Loading from cache
> Bolt\Composer\EventListener\PackageEventListener::handle
Writing lock file
Generating optimized autoload files
> Bolt\Composer\EventListener\PackageEventListener::dump
```

