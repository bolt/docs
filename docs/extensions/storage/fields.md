---
title: Fields & Field Types
level: advanced
---
Fields in Bolt
==============

Overview
--------

Fields are where the majority of custom functionality happen within Bolt, at
their simplest they are a way to link a single part of a content record to a
persisted state in the database, but for Bolt 3 the flexibility available to
fields has increased greatly.

To understand the different processes that a field goes through, we'll start by
looking at the simplest of the fields, the `text` field. Whenever you define a
field in `contenttypes.yml` you let Bolt know what kind of behaviour you want
the field to have, here's an example:

```
    fields:
        title:
            type: text
            group: content
```

In the Bolt backend a simple text field like this will show an HTML text input,
and we'd expect the value to be collected, saved in a text column in the
database and made available via a content record for the frontend, the normal
way we access it is via the `{{ record.title }}` syntax in Twig.

The three stages that we talk about in all discussions of fields relate to these
processes and, in turn, each field whether simple or complex will need to
implement these stages as methods. They are `load()`, `hydrate()` and
`persist()`.

The Load Method
---------------

The load method is responsible for describing how the field is to be fetched
from the database. Bolt uses Doctrine QueryBuilder to construct the query and by
default when content records are being queried all the columns will be fetched,
in SQL terms something very similar to a `SELECT * from bolt_pages` is taking
place, so since our simple text field is just needed to be fetched as is from
the database, we don't need to do anything here.

Most fields within Bolt will behave the same as this since generally they map to
a simple column in the database, but having access to the QueryBuilder object
here does allow you to do some advanced manipulation on the query, if you want
to see the power of this then look at the source code of fields that use join
tables to bring in relational data to a field.

The Hydrate Method
------------------

Hydration is the process of converting a flat array of database storage data
into PHP objects. For instance a date field stored in the database as
`2016-01-01` needs to be translated into a `DateTime` object or a JSON array
stored as a string in the database needs to be converted to an array by passing
through `json_decode`.

Any conversion that needs to take place after a record has been fetched from the
database can be handled in the `hydrate()` method of a field. Out text field is
quite simple since we don't need to do anything more complicated than taking the
string from the database and set the property of the entity. So this would be
all that you need to do in the `hydrate()` method.

```
    public function hydrate($data, $entity)
    {
        $key = $this->mapping['fieldname'];
        $val = $data[$key] ?: null;
        $entity->$key = $val;
    }
```

To walk through this, let's first look at the values that our `hydrate` method
receives. Firstly `$data` is an array of the entire data array for one row from
the database. In most cases we would only be interested in the specific field
that we are processing, so our example field that we defined in YAML above would
be available at `$data['title']` again if you want to do more complex things
having access here to the raw data may be useful.

The second parameter is the constructed `$entity` object, as part of the
hydration process the entity will start off empty but as it gets hydrated by
each field it will end up with all the field properties being set.

So knowing this, the three lines of our hydrate method are quite simple to
understand. First of all we look up the name of our field. This is whatever we
configured in our `contenttypes.yml` file and you can fetch all this data via
`$this->mapping` which is an array of the configuration defined in YAML along
with some other defaults.

Once we know the key, we can fetch that item from the `$data` array and then in
the final line of code we set the entity object property with the value that
came from the database. Once this is done, then Bolt will move onto the next
field until the entity is fully hydrated.

The Persist Method
------------------

The persist method is the counterpart to `hydrate` and this performs the reverse
of hydration in that it takes an entity gets the value of our field, does any
conversion you want the field to do and finally adds the final value to the
`QueryBuilder` object so it can be written back to the database.

As with the load method, having access to the entire Query stack gives us a lot
of potential power that in most cases we don't need to use but should you need
to then again very complex DB queries can be accomplished should you wish to do
smoething more advanced in a field.

Let's run through the simple example of what our text field persist method will
look like. Again because we picked the simplest of all fields we don't need to
perform and translations on the values, we just want the text value from our
entity to end up in the correct column in the database. So here is how the
method will look:

```
    public function persist(QuerySet $queries, $entity)
    {
        $key = $this->mapping['fieldname'];
        $qb = $queries[0];
        $value = $entity->$key;

        $qb->set($key, ':' . $key);
        $qb->setParameter($key, $value);
    }
```

Again we are passed two parameters that we will need, the first `$queries` is a
set of queries, the second is our hydrated entity. With our simple text field we
just need to read the value of `title` from the entity and add it to the update
query.

The `$queries` parameter is a `QuerySet` object, with simple field operations we
are only ever concerned with the main update query, in SQL terms it will look
like `UPDATE bolt_pages SET title=:title, content=:content ....... WHERE id=1;`

So unless you are trying to do something more complicated then the first step is
to get the main query which is available via array access `$queries[0]`. Once we
have that we are going to add the value to the query. As before we fetch the
value from the entity `$value = $entity->$key` then we add a set command to the
query `$qb->set($key, ':' . $key)` this makes the parameterised query for the
Doctrine QueryBuilder equivalent to adding: `SET title=:title` and then binding
the value of `:title` to the value of the entity.
