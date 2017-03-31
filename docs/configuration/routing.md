---
title: Routing
---
Routing
=======

Routing
-------

Whenever your browser gets a page on a Bolt website, it uses an URL like
`/entries` or `/page/lorem-ipsum`. Bolt knows how to handle URLs like these, and
displays the information the browser requested. Bolt does this by mapping the
URL to a so-called Route. 

This Route is the controller that (when called) fetches the content from the
database, selects the template to use, renders the HTML page according to that
template and the content and serves it to the browser.

At the same time, if you create a new record, Bolt will know what the URL for
that content is. So when that URL is requested by a browser, it can map it back
to the correct content.

For example, if you have a 'Pages' ContentType, with 'Page' as a
`singular_name`, your site will automatically have pages like:

  - `http://example.org/pages`
  - `http://example.org/page/lorem-ipsum-dolor`

## routing.yml

Below you will find a complete description of the route definition in the YAML
file.

The easiest way to add your own is to follow the examples defined in the
distributed `routing.yml.dist` file. The order of the routes is important
because it is a first-come first-serve architecture. So if you add your own
ContentType routes it will probably need to be defined before the general
**contentlink** route. Some routing examples are listed below.

### Make old `.html` pages work

In this example we add routes to make old `/contact.html` links work with your
new Bolt system.

```
oldpages:
  path:           /{slug}.html
  defaults:       { _controller: 'Bolt\Controllers\Frontend::record', 'contenttypeslug': 'page' }
  requirements:
    slug:       '[a-z0-9-_]+'
```

### Host requirement

In this example we use the host requirement to show a specific page on the home
of a particular host. The _defaults_ are set to the regular record-action with a
specific ContentType and slug set up.

```
example:
  path:     /
  defaults: { _controller: 'Bolt\Controllers\Frontend::record', 'contenttypeslug': 'page', 'slug': 'example' }
  host:     'example.mydomain.org'
```

### ContentType overrides

This case overrides the default routing for ContentType **page**. Bolt will no
longer create `/page/{slug}` links but will now create `/{slug}` routes. The old
routes will still work, but the canonicals will be fixed to the new routes. The
_defaults_ are set to the regular record-action but we also added an additional
`contenttype: page` line to tell Bolt to use this route for all records with
ContentType **page**.

```
pagebinding:
  path:           /{slug}
  defaults:       { _controller: 'Bolt\Controllers\Frontend::record', 'contenttypeslug': 'page' }
  contenttype:    pages
```

An alternative is to also add the creation date:

```
pagebinding:
  path:           /{datecreated}/{slug}
  defaults:       { _controller: 'Bolt\Controllers\Frontend::record', 'contenttypeslug': 'page' }
  requirements:
    datecreated:    '\d{4}-\d{2}-\d{2}'
  contenttype:    pages
```

### Single record override

This example overrides a single record to a specific URL. Useful if you only
want to exempt a few pages and not a complete ContentType. Don't forget to add
the `recordslug: page/about` line. This route should be high in the route list
for it to work correctly.

```
aboutbinding:
  path:           /about
  defaults:       { _controller: 'Bolt\Controllers\Frontend::record', 'contenttypeslug': 'page', 'slug': 'about' }
  recordslug:     page/about
```

### Filesystem based page generation

There is a way to configure the router to generate statically stored content.
For the `Bolt\Controllers\Frontend::template` default controller can be assigned
a parameter `template` that may points out a template that should be stored as a
regular file under currently selected theme in the filesystem. Using file
extension `.twig` is optional.

```
templatebinding:
  	path: /mytemplate
  	defaults: { _controller: 'Bolt\Controllers\Frontend::template', template: 'mytemplate' }
```

### YAML description of a routing entry

The complete format of a single route in YAML is as follows:

```
bindname:
  path:       /{parameter..}/
  defaults:
    _controller:    'controller'
    _before:        'before'            # optional
    _after:         'after'             # optional
  requirements:
    parameter..:    required-regexp
  host:             hostname            # optional
  contenttype:      ContentType         # optional
  recordslug:       record slug         # optional
```

Explanation of each argument:

| Argument   | Description |
|------------|-------------|
| `bindname`    | Name to bind the route to, used for generating URLs.
| `path`        | URL of this route, use {..} for parameters.
| `_controller` | Controller method which will be called when this route matches.
| `_before`     | Called before the controller action will be called. if not set the method `before()` will be called in the controller.
| `_after`      | Called after the controller action is called. if not set the method `after()` will be called in the controller.
| `parameter..` | Name of the named parameter see `path`.
| `required-regexp` | Regular expression which should be true for this route to be matched. it's also possible to add a callback here. it should return a regular expression which should match
| `hostname`    | Hostname to match for this route.
| `contenttype` | Flag this route as "preferred" (canonical) for that ContentType, the ContentType should be specified.
| `recordslug`  | Flag this route as "preferred" (canonical) for that record, the record slug should be specified.

Path
----

You are free to specify your own parameters, however when you are adding routes
for ContentTypes or recordslugs you are limited to which parameters you can add.
At least when you don't want to code your own Content-object. The following
fields from a ContentType can be used as a parameter:

  - **contenttypeslug**
  - **id**
  - **slug**
  - **datecreated** - only the date part is returned (so yyyy-mm-dd)
  - **datepublish** - only the date part is returned (so yyyy-mm-dd)

Required regular expressions
----------------------------

When the routing is processed no content has been loaded yet, so validation
cannot be based on actual database checks. Therefore the check is purely a
syntax check using regular expressions. Bolt adds the ability to specify a
callback which returns a regular expression. This allows us to dynamically enter
ContentType slugs as valid URL parts.

You can either enter your own regular expression or use the callback notation
which is `class::method`.
