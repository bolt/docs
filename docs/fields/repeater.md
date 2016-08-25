---
title: Repeater
---
Repeater
=========

A special field type available as a field definition is the `repeater` field type which
allows you to compose an array-like structure of sub-fields within a single field name.

### Basic Configuration:

The configuration of a repeating field set comprises the main field set name, along with
the definition of the sub fields.

```
name:
    type: repeater
    limit: 3
    fields:
        repeattitle:
            type: text
        repeatimage:
            type: image
            extensions: [ gif, jpg, png ]
        repeatcontent:
            type: html
```

As you can see the field is configured with a type of `repeater` and then the sub-fields 
are configured under the `fields` attribute. In general you can include any valid fields
within a repeater, there are a few that are not supported `slug`, `templatefield` and 
`repeater` itself.

### Example usage in templates:

```
{% for contact in record.contacts %}
    {% for field in contact %}
         {{ field }}
    {% endfor %}
{% endfor %}
```
 
### Options

The field has a one option to change the functionality of the field.

* `limit`: Define a limit to how many sets an editor is able to create. If you
  omit this setting then an unlimited number of sets can be created.