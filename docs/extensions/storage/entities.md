---
title: Working with Entities
level: advanced
---
Entities
========

Overview
--------

An entity is designed to be a very simple PHP object that represents a single
object of data. For example a user in Bolt is represented via the
`Bolt\Entity\User` class and ContentTypes setup via the `contenttypes.yml` file
will normally return a `Bolt\Entity\Content` object.

Normally an entity will map each property to an object attribute and if you are
creating your own entity classes then it's a good idea to provide getter and
setter methods to allow interaction with the properties.

Another option is to extend Bolt's base Entity class which adds dynamic getters
and setters but at the expense of adding a dependency (albeit a very small one).

Some examples of interaction with entity objects can be found below.

```
$repo = $app['storage']->getRepository('users');
$user = $repo->find(1);

// $user is now an object instance of Bolt\Entity\User

$user->getUsername(); // 'exampleusername'
$user->setUsername('updatedusername');

$user->getDisplayname(); // 'Example User'
```

Once you have finished interacting with your entity object you can pass it back
to the Repository to handle persistence of updates.

```
$repo->save($user);
```
