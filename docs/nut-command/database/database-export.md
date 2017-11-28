---
title: database:export
level: intermediate
---
database:export
===============

Nut's `database:export` command exports the database records to a YAML or JSON
file.

## Usage

```bash
    php ./app/nut database:export [options]
```


## Options

| Option                          | Description |
|---------------------------------|-------------|
| `-f, --file=FILE`               | A YAML or JSON file to use for export data. Must end with .yml, .yaml or .json
| `-d, --directory=DIRECTORY`     | A destination directory. The command will automatically generate file names.
| `-c, --contenttype=CONTENTTYPE` | ContentType name to export records for (can be used multiple times). (multiple values allowed)

## Example

### Exporting "Pages" ContentType records


```bash
$ php ./app/nut database:export --file=my-site-export.json --contenttype=pages

 [WARNING] This command operates on the current database, taking a backup is advised before export.

 Are you sure you want to continue with the export (yes/no) [yes]:
 > y

 ! [NOTE] Exported:

 * pages: 5 records

 [OK] Database exported to my-site-export.json
```

