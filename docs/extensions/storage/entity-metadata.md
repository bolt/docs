---
title: Entity Metadata
level: advanced
---
Entity Metadata
===============

Entity metadata is used to store any information that allows a simple PHP object
to be mapped to a database or storage system.

Metadata in Bolt is mainly setup via the `contenttypes.yml` file where field
names are mapped to types, this information is then read into the application.

Overview
--------

It is philosophically important that the complex information that is often
needed to persist PHP objects to a database is not encoded into the Entity
object itself. Since entities are the objects used to control domain specific
application data they should be lightweight and flexible, and whilst they may
eventually be persisted to a storage layer they do not need to know any
information about what that might entail.

However when it does come time to persist an entity to storage then the
application will need to know some information about the types of values held in
an entity object.

Interacting with the Metadata Driver
------------------------------------

Access to Bolt's internal metadata is provided by accessing
`$app['storage.metadata']`. Accessing this returns an instance of
`Bolt\Mapping\MetadataDriver`.

It's important to note that this metadata driver also typehints against
`Doctrine\Common\Persistence\Mapping\Driver\MappingDriver` so it is fully
compatible with other Doctrine metadata drivers. More advanced applications may
want to take advantage of this to bring Bolt's database metadata into a larger
ecosystem.

`getClassMetadata($classname)`
------------------------------

This method returns all the metadata for a given class name as an array, you can
access it for example:

```
$meta = $app['storage.metadata']->getClassMetadata('Bolt\Storage\Entity\Users');
```

The structure of this output will look something like this:

```
array:4 [▼
  "identifier" => Index {#1380 ▶}
  "table" => "bolt_users"
  "boltname" => "users"
  "fields" => array:15 [▼
    "id" => array:11 [▶]
    "username" => array:11 [▼
      "fieldname" => "username"
      "type" => "string"
      "fieldtype" => "Bolt\Storage\Field\Type\TextType"
      "length" => 32
      "nullable" => true
      "platformOptions" => []
      "precision" => 10
      "scale" => 0
      "default" => null
      "columnDefinition" => null
      "autoincrement" => false
    ]
    "password" => array:11 [▶]
    "email" => array:11 [▶]
    "lastseen" => array:11 [▶]
    "lastip" => array:11 [▶]
    "displayname" => array:11 [▶]
    "stack" => array:11 [▶]
    "enabled" => array:11 [▶]
    "shadowpassword" => array:11 [▶]
    "shadowtoken" => array:11 [▶]
    "shadowvalidity" => array:11 [▶]
    "failedlogins" => array:11 [▶]
    "throttleduntil" => array:11 [▶]
    "roles" => array:11 [▶]
  ]
]
```

### loadMetadataForClass($classname)

This method returns an instance of `Bolt\Storage\Mapping\ClassMetadata` with the
data loaded for the given entity, for example:

```
$meta = $app['storage.metadata']->loadMetadataForClass('Bolt\Storage\Entity\Users');
```

The output will look something like this, each column or field will have a
mapping inside the `fieldMappings` array


```
ClassMetadata {#953 ▼
  #name: "Bolt\Storage\Entity\Users"
  #boltname: "users"
  #tableName: "bolt_users"
  #identifier: Index {#1380 ▶}
  #namingStrategy: NamingStrategy {#709 ▶}
  #fieldMappings: array:15 [▼
    "id" => array:11 [▶]
    "username" => array:11 [▶]
    "password" => array:11 [▶]
    "email" => array:11 [▶]
    "lastseen" => array:11 [▶]
    "lastip" => array:11 [▶]
    "displayname" => array:11 [▶]
    "stack" => array:11 [▶]
    "enabled" => array:11 [▶]
    "shadowpassword" => array:11 [▶]
    "shadowtoken" => array:11 [▶]
    "shadowvalidity" => array:11 [▶]
    "failedlogins" => array:11 [▶]
    "throttleduntil" => array:11 [▶]
    "roles" => array:11 [▼
      "fieldname" => "roles"
      "type" => "json_array"
      "fieldtype" => "Bolt\Storage\Field\Type\TextType"
      "length" => null
      "nullable" => true
      "platformOptions" => []
      "precision" => 10
      "scale" => 0
      "default" => null
      "columnDefinition" => null
      "autoincrement" => false
    ]
  ]
}
```

