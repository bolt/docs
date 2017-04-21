---
title: database:import
level: intermediate
---
database:import
===============

<p class="warning"><strong>Note:</strong> This command is considered
experimental, and its format may change over minor versions.</p>

<p class="warning"><strong>Note:</strong> This command does not handle
taxonomy or relations.</p>

Nut's `database:import` command emport database records from a YAML or JSON
file.

## Usage

```bash
    php ./app/nut database:import [options]
```


## Options

| Option | Description |
|--------|-------------|
| -f, --file=FILE | A YAML or JSON file to use for import data. Must end with .yml, .yaml or .json (multiple values allowed)


## Example

### Importing records


```bash
$ php ./app/nut database:import --file=my-site-export.json


WARNING THIS IS AN EXPERIMENTAL FEATURE


Are you sure you want to continue with the import? yes

Records imported from my-site-export.json
```

