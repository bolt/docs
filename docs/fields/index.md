---
title: Field types
pages:
    - common
    - text
    - slug
    - textarea
    - html
    - markdown
    - image
    - imagelist
    - select
    - integer
    - float
    - checkbox
    - date
    - datetime
    - file
    - filelist
    - geolocation
    - video
    - templateselect
    - repeater
    - hidden
---

Introduction to Bolt Field Types
=========

Each ContentType is defined by a couple of fixed, required **Fields** that are
used internally, but otherwise you're free to define how the content in a
ContentType is structured. For instance, in an 'event', you'll need a date on
which the event takes place. For a 'book review', you'll need an author and
publisher of the book. Other commonly used fields are `title`, `introduction`
or maybe an `image`. Some of the Fields are fixed, which means that every
ContentType has them. For example, every ContentType has a Field for `id`,
`slug`, `datecreated` and `ownerid`. This section explains the different types
of fields that are available and what options one can use with them.

All fields have a general structure, like this:

```apache
        name:
            type: name-of-field-type
            option: value
            option: value
            ..
```

All fields have a number of common options, that you can use on all field types.
These are mostly different ways to show information to the editor, but also
includes things like making a field required. See [here](fields/common) for an
explanation of these.
