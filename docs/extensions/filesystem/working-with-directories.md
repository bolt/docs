---
title: Working with directories
level: intermediate
---
Working with directories
========================

Each directory in the filesystem is an instance of an 
`\Bolt\Filesystem\Handler\DirectoryInterface` object.

#### Checking if a directory exists

```php
    /** @var bool $exists */
    $exists = $filesystem->exists($path);
```

| Variable | Type | Description 
| -------- | ---- | -----------
| `$path`  | `string` | The path to the directory

#### Get a directory object

```php
    /** @var \Bolt\Filesystem\Handler\DirectoryInterface $dirObj */
    $dirObj = $filesystem->getDir($path);
```

| Variable | Type | Description 
| -------- | ---- | -----------
| `$path`  | `string` | The path to the directory

#### Copy Directories

Copies a directory and its contents to another.

```php
    $filesystem->copyDir($originDir, $targetDir, $override = null);
```

Where:

| Variable | Type | Description 
| -------- | ---- | -----------
| `$originDir` | `string`      | The origin directory
| `$targetDir` | `string`      | The target directory
| `override`   | `bool`/`null` | Whether to override an existing file
| | | true = always override the target
| | | false = never override the target
| | | null = only override the target if the source is newer


#### Mirror Directories

Mirrors a directory to another.

<p class="note"><strong>Note:</strong> By default, this will delete files in
target if they are not in source.</p>

```php
    $filesystem->mirror($originDir, $targetDir, $config = []);
```

Where:

| Variable | Type | Description 
| -------- | ---- | -----------
| `$originDir` | `string` | The origin directory
| `$targetDir` | `string` | The target directory
| `$config`    | `array`  | Array of option parameter/keys

Key/value pairs that make up `$config`

| Name | Type | Description 
| ---- | ---- | -----------
| `delete`   | `bool`/`null` | Whether to delete files that are not in the source
| `override` | `bool`/`null` | Whether to override an existing file
| | | true = always override the target
| | | false = never override the target
| | | null = only override the target if the source is newer
                    

#### Create Directories

Create a directory.

```php
    $filesystem->createDir($dirname, $config = []);
```

Where:

| Variable | Type | Description 
| -------- | ---- | -----------
| `$dirname`| `string` | The target directory
| `$config` | `array`  | Optional configuration array

#### Delete Directories

Delete a directory.

```php
    $filesystem->deleteDir($dirname);
```

Where:

| Variable | Type | Description 
| -------- | ---- | -----------
| `$dirname`| `string` | The target directory
