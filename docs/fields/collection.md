---
title: Collection field
---
Collection field
==============

A special field type available as a field definition is the `collection` field
type which allows you to compose an array-like structure of sub-fields within a
single field name.
<!-- note: by including the old / officious name, it can be found using search. -->
<!-- block repeater -->

## Basic Configuration:

The configuration of a repeating field set comprises the main field set name,
along with the definition of the sub fields.

```yaml
        features:
            type: collection
            fields:
                title:
                    type: text
                image:
                    type: image
                    extensions: [ gif, jpg, png ]
                content:
                    type: html
```

As you can see the field is configured with a type of `collection` and then the sub-fields
are configured under the `fields` attribute. You can include any valid fields
within a collection, there are a few that are not supported.

<a href="/files/collection.png" class="popup"><img src="/files/collection.png" width="590"></a><br>

<p class="note"><strong>Note:</strong> Collections are useable with most of the
available field types, except where
it simply does not make sense to have more than one of. In short, do
<strong>not</strong> use <code>type: slug</code>, <code>type: collection</code> or 
<code>type: templateselect</code> as fields in
your collection. These fields will not work as expected. </p>

You can move and sort fields inside collections, but don't forget to save your record after sorting its 
collections.

## Example usage in templates:

When you want to use collections in your templates you will need to iterate over
the collection in order to access the individual fields.

For instance if you just want to iterate over all fields then the template code will look like this:

```twig
{% for feature in record.features %}
    {{ feature.type }}:
    {{ feature }}
{% endfor %}
```

In the example above using `{{ feature }}` will just output the value of the
sub-field, if it is a text field such as like `text`, `html`, `textarea` or
`markdown`. Since these are sometimes more complex fields you can use
`{{ field|image }}` for images or `{{ dump(field.value) }}` to dump the
value regardless of type. In practice, you'll often want to use the techniques
described in the section below for individual fields to output the specific type
of field in the layout you require.

If you know the names of the fields you want to render then you can fetch a
field from the collection by name. For instance using the same example as above
but knowing that our collection comprises the individual sub-fields
`companyname`, `telephone` and `email` we can output the fields like this:

```twig
{% for company in record.companies %}
    <h2>{{ company.companyname }}</h2>
    <h4>Tel: {{ company.telephone }}</h4>
    <h4>Email: <a href="mailto:{{ company.email }}">{{ company.email }}</a></h4>
    <hr>
{% endfor %}
```

## Options

The field has three specific options:

* `limit`: Limit how many collection items an editor is able to create. If you omit this
  setting, then an unlimited number of sets can be created. The configuration
  for that option looks like this:
* `collapsible`: Whether the separate collection items of this Collections are collapsible in
  the backend. This allows the editor to get a better overview, if there are
  multiple collection items. The default is `false`, you can set it to `true` to enable
  this feature.

```yaml
        features:
            type: collection
            limit: 3
            collapsible: false
            fields:
                title:
                    type: text
                image:
                    type: image
                    extensions: [ gif, jpg, png ]
                content:
                    type: html
```

## Default value

A collection may contain a number of pre-defined default sub-fields.
To set those, the `default:` option takes an array which defines the 
order, field name and default value for the collection item.

Example:

```yaml
        features:
            type: collection
            fields:
                title:
                    type: text
                image:
                    type: image
                    extensions: [ gif, jpg, png ]
                content:
                    type: html
            default:
                0:
                    field: title
                    default: "This is the first default field in the collection."
                1:
                    field: html
                    default: "This is the <b>second</b> default field in the collection."
```