---
title: Bolt Storage Overview
---
Bolt Storage Overview
==============

As of version 3.0 a major refactor of the storage system has been started and during the
3.0 and 4.0 version releases we are committed to maintaining backwards compatibility 
wherever possible and so at points in this page we will refer to 'Legacy Storage' in
reference to pre 3.0 storage classes. All of the new storage classes can be found in 
`src/Storage/` and predominantly the legacy functionality can be found in two classes,
`src/Legacy/Storage.php` and `src/Legacy/Content`.

### Philosophy Behind the Refactor

The overall goal of the refactor is to break up the system into many smaller well-defined
parts and, building on the service-definition approach of Silex, exposing these smaller
components to the application as a separate service. 

This gives both application developers and extension developers a lot more ability to build
on Bolt and from an internals point of view it means smaller components can be iterated on
separately which can vastly reduce the time needed to bring new features to release.

A secondary goal is also to align Bolt more closely with the Symfony/Doctrine syntaxes so
that developers have a reduced cognitive load when understanding how to use Bolt. Whilst
Bolt is not suited to be built on top of Doctrine, wherever possible we try to use the same
approaches and divisions of responsibility.

### The Field is King

Perhaps the overarching philosophy of the new storage system is that the field, and its
companion 'field-type' is the primary unit of functionality within Bolt. A contenttype and
its records are now just loose wrappers that hold together collections of fields, 
field-types are now responsible for defining how they are loaded and saved to the database,
how they are queried for and how they are presented to the frontend.

### A Brief Overview of Storage Components

A good way to understand the different components is to look at the sub-directory structure
inside the `src/Storage` folder. Here's a quick overview of each one which we will then go
into more depth further down the page.

#### Collection

Collections are simply groups of other entities. In Bolt the primary example of these are
relations and taxonomies which show up as iterable groups of other items. Bolt comes with
the Doctrine Collections library as a dependency and Bolt's collections normally build on 
top of an ArrayCollection of some kind. 

#### ContentRequest

This component takes care of handling the HTTP requests from the Bolt backend. When a user
presses view, save, create or delete then these classes translate those requests into 
operations on the DB Storage layer.

#### Database

This section contains anything related to the low-level database interaction. It also
includes the functionality that keeps the database structure up to date.

#### Entity

An entity is a PHP representation of a database row, if you look inside the folder you'll
see that we have one entity class for each fixed table in the Bolt schema along with a
fallback one called `Entity\Content` which maps to the dynamic tables that are created for
each new contenttype the user adds to `contenttypes.yml`. An entity should always be a
plain PHP object with no interfaces or inheritance that just responds to getX and setX 
methods.

#### Field

The majority of functionality for Fields can be found in the classes within `src/Field/Type`
simply put a definition in `contenttypes.yml` that looks like:

```
fields:
  slug:
    type: slug
```

will mean that a field type will be used to handle the functionality, in this case we'd 
look at `src/Field/Type/SlugType` although the precise mappings between `contenttypes.yml`
type names and PHP classes are defined in the `StorageServiceProvider`. Of course this means
that whilst Bolt has built in handlers for default types, anyone can add new ones or swap
out Bolt's default behaviour by mapping to a different class.

#### Mapping

Mapping supplies information about data structures between the PHP objects and the underlying
data layer. Bolt primarily uses a combination of introspection (looking at the existing 
db schema) and configuration (mostly set in `contenttypes.yml`) to determine what this is.

Having this information available allows the PHP objects to find out what the underlying
data structure is, and also allows mapping between the two, for instance an object of the
class `Bolt\Entity\Users` will be mapped to the table `bolt_users` and the attribute 
`$user->lastSeen` or more precisely `$user->getLastSeen()` will map to `bolt_users.lastseen`.
 
#### Migration

This folder is responsible for file-based database migration which is only currently exposed
via the experimental nut commands `database:import` and `database:export`.

#### Query

This component handles everything to do with higher-level fetching of content which in Bolt
is often used via the Twig `setcontent` tag. The corresponding PHP service is accessed via
`$app['query']->getContent()`. 

It's job is to take simple text-based queries like  `{% setcontent somecontent = '(pages,entries)' where {id: '!10', categories: 'news||about' } orderby '-datepublish' %}`
then parse and turn into platform-specific SQL queries. 

#### Repository

A repository is a PHP-Object equivalent of a database table. Within the `src/Repository`
folder you'll see a separate repository class for each Bolt table. Via a repository you
can ask for a collection of entities (db rows) and also save and delete entities.





