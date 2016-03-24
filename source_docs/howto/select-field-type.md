Getting the most out of the 'Select' fieldtype
==============================================

In your contenttypes you can define fields that allow the editor to pick an
option from a select field. It can either be a 'single' or 'multiple' selection,
dependent on whether you need the editor to have the option to pick more than
one item from the list.

There are roughly two ways in which you can use the `type: select` fields: To
select options from a predefined list, or to select options from a list that is
populated with values from another contenttype.

Selecting from a fixed list
---------------------------

The most straightforward use of this fieldtype is to create simple items to
choose from, like this:

```apache
        myselectfield:
            type: select
            values: [ A-tuin, Donatello, Rafael, Leonardo, Michelangelo, Koopa, Squirtle ]
            multiple: false
```

This will provide the editor a simple pull-down select menu, where he or she can
select a single item. In your templates, this is accessible as a plain string:

```html
{{ dump(record.myselectfield) }} =>

"Michelangelo"
```

If you would rather have the option to select more than one item, add
`multiple: true` to the configuration:

```apache
        myselectfield:
            type: select
            values: [ A-tuin, Donatello, Rafael, Leonardo, Michelangelo, Koopa, Squirtle ]
            multiple: true
            postfix: "Select your favourite turtle(s)."
```


Note that when you switch to `multiple`, the way that the values are stored in
the database also changes. When only one item can be selected, the value is
stored as a plain 'string'. When the editor is allowed to pick multiple items,
it's stored as JSON in the database, and in your templates it will be available
as an array. Compare this to the dump example from above:

```html
{{ dump(record.myselectfield) }} =>

array:2 [▼
  0 => "Donatello"
  1 => "Rafael"
]
```

If you do this, you will probably have to take this into account in your
templates. For example, to check a value or to show them, you should use
appropriate Twig tags:

```twig
{% if 'Donatello' in record.myselectfield %}
    ..
{% endif %}

{% for values in record.myselectfield %}
    {{ values }}
{% endfor %}

{{ record.myselectfield|join(', ') }}
```

The list with options can be defined as either a 'map' or a 'hash'. If you use a
list (like above), the same values will be stored in the database as they are
shown in the pull-down selector that the editor sees. If you want to store
another value than is shown, you can use a so-called 'hash'. For example:

```apache
        myselectfield:
            type: select
            values: { 'yes': "Yes", 'no': "No", 'undecided': "Well, it can go either way" }
```

In this case, either `yes`, `no` or `undecided` will be stored in the database.
Note the use of `{ accolades }` instead of `[ brackets ]` to define the list of
options.

If you have a lot of options, you can put them on separate lines in your
`contenttypes.yml`. This makes it much easier to read.

```apache
        myselectfield:
            type: select
            values:
              - A-tuin
              - Donatello
              - Rafael
              - Leonardo
              - Michelangelo
              - Koopa
              - Squirtle

        myselectfield:
            type: select
            values:
              yes: "Yes"
              no: "No"
              undecided: "Well, it can go either way"

```

Practical example of using the select field with a large number of options.

```apache
        time:
            type: select
            values:
              - 12 AM
              - 1 AM
              - 2 AM
              - 3 AM
              - 4 AM
              - 5 AM
              - 6 AM
              - 7 AM
              - 8 AM
              - 9 AM
              - 10 AM
              - 11 AM
              - 12 PM
              - 1 PM
              - 2 PM
              - 3 PM
              - 4 PM
              - 5 PM
              - 6 PM
              - 7 PM
              - 8 PM
              - 9 PM
              - 10 PM
              - 11 PM
            multiple: false
```

Populating the list from a contenttype
--------------------------------------

To select options from another contenttype, instead of from a predefined list,
set the `values` to the form `contenttype/fieldname`. For example, to select an
item from the contenttype `persons`, and you want to use the `lastname` field in
the pull-down, use:

```apache
        myselectfield:
            type: select
            values: persons/lastname
```

By default, Bolt stores the `id` of the used contenttype in the database. This
is usually the safest option, because it will prevent breakage, when other
information is changed in the record that is being linked to. To retrieve these
in your templates, you can use the following:

```twig
{{ dump(record.myselectfield)}}

{% setcontent linkedpage = "pages" where { 'id': record.myselectfield } returnsingle %}

{{ dump(linkedpage) }}
```

If you wish to store another field or value from the original contenttype in
your database, use the `keys` setting. If you do this, it will not store the
'id', but the value of the field you specify. For example:

```apache
        myselectfield:
            type: select
            values: persons/lastname
            keys: slug
```

To show more than one field in the pull-down for the editor, use them separated
by a comma. The following example will display the 'first name' and 'last name'
of each 'person' in the pull-down, while the 'slug' will be stored in the
database.

```apache
        myselectfield:
            type: select
            values: persons/firstname,lastname
            keys: slug
```


If the list is growing longer, there are a few ways to make it more manageable:

```apache
        programme:
            type: select
            label: Programme items
            values: programme/name
            keys: slug
            sort: name
            autocomplete: true
            limit: 1000
```

<a href="/files/select-autocomplete.png" class="popup"><img src="/files/select-autocomplete.png" width="590"></a><br>

 - The `sort`-option allows you to specify the sorting of the items in the
   select field. You can use any field, and to reverse the sort use a minus:
   `-title`, for example.
 - Enabling `autocomplete` will allow the user to use autocomplete typing to
   select a value from the field.
 - Use `limit` to limit the amount of items. Note that the default is `500`, so
   if you have a long list, and you need to show them all to the user, raise
   this limit.

####Filtering the results

Finally you can pass filters to the query using the `filter` option. For a full
reference of what can be passed to a where filter you can see the
<a href="../content-fetching#using-where">content fetching documentation</a>.

As well as filters on the contenttype values you can also pass in taxonomy conditions
too, as in the example below.

```apache
        relatednews:
            type: select
            multiple: true
            values: pages/title
            filter: {categories:news}
            autocomplete: true
```
