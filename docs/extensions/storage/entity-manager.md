---
title: The Entity Manager
level: advanced
---
The Entity Manager
==================

The Bolt Entity Manager manages access to the various layers of the Bolt storage
system. It does this mainly by delegating to Repository classes which have the
primary responsibility of interacting with the database.

Below are some links to the `EntityManager` methods you may need to call.

Quick Links
-----------

 - <a href="#getrepository-entity">getRepository</a>
 - <a href="#setrepository-entity-repositoryclass">setRepository</a>
 - <a href="#createquerybuilder">createQueryBuilder</a>
 - <a href="#find-entity-id">find</a>
 - <a href="#save-entity">save</a>
 - <a href="#delete-entity">delete</a>

Overview
--------

At a conceptual level a Repository will normally interact with a single table of
the storage system, for instance a UserRepository will look after fetching,
updating and deleting User entities to the `bolt_user` table in the database.

The EntityManager sits above this next layer of repositories, most methods on
the Entity Manager or `$app['storage']` will simply pass the request on to the
relevant repository class.

### getRepository($entity)

```
```php
namespace Bolt\Extension\DropBear\KoalaCatcher;

use Bolt\Storage\Entity;

/**
 * A class file that you do your database interaction with.
 */
class KoalaStorage
{
    protected function getKoalaFromTree()
    {
        // Getting a repository via class name resolution.
        // Note that this example relies on the "use" import above. 
        $repo = $app['storage']->getRepository(Entity\Users::class);
        
        // Getting a repository via fully qualified class name
        $repo = $app['storage']->getRepository('Bolt\Storage\Entity\Entity\Users');
        
        // Getting a repository via alias.
        $repo = $app['storage']->getRepository('users');
        
        // Do something here with your repository object …
    }
```

As shown in the usage above, `getRepository()` is used to select a repository
instance for an Entity.

The object returned will type hint against `Bolt\Storage\Repository` although it
is more likely to be an entity specific repository such as `UserRepository`,
`ContentRepository` etc.


### setRepository($entity, $repositoryClass)

```
    $repo = $app['storage']->setRepository('Bolt\Storage\Entity\Users', 'Myapp\Storage\UserRepository');
```

In any larger Bolt application you will run into occasions where you want to
write your own database interactions and for optimum reusability this will
usually belong in the repository layer.

The `setRepository()` command allows easy swapping out of Repository providers for
a given entity. Subsequent calls to `getRepository` will return an instance of
the new Repository class rather than what was set previously.

### createQueryBuilder()

```
    $qb = $app['storage']->createQueryBuilder();
```

Apart from very basic queries, which can use the simpler finder methods, the
primary method of querying the database is via a QueryBuilder instance. This
method fetches a clean instance that is not restricted to any specific table.
You will ordinarily use this when you need to do a multi-table query, wherever
possible you should call the same method on the repository where the query will
be pre-selected to a specific table.

### find($entity, $id)

```
    $user = $app['storage']->find('Bolt\Storage\Entity\Users', 1);
```

This is a simple wrapper for the Repository method of the same name. It is
equivalent to getting the repository and then performing a find on the returned
instance.

### save($entity)

```
    $result = $app['storage']->save($entity);
```

This method uses introspection to proxy a save method on the correct repository
class.

### delete($entity)

```
    $result = $app['storage']->delete($entity);
```

This method uses introspection to proxy a delete method on the correct
repository class.
