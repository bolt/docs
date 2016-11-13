---
title: Nginx Configuration
level: intermediate
---
Nginx: Configuring the virtual host
===================================

Nginx is a high-performance web server that is capable of serving thousands of
request while using fewer resources than other servers like Apache. However, it
does not support `.htaccess` configuration, which many applications, such as
Bolt, require to work properly. Instead, we can configure the virtual server
block to handle the rewrites and such that Bolt requires.

Modify the virtual server block below to fit your needs:

```nginx
# Bolt virtual server
server {
    server_name mycoolsite.com www.mycoolsite.com;
    root /home/mycoolsite.com/public_html;
    index index.php;

    # The main Bolt website
    location / {
        try_files $uri $uri/ /index.php?$query_string;
    }

    # Generated thumbnail images
    location ~* /thumbs/(.*)$ {
        try_files $uri $uri/ /index.php?$query_string;
    }

    # Bolt backend access
    #
    # NOTE: If you set a custom branding path, you will need to change '/bolt/'
    #       here to match
    location ~* /bolt/(.*)$ {
        try_files $uri $uri/ /index.php?$query_string;
    }

    # Backend async routes
    location ~* /async/(.*)$ {
        try_files $uri $uri/ /index.php?$query_string;
    }

    # Enforce caching for certain file extension types
    location ~* \.(?:ico|css|js|gif|jpe?g|png|ttf|woff|woff2)$ {
        access_log off;
        expires 30d;
        add_header Pragma public;
        add_header Cache-Control "public, mustrevalidate, proxy-revalidate";
    }

    # Don't create logs for favicon.ico or robots.txt requests
    location = /(?:favicon.ico|robots.txt) {
        access_log off;
        log_not_found off;
    }

    # Block access to the app, cache & vendor directories
    #
    # NOTE: If you have one or more of 'app' , 'src', 'test' and 'vendor' as 
    # sub-directories of your installation root, you should uncomment
    # this location block to prevent site visitors having access to the 
    # various directories that contain executable code.
    #
    # NOTE: This approach is *not* recommended for production use.
    #
    #location ~ /(?:app|src|tests|vendor)/(.*)$ {
    #    deny all;
    #}

    # Block hidden files
    location ~ /\. {
        deny all;
    }

    # Block access to Sqlite database files
    location ~ /\.(?:db)$ {
        deny all;
    }

    # Block access to certain JSON files
    location ~ /(?:bower|composer|jsdoc|package)\.json$ {
        deny all;
    }

    # Block access to Markdown, Twig & YAML files directly
    location ~* /(.*)\.(?:dist|markdown|md|twig|yaml|yml)$ {
        deny all;
    }

    location ~ \.php$ {
        fastcgi_pass 127.0.0.1:9000;
        fastcgi_index index.php;
        include fastcgi_params;
        fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
        fastcgi_param HTTPS off;
    }
}
```

**Note:** 502 Bad Gateway Errors

If you're using UNIX sockets instead of TCP ports on your PHP-FPM installation,
you will need to change the `fastcgi_pass` parameters to match what is set in
your PHP-FPM configuration's `listen = `, e.g.:

```
fastcgi_pass unix:/path/to/php-fpm/socket.sock;
```
