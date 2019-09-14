---
title: Twig Operations
level: intermediate
---
Twig Operations
===============

The `debug:twig` command outputs a list of twig functions, filters, globals
and tests. Output can be filtered with an optional argument.


## Use cases

Debugging Twig operations is usually for the following reasons:
  * Finding what operations Twig has available in the following categories:
    * Functions
    * Filters
    * Tags
    * Tests
  * Determining what parameters an operation requires, if a parameter is required,
    or what default value is used if none supplied
  * Finding out the correct name (and typographical case) of an operation


## Usage

```bash
    php .bin/console debug:twig [options] [--] [<filter>]
```

## Options

| Option | Description |
|--------|-------------|
| --format=FORMAT | The output format (text or json) [default: "text"]


## Examples

### Filtered Output

To find all twig operations, and parameters, with the text "asset":

```bash
$ php ./bin/console debug:twig asset

Functions
---------

 * asset(path, packageName = null, absolute = false, version = null)
 * asset_version(path, packageName = null)
 * assets_version(packageName = null)
```

To find all twig operations, and parameters, with the text "json":

```bash
$ php ./bin/console debug:twig json

Filters
-------

 * json_decode
 * json_encode(options = 0)

Tests
-----

 * json
```

### All Functions, Filters, Tests & Tags

An edited-down example of the output:

```bash
$ php ./bin/console debug:twig

Functions
---------

 * asset(path, packageName = null, absolute = false, version = null)
 * canonical()
 * constant(constant, object = null)
 * controller(controller, attributes = [], query = [])
 * excerpt(content, length = 200, focus = null)
 * fields(record = null, common = true, extended = false, repeaters = true, templateFields = true, template = "_sub_fields.twig", exclude = null, skip_uses = true)
 * first(item)
 * include(template, variables = [], withContext = true, ignoreMissing = false, sandboxed = false)
 * last(item)
 * max(args)
 * min(args)
 * path(name, parameters = [], relative = false)
 * popup(fileName = null, width = null, height = null, crop = null, title = null)
 * range(low, high, step)
 * thumbnail(fileName = null, width = null, height = null, crop = null)
 * url(name, parameters = [], schemeRelative = false)

Filters
-------

 * capitalize
 * date(format = null, timezone = null)
 * default(default = "")
 * e(strategy = "html", charset = null, autoescape = false)
 * escape(strategy = "html", charset = null, autoescape = false)
 * excerpt(length = 200, focus = null)
 * first
 * humanize
 * join(glue = "")
 * length
 * raw
 * replace(from, to = null)
 * trans(arguments = [], domain = null, locale = null)
 * trim(characterMask = null, side = "both")

Tests
-----

 * constant
 * defined
 * divisible by
 * divisibleby
 * empty
 * even
 * iterable
 * json
 * none
 * null
 * odd
 * same as
 * sameas
 * selectedchoice
 * stackable

Globals
-------

 * global = object(Symfony\Bridge\Twig\AppVariable)
```
