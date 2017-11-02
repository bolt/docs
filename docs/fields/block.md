---
title: Block field
---
Block field
==============

The `block` field allows you to insert a number of blocks of fields in a record.
You can give each of these blocks a name and define the fields that it has. The
Editor can then insert these in the Record as needed. As such, these fields are
sometimes refered to as "Named Repeaters".
<!-- note: by including the old / officious name, it can be found using search. -->


## Basic Configuration:

The configuration of a Block field consists of a few parts:

 - The 'key', used to identify the entirety of the block.
 - `type: block` to define it as a block type.
 - Other optional values, like in other field types (like 'label' or 'group').
 - A `fields` key, that contains one or more block sections.
 - Each section has a required label, and again a `fields` key.
 - Under these `fields`, there can be one or more common fields like `text`,
   `image`, `html` and `select`.

A straighforward example can look like this:

```yaml
        contentblocks:
            type: block
            label: Content Blocks
            group: Blocks
            fields:
                imagesection:
                    label: Image with description
                    fields:
                        heading:
                            type: text
                        image:
                            type: image
                        description:
                            type: html
                            height: 70px
                textsection:
                    label: Paragraph
                    fields:
                        heading:
                            type: text
                        content:
                            type: html
                            height: 100px
```

As you can see the field is configured with a type of `block` and then the
sections of sub-fields are configured under the `fields` attribute. In general
you can include any valid fields within a repeater, there are a few that are not
supported.

<a href="/files/fields-block.png" class="popup"><img src="/files/fields-block.png" width="590"></a><br>


<p class="note"><strong>Note:</strong> Blocks are useable with most of the
available field types, except for a few where it would get too complex, or where
it simply does not make sense to have more than one of. In short, do
<strong>not</strong> use <code>type: slug</code>, <code>type: block</code>,
<code>type: repeater</code> or <code>type: templateselect</code> as fields in
your block. These fields will not work as expected. </p>

## Example usage in templates:

When you want to use blocks in your templates you will need to iterate over
a set before you can access the individual sections of fields.

The approach you use may vary slightly on whether you know the names of the
fields within each set or if you want to allow your template to iterate over
all the sub-fields without necessarily knowing the field names.

For instance if you just want to iterate over all sections and then all fields
within the set then the template code will look like this:

```twig
{% for group in record.contentblocks %}
    {% for field in group %}
        {{ field.fieldtype }}:
        {{ field }}
    {% endfor %}
{% endfor %}
```

In the example above using `{{ field }}` will just output the value of the 
sub-field, if it is a text field such as like `text`, `html`, `textarea` or 
`markdown`. Since these are sometimes more complex fields you can use 
`{{ field|showimage }}` for images or `{{ dump(field.value) }}` to dump the 
value regardless of type. In practice, you'll often want to use the techniques 
described in the section below for individual fields to output the specific type 
of field in the layout you require. 

If you know the names of the fields you want to render then you can fetch a
field from each block by name. For instance using the same example as above but
knowing that our block set comprises the individual sections `imagesection` and
`textsection` with each fields we can output the fields like this:

```twig
    {% for group in record.contentblocks %}
        {% if group.block == 'textsection' %}
            <h2>{{ group.heading }}</h2>
            {{ group.content }}
        {% endif %}
        {% if group.block == 'imagesection' %}
            <h2>{{ group.heading }}</h2>
            {{ group.image|showimage() }}
            {{ group.description }}
        {% endif %}
        <hr>
    {% endfor %}
```

## Images and thumbnails

You can use the image- and thumbnail filters for images inside a block
contenttype, but the notation is slightly different. For example, if we have a
contenttype with a `sections` repeater, acces them like this:

```twig
{% for section in record.sections %}
    <img src="{{ section.repeatimage|image(1200, 800, "r") }}"
        alt="{{ section.repeatimage.title }}">
{% endfor %}
```

