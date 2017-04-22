---
title: config:set
level: intermediate
---
config:get
==========

Nut's `config:get` command updates the value of an **existing** key in Bolt's
configuration files, by default `config.yml`.

<p class="note"><strong>Note:</strong> sub keys can be specified in the
<code>key</code> argument using <code>/</code>as a delimiter, e.g.
<code>thumbnails/quality</code>.</p>

## Usage

```bash
    php ./app/nut config:set [options] [--] <key> <value>
```


## Arguments

| Argument | Description |
|----------|-------------|
| key      | The key configuration key you wish to get
| value    | The value you wish to set it to


## Options

| Option | Description |
|--------|-------------|
| -f, --file[=FILE] | Specify config file to use
| -b, --backup      | Make a backup of the config file


## Example

### Enabling debugging

```bash
$ php ./app/nut config:set debug true
New value for debug: true was successful. File updated.
```


### Setting a ContentType fiel type

```bash
$ ./app/nut config:set pages/fields/body/type text --file contenttypes.yml
New value for pages/fields/body/type: text was successful. File updated.
```
