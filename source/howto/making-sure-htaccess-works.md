# Making sure `.htaccess` and `mod_rewrite` are working as they should

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






- upstream

- Use a pre-configured build

- Use Nginx instead.