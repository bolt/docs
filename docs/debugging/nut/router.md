---
title: Routing Configuration
level: intermediate
---
Routing Configuration
=====================

Nut's `debug:router` command displays the configured routes, or details of a
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
    php .app/nut debug:router [options] [--] [<name>]
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
$ php ./app/nut debug:router 
+----------------+-----------+--------+------+------------------------------------------+
| Route Name     | Method(s) | Scheme | Host | Path                                     |
+----------------+-----------+--------+------+------------------------------------------+
| thumb          | GET       |  ANY   |  ANY | /thumbs/{width}x{height}{action}/{file}  |
| login          | GET       | https  |  ANY | /bolt/login                              |
| postLogin      | POST      | https  |  ANY | /bolt/login                              |
| logout         | ANY       |  ANY   |  ANY | /bolt/logout                             |
| editcontent    | GET|POST  |  ANY   |  ANY | /bolt/editcontent/{contenttypeslug}/{id} |
| profile        | ANY       |  ANY   |  ANY | /bolt/profile                            |
| async          | GET       |  ANY   |  ANY | /async                                   |
| homepage       | ANY       |  ANY   |  ANY | /                                        |
| search         | ANY       |  ANY   |  ANY | /search                                  |
| preview        | ANY       |  ANY   |  ANY | /preview/{contenttypeslug}               |
| contentlink    | ANY       |  ANY   |  ANY | /{contenttypeslug}/{slug}                |
| taxonomylink   | ANY       |  ANY   |  ANY | /{taxonomytype}/{slug}                   |
| contentlisting | ANY       |  ANY   |  ANY | /{contenttypeslug}                       |
+----------------+-----------+--------+------+------------------------------------------+
```

### Single Route Name

```bash
$ php ./app/nut debug:router editcontent
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
