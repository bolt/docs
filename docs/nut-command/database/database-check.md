---
title: database:check
level: intermediate
---
database:check
===============

Nut's `database:check` command check the database for missing tables and/or
columns.

## Usage

```bash
    php ./app/nut database:check
```


## Example

### No changes required

```
$ php ./app/nut database:update
Your database is already up to date.
```

### New ContentType table required

```bash
$ php ./app/nut database:check
Modifications required:
 - Table `bolt_entries` is not present.
One or more fields/tables are missing from the Database. Please run 'nut database:update' to fix this.
```
