---
title: Filesystem
level: intermediate
---
Bolt's Filesystem
=================

Bolt uses a visualised filesystem layer, built using [Flysystem][flysystem].

Each filesystem is registered with the Filesystem Manager on what are referred
to as a "mount point". These mount points include:

  * `cache` — User's cache mount point
  * `config` — User's config mount point
  * `extensions` — User's extension mount point
  * `extensions_config` — User's extension config mount point
  * `files` — User's files mount point
  * `themes` — User's extension mount point
  * `web` — User's web root mount point

Requesting a named, valid, mount point from the Filesystem Manager will return
a filesystem.

Inside each filesystem are a group of files and directories, that can be 
created, read, updated, and deleted, via the mount point's filesystem object.

So the interaction with files & directories generally follows the code path

Filesystem Manager service -> `\Bolt\Filesystem\FilesystemInterface` mount 
point object -> `\Bolt\Filesystem\Handler\FileInterface` or 
`\Bolt\Filesystem\Handler\DirectoryInterface` object 


## Filesystem Manager

Bolt's filesystem management service `$app['filesystem]` is an instance of
`\Bolt\Filesystem\Manager` which provides access to the various, specific,
mount points.


### Mount Points

A filesystem mount point at its root can be thought of a data storage location
for a particular grouping of files and directories.

By default mount points in Bolt are built from directory "roots" (locations)
on the same local filesystem you installed Bolt on.

Every mount point is a filesystem object, that is an instance of
`\Bolt\Filesystem\FilesystemInterface`.

With these filesystem objects you can perform a general set of CRUD actions on
files and directories under that mounted filesystem.

#### Getting a mount point's filesystem object

To perform actions on files and directories, you should first fetch the
filesystem, the file system manager provides the method 
`getFilesystem($mountPointName)`.

```php
    $mountPointName = 'files';

    /** @var \Bolt\Filesystem\Manager $manager */
    $manager = $app['filesystem'];

    /** @var \Bolt\Filesystem\FilesystemInterface $filesystem */
    $filesystem = $manager->getFilesystem($mountPointName);
```

You can now access your mounted filesystem via the `$filesystem` object, see
the [Filesystems](#Filesystems) section below for details on what can be done
with it.

#### Checking if a filesystem's mount exists

To verify if a filesystem mount point exists, the file system manager provides
the method `hasFilesystem($mountPointName)`.

e.g. Checking to see if the `files` filesystem is mounted:

```php
    $mountPointName = 'files';

    /** @var \Bolt\Filesystem\Manager $manager */
    $manager = $app['filesystem'];
    if ($manager->hasFilesystem($mountPointName)) {
        // You can now do something with this filesystem.
    }
```

## Filesystems

The examples in this section assume you have a `FilesystemInterface` as your
`$filesystem` value, see the 
[Getting a mount point's filesystem object](#getting-a-mount-points-filesystem-object)
section.


### Files

Each file in the filesystem is an instance of an `\Bolt\Filesystem\Handler\FileInterface`
object.

#### Getting a file object

```php
    $filesystem->getFile($path);
```
```php
    $filesystem->getFile($path, $handler);
```

Where:

| Variable | Type | Description 
| -------- | ---- | -----------
| `$path`    | `string`      | Relative path to the file
| `$handler` | `HandlerInterface` | Optional handler to use

#### Getting a file with an image handler 

```php
    $filesystem->getImage($path);
```

Where:

| Variable | Type | Description 
| -------- | ---- | -----------
| `$path`  | `string` | Relative path to the file


### Directories

Each directory in the filesystem is an instance of `\Bolt\Filesystem\Handler\DirectoryInterface`
object.

#### Get a directory object

```php
    $filesystem->getDir();
```

#### Copy Directories

```php
    $filesystem->copyDir($originDir, $targetDir, $override = null)
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

```php
    $filesystem->mirror($originDir, $targetDir, $config = [])
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


```php
    $filesystem->createDir($dirname, $config = [])
```

Where:

| Variable | Type | Description 
| -------- | ---- | -----------
| `$dirname`| `string` | The target directory
| `$config` | `array`  | Optional configuration array

#### Delete Directories

```php
    $filesystem->deleteDir($dirname)
```

Where:

| Variable | Type | Description 
| -------- | ---- | -----------
| `$dirname`| `string` | The target directory


### Getting filesystem object handlers

#### Checking a filesystem object exists

To check if a filesystem has an existing file or directory, you can use the
`$filesystem->has($path)` method. It will return a boolean value, `true` if the
subject exists, `false` otherwise.

For example, to check if a file exists prior to fetching it with `->get()`:

```php
    $path = 'relative/path/header.jpg';
    if ($filesystem->has($path)) {
        $object = $filesystem->get($path);
    }
```

#### General getter

To get a file or directory you can use `$filesystem->get($path)` to get an
PHP object that represents an **existing** filesystem object. 

```php
    $filesystem = $manager->getFilesystem('files');
    $relativePathToFile = 'programming/lecture-notes/oop.txt';

    // Attempt to get the file `files://programming/lecture-notes/oop.txt`
    $object = $filesystem->get($relativePathToFile);
```

<p class="note"><strong>Note:</strong> </code>$filesystem->get($path)</code> 
expects the file or directory to exist at the relative path variable's location.
</br></br>
If this file does not exist, then the filesystem manager will throw an
exception of <code>\Bolt\Filesystem\Exception\FileNotFoundException`</code>
type.
</p>

##### Specific file type handlers

To use a specific `HandlerInterface` for the object returned by get, you can
pass in an instance of a `\Bolt\Filesystem\Handler\HandlerInterface` class.

e.g. Someone gave you a JSON file called `special.xyz`, and you wish for it to
be handled natively as a JSON file:


```php
    /** @var \Bolt\Filesystem\Handler\HandlerInterface $handler */
    $handler = \Bolt\Filesystem\Handler\JsonFile();
    
    $object = $filesystem->get('relative/path/special.xyz', $handler);
    
    // As $object is a JSON handled file, we can parse it to PHP.
    $data = $object->parse();
    
    $data['updated'] = time();
    
    // We can also dump the updated PHP array back to a JSON file.
    $object->dump($data);
    
```

---

[flysystem]: https://flysystem.thephpleague.com/
