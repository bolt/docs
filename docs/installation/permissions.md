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

From the Command Line this is easy to fix. Most FTP clients will allow you to
do this quickly as well, using a 'include files' or 'apply to enclosed' option.

<a href="/files/ftp-chmod.png" class="popup"><img src="/files/ftp-chmod.png" width="590"></a><br>

Setting Permissions (Quick & Easy)
----------------------------------

This approach is not recommended, but for some hosts, or to just get moving
quickly, run these commands from inside your Bolt directory:

```bash
chmod -R 777 config/ public/files/ public/theme/ public/thumbs/ var/
```

Make sure that the root folder is also readable by the web server. On some
setups (mainly shared hosting solutions) this is not always the case. To remedy
this, run:

```bash
chmod a+r .
```

Setting Permissions (Secure)
----------------------------

Bolt **must have** write permissions to the following directories and their
files:

  * `config/`
  * `public/files/`
  * `public/theme/`
  * `public/thumbs/`
  * `var/`

You can achieve this by running:

```bash
for dir in config/ public/files/ public/theme/ public/thumbs/ var/ ; do
    find $dir -type d -print0 | xargs -0 chmod u+rwx,g+rwxs,o+rx-w
    find $dir -type f -print0 | xargs -0 chmod u+rw-x,g+rw-x,o+r-wx > /dev/null 2>&1
done
```

<p class="note"><strong>Note</strong> If you're using SQLite, you must ensure
that both the database file as well as the containing folder are writable for
the webserver's user. It's stored in <code>var/data/bolt.sqlite</code> by
default. This means that it's taken into account in the above instructions. If
you've configured the file to be located elsewhere, you might need to set the
permissions yourself.</p>

Make sure that the root folder is also readable by the web server. On some
setups (mainly shared hosting solutions) this is not always the case. To remedy
this, run:

```bash
chmod a+r .
```
