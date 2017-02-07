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

## Basic Configuration:

```yaml
        slug:
            type: slug
            uses: title
```

## Example usage in templates:

The slug is not often used by itself, but rather as a part of a link. You can
print the link to a record like this:

```twig
{{ record.link() }}
```

You can also just output the slug like this:

```twig
{{ record.slug }}
```

## Options:

The field has one option to change the functionality of the field:

 - `uses` determines what field(s) are used to build the slug. Usually you want
   this set to the textfield that you use as the title, (often called `title`),
   but you can also use it with multiple fields like for example
   `[title, subtitle]`.
