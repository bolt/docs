---
title: Select field
---
Select field
============

## Choose from Preset values

This field provides a drop-down list to make a pre-defined selection from. This field has many
options and many possibilities but is less complicated than it might seem at
first glance.

### Basic Configuration

```yaml
        somevalue:
            type: select
            values: [ none, foo, bar ]
```

### Example usage in templates

```twig
{{ record.somevalue }}
```

### Defining values as a hash

The options in the list can be defined as either a 'map' or a 'hash'. If you use
a list (like above), the options visible in the drop-down list will be the
values stored in the database. If you want to store other values, you can use a
so-called 'hash'.

In the following example, 'yes', 'no' and 'undecided' will be stored in the
database:

```yaml
        somevalue:
            type: select
            values:
              yes: Yes
              no: No
              undecided: Well, it can go either way…
```

## Populating the values from a ContentType

You can also get the values from the records of a particular ContentType.

```yaml
        somevalue:
            type: select
            values: mycontenttype/[formatting]
```

To display multiple values simply separate them with commas. For example to
display both the id and title of 'pages':

```yaml
        somevalue:
            type: select
            values: pages/{id},{title}
```

A simple substition is performed for all `{something}` placeholders. You can
insert the name of a field, but also `{id}`, `{status}` and `{contenttype}`. You
can also use the magic attributes `{title}` and `{excerpt}`.

If you leave the second part blank, like `values: entries/`, the formatting
will default to `{title} (№ {id}, {status})`.

If the list is growing longer, there are a few ways to make it more manageable:

```yaml
        somevalue:
            type: select
            values: programme/{title}
            sort: name
            autocomplete: true
            limit: 1000
```

* The sort-option allows you to specify the sorting of the items in the select
  field. You can use any field, and to reverse the sort use a minus: -title,
  for example.
* Enabling autocomplete will allow the user to use autocomplete typing to
  select a value from the field.
* Use limit to limit the amount of items. Note that the default is 200, so if
  you have a long list, and you need to show them all to the user, raise this
  limit.

<p class="tip"><strong>Tip:</strong> See the section below for details and
examples on how to <a href="#outputting-selected-options-from-another-contenttype">
Outputting selected options from another ContentType</a>.</p>

<!--
Finally you can pass filters to the query using the filter option. For a full
reference of what can be passed to a where filter you can see the content
fetching documentation.

In adition to filters on the ContentType values, you can use taxonomy
conditions, as in the following example:

```yaml
        somevalue:
            type: select
            values: pages/{title}
            filter: { categories: news }
```
-->

### Populating the values from multiple ContentTypes

To output multiple ContentTypes in the select list, use:

```yaml
somevalue:
    type: select
    values: (events,news,pages)/{title} - {contenttype} № {id} ({status})
```

As the field allows you to select multiple ContentTypes, upon saving it stores
`contenttype/id` in the database.

You can then use this to fetch the selected record by using the following code,
where `somevalue` in this instance may equal something like `page/1`:

```twig
{% setcontent linkeditem = record.somevalue returnsingle %}
```

In practice, you'll often want to fetch the selected records. See the section on
[Outputting selected options from another ContentType](#outputting-selected-options-from-another-contenttype)
for details and an example on how to easily do this.


## Additional options

### Selecting multiple values

You can also allow the user to select multiple values by setting the options
`multiple` to true like this:

```yaml
        somevalues:
            type: select
            values: [ none, foo, bar ]
            multiple: true
```

If you set it to multiple you will also have some different ways to use it in
the templates.

For example if you want to see if `bar` was one of the selected values:

```twig
{% if 'bar' in record.somevalues %}
    ..
{% endif %}
```

Or if you want to print out the selected values in an `ul`:

```twig
<ul>
    {% for values in record.somevalues %}
        <li>{{ values }}</li>
    {% endfor %}
</ul>
```

Or if you just want to print them out after one another separated by commas:

```twig
{{ record.somevalues|join(', ') }}
```

### Making the selected values sortable

If you want to control the order that selected values are saved and displayed
in then you can use the `sortable` option. This is especially useful when
linking to other ContentTypes since it can give an ordered relation. Usage:

```yaml
        pages:
            type: select
            values: pages/
            multiple: true
            autocomplete: true
            sortable: true
```

## Usage in templates

The most basic usage of this field in templates, is simply:

```twig
{{ record.fieldname }}
```

Where it'll output the (key of) the selected value. If there's more than one
selected item, they're output as a comma separated string. In practice, this is
often nog very useful. If you're using a key/value hash, or selecting items
from another ContentType, you'll want to output more information.

### Outputting selected options

When using a Select field with a number of options, you can output them like
this:

```twig
{% for value in record.selectfield.selected %}
    <li>{{ value }}</li>
{% endfor %}
```

In this case, `record` is the current Record, `selectfield` is the name of the
field, and `selected` is the attribute that returns the selected value or
values.

If you're using a key/value hash, it's sometimes useful to be able to access
either of them:

```twig
<ul>
{% for key, value in record.selectfield.selected %}
    <li>{{ value }} <small>(key: <code>{{ key }}</code>)</small></li>
{% endfor %}
</ul>
```

If you wish to access all the possible defined options for the field,
regardless of whether they were selected or not, use `options` to get key/value
pairs for all the options:

```twig
{{ dump(record.selectfield.options) }}
```

### Outputting selected options from another ContentType

If you're using the Select Field to select items from a different ContentType,
you might've noticed that outputting `{{ record.selectfield }}` will simply
output the ID of the selected record(s). Normally, you'll want to be able to
output something with those selected records. In order to do that, you need to
fetch these records, and then you can loop over them, like a regular collection
of Records.

```twig
{% if record.selectfield.selectedIds|default %}
<ul>
    {% setcontent selectedRecords = record.selectfield.contentType where {'id': record.selectfield.selectedIds} returnmultiple %}
    {% for record in selectedRecords %}
        <li><a href="{{ record|link }}">{{ record|title }}</a></li>
    {% endfor %}
</ul>
{% endif %}
```

In this case, `record` is the current Record, `selectfield` is the name of the
field. We use `contentSelect` to verify that this select contains references to
other Content, as opposed to a Select Field that has a number of fixed options.

Below that, the `setcontent` tag fetches the `selectedRecords` from the correct
ContentType. After that, we iterate over these, using a regular `for` loop. The
items in this loop are "normal" Records, so you can do anything with them, that
you would ordinarily do with a Content Record.

Bolt does not automatically fetch all linked Records this in the background,
because it's better for performance to only do this when needed.
