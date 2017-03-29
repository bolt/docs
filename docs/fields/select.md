---
title: Select field
---
Select field
============

## Choose from Preset values:

A drop-down list to make a pre-defined selection from. This field has many
options and many possibilities but is less complicated than it might seem at
first glance.

### Basic Configuration:

```yaml
        somevalue:
            type: select
            values: [ none, foo, bar ]
```

### Example usage in templates:

```twig
{{ record.somevalue }}
```

## Populating the values from a ContentType

You can also get the values from the records of a particular ContentType.

```yaml
        somevalue:
            type: select
            values: mycontenttype/fieldname
```

To display multiple values simply separate them with commas.

For example to display both the id and title of 'pages':

```yaml
        somevalue:
            type: select
            values: pages/id,title
```

If you wish to store another field or value from the original ContentType in
your database, use the keys setting. If you do this, it will not store the
'id', but the value of the field you specify. For example:

```yaml
        somevalue:
            type: select
            values: persons/lastname
            keys: slug
```

If the list is growing longer, there are a few ways to make it more manageable:

```yaml
        somevalue:
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

In adition to filters on the ContentType values, you can use taxonomy
conditions, as in the following example:

```yaml
        somevalue:
            type: select
            values: pages/title
            filter: { categories: news }
```

You can then fetch the selected record by using the following code:

```twig
{% setcontent linkedpage = "pages" where { 'id': record.somevalue } returnsingle %}
```

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
            values: { 'yes': "Yes", 'no': "No", 'undecided': "Well, it can go either way" }
```
