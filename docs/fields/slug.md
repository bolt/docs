---
title: Slug field
---
Slug field
==========

This field will determine what "slug" or permalink is used for accessing the
record on the frontend. When omitted, the slug will be automatically generated.

<p class="tip"><strong>Tip:</strong> The <code>slug</code> is a special value
that's used in the generation of the URL at which a page will be available on
the website. It usually contains a variant of the title, that's been made
suitable for indexing by search engines. Ideally, it is both semantic and
human-readable. For example, if you have a page named "About our company", a
good slug would be <code>about-our-company</code>.</p>

## Basic Configuration

```yaml
        slug:
            type: slug
            uses: title
```

### Example usage in templates

The slug is not often used by itself, but rather as a part of a link. You can
print the link to a record like this:

```twig
{{ record|link }}

{{ record|link(true) }}
```

The second example will output a _canonical_ link to the record. This means
that the link will include the full scheme, hostname and path, like
`https://example.org/page/about-us`.

You can also just output the slug like this:

```twig
{{ record.slug }}
```

### Options

The field has one option to change the functionality of the field:

| Option | Description |
|--------
| `uses`          | Determines what field(s) are used to build the slug. Usually you want this set to the textfield that you use as the title, (often called `title`), but you can also use it with multiple fields like for example `[title, subtitle]`.
| `allow_numeric` | By default slugs are alphanumeric, and they start with a letter. So, if the "title" of a Record is "2021", the slug would become `page-2021`, to distinguish Slugs from IDs. If you wish to allow numeric slugs, set `allow_numeric: true`. Note that doing so might make it so a link like `entry/9000` is no longer canonical: It could refer to either the entry with ID № 9000, or it could refer to the entry with slug `9000`.

<p class="note"> <strong>Note:</strong> Usually this field shows up in the
editor with a label like <code>Permalink:</code>. If the ContentType is
"viewless", there is no real permalink to the Record, so it will instead be
labelled <code>Unique Alias:</code> to reflect this.</p>
