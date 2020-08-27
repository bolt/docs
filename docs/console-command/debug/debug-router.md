---
title: Routing Configuration
level: intermediate
---
Routing Configuration
=====================

Console's `debug:router` command displays the configured routes, or details of a
named route.


## Use cases

Debugging your routing configuration is usually for the following reasons:
  * Finding what routes are registering
  * Interrogating routes for:
    * Required host
    * Schemes accepted by the route
    * HTTP methods valid for the route
    * Handling controller ID, or callable class name and method
    * Middleware functions triggered by the route


## Usage

```bash
    php .bin/console debug:router [options] [--] [<name>]
```


## Options

| Option | Description |
|--------|-------------|
| --sort-route   | Sort in order of route name (default).
| --sort-pattern | Sort in order of URI patterns.
| --sort-method  | Sort in order of HTTP method grouping allowed.


## Examples

### All Routes

An edited-down example of the output:


```bash
$ php ./bin/console debug:router
 ---------------------------------------------------- ---------- -------- ------ -------------------------------------------------
  Name                                                 Method     Scheme   Host   Path
 ---------------------------------------------------- ---------- -------- ------ -------------------------------------------------
  bolt_login                                           ANY        ANY      ANY    /bolt/login
  bolt_logout                                          ANY        ANY      ANY    /bolt/logout
  thumbnail                                            GET        ANY      ANY    /thumbs/{paramString}/{filename}
  record                                               GET|POST   ANY      ANY    /{contentTypeSlug}/{slugOrId}
  record_locale                                        GET|POST   ANY      ANY    /{_locale}/{contentTypeSlug}/{slugOrId}
  homepage                                             GET|POST   ANY      ANY    /
  homepage_locale                                      GET|POST   ANY      ANY    /{_locale}/
  listing                                              GET|POST   ANY      ANY    /{contentTypeSlug}
  listing_locale                                       GET|POST   ANY      ANY    /{_locale}/{contentTypeSlug}
  search                                               GET|POST   ANY      ANY    /search
  search_locale                                        GET|POST   ANY      ANY    /{_locale}/search
  taxonomy                                             GET|POST   ANY      ANY    /{taxonomyslug}/{slug}
  taxonomy_locale                                      GET|POST   ANY      ANY    /{_locale}/{taxonomyslug}/{slug}
 ---------------------------------------------------- ---------- -------- ------ -------------------------------------------------```

### Single Route Name

```bash
$ php ./bin/console debug:router editcontent
+--------------+---------------------------------------------------------+
| Property     | Value                                                   |
+--------------+---------------------------------------------------------+
| Route Name   | editcontent                                             |
| Path         | /bolt/editcontent/{contenttypeslug}/{id}                |
| Host         | ANY                                                     |
| Scheme       | ANY                                                     |
| Method(s)    | GET|POST                                                |
| Requirements | _method: GET|POST                                       |
|              | id: '\d*'                                               |
| Defaults     | _controller:                                            |
|              |   - Bolt\Controller\Backend\Records                     |
|              |   - edit                                                |
|              | id: ''                                                  |
|              | zone: backend                                           |
| Options      | compiler_class: Symfony\Component\Routing\RouteCompiler |
|              | _before_middlewares:                                    |
|              |   -                                                     |
|              |     - Bolt\Controller\Backend\Records                   |
|              |     - before                                            |
+--------------+---------------------------------------------------------+
```
