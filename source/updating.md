Updating Bolt
=============

As with all web-based applications, it's good practice to keep your site up to date with
the latest version. Bolt is built in such a way, that none of the files that are used for
the configuration are included in the distribution files. In practice, this means that
upgrading Bolt works in exactly the same way as installing a new copy of bolt. Skip to the
right section below:

  - The easiest way, [from the command-line](#option-1-the-easy-way-using-the-command-line).
  - The traditional way, [using (S)FTP](#option-2-the-traditional-way-using-sftp).
  - The nerdy way, [for developers](#option-3-the-developer-way-using-git-and-composer).

<p class="note"><strong>Note:</strong> The exception to this rule are the
default theme folders, i.e. <code>base-2013</code> and <code>base-2014</code>. If you've made modifications to these files, they
<em>will</em> get overwritten. We strongly advise to always work in a template folder with
a different name. Simply copy <code>base-2014</code>, and change the setting in your
<code>config.yml</code> for <code>theme: base-2014</code> accordingly.</p>

<p class="tip"><strong>Tip:</strong> Even though nothing <em>should</em> go wrong when
updating Bolt, it is still a good idea to make sure you have a backup of your website. You
know, just in case. Better safe than sorry. That sort of thing.</p>

Option 1: The easy way, using the command-line
----------------------------------------------

If you have command-line access, you can update Bolt by executing a few commands.

```
curl -O http://bolt.cm/distribution/bolt-latest.tar.gz
tar -xzf bolt-latest.tar.gz --strip-components=1
chmod -R 777 files/ app/database/ app/cache/ app/config/ theme/ extensions/
```


Option 2: The traditional way, using (S)FTP
-------------------------------------------

Download the [latest version of Bolt](http://bolt.cm/distribution/bolt-latest.zip).

Extract the .zip file, and upload to your webhost using the (S)FTP client of
your choice.

<p class="note"><strong>Note:</strong> You want to <em>merge</em> folders and 
not replace them. Most FTP clients will <em>merge</em> the folders you're 
uploading, but some <em>replace</em> folders instead. Not sure what your client
does? Test this, before you accidentally wipe a folder and its contents.</p>

Option 3: The developer way, using git and composer
---------------------------------------------------

If you've installed via Git, you can update by executing the following commands. 

```
git pull
php composer.phar self-update
php composer.phar update
```

After updating, you should clear the cache, and make sure the database is up to date.

```
php app/nut cache:clear
```

Check and update the database, with these commands:

```
php app/nut database:check
php app/nut database:update
```
