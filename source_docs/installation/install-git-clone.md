Cloning directly from Git
=========================

If you want to install Bolt using Git and Composer, you need to decide if you
want to use a stable branch, or the bleeding-edge master branch.

### Stable Branch

For a execute the following commands:

```bash
git clone git://github.com/bolt/bolt.git bolt
cd bolt
git checkout v2.2.6
curl -s http://getcomposer.org/installer | php
php composer.phar install
```

**Note:** The above example assumes that you want to use the `2.2.6` tag.
Available branches can displayed by executing the following command:

```bash
git tag
```

### Master (unstable) Branch

```bash
git clone git://github.com/bolt/bolt.git bolt
cd bolt
curl -s http://getcomposer.org/installer | php
php composer.phar install
```

### Final Step (optional)

This will get the Bolt files and all required components. Most likely all files
and directories will have the correct file permissions, but if they don't,
(re)set them using the following command in the `bolt/` directory:

```bash
chmod -R 777 files/ app/database/ app/cache/ app/config/ theme/ extensions/
```

It depends on the exact server configuration if you will need to use `777` or
if an other setting is better. If you wish to know for sure, ask your hosting
provider.