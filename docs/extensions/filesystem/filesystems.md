---
title: Filesystems
level: intermediate
---
Filesystems
===========

The examples in this section assume you have a `$filesystem` variable set via
the filesystem manager.

For guidance see the [Getting a mount point's filesystem object][getting-fs]
section of the Filesystem Manager page.

## Using filesystem objects

To work with filesystem objects, such as files & directories, it is highly
encouraged that you read the following two sections.

  * [Working with files](working-with-files)
  * [Working with directories](working-with-directories)


## Checking a filesystem object exists

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

## Generic getter

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


[getting-fs]: filesystem-manager#getting-a-mount-point-s-filesystem-object
