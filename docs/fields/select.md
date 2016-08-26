---
title: Select
---
Select
=========

### Choose from Preset values:

A drop-down list to make a pre-defined selection from. This fields has many
options and many possibilties but is less complicated than it might seem at
first glance.

### Basic Configuration:

```
name:
    type: select
    values: [ none, foo, bar ]
```

### Example usage in templates:

```
{{ record.name }}
```

### Populating the values from a ContentType

You can also get the values from a the records of a ContentType.

```
        name:
            type: select
            values: mycontenttype/fieldname
```

To display multiple values simply separate them with commas.

For example to display both the id and title of 'pages':

```
        name:
            type: select
            values: pages/id,title
```

If you wish to store another field or value from the original ContentType in
your database, use the keys setting. If you do this, it will not store the
'id', but the value of the field you specify. For example:

```
        name:
            type: select
            values: persons/lastname
            keys: slug
```

If the list is growing longer, there are a few ways to make it more manageable:

```
        name:
            type: select
            values: programme/name
            sort: name
            autocomplete: true
            limit: 1000
```

* The sort-option allows you to specify the sorting of the items in the select
  field. You can use any field, and to reverse the sort use a minus: -title,
  for example.
* Enabling autocomplete will allow the user to use autocomplete typing to
  select a value from the field.
* Use limit to limit the amount of items. Note that the default is 500, so if
  you have a long list, and you need to show them all to the user, raise this
  limit.

Finally you can pass filters to the query using the filter option. For a full
reference of what can be passed to a where filter you can see the content
fetching documentation.

As well as filters on the ContentType values you can also pass in taxonomy
conditions too, as in the example below.

```
        name:
            type: select
            values: pages/title
            filter: { categories: news }
```

You can then fetch the selected record by using the following code:

```
{% setcontent linkedpage = "pages" where { 'id': record.name } returnsingle %}
```

## Additional options:

### Selecting multiple values

You can also allow the user to select multiple values by setting the options
`multiple` to true like this:

```
        name:
            type: select
            values: [ none, foo, bar ]
            multiple: true
```

If you set it to multiple you will also have some different ways to use it in
the templates.

For example if you want to see if `bar` was one of the selected values:

```
{% if 'bar' in record.name %}
    ..
{% endif %}
```

Or if you want to print out the selected values in an `ul`:

```
<ul>
    {% for values in record.name %}
        <li>{{ values }}
    {% endfor %}
</ul>
```

Or if you just want to print them out after one another separated by commas:
`{{ record.name|join(', ') }}`


### Defining values as a hash

The list with options can be defined as either a 'map' or a 'hash'. If you use
a list (like above), the same values will be stored in the database as they are
shown in the pull-down selector that the editor sees. If you want to store
another value than is shown, you can use a so-called 'hash'. For example:

```
        name:
            type: select
            values: { 'yes': "Yes", 'no': "No", 'undecided': "Well, it can go either way" }
```
