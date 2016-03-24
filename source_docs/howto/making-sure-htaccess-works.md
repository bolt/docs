Making sure .htaccess and mod_rewrite are working as they should
================================================================

Bolt makes extensive use of a common feature called 'url rewriting'. This
basically means that you can request a pretty url like `/page/about-this-website`
in your browser, and behind the scenes your webserver will just 'translate' this
to run the `index.php` with the correct parameters, so that Bolt can produce the
correct page for you.

This doesn't work out-of-the-box on all webservers, but it _is_ a hard
requirement for using Bolt. If you're reading this page, you are likely in the
process of setting up Bolt and after requesting the first page, you got redirected
to the page `/bolt/userfirst`, where you saw the following error message:

<div class="gallery-popup">
    <a href="/files/htaccess-4.png" class="gallery-popup" title="bolt/userfirst not found">
    <img src="/files/htaccess-4.png" width="660"></a><br>
</div>

One of the three following possibilities is giving you problems:

- You've misplaced the .htaccess file
- Apache ignores `.htaccess` altogether
- Mod_rewrite is not enabled

Test if `.htaccess` is working
------------------------------

The simplest way to test if apache uses your `.htaccess` file, or if it otherwise
ignores it, is to intentionally break it.

Edit the `.htaccess` file, so the first line reads 'Test.':

```apache
Test.

# Set the default handler
DirectoryIndex index.php index.html index.htm

...

```

Now, if you refresh the page in your browser, you should see an error page like
this:

<div class="gallery-popup">
    <a href="/files/htaccess-2.png" class="gallery-popup" title="Htaccess working">
    <img src="/files/htaccess-2.png" width="660"></a><br>
</div>

If you see this error, that's **actually good**! This means that Apache is
parsing the `.htaccess` file, and it encounters the error we've put in there! So
far, so good!

If you do _not_ see an 'Internal Server Error', your Apache setup ignores the
`.htaccess` file, and you need to fix that. If you are not sure if the file
exists and is readable, download our test script:

 - Download the script here: [htaccess_tester.php on Github][tester]
 - Rename it to `htaccess_tester.php`, if needed.
 - Place it in the folder where you've put Bolt.
 - Open it in the browser with the URL. (so, make sure you're not accessing it
   as a `file://`)
 - If you get an error, you will need to fix it by making sure the `.htaccess`
   file exists and is readable.

This is correct:

<div class="gallery-popup">
    <a href="/files/htaccess-3.png" class="gallery-popup" title="Htaccess working">
    <img src="/files/htaccess-3.png" width="660"></a><br>
</div>

Test if `mod_rewrite` is working
--------------------------------

To test if `mod_rewrite` is working correctly, do the following:

 - Download the script here: [htaccess_tester.php on Github][tester]
 - Rename it to `htaccess_tester.php`, if needed.
 - Place it in the folder where you've put Bolt.
 - Create a `.htaccess` file with the contents as below.

```apache
<IfModule mod_rewrite.c>
    RewriteEngine On
    RewriteRule ^.*$ htaccess_tester.php
</IfModule>
```

 - In your browser, open `/test`, with the correct domain name. So, it should
   look like `http://localhost/test` or `http://example.org/test`.
 - If you see the following, it works! If you see something else, you will need
   to fix that.

This is correct:

<div class="gallery-popup">
    <a href="/files/htaccess-1.png" class="gallery-popup" title="Htaccess working">
    <img src="/files/htaccess-1.png" width="660" style="bor"></a><br>
</div>

My htaccess is broken? What do?
-------------------------------

There are a plethora of reasons why it might not work on your system, and these
reasons vary so wildly, that we can't give an exhaustive solution for that. That
said, here are a few pointers that might help you fix it:

### Enable `.htaccess` in your `httpd.conf` or `apache.conf`

It's unusual, but possible that `.htaccess` is not enabled on your site. If you
are hosting it yourself, it's easy enough to fix. Open your `httpd.conf` or
`apache.conf` in a text editor, and locate the `<Directory>` section:

```apache
<Directory "/var/www/htdocs">
    AllowOverride None
```

Change the `AllowOverride` line to:

```apache
    AllowOverride All
```

Be sure to restart Apache after making any modifications to this file. Now, your
`.htaccess` should work. You can also make this change inside a virtual host,
which would normally be preferable, but that depends on the way Apache is set
up.

If your site is hosted elsewhere, check your control panel (Plesk, DirectAdmin,
CPanel, whatever) to see if you can enable `.htaccess` there. If not, contact
your hosting provider to do it for you.

### Enable `mod_rewrite` in Apache

There are a number of ways to enable `mod_rewrite`, in case it's not yet enabled
on your setup. See this Stack Overflow thread for various ways this may be done
on different setups:
[How to enable mod_rewrite for Apache 2.2](http://stackoverflow.com/questions/869092/how-to-enable-mod-rewrite-for-apache-2-2).

### Inspect Apache's logfiles

Apache logs a _lot_ of stuff. Inspect the 'access' and 'error' logs generated by
Apache to see if they contain valuable information. A common location for these
files is `/var/log/apache2/`, but it might be in a different path on your
system. Check your apache `.conf` file to see where these files might be hiding.

### Enabling Rewritebase

If you're setting up Bolt in a subfolder, you might have to uncomment the line
for the `RewriteBase` setting.

Change

```apache
  # Some servers require the RewriteBase to be set. If so, set to the correct folder.
  # RewriteBase /
```

to:

```apache
  # Some servers require the RewriteBase to be set. If so, set to the correct folder.
  RewriteBase /
```

### Move your site to the 'top level'

If you're setting up Bolt in a subfolder and the previous tip doesn't work, you
might try setting up Bolt in it's own subdomain, since that usually gives less
problems. So, instead of using `http://example.org/testingbolt`, set it up as
`http://testingbolt.example.org/`.

### Contact your webhost

Ask your webhost what might be wrong. The more info you give them, the bigger
the chance that they might be able to help you out.

### Use a pre-configured build of Apache

If you're setting up Apache on your own computer, and it's turning out to be
hard to configure, you should consider using [XAMPP](https://www.apachefriends.org/index.html)
(Windows), [MAMP](https://www.mamp.info/en/) (OS X) or [AMPPS](http://www.ampps.com/)
(Windows, OS X, Linux).

### Use Nginx instead

If you're fed up with Apache's shenanigans, you might consider ditching it in
favor of [Nginx](http://nginx.org/en/download.html). Nginx is a high-performance
webserver, that's actually easier to configure than Apache.

[tester]: https://raw.githubusercontent.com/bolt/htaccess_tester/master/htaccess_tester.php
