---
title: Running Bolt using PHP's built-in web server
level: intermediate
---
Running Bolt using PHP's built-in web server
============================================

For development and testing purposes it is ofter useful to use PHP's built-in
web server rather than setting up Apache or Nginx.

To run the built-in server, simply change to the site root directory and run:

```bash
php ./app/nut server:run
```

If you wish to specify a host name or different TCP port, simply add these after
`server:run`, e.g.

```bash
php ./app/nut server:run example.com --port=8080
```
