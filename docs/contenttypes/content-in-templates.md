---
title: Content in Templates
---
Content in Templates
====================

Perhaps the thing you'll do most in templates is accessing records of content.
Either by requesting specific content, or implicitly when requesting pages that
are the defaults for certain ContentTypes.

There are two ways that Bolt makes content accessible in templates:

  - Implicitly: In a template that's being used for a single page or a listing,
    you'll always have the matching content available without having to fetch
    it via the `setcontent`-tag. See the section below on how to access the
    content.
  - Fetching other content: By using the `{% setcontent %}`-tag, you can
    retrieve records of any ContentType from the database, and make the data
    available to the templates. Much more information about `setcontent`, can
    be found in the chapter [Fetching content](../templating/content-fetching).

Implicitly available content
----------------------------
If you've looked at the default templates, you might've wondered where Bolt
'magically' gets the content from. It's even the content that you need most of
the time too! In fact, the rules for how Bolt does this are very simple. There
are three distinct cases:

### Single record pages

In a page that's used for a single record, (like `entry.twig` or
`record.twig`), the variable `{{ record }}` will always be available,
regardless of the ContentType. To make the templates more 'semantic', there's
also a variable with the singular name of the ContentType available, like
`{{ page }}`, `{{ entry }}` or `{{ event }}`.

### Record listing pages

In pages that are used for listings, there's always a variable `{{ records }}`
available, regardless of the ContentType. Similar to the single record pages,
there's also a more semanticly named variable with the plural name of the
ContentType, like `{{ pages }}`, `{{ entries }}` or `{{ events }}`.

Note: This is the case for all normal listings, but also for taxonomy overview
pages and search results.

### The Homepage

In your `config.yml` you can set which record is used for the homepage of the
site, and you can set the template as well:

```yaml
homepage: page/1
homepage_template: index.twig
```

In this template, you will have a `{{ record }}` available, as well as a
variable with the same name as the singular version of the ContentType. In the
example above, it would be `{{ page }}`.

If you've set the `homepage` to use not one singular record, but a group of
records, like this:

```yaml
homepage: entries/latest/10
```

Then you would have `{{ records }}` available, as well as a variable with the
name of the ContentType. In this case, it would be `{{ pages }}`.

For more information on how Bolt selects which templates to use, see
[Templating and Routing](../templating/templates-routes). To learn more about actually using
the content records in your templates, see
[Record and Records](../templating/record-and-records).
