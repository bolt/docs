The traditional way, using (S)FTP
=================================

Download the [latest version of Bolt](http://bolt.cm/distribution/bolt-latest.zip).

Extract the .zip file, and upload to your webhost using the (S)FTP client of
your choice. After you've done this, be sure to chmod the following directories
(_with_ containing files) to `777`, so they are readable and writable by Bolt:

  - `app/cache/`
  - `app/config/`
  - `app/database/`
  - `files/`
  - `theme/`
  - `extensions/`

Most FTP clients will allow you to do this quickly, using a 'include files' or
'apply to enclosed' option. It depends on the exact server configuration if you
will need to use `777` or if an other setting is better. If you wish to know
for sure, ask your hosting provider.

<a href="/files/ftp-chmod.png" class="popup"><img src="/files/ftp-chmod.png" width="590"></a><br>

<p class="note"><strong>Note:</strong> Don't forget to upload the
<code>.htaccess</code> file! Bolt won't work without it. If you can't find the
file on your filesystem, download this <a
href="http://bolt.cm/distribution/default.htaccess">
<code>default.htaccess</code></a> file. Upload it to your server, and then
rename it to <code>.htaccess</code>.<br/><br/> If you're on OSX and you don't
see the file, it might be that your system is set up to 'hide' hidden files.
You can usually still find it, when browsing local files using your FTP
client.</p>

After you've done this, skip to the section [Setting up Bolt](#setting-bolt).
