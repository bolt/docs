---
title: Extras (or "Magic Attributes")
pages:
    - extras
---
Extras (or "Magic Attributes")
==============================

Bolt comes with a few convenient features for accessing data in Records, that
are implemented as Twig filters.

These so-called Extras or Magic Attributes can be used on a Record of _any_
ContentType, regardless of its definition. This makes them well suited to
produce output, even when you (as a template developer) might not know what the
final ContentType looks like.

Example:

```twig
{{ record|excerpt(100) }}
=> Exercitationem voluptatem provident. Eos ex ut nulla sapiente. Placeat labore quo est excepturi pl…
```

You can use the following extras on any Record:

| Name       | Description |
|----------------|-------------|
| `title` | The title of the record. This can be, but is not not necessarily the same as `{{ record.title }}`. The main difference is that `{{ record|title }}` always gives a meaningful result. The title is composed by looking at the `title_format` setting in the `contenttypes.yaml` file for that ContentType, and otherwise by looking for common field names for a title, across different languages.
| `image` | Select the first Image found in this Record, regardless of the name of the Image field. See below for an example.
| `excerpt` | A short excerpt of the Record. Pass in a parameter, to limit the length of the output. For example: `{{ record.excerpt(100) }}`.
| `link` | An (absolute) link to the current record. Use `{{ record|link(true) }}` to output a full canonical link, including the scheme and domain name.
| `icon` | The icon used for this ContentType. This is used, for example, in the Bolt Backend to show icons for ContentTypes.
| `name` | The (plural) name of the Contenttype this Record is from, like `Pages` or `Entries`.
| `singular_name` | The singular name of the Contenttype this Record is from, like `Page` or `Entry`.
| `editLink` | When the user is currently logged on, this outputs a link to edit the current Record in the Bolt Backend.

### Examples

To provide a convenient link to edit the current page for your editors, you can
use this:

```twig
{% if record|editlink %}
  <a href="{{ record|editlink }}">Edit this page (№ {{ record.id }})</a>
{% endif %}
```

Get the first image from a Record:

```twig
{{ dump(record|image) }}

array:7 [▼
    "media" => 148
    "filename" => "stock/image_72139.jpg"
    "alt" => "Rerum veniam tempora at natus quos."
    "path" => "/files/stock/image_72139.jpg"
    "url" => "https://127.0.0.1:8000/files/stock/image_72139.jpg"
    "thumbnail" => "/thumbs/stock/image_72139.jpg?w=400&h=400&fit=crop"
    "fieldname" => "image"
]
```

You can see the values of all extras, using:

```twig
{{ dump(record|extras ) }}
```

[slug]: ../fields/slug#options
