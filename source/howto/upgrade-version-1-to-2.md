# Upgrading a Bolt 1.x install to 2.x

There has been some extensive clean ups and changes in the file system layout for Bolt 2.  As a result, if 
you're upgrading an install it is a good  idea to remove some of the old files that are no longer in use.

This is of course is only required if you install via ZIP or TGZ files.

The list of directories to remove before upgrade are:
  - `app/src/`
  - `app/classes/`
  - `app/resources/`
  - `app/theme_defaults/`
  - `app/view/`

If you're on a UNIX/Linux host, you can customise the following script to clean up before unpacking the Bolt 2 archive:

```bash
cd /my/bolt/directory

for d in classes resources src theme_defaults view; do 
    rm -rf ./app/$d; 
done
```