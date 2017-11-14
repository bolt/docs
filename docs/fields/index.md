---
title: Field Types
pages:
    - common
    - text
    - slug
    - html
    - image
    - file
    - video
    - select
    - markdown
    - textarea
    - repeater
    - templateselect
    - block
    - integer
    - float
    - hidden
    - checkbox
    - date
    - datetime
    - imagelist
    - filelist
    - geolocation
    - templateselect
---

Introduction to Bolt Field Types
================================

Each ContentType is defined by a couple of fixed, required **fields** that are
used internally, but otherwise you're free to define how the content in a
ContentType is structured.

For instance, in an 'event', you'll need a date on which the event takes place.
Whereas, for a 'book review', you'll need an author and publisher of the book.
Other commonly used fields are `title`, `introduction` or maybe an `image`.

Some of the Fields are fixed, which means that every ContentType has them. For
example, every ContentType has a Field for `id`, `slug`, `datecreated` and
`ownerid`.

This section explains the different types of fields that are available and what
options one can use with them.

All fields have a general structure, like this:

```yaml
        name:
            type: name-of-field-type
            option: value
            option: value
            ..
```

All fields have a number of common options, that you can use on all field types.
These are mostly different ways to show information to the editor, but also
includes things like making a field required.

See the section "[Common options for all fields](fields/common)" for a more
in-depth explanation of these fields.
