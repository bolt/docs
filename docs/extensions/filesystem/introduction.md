---
title: Overview of Bolt's Filesystem
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

For more details on using these, refer to the following sections:

  * [Filesystem Manager service](filesystem-manager)
  * [Filesystems](filesystems)
    * [Working with files](working-with-files)
    * [Working with directories](working-with-directories)
    * [Using file type handlers](file-type-handlers)

---

[flysystem]: https://flysystem.thephpleague.com/
