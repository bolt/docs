Doctrine Entities (managing content)
====================================

Read more about this topic in Doctrine's official documentation: [Doctrine ORM][docs].

## What are Entities?

Entities are, simply put, PHP objects that allow CRUD (create-read-udpate-delete) operations
with the database.

Thinking of traditional SQL databases, you can think of an Entity as a row in a table in the database.

The entity class serves two purposes:

1. Define the columns and properties of the table in the database (i.e., what fields does it store)
2. A PHP object, store the data for a specific instance (row)

For example, a very basic entity can be defined as a `Product`:

```php
<?php

class Product
{
    /**
     * @var int
     */
    private $id;
    /**
     * @var string
     */
    private $name;
}
```

## What Entities does Bolt provide?

Bolt contains a number of entities:

| Entity     | Description |
|------------|-------------|
| `Content` | Stores a single instance of a `record`. For example, it can be a `page`, `showcase` or a `block` |
| `Field` | Stores a single instance of a field data, for example it's `type`, `name` and `content` it belongs to. |
| `Relation` | Stores a relation between two `Content` entities.  |
| `Taxonomy` | Stores a single instance of a taxonomy, like it's `name`, `slug`, `type` and `content`. |
| `User` | Stores a single instance of a `user`, including their `name`, `displayName`, `email` and hashed `password`. |
| `Log` | Stores a single instance of Bolt's built-in logger. |
| `Media` | Stores a single instance of files that Bolt is aware of, such as files uploaded through [FileFields][filefields] and [ImageFields][imagefields] | 


## How to create your own Entity?

You can add Entities directly in the `src/Entity/` directory of your project.

For example, let's create a new Field type `color`, which will be an entity.

In `src/Entity/` create a class `ColorField.php`:

```php
<?php

declare(strict_types=1);

namespace App\Color;

use Bolt\Entity\Field;
use Bolt\Entity\Field\Excerptable;
use Bolt\Entity\Field\RawPersistable;
use Bolt\Entity\FieldInterface;
use Doctrine\ORM\Mapping as ORM;
use OzdemirBurak\Iris\Color\Hex;

/**
 * @ORM\Entity
 */
class ColorField extends Field implements Excerptable, FieldInterface, RawPersistable
{
    public const TYPE = 'color';

    public function getValue(): ?array
    {
        $value = parent::getValue();

        if (empty($value)) {
            return [];
        }

        $color = new Hex($value[0]);

        return [$color];
    }
}
```

Then, make sure the entity is properly mapped by Doctrine, by addding to your `services.yaml`:

```yaml
### Map entities
doctrine:
  orm:
    auto_generate_proxy_classes: '%kernel.debug%'
    naming_strategy: doctrine.orm.naming_strategy.underscore
    auto_mapping: true
    mappings:
      Color:
        is_bundle: false
        type: annotation
        dir: '%kernel.project_dir%/src/Entity/ColorField'
        prefix: 'App\Color'
        alias: Color
```

[docs]: https://www.doctrine-project.org/projects/orm.html
[filefields]: /fields/file
[imagefields]: /fields/image
