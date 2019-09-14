---
title: setup:sync
level: intermediate
---
setup:sync
==========

Nut's `setup:sync` command synchronise a Bolt install private asset directories
with the web root.

## Usage

```bash
    php ./bin/console setup:sync [options]
```


## Options

| Option | Description |
|--------|-------------|
| -t, --themes | Copy example themes from bolt/themes into the site theme base-directory



## Examples

```bash
$ ./bin/console setup:sync

Synchronising Bolt asset directories with the web root
======================================================

 [OK] Directory synchronisation succeeded.
```


```bash
$ ./bin/console setup:sync --themes

 Continuing will copy/update the example themes into your installation, overwriting older copies. Is this OK? (yes/no) [yes]:
 >

Installing theme: base-2016
===========================

 [OK]


Installing theme: skeleton
==========================

 [OK]


Synchronising Bolt asset directories with the web root
======================================================

 [OK] Directory synchronisation succeeded.
```

