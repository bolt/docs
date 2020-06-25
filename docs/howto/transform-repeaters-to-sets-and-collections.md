---
title: Transform Bolt 3 repeaters to Bolt 4 sets and collections
---

Transform Bolt 3 repeaters to Bolt 4 sets and collections
=========================================================

## Repeater → collection with 1 set

In Bolt 3, it the `repeater` is available as a special field type
that allows an array-type structure of sub-fields within a single field name.
It allowed Editors to repeat those sub-fields as they wish to build the record.

Thus, the repeater field combined two functionalities:
* Allow Editors to add multiple instances of a field (repeat fields)
* Group sub-fields together under one parent field

In Bolt 4, these two functionalities are provided by two distinct fields:
* The `collection` field allows sub-fields to be repeated (but does not restrict)
the order or composition of the sub-fields
* The `set` field groups sub-fields together under one parent field

You can read more about [Collections][collection] and [Sets][set] to familiarize yourself with how each
field functions.

### Example transforming a repeater into a collection with one set

Given this definition in Bolt 3
```yaml
        books:
            type: repeater
            label: Simple repeater example
            limit: 3
            prefix: "<p>This allows you to create multiple sets of fields. Use the add button at the bottom to create a new empty set.</p>"
            fields:
                repeattitle:
                    type: text
                repeatcover:
                    type: image
                    extensions: [ gif, jpg, png ]
                repeatpublicationyear:
                    type: number
```

then, the corresponding definition that delivers the same functionality in Bolt 4 would be:
```yaml
        books:
            type: collection
            label: Simple collection example
            limit: 3
            prefix: "<p>This allows you to create multiple sets of fields. Use the add button at the bottom to create a new empty set.</p>"
            fields:
                book:
                    type: set
                    fields:
                        title:
                            type: text
                        cover:
                            type: image
                            extensions: [ gif, jpg. png ]
                        publicationyear:
                            type: number
```

First, the field named Book (which is of type `set`) groups all the properties of a book,
i.e. its title, cover image and publication year, into one semantically meaningful field.
Then, the field named Books (which is of type `collection`) allows Editors to add as many
instances of the field Book as they wish.

In Twig, this can be displayed as follows:

```twig
{% for book in record.books %}
    <h1>{{ book.title }}</h1>
    {{ showimage(book.cover) }}
    <p>Year of publication: {{ book.publicationyear }} </p>
{% endfor %}
```

## Blocks → collection with multiple sets

In Bolt 3, it the `block` is available as a special field type
that allows an array-type structure of groups of fields within a single field name.
You can give each of these blocks a name and define the fields that it has. 
The Editor can then insert these in the Record as needed.

Thus, the block field combined three functionalities:
* Allow Editors to add multiple instances of a field (repeat fields)
* Group sub-fields together under one parent field
* Alllow Editors to manually select which of the available blocks to repeat

In Bolt 4, these three functionalities are provided by two distinct fields:
* The `collection` field allows sub-fields to be repeated (but does not restrict)
the order or composition of the sub-fields
* The `set` field groups sub-fields together under one parent field

### Example transforming a block into a collection with multiple (two) sets

Given this definition in Bolt 3
```yaml
        sections:
            type: block
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

then, the corresponding definition that delivers the same functionality in Bolt 4 would be:

```yaml
        sections:
            type: collection
            fields:
                imagesection:
                    type: set
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
                    type: set
                    label: Paragraph
                    fields:
                        heading:
                            type: text
                        content:
                            type: html
                            height: 100px
```

First, the two fields named imagesection and textsection group all properties of
the respective section, i.e. (heading, image, description) for imagesection and
(heading, content) for a textsection. Thus, those two groups of sub-fields are
grouped into two semantically meaningful parent fields.
Then, the field named Sections (which is of type `collection`) allows Editors to add as many
instances of either imagesection or textsection as they wish.

In Twig, this can be displayed as follows:

```twig
{% for section in record.sections %}
    <h1>{{ section.heading }}</h1> {# the heading exists for both fields. So it is safe to use here #}

    {% if section.name === 'imagesection' %}

        {{ showimage(section.image) }}
        <p>{{ section.description }}</p>

    {% else if section.name === 'textsection' %}

        {{ section.content }}

    {% endif %}
{% endfor %}
```


[collection]: ../fields/collection
[set]: ../fields/set
