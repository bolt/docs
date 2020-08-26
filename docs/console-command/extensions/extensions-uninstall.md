---
title: extensions:uninstall
level: intermediate
---
extensions:uninstall
====================

Nut's `extensions:uninstall` command .

## Usage

```bash
    php ./bin/console extensions:uninstall <name>
```


## Arguments

| Argument | Description |
|----------|-------------|
| name     | Name of the extension to uninstall


## Example

### XYZ


```bash
$ ./bin/console extensions:uninstall bolt/boltforms

Starting uninstall of bolt/boltforms… [DONE]
Loading composer repositories with package information
Updating dependencies
Package operations: 0 installs, 0 updates, 1 removal
  - Removing bolt/boltforms (v3.1.0)
Generating autoload files
> Bolt\Composer\EventListener\PackageEventListener::dump
```

