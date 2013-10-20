Updating Bolt
=============

As with all web-based applications, it's good practice to keep your site up to date with the latest version. Bolt is built in such a way, that none of the files that are used for the configuration are included in the distribution files. In practice, this means that upgrading Bolt works in exactly the same way as installing a new copy of bolt. Skip to the right section below: 

  - The easiest way, [from the command-line](#option-1-the-easy-way-using-the-command-line).
  - The traditional way, [using (S)FTP](#option-2-the-traditional-way-using-sftp).
  - The nerdy way, [for developers](#option-3-the-developer-way-using-git-and-composer).

<p class="note"><strong>Note:</strong> The exception to this rule is the <code>base-2013</code> template folder. If you've made modifications to these files, they <em>will</em> get overwritten. We strongly advise to always work in a template folder with a different name. Simply copy the <code>base-2013</code>, and change the setting in your <code>config.yml</code> for <code>theme: base-2013</code> accordingly.</p>


<p class="tip"><strong>Tip:</strong> Even though nothing <em>should</em> go wrong when updating Bolt, it is still a good idea to make sure you have a backup of your website. You know, just in case. Better safe than sorry. That sort of thing.</p>

### Option 1: The easy way, using the command-line.

If you have command-line access, you can update Bolt by executing a few commands. 

<pre class="brush: plain">
curl -O http://bolt.cm/distribution/bolt_latest.tgz
tar -xzf bolt_latest.tgz
chmod -R 777 files/ app/database/ app/cache/ app/config/ theme/
</pre>


### Option 2: The traditional way, using (S)FTP.

Download the latest version of Bolt from this location:

[http://bolt.cm/distribution/bolt_latest.zip](http://bolt.cm/distribution/bolt_latest.zip)

Extract the .zip file, and upload to your webhost using the (S)FTP client of your choice.

<p class="note"><strong>Note:</strong> Most FTP clients will <em>merge</em> the folders you're uploading, but some clients <em>replace</em> folders instead. If you're not sure what your client does, be sure to test this, before you accidentally wipe a folder and its contents.</p>

### Option 3: The developer way, using git and composer.

If you've installed via Git, you can update by executing the following commands. 

<pre class="brush: plain">
git pull
php composer.phar self-update
php composer.phar update
</pre>
