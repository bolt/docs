---
title: config:get
level: intermediate
---
config:get
==========

Nut's `config:get` command returns the value of an **existing** key in Bolt's
configuration files, by default `config.yml`.

<p class="note"><strong>Note:</strong> sub keys can be specified in the
<code>key</code> argument using <code>/</code>as a delimiter, e.g.
<code>thumbnails/quality</code>.</p>


## Usage

```bash
    php ./bin/console config:get [options] [--] <key>
```


## Arguments

| Argument | Description |
|----------|-------------|
| key      | The key configuration key you wish to get


## Options

| Option | Description |
|--------|-------------|
| -f, --file[=FILE] | Specify config file to use


## Examples

### Query current theme

```bash
$ php ./bin/console config:get theme
theme: base-2016
```


### Querying the "quality" value of "thumbnails"

```bash
$ php ./bin/console config:get thumbnails/quality
thumbnails/quality: 80
```


### Query a ContentType's field type

```bash
$ php ./bin/console config:get pages/fields/body/type --file contenttypes.yml
pages/fields/body/type: html
```


