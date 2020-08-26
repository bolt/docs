---
title: database:prefill
level: intermediate
---
database:prefill
================

Nut's `database:prefill` command re-fill the database Lorem Ipsum records.

## Usage

```bash
    php ./bin/console database:prefill [options] [--] [<contenttypes>]...
```


## Arguments

| Argument | Description |
|----------|-------------|
| contenttypes | A list of Contentypes to pre-fill. If this argument is empty, all Contenttypes are used


## Example

### Pre-filling with a "Pages" ContentType

```bash
$ php ./bin/console database:prefill pages
Continue with this action? yes
Database pre-filled
```

