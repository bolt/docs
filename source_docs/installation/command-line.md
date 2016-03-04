# Option 1: The easy way, using the command-line.

If you have command-line access, you can easily install Bolt by executing a few
commands. First, create the directory where you want to install Bolt, if it
doesn't already exist. Enter the directory, and execute the following commands:

```bash
curl -O http://bolt.cm/distribution/bolt-latest.tar.gz
tar -xzf bolt-latest.tar.gz --strip-components=1
chmod -R 777 files/ app/database/ app/cache/ app/config/ theme/ extensions/
```

Bolt needs to be able to read and write certain directories like the cache and
the template directories. On most servers the webserver runs in a different
group than your user account, so to give Bolt write access to these files you
have to use the chmod statement.

It depends on the exact server configuration if you will need to use `777` or
if an other setting is better. If you wish to know for sure, ask your hosting
provider.

That's all! After you've done this, skip to the section [Setting up Bolt](#setting-bolt).
If this didn't work because your server doesn't have `curl`, use `wget`
instead.