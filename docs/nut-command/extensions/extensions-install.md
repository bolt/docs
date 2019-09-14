---
title: extensions:install
level: intermediate
---
extensions:install
==================

Nut's `extensions:install` command installs an extension by name and version.

## Usage

```bash
    php ./bin/console extensions:install <name> <version>
```


## Arguments

| Argument | Description |
|----------|-------------|
| name     | Name of the extension to install
| version  | Version of the extension to install. Can be either a Composer version constraint, or a specific version number

For more information on _version constraints_, see Composer's page on
[version constraints][constraints].


## Example

### Installing BoltForms


```bash
$ php ./bin/console extensions:install bolt/boltforms ^3.0

Starting install of bolt/boltforms:^3.0… [DONE]
Loading composer repositories with package information
Updating dependencies
Package operations: 1 install, 0 updates, 0 removals
  - Installing bolt/boltforms (v3.1.0): Downloading (connecting...)Downloading (100%)
> Bolt\Composer\EventListener\PackageEventListener::handle
Writing lock file
Generating optimized autoload files
> Bolt\Composer\EventListener\PackageEventListener::dump

```

[constraints]: https://getcomposer.org/doc/articles/versions.md
