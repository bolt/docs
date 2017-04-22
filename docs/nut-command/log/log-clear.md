---
title: log:clear
level: intermediate
---
log:clear
=========

Nut's `log:clear` command clears (truncates) the system & change logs.

## Usage

```bash
    php ./app/nut log:clear [options]
```


## Options

| Option | Description |
|--------|-------------|
| -f, --force | If set, no confirmation will be required


## Example

```bash
$ php ./app/nut log:clear
Are you sure you want to clear the system & change logs? yes
System & change logs cleared!
```

