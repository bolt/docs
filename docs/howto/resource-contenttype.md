---
title: Making a Resource ContentType
---
Making a Resource ContentType
===============================

A common question that comes up often, is how to create a generic ContentType
for things like '404 pages' or 'a snippet for the site header text', that can
easily be used in your own templates. A simple approach to this problem, is to
create a resource, or '*block*', ContentType.

This is a very simple and useful way to give editor groups the ability to
maintain information that you can use in your templates, without needing those
editors to know how to modify Twig templates.

For the purposes of this HOWTO we are going to call our ContentType "blocks".
But as with any ContentType, you can use any unique name.

Creating the ContentType
------------------------

Firstly, in your `contenttypes.yml` file, create a new ContentType with the
following parameters:

```yaml
blocks:
    name: Blocks
    singular_name: Block
    fields:
        title:
            type: text
            class: large
            required: true
        slug:
            type: slug
            uses: title
        content:
            type: textarea
            height: 150px
        template:
            type: templateselect
            filter: '*.twig'
    default_status: published
    show_on_dashboard: false
    searchable: false
    viewless: true
```

Fields
------

### Title & Slug

You will note that the title and slug fields work together to create a human
readable name that we can use later in `{% setcontent block = 'blocks/slug' %}`.

### Content

In this example, the `content` field is simply a HTML text area. As this is
intended for use by developers, it gives us full control over the HTML and
layout. It is also worth noting that the WYSWYG editor would interfere with 
this layout in an attempt to be user-friendly.

### Template

We include a `template` field so that you can, if you wish, assign an specific
template to an individual resource record. This is particularly useful for
things like 404 pages where you want to have a database stored record for the
content of the 404 page, but a themed template to display it.

### Default Publishing Status

We use the `default_status: published` parameter to automatically set new
resource records to `published` for ease of use.

### Visibility

There are three visibility setting that we apply to keep these records hidden
from normal users.

### Show on Dashboard

By setting `show_on_dashboard: false` we will hide the editing and existence of
these records from the Bolt Dashboard. While we are going to use permissions to
make these inaccessible to most users, it is still nice to keep them well
confined.

### Searchable

By setting `searchable: false` these ContentType records will be excluded from
search results.

### Viewless

By setting `viewless: true`, routes will not be set for the ContentType listing,
or the records themselves.

Permissions
-----------

The last part of the set-up is permissions. In your `permissions.yml` file,
under the `contenttypes` key add in something similar to this:

```yaml
contenttypes:
    blocks:
        edit: [ developer ]
        create: [ developer ]
        publish: [ developer ]
        depublish: [ developer ]
        delete: [ developer ]
        view: [ developer ]
```

This will limit edit, create, (de)publish, delete and view access to only those
with the `root` and `developer` roles.

Accessing Resource Records in Templates
---------------------------------------

Accessing your resource records in a Twig template file is very easy:

```twig
{% setcontent block = 'blocks/my-block-slug' %}
{{ block.content }}
```

## Example Configuration of a 404 Resource

As a final example, lets step through creating a block record for your 404
page.

First create a `Blocks` record and give it the title of "Not Found", which will
generate the slug of `not-found`. Next, set the template, so that it matches the
"404" Twig template of your theme:

![](/files/howto-resource-contenttype-404.png)


Finally, in your `config.yml` file you can simply set the `notfound` key so it
will use the block you've just created:

```yaml
notfound: blocks/not-found
```

When the visitors of the website access a non-existing page, they will get a
friendly 404 error message, using the template you've specified.

It is important to mention only dynamically routed pages (that have 
`contenttype` entry in `contenttypes.yml`) can be configured as `not-found`
pages. Pages routed with `Bolt\Controllers\Frontend::template` can't be
used as 404 handler currently.
