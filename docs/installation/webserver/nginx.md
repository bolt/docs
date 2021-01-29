---
title: NGINX Configuration
level: intermediate
---

NGINX is a high-performance web server that is capable of serving thousands of
request while using fewer resources than other servers like Apache.

Unlike Apache, NGINX focuses on performance and as such does not have the
concept of `.htaccess` files that applications such as Bolt use to set per-site
configuration. Below are details on how to effect the same changes for you Bolt
sites.


## Configuration

NGINX configuration best is broken up into site configuration files that are
unique to an individual site, and common, or "global", configuration settings
that can be reused by individual sites.


### Individual Site

Generally, NGINX site configuration files live in `/etc/nginx/conf.d/` and are
loaded automatically when their file names end in `.conf`.

It is good practice to name your configuration file after the domain name of
your site, in this example our site is `example.com` so the configuration file
would be called `example.com.conf`.

An example of what a `/etc/nginx/conf.d/example.com.conf` file might look like:

```nginx
server {
    server_name                   example.com;

    # Logging
    access_log                    /var/log/nginx/example.com.access.log;
    error_log                     /var/log/nginx/example.com.error.log;

    # Site root
    root                          /var/www/sites/example.com/public;
    index                         index.php;

    # Bolt specific
    include                       global/bolt.conf;

    # PHP FPM
    include                       global/php-fpm.conf;

    # Restrictions
    include                       global/restrictions.conf;
}
```


**NOTE:** You will need to customise/change the values for the `server_name`,
`access_log`, `error_log` and `root` parameters to match the domain name and
path locations relevant to your system.


### Common

Common, or "global", configuration settings are stored in a directory under
`/etc/nginx/`. For our examples we use the `/etc/nginx/global/` directory for
no other reason besides semantics.

This section contains details on the following files:

| File name             | Description |
| --------------------- | ----------- |
| `bolt.conf`           | Bolt specific routes
| `restrictions.conf`   | Files & directories to block access to
| `php-fpm.conf`        | PHP-FPM configuration


#### `bolt.conf`

The `bolt.conf` file define location matches common to all of your Bolt sites
on a host.

```nginx
# Default prefix match fallback, as all URIs begin with /
location / {
    try_files                     $uri $uri/ /index.php?$query_string;
}

# Bolt dashboard and backend access
#
# We use two location blocks here, the first is an exact match to the dashboard
# the next is a strict forward match for URIs under the dashboard. This in turn
# ensures that the exact branding prefix has absolute priority, and that
# restrctions that contain the branding string, e.g. "bolt.db", still apply.
#
# NOTE: If you set a custom branding path, change '/bolt' & '/bolt/' to match
location = /bolt {
    try_files                     $uri /index.php?$query_string;
}
location ^~ /bolt/ {
    try_files                     $uri /index.php?$query_string;
}

# Generated thumbnail images
location ^~ /thumbs {
    try_files                     $uri /index.php; #?$query_string;

    access_log                    off;
    log_not_found                 off;
    expires                       max;
    add_header                    Pragma public;
    add_header                    Cache-Control "public, mustrevalidate, proxy-revalidate";
    add_header                    X-Koala-Status sleeping;
}

# Don't log, and do cache, asset files
location ~* ^.+\.(?:atom|bmp|bz2|css|doc|eot|exe|gif|gz|ico|jpe?g|jpeg|jpg|js|map|mid|midi|mp4|ogg|ogv|otf|png|ppt|rar|rtf|svg|svgz|tar|tgz|ttf|wav|woff|xls|zip)$ {
    access_log                    off;
    log_not_found                 off;
    expires                       max;
    add_header                    Pragma public;
    add_header                    Cache-Control "public, mustrevalidate, proxy-revalidate";
    add_header                    X-Koala-Status eating;
}

# Don't create logs for favicon.ico, robots.txt requests
location = /(?:favicon.ico|robots.txt) {
    log_not_found                 off;
    access_log                    off;
}

# Deny access to any files in the theme folder, except for the listed extensions.
location ~ theme\/.+\.(?!(html?|css|js|jpe?g|png|gif|svg|pdf|avif|webp|mp3|mp?4a?v?|woff2?|txt|ico|zip|tgz|otf|ttf|eot|woff|woff2)$)[^\.]+?$ {
  return 403;
}

# Redirect requests for */index.php to the same route minus the "index.php" in the URI.
location ~ /index.php/(.*) {
    rewrite ^/index.php/(.*) /$1 permanent;
}
```


#### `restrictions.conf`

The `restrictions.conf` file defines a common set of restrictions for all of
your Bolt sites on a host.

```nginx
# Block access to "hidden" files
# i.e. file names that begin with a dot "."
location ~ /\. {
    deny                          all;
}

# Apache .htaccess & .htpasswd files
location ~ /\.(htaccess|htpasswd)$ {
    deny                          all;
}

# Block access to Sqlite database files
location ~ /\.(?:db)$ {
    deny                          all;
}

# Block access to Markdown, Twig & YAML files directly
location ~* /(.*)\.(?:markdown|md|twig|yaml|yml)$ {
    deny                          all;
}
```


#### `php-fpm.conf`

The `php-fpm.conf` file define the settings for the PHP FastCGI Process Manager
used for you Bolt site(s).

```nginx
location ~ [^/]\.php(/|$) {
    try_files                     /index.php =404;
    # If you want to also enable execution of PHP scripts from other than the
    # web root index.php you should can change the parameter above to:
    #
    #try_files                     $fastcgi_script_name =404;

    fastcgi_split_path_info       ^(.+?\.php)(/.*)$;
    fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;

    # Mitigate https://httpoxy.org/ vulnerabilities
    fastcgi_param HTTP_PROXY      "";

    # Set the HTTP parameter if not set in fastcgi_params
    fastcgi_param HTTPS           $https if_not_empty;

    # If using TCP sockets uncomment the next line
    #fastcgi_pass                  127.0.0.1:9000;

    # If using UNIX sockets UPDATE and uncomment the next line
    #fastcgi_pass                  unix:/run/php-fpm/www.sock;

    # Include the FastCGI parameters shipped with NGINX
    include                       fastcgi_params;
}
```


On larger multi-CPU hosts with several busy sites, you will no doubt want to
use several FPM pools, with each pool defining their own socket. You can simply
use one of these files per-pool.

**NOTE:** You must enable **one** of the `fastcgi_pass` parameters, or NGINX
will attempt to initiate a download of the `index.php` file instead of
executing it.

### Subfolders

To install Bolt within a subfolder, a location describing this must be added.

```nginx
    location ^~ /subfolder/(.*)$ {
        try_files $uri $uri/ /subfolder/index.php?$query_string;
    }
```
Two previously added locations must be amended.

```nginx
    location ^~ /subfolder/bolt/(.*)$ {
        try_files $uri $uri/ /subfolder/index.php?$query_string;
    }

    # Backend async routes
    location ^~ /subfolder/async/(.*)$ {
        try_files $uri $uri/ /subfolder/index.php?$query_string;
    }
```

## NGINX Location Matching

Location matching in NGINX is usually the part that causes the most headaches
for people. NGINX has a strict matching priority which is explained in greater
detail in their [documentation][location].

In summary, locations are matched in order based on the type of modifier used.
The following table outlines each modifier in their order of priority.

| Modifier | Description                           | Example                  |
| -------- | ------------------------------------- | ------------------------ |
| =        | Exact match of the specific URI       | `location = /path {}`
| ^~       | Strict forward match                  | `location ^~ /path {}`
| ~        | Regular expression (case-sensitive)   | `location ~ /path/ {}`
| ~*       | Regular expression (case_insensitive) | `location ~* .(gif`&#124;`jpg`&#124;`png) {}`
| /        | Prefix location match                 | `location /path {}`

Note:

- If an exact match `=` is found, the search terminates
- `/` matches any request as all requests begin with a `/`, but regular
  expressions, and longer prefixed locations will be matched first
- `^~ /path/` matches any request starting with `/path/` and halts searching,
  meaning further location blocks are not checked
- If the longest matching prefix location has the `^~` modifier then regular
  expressions are not checked
- `~* \.(gif|jpg|png)$` matches any request ending in `gif`, `jpg`, or `png`.
  But if these image files are in the `/path/` directory, all requests to that
  directory are handled by the `^~ /path/` location block (if set), as it has
  ordering priority
- `/path/` matches any request starting with `/path/` and continues searching,
  and will be matched only if regular expressions do not match

The helpful [NGINX Location Match][match-tool] tool is very useful for testing
location match blocks, and gives visual graphs to explain NGINX's logic.

---

[location]: http://nginx.org/en/docs/http/ngx_http_core_module.html#location
[match-tool]: https://github.com/detailyang/nginx-location-match-visible
