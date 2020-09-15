---
title: The Fields iterator
---
The Fields iterator
===================

The Fields iterator is the combination of a bit of twig, together with two
pre-defined templates that come bundled with Bolt. These two files are
`_fields.html.twig` and `_fields_blocks.html.twig`. We can use Twig's powerful
`block` tag to create a page that outputs all fields in a Record, in the order
they're defined in the contenttype. This is great for prototyping an app, where
you're not sure about the final structure of a ContentType, or when you're
building a theme for others to use.

```twig
    {{ block('sub_fields', 'helpers/_fields.twig') }}
```

This will always assume that there's a Record defined as `record`, and it will
output all eligible fields, including ones you might've output yourself
already, like the title and a main image.

We can make it a bit more robust by ensuring we pass in the correct record,
instead of merely hoping we get the right one. Additionally, we can pass in a
few fields we _don't_ want to output, like the title, and the main image. Below
is an example of a snippet that does just that:

```twig
    <h1>{{ record|title }}</h1>

    {{ popup(record|image, 1368, 1026) }}

    {% with { 'record': record, 'exclude': [ record|image.fieldname|default() ] } %}
        {{ block('sub_fields', 'helpers/_fields.twig') }}
    {% endwith %}
```

Here we create a basic but functional output, without having to know about the structure of the ContentType:

 - `record|title` outputs the title, using the `|title` Extra.
 - Likewise, we pass `record|image` to `popup`, so we can highlight the first image found in the Contenttype.
 - Finally, the lower section will output each of the fields in the Record, in the order they're defined. The `with` tag defines the scope of the template inside that block, to ensure we don't have other defined variables interfering with the output. `with` _does_ set two variables, used within its scope:
   -  `record`: set this to the record you'd like to use within the block. Often this can simply be "record", but you can override it, if desired.
   -  `exclude`: allows you to define an array of fields (by name), that should be omitted from the output. In this case `record|image.fieldname|default()` yields the name of the Image field used before. If the Record has _no_ image, the `default()` prevents an error, even when Twig is in strict mode.
