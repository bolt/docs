---
title: Route Matcher
level: intermediate
---
Route Matcher
=============

Nut's `router:match` shows which routes match a given request, which don't, and
for what reason.


## Use cases

Debugging your routing configuration is usually for the following reasons:
  * Finding invalid route matches
  * Interrogating matching routes for:
    * Required host
    * Schemes accepted by the route
    * HTTP methods valid for the route
    * Handling controller ID, or callable class name and method
    * Middleware functions triggered by the route


## Usage

```bash
    php .app/nut router:match [options] [--] <path_info>
```

## Arguments

| Argument | Description |
|--------|-------------|
| path_info | A relative URI path



## Examples

### Invalid URI

```bash
$ php ./app/nut router:match /koala/dropbear

 Route "contentlink" almost matches but requirement for "contenttypeslug" does not match (pages|page|entries|entry|showcases|showcase|blocks|block)
 Route "taxonomylink" almost matches but requirement for "taxonomytype" does not match (tags|tag|groups|group|categories|category)

                                                                                                                        
 [ERROR] None of the routes match the path "/koala/dropbear"                                                            
                                                           
```

### Homepage URI

```bash
$ ./app/nut router:match /

 [OK] Route "homepage" matches

+--------------+---------------------------------------------------------+
| Property     | Value                                                   |
+--------------+---------------------------------------------------------+
| Route Name   | homepage                                                |
| Path         | /                                                       |
| Host         | ANY                                                     |
| Scheme       | ANY                                                     |
| Method(s)    | ANY                                                     |
| Requirements |                                                         |
| Defaults     | zone: frontend                                          |
|              | _controller: 'controller.frontend:homepage'             |
| Options      | compiler_class: Symfony\Component\Routing\RouteCompiler |
|              | _before_middlewares:                                    |
|              |   - Closure                                             |
|              | _after_middlewares:                                     |
|              |   - Closure                                             |
+--------------+---------------------------------------------------------+
```

### ContentType Record URI

```bash
$ php ./app/nut router:match /pages/koalas
                                                                                                                        
 [OK] Route "contentlink" matches

+--------------+---------------------------------------------------------------------------+
| Property     | Value                                                                     |
+--------------+---------------------------------------------------------------------------+
| Route Name   | contentlink                                                               |
| Path         | /{contenttypeslug}/{slug}                                                 |
| Host         | ANY                                                                       |
| Scheme       | ANY                                                                       |
| Method(s)    | ANY                                                                       |
| Requirements | contenttypeslug: pages|page|entries|entry|showcases|showcase|blocks|block |
| Defaults     | zone: frontend                                                            |
|              | _controller: 'controller.frontend:record'                                 |
| Options      | compiler_class: Symfony\Component\Routing\RouteCompiler                   |
|              | _before_middlewares:                                                      |
|              |   - Closure                                                               |
|              | _after_middlewares:                                                       |
|              |   - Closure                                                               |
+--------------+---------------------------------------------------------------------------+
```


### Content Editing URI

```bash
$ php ./app/nut router:match /bolt/editcontent/pages/42

 [OK] Route "editcontent" matches

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
