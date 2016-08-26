---
title: Using the Fields-tag
---
The fields-tag
==============

When developing a theme, you often know which fields there are, and you
carefully place them in the templates where you want them to appear, and what
the markup looks like. On the other hand, in some cases you simply can't do
this for each separate field, for a number of reasons:

 - You are creating a theme for others to use, and you don't know what the
   ContentTypes will look like.
 - Your ContentType has a Repeater Field, so there can be any number of fields
   for the record.
 - Your (extended) template is used for different ContentTypes, with or without
   Template fields.
 - You want to provide a 'generic' single record template, to go with the
   carefully crafted `entry.twig` or `page.twig`.
 - You are being lazy, and want to whip up a quick prototype.

In these cases, you cannot specify all of the fields like `{{ record.title }}`
separately, because you simply don't know the exact structure of the
ContentType. For this very usecase, Bolt provides a tag to output these fields
when you're working on a template without having to know exactly what's in the
ContentType. This is the `{{ fields() }}`-tag. Basic usage is straightforward:

```twig
{% extends 'partials/_master.twig' %}

{% block main %}

    <h1>{{ record.title }}</h1>

    {{ fields() }}

{% endblock main %}
```

This will output a basic page, with the 'title' of the record in an `<h1>`-tag,
followed by the rest of the fields, in a generic layout.

The `{{ fields() }}`-tag comes with a number of options, to determine which
fields are being output and in what format.

 - `record`: The record to use for displaying the fields. If omitted, use the
   current `{{ record }}` variable from the Twig environment.
 - `common`: Whether to output the most common fields or not. Defaults to
   `true`. This will output the fields that are of type 'html', 'markdown',
   'textarea', 'text', 'image', 'video'.
 - `extended`: Whether to output the so-called extended fields, as defined in
   the ContentType. Defaults to `false`. This will output the fields that are
   of type 'imagelist', 'geolocation', 'select', 'checkbox', 'filelist', 'datetime', 'date',
   'integer' and 'float'.
 - `repeaters`: Whether to output the fields that were added as 'Repeater
   Fields' in the record. Defaults to `true`. This will output all of the
   repeater fields, regardless of type.
 - `templatefields`: Whether to output the fields that were added as 'Template
   Fields' in the record. Defaults to `true`. This will output all of the
   repeater fields, regardless of type.
 - `template`: The template to use, to output the fields. See the section
   below, on how to configure this.
 - `exclude`: Allow for more granular control over the field types you'd like
   to exclude. Defaults to `[]`, an empty set.
 - `skip_uses`: Set to `true` by default, which means that `{{ fields() }}`
   will skip the fields that are defined in the `uses` value of the slug. See
   below for an example.

You can use all of these options in Twig, but in practice, it'll be much more
legible to use 'named parameters' for this.

```twig
{{ fields(exclude = ['teaser', 'body']) }}
```

Setting the template
--------------------

All fields are rendered by twig itself. In your theme, you can override the way
these fields look, by setting the template to use for the field definitions.

By default, `fields()` uses the file `app/theme_defaults/_sub_fields.twig`. To
override this, either copy the file to the root of your theme folder, or place
and rename as you like, and specify it explicitly:

```twig
{{ fields(template = '_partials/_sub_fields.twig') }}
```

Using `skip_uses`
-----------------

By default, `fields()` skips the fields that are used by the slug. This is why
the first example on this page works as-is. We manually output the title in an
`<h1>`-tag, and let `fields()` handle the rest. Doing this assumes that the
ContentType looks something like this:

```twig
pages:
    name: Pages
    singular_name: Page
    fields:
        title:
            type: text
            class: large
            group: content
        slug:
            type: slug
            uses: title
```

The `fields()`-tag looks at the `uses` in the ContentType, and skips the fields
that are mentioned there.

In case this is not desired behaviour, just use this:

```twig
{{ fields(skip_uses = false) }}
```

