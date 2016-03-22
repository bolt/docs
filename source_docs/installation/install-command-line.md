Quick-install, using the command-line
=====================================

If you have command-line access, you can easily install Bolt by executing a few
commands. First, create the directory where you want to install Bolt, if it
doesn't already exist. Enter the directory, and execute the following commands:

```bash
curl -O http://bolt.cm/distribution/bolt-latest.tar.gz
tar -xzf bolt-latest.tar.gz --strip-components=1
```
If this didn't work because your server doesn't have `curl`, use `wget`
instead.

That's all!

Next Steps
----------

#### Permissions

Generally most server should be fine with the default permissions. However, if 
you require guidance on setting up permissions, see our [File System Permissions](permissions)
page. 

#### Finishing Set-up

After you've done this, skip to the section [Setting up Bolt](#setting-bolt).
