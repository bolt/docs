---
title: Working with files
level: intermediate
---
Working with files
==================

Each file in the filesystem is an instance of an `\Bolt\Filesystem\Handler\FileInterface`
object.

#### Checking if a file exists

```php
    /** @var bool $exists */
    $exists = $filesystem->exists($path);
```

| Variable | Type | Description 
| -------- | ---- | -----------
| `$path`  | `string` | The path to the file

#### Getting a file object

```php
    /** @var \Bolt\Filesystem\Handler\FileInterface $file */
    $file = $filesystem->getFile($path);
```

Where:

| Variable | Type | Description 
| -------- | ---- | -----------
| `$path`    | `string` | Relative path to the file

#### Getting a file's contents

Read the contents of a file into a variable.

```php
    $data = $filesystem->read($path);
```

Where:

| Variable | Type | Description 
| -------- | ---- | -----------
| `$path`  | `string` | Relative path to the file

#### Create & updating files

The `FilesystemInterface` gives two ways to persist data to a file on a
filesystem, `->write()` will create a file, and `->put()` will persist the data
to an existing file, or a new file if the requested target doesn' exist.

```php
    // Create a file or update if exists
    $filesystem->put($path, $contents, $config = []);

    // Write a new file.
    $filesystem->write($path, $contents, $config = []);
```

Where:

| Variable | Type | Description 
| -------- | ---- | -----------
| `$path`     | `string` | The target file
| `$contents` | `mixed`  | Data to be written to the target file
| `$config`   | `array`  | Optional configuration array

<p class="note"><strong>Note:</strong> The <code>write()</code> method will 
throw a `\Bolt\Filesystem\Exception\FileExistsException` if you attempt to 
write to an existing file, use <code>put()</code> in that circumstance.</p>

#### Copy Files

Copies a file and its contents to another.

```php
    $filesystem->copy($origin, $target, $override = null)
```

Where:

| Variable | Type | Description 
| -------- | ---- | -----------
| `$origin`  | `string`      | The origin file
| `$target`  | `string`      | The target file
| `override` | `bool`/`null` | Whether to override an existing file
| | | true = always override the target
| | | false = never override the target
| | | null = only override the target if the source is newer

#### Rename Files

Rename a file

```php
    $filesystem->rename($path, $newPath);
```

Where:

| Variable | Type | Description 
| -------- | ---- | -----------
| `$path`    | `string` | Path to the existing file
| `$newPath` | `string` | The new path of the file

#### Delete Files

Delete a file.

```php
    $filesystem->delete($path);
```

Where:

| Variable | Type | Description 
| -------- | ---- | -----------
| `$path` | `string` | The target file

<p class="note"><strong>Note:</strong> The <code>delete()</code> method will 
throw a `\Bolt\Filesystem\Exception\FileNotFoundException` if you attempt to 
delete a non-existing file, use <code>exists()</code> to check its existance,
or <code>try</code>/<code>catch</code> if preferred.</p>
