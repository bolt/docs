# Making sure `.htaccess` and `mod_rewrite` are working as they should

Bolt makes extensive use of a common feature called 'url rewriting'. This
basically means that in your browser you can request a pretty url like `/page/about-this-website`,
and behind the screens your websever will just 'translate' this to run the `index.php`
with the correct parameters, so that Bolt can produce the correct page for you.
One of the requirements of running Bolt correctly on any webserver is that

This doesn't work on all webservers out-of-the-box, but it _is_ a hard
requirement for using Bolt. If you're reading this page, you are likely in the
process of setting up Bolt. After requesting the first page, you got redirected
to the page `/bolt/userfirst`, where you saw the following error message:

<div class="gallery-popup">
    <a href="../files/htaccess-2.png" class="gallery-popup" title="Htaccess working">
    <img src="../files/htaccess-2.png" width="660"></a><br>
</div>


One of the three following possibilities is giving you problems:

- You've misplaced the .htaccess file
- Apache ignores `.htaccess` altogether
- Mod_rewrite is not enabled



## Test if `.htaccess` is working

The simplest way to test if apache uses tour `.htaccess` file, or if it ignores
it, is to intentionally break it.

Edit the `.htaccess` file, so the first line reads 'Test.':

```
Test.

# Set the default handler.
DirectoryIndex index.php index.html index.htm

...

```

Now, if you refresh the page in your browser, you should see an error page like
this:

<div class="gallery-popup">
    <a href="../files/htaccess-2.png" class="gallery-popup" title="Htaccess working">
    <img src="../files/htaccess-2.png" width="660"></a><br>
</div>

If you see this error, this means that Apache is actually parsing the
`.htaccess` file, and it encounters the error we've put in there! So far, so
good!

If you do not see an 'Internal Server Error', your Apache setup ignores the
`.htaccess` file, and you need to fix that. If you are not sure if the file
exists and is readable, download our test- script:

 - Download the script here: [htaccess_tester.php on Github](https://raw.githubu
   sercontent.com/bolt/htaccess_tester/master/htaccess_tester.php)
 - Rename it to `test_htaccess.php`, if needed.
 - Place it in the folder where you've put Bolt.
 - Open it in the browser with the URL. (so, make sure you're not accessing it
   as a `file://`)
 - If you get an error, you will need to fix it by making sure the `.htaccess`
   file exists and is readable.

This is correct:

<div class="gallery-popup">
    <a href="../files/htaccess-1.png" class="gallery-popup" title="Htaccess working">
    <img src="../files/htaccess-1.png" width="660"></a><br>
</div>

## Test if `mod_rewrite` is working

To test if `mod_rewrite` is working correctly, do the following:

 - Download the script here: [htaccess_tester.php on Github](https://raw.githubusercontent.com/bolt/htaccess_tester/master/htaccess_tester.php)
 - Rename it to `test_htaccess.php`, if needed.
 - Place it in the folder where you've put Bolt.
 - Create a `.htaccess` file with the contents as below.

```
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
    <a href="../files/htaccess-1.png" class="gallery-popup" title="Htaccess working">
    <img src="../files/htaccess-1.png" width="660" style="bor"></a><br>
</div>





- upstream

- Use a pre-configured build

- Use Nginx instead.