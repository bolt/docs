---
title: Filesystem Manager
level: intermediate
---
Filesystem Manager
==================

Bolt's filesystem management service `$app['filesystem]` is an instance of
`\Bolt\Filesystem\Manager` which provides access to the various, specific,
mount points.


## Mount Points

A filesystem mount point at its root can be thought of a data storage location
for a particular grouping of files and directories.

By default mount points in Bolt are built from directory "roots" (locations)
on the same local filesystem you installed Bolt on.

Every mount point is a filesystem object, that is an instance of
`\Bolt\Filesystem\FilesystemInterface`.

With these filesystem objects you can perform a general set of CRUD actions on
files and directories under that mounted filesystem.

### Getting a mount point's filesystem object

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

### Checking if a filesystem's mount exists

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
