---
title: Working with Repositories
level: advanced
---
# Repositories

Repositories manage collections of entities. At a conceptual level where an
entity represents a row of data in the database, the repository represents the
table. When you request a repository in Bolt you will normally ask for it via 
the name of the entity, and you will receive back an object that will be able 
to perform find, save and delete operations on a collection of (or single)
entities.

Here are some of the built in ways to interact with a repository.

## Quick Links to Repository Methods

 - <a href="#createquerybuilder">createQueryBuilder</a>
 - <a href="#find-id">find</a>
 - <a href="#findby-array-criteria-array-orderby-limit-offset">findBy</a>
 - <a href="#findoneby-array-criteria-array-orderby">findOneBy</a>
 - <a href="#findall">findAll</a>
 - <a href="#save-entity">save</a>
 - <a href="#delete-entity">delete</a>


## Overview

A repository in Bolt is the primary method used for interacting with an entity,
or collections of entities.

It's not recommended to create a repository directly, instead you request a
repository instance from the entity manager, as in the following example:

```
$repo = $app['storage']->getRepository('Bolt\Storage\Entity\Users');
```

You can also use short aliases for any of the built-in tables so the following 
is equivalent.

```
$repo = $app['storage']->getRepository('users');
```

Once you have a repository instance then the operations you perform will 
interact with the specific storage table and will return objects of the entity
type managed.

---

### createQueryBuilder()

```
$repo = $app['storage']->getRepository('users');
$qb = $repo->createQueryBuilder();
```

Apart from more basic queries, which can use the simpler finder methods, the
primary method of querying the database is via a QueryBuilder instance. This
method fetches an instance of `QueryBuilder` that is preset to select on the 
managed storage table.

The returned instance is always an object of type `Doctrine\DBAL\Query\QueryBuilder`.
Much more in-depth documentation for using this 
<a href="http://doctrine-dbal.readthedocs.org/en/latest/reference/query-builder.html">can be found here</a>.

Once you have finished building your query then you can fetch results by 
calling `->execute()` followed by one of `->fetch()` or `->fetchAll()`.

For example the following fetches the ten most recent published entries and 
for reference is functionally identical to the example in the `findBy` method
documentation below.

```
$repo = $app['storage']->getRepository('entries');
$qb = $repo->createQueryBuilder();
$qb->where('status="published"')
    ->orderBy('datepublish', 'DESC')
    ->setMaxResults(10);

$entries = $qb->execute()->fetchAll();
```


---

### find($id)

```
$repo = $app['storage']->getRepository('users');
$user = $repo->find(1);
```

This method finds a row by id from the table and returns a single Entity object.

---

### findBy(array $criteria, array $orderBy, $limit, $offset)

We can now graduate to more flexible querying on the storage layer. The `findBy()`
method allows us to pass key value parameters to the query which in turn filters 
the results fetched from the storage layer.

For example:

```
$repo = $app['storage']->getRepository('users');
$users = $repo->findBy(['displayname' => 'Editor']);
```

As you can see from the accepted parameter list you can also pass in order, 
limit and offset parameters to the method allowing you to perform most simple
queries using this method. For instance here is a query that finds the 10 most
recent published entries.

```
$repo = $app['storage']->getRepository('entries');
$entries = $repo->findBy(['status' => 'published'], ['datepublish', 'DESC'], 10);
```

---

### findOneBy(array $criteria, array $orderBy)

This method works identically to the `findBy` method above but will return a
single Entity object rather than a collection. This is most suited for when you
want to guarantee a single result, for example:

```
$repo = $app['storage']->getRepository('users');
$user = $repo->findOneBy(['username' => $postedUser, 'password'=> $passHash]);
$newestUser = $repo->findOneBy([], ['id', 'DESC']);
```


---

### findAll()

```
$repo = $app['storage']->getRepository('users');
$users = $repo->findAll();
```

The `findAll` method returns a collection of all the applicable entities
unfiltered from the storage layer. In SQL terms it is identical to performing a
`SELECT * from tablename`.

---

### save($entity)

```
$repo = $app['storage']->getRepository('users');
$user = $repo->find(1);

$user->username = "A new username";

$result = $repo->save($entity);
```

This method takes a modified object and persists the changes back to the database.

It returns false on failure and the successfully saved id on success.

---

### delete($entity)

```
$repo = $app['storage']->getRepository('users');
$user = $repo->find(1);
$result = $repo->delete($user);
```

This method takes the supplied entity object and deletes that row from the storage table.

It returns the number of deleted rows if successful, and `false` on failure.

