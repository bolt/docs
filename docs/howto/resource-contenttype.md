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

Firstly, in your `contenttypes.yml` file, create a new ContentType. for this
example, we'll use the `blocks` ContentType that comes with a default Bolt
installation.

```yaml
blocks:
    name: Blocks
    singular_name: Block
    fields:
        title:
            type: text
            class: large
            group: "Block"
        slug:
            type: slug
            uses: [ title ]
        content:
            type: html
            height: 150px
        contentlink:
            type: text
            label: Link
            placeholder: 'contenttype/slug or http://example.org/'
            postfix: "Use this to add a link for this Block. This could either be an 'internal' link like <tt>page/about</tt>, if you use a contenttype/slug combination. Otherwise use a proper URL, like `http://example.org`."
        image:
            type: image
            attrib: title
            extensions: [ gif, jpg, png ]
    show_on_dashboard: false
    viewless: true
    default_status: published
    searchable: false
    icon_many: "fa:cubes"
    icon_one: "fa:cube"
```

Fields
------

### Title & Slug

You will note that the title and slug fields work together to create a human
readable name that we can use later in `{% setcontent block = 'blocks/slug' %}`.

### Content

In this example, the `content` field is simply a HTML text area. As this is
intended for use by editors, it gives us full control over the HTML and layout.
It is also worth noting that the WYSWYG editor would interfere with this layout
in an attempt to be user-friendly.

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
        edit: [ chief-editor ]
        create: [ chief-editor ]
        publish: [ chief-editor ]
        depublish: [ chief-editor ]
        delete: [ chief-editor ]
        view: [ chief-editor ]
```

This will limit edit, create, (de)publish, delete and view access to only those
with the `root` and `chief-editor` roles.

Accessing Resource Records in Templates
---------------------------------------

Accessing your resource records in a Twig template file is very easy:

```twig
{% setcontent block = 'blocks/my-block-slug' %}
{{ block.content }}
```

Often, resource records are used as 'teasers' for content elsewhere. An "about"
blurb in a footer that links to the full "About us" page, for example. To make
linking from a resource block to a full page easier, our example uses the
'contentlink' field. The editor can provide a link, which could either be an
'internal' link like `page/about`, if you use a contenttype/slug combination.
Otherwise use a proper URL, like `http://example.org`. Regardless of what the
editor provides, the snippet below will output a fully working HTML link.

```
{% setcontent block = "block/about-us" %}
{% if link(block.contentlink) %}
    <p>
        {{ link(block.contentlink, "Read more") }}
    </p>
{% endif %}

{# Results in '<a href="/page/about">Read more</a>' #}
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
