---
title: database:export
level: intermediate
---
database:export
===============

<p class="warning"><strong>Note:</strong> This command is considered
experimental, and its format may change over minor versions.</p>

<p class="warning"><strong>Note:</strong> This command does not handle
taxonomy or relations.</p>


Nut's `database:export` command exports the database records to a YAML or JSON
file.

## Usage

```bash
    php ./app/nut database:export [options]
```


## Options

| Option | Description |
|--------|-------------|
| -c, --contenttypes=CONTENTTYPES | One or more contenttypes to export records for. (multiple values allowed)
| -f, --file=FILE | A YAML or JSON file to use for export data. Must end with .yml, .yaml or .json


## Example

### Exporting "Pages" ContentType records


```bash
$ php ./app/nut database:export --file=my-site-export.json --contenttypes=pages


WARNING THIS IS AN EXPERIMENTAL FEATURE


Are you sure you want to continue with the export? yes
Database exported to my-site-export.json
```

