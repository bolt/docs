# DELETE
---
title: Set field
---
Set field
==============

The `set` field allows you to organise semantically meaningful sub-fields together.
A set defines the sub-fields that it has, which are then accessed using the set. Sets are
usually used in combination with Collections, to create arrays of entities that have more than
one value (e.g. a collection of Books where a Book has a title, publication date and author.)
<!-- note: by including the old / officious name, it can be found using search. -->
<!-- block repeater -->


## Basic Configuration:

The configuration of a Set field consists of a few parts:

 - The 'key', used to identify the entirety of the set.
 - `type: set` to define it as a set type.
 - Other optional values, like in other field types (like 'label' or 'group').
 - A `fields` key, that contains one or more sub-fields like `text`,
   `image`, `html` and `select`.

A straighforward example can look like this:

```yaml
        contentset:
            type: set
            label: Content Set
            group: Sets
            fields:
                image:
                    label: Image with description
                    type: image
                text:
                    label: Paragraph
                    type: text
```

As you can see the field is configured with a type of `set` and then the
sub-fields are configured under the `fields` attribute. In general
you can include any valid fields within a set, there are a few that are not
supported.

<a href="/files/set.png" class="popup"><img src="/files/set.png" width="590"></a><br>


<p class="note"><strong>Note:</strong> Sets are useable with most of the
available field types, except for a few where it would get too complex, or where
it simply does not make sense to have more than one of. In short, do
<strong>not</strong> use <code>type: slug</code>, <code>type: set</code>,
<code>type: collection</code> or <code>type: templateselect</code> as fields in
your set. These fields will not work as expected. </p>

## Example usage in templates:

When you want to use sets in your templates you will need to iterate over
a set in order to access the individual sections of fields.

For instance if you just want to iterate over all fields
within the set then the template code will look like this:

```twig
{% for group in record.contentset %}
    {{ field.fieldtype }}:
    {{ field }}
{% endfor %}
```

In the example above using `{{ field }}` will just output the value of the
sub-field, if it is a text field such as like `text`, `html`, `textarea` or
`markdown`. Since these are sometimes more complex fields you can use
`{{ field|image }}` for images or `{{ dump(field.value) }}` to dump the
value regardless of type. In practice, you'll often want to use the techniques
described in the section below for individual fields to output the specific type
of field in the layout you require.

If you know the names of the fields you want to render then you can fetch a
field from the set by name. For instance using the same example as above but
knowing that our set comprises of sub-fields `image` and
`text`, we can output the fields like this:

```twig
    {{ record.contentset.image }}
    {{ record.contentset.text }}
```

## Default value

When you want to give a set a default value, use the `default: ` option
of the sub-field.

Example:

```yaml
        contentset:
            type: set
            label: Content Set
            group: Sets
            fields:
                image:
                    label: Image with description
                    type: image
                text:
                    label: Paragraph
                    type: text
                    default: "This is the default value of the paragraph field in the contentset."
```
