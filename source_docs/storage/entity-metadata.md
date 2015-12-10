# Entity Metadata

<p class="meta">
    <strong>Bolt 3.0+</strong><br>
    The following functionality is only available in Bolt 3.0 and later, 
    <a href="../content-fetching">please see here</a> for usage in older versions.
</p>


### Overview

It is philosophically important that the complex information that is often needed to persist PHP objects to a database is not encoded into the Entity object itself. Since entities are the objects used to control domain specific application data they should be lightweight and flexible, and whilst they may eventually be persisted to a storage layer they do not need to know any information about what that might entail.

However when it does come time to persist an entity to storage then the application will need to know some information about the types of values held in an entity object.

Metadata in Bolt is setup via the `contenttypes.yml` file where field names are mapped to types, this information is then read into the application. 


### Interacting with the Metadata Driver

Access to Bolt's internal metadata is provided by accessing `$app['storage.metadata']`. Accessing this returns an instance of `Bolt\Mapping\MetadataDriver`.

It's important to note that this metadata driver also typehints against `Doctrine\Common\Persistence\Mapping\Driver\MappingDriver` so it is fully compatible with other Doctrine metadata drivers. More advanced applications may want to take advantage of this to bring Bolt's database metadata into a larger ecosystem.

### getClassMetadata($classname)

This method returns all the metadata for a given class name, for example:

```
$meta = $app['storage.metadata']->getClassMetadata('Bolt\Entity\User');
```