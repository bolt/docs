---
title: File system permissions
---
Bolt File System Permissions
============================

On most servers the web server runs in a different group than your user
account, so to give Bolt write access to these files you have to use the
`chmod` command.

For most things, your web server just needs to be able to **read** Bolt's PHP,
JavaScript, CSS, Twig and other files.

However, Bolt must be able to **read and write** certain directories.

Most FTP clients will allow you to do this quickly, using a 'include files' or
'apply to enclosed' option.

<a href="/files/ftp-chmod.png" class="popup"><img src="/files/ftp-chmod.png" width="590"></a><br>

Setting Permissions (Quick & Easy)
----------------------------------

This approach is not recommended, but for some hosts, or to just get moving
quickly, run these commands from inside your Bolt directory:

```bash
chmod -R 777 app/cache/ app/config/ app/database/ extensions/
chmod -R 777 public/thumbs/ public/extensions/ public/files/ public/theme/
```

Make sure that the root folder is also readable by the webserver. On some
setups (mainly shared hosting solutions) this is not always the case. To remedy
this, run:

```bash
chmod a+r .
```

Setting Permissions (Secure)
----------------------------

Bolt **must have** write permissions to the following directories and their
files:

  * `app/cache/`
  * `app/database/`
  * `public/thumbs/`

You can achieve this by running:

```bash
for dir in app/cache/ app/database/ public/thumbs/ ; do
    find $dir -type d -print0 | xargs -0 chmod u+rwx,g+rwxs,o+rx-w
    find $dir -type f -print0 | xargs -0 chmod u+rw-x,g+rw-x,o+r-wx > /dev/null 2>&1
done
```

For back-end administration using the UI, we strongly advise making the
following directories, and the files contained within, writeable by the web
server user:

  * `app/config/`
  * `extensions/`
  * `public/extensions/`
  * `public/files/`
  * `public/theme/`

You can achieve this by **also** running:

```bash
for dir in app/config/ extensions/ public/extensions/ public/files/ public/theme/ ; do
    find $dir -type d -print0 | xargs -0 chmod u+rwx,g+rwxs,o+rx-w
    find $dir -type f -print0 | xargs -0 chmod u+rw-x,g+rw-x,o+r-wx > /dev/null 2>&1
done
```

Make sure that the root folder is also readable by the webserver. On some
setups (mainly shared hosting solutions) this is not always the case. To remedy
this, run:

```bash
chmod a+r .
```
