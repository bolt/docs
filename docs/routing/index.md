---
title: Routing
---
Routing
=======

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

## routes.yaml

Bolt stores the definition of these routes in the `config/routes.yaml`
configuration file. This file is basically a Symfony configuration file,
adapted for use with Bolt. Below you will find a complete description of the
route definition in the YAML file.

The easiest way to add your own is to follow the examples defined in the
distributed `routes.yaml` file. The order of the routes is important
because it is a first-come first-serve architecture. So if you add your own
ContentType routes, they will probably need to be defined before the general
**contentlink** route. Some routing examples are listed below.

### Make old `.html` pages work

In this example we add routes to make old `/contact.html` links work with your
new Bolt system.

```yaml
oldpages:
  path: /{slugOrId}.html
  defaults:
    _controller: Bolt\Controller\Frontend\DetailController::record
    contentTypeSlug: pages
  requirements:
    slug: "[a-z0-9-_]+"
```

After adding this, a request for `/welcome.html`, will be handled by the
correct Controller. It will know the requested slug is `welcome`, and it will
render and display the page with that slug.

### Host requirement

In this example we use the host requirement to show a specific page on the home
of a particular host. The _defaults_ are set to the regular record-action with a
specific ContentType and slug set up.

```yaml
example:
  path: /example
  defaults:
    _controller: Bolt\Controller\Frontend\DetailController::record
    contentTypeSlug: pages
    slugOrId: example
  host: www.example.org
```

### ContentType overrides

This case overrides the default routing for single pages of different
ContentTypes. Bolt will no longer create `/page/{slug}` links but will now
create `/{slug}` routes. The old routes will still work, but the canonicals
will be fixed to the new routes. The _defaults_ are set to the regular
record-action but we also added an additional `contenttype: page` line to tell
Bolt to use this route for all records with ContentType **page**.

Note that doing this will make it impossible for you to have two records in
different contenttypes that share the same slug. If there are duplicates of
slugs, only one of those pages can be viewed on the website, since there is no
way to differentiate them.

```yaml
pagebinding:
  path: /{slugOrId}
  methods: [GET|POST]
  defaults:
    contentTypeSlug: page
    _controller: Bolt\Controller\Frontend\DetailController::record
```

An alternative is to also add the creation date:

```yaml
pagebinding:
  path: /{datecreated}/{slugOrId}
  methods: [GET|POST]
  defaults:
    contentTypeSlug: page
    _controller: Bolt\Controller\Frontend\DetailController::record
  requirements:
    datecreated: '\d{4}-\d{2}-\d{2}'
```

### Single record override

This example overrides a single record to a specific URL. Useful if you only
want to exempt a few pages and not a complete ContentType. This route should be 
high in the route list for it to work correctly.

```yaml
aboutbinding:
  path: /about
  defaults:
    _controller: Bolt\Controller\Frontend\DetailController::record
    contentTypeSlug: about
    slugOrId: about-us
```

### Filesystem based page generation

There is a way to configure the router to generate statically stored content.
For the `TemplateController::template` default controller can be assigned
a parameter `template` that points out a template that is stored as a
regular file under currently selected theme in the filesystem.

```yaml
templatebinding:
  path: /static-page
  defaults:
    _controller: Bolt\Controller\Frontend\TemplateController::template
    templateName: static-page.twig
```

## Further reading

For more in-depth documentation about Routing, please read [Symfony's
Routing][sf-docs] documentation.

[sf-docs]: https://symfony.com/doc/current/routing.html
