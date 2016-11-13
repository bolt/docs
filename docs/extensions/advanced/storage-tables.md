---
title: Database Tables
level: advanced

---
Database Tables
===============

Custom database tables can be added by an extension, and require a class that
defines the schema (columns, indexes, primary keys and foreign key constraints).


### Table class

The table class should extend `\Bolt\Storage\Database\Schema\Table\BaseTable`,
and this base class has a protected property `$table` that is a
[`\Doctrine\DBAL\Schema\Table`](http://www.doctrine-project.org/api/dbal/2.5/class-Doctrine.DBAL.Schema.Table.html) object.


#### Columns

Columns are added in the `addColumns()` function, with calls to
`$this->table->addColumn()` that takes three parameters:

  * Name
  * [Data type](http://docs.doctrine-project.org/projects/doctrine-dbal/en/latest/reference/types.html)
  * [Options](http://docs.doctrine-project.org/projects/doctrine-dbal/en/latest/reference/schema-representation.html#column)


#### Indexes

Indexes are set in the `addIndexes()` function, with calls to
`$this->table->addIndex()` that takes an indexed array of column names to create
indexes for.

Unique indexes can also be added here with `$this->table->addUniqueIndex()`.


#### Primary keys

Primary keys are set in the `setPrimaryKey()` function, with calls to
`$this->table->setPrimaryKey()` that takes a single string parameter of the
column name.


#### Example

```php
namespace Bolt\Extension\DropBear\KoalaCatcher\Storage\Schema\Table;

use Bolt\Storage\Database\Schema\Table\BaseTable;

class GumTree extends BaseTable
{
    /**
     * {@inheritdoc}
     */
    protected function addColumns()
    {
        $this->table->addColumn('id',        'integer', ['autoincrement' => true]);
        $this->table->addColumn('koala',     'string',  ['notnull' => false]);
        $this->table->addColumn('gumleaves', 'integer', ['default' => 0]);
    }

    /**
     * {@inheritdoc}
     */
    protected function addIndexes()
    {
        $this->table->addIndex(['koala']);
        $this->table->addIndex(['gumleaves']);

        // This will create a joint index of both columns
        $this->table->addIndex(['koala', 'gumleaves']);
    }

    /**
     * {@inheritdoc}
     */
    protected function setPrimaryKey()
    {
        $this->table->setPrimaryKey(['id']);
    }
}
```

### Registering the table

Finally, to have Bolt know about your table and include it in it's schema, you
need to import the `DatabaseSchemaTrait` trait, and create a `registerExtensionTables()`
function and call `extendDatabaseSchemaServices()` in your extension loader class.

This function should return an associative array, the key being the table name
(without prefix) and the value being the fully qualified class name.

```php
namespace Bolt\Extension\DropBear\KoalaCatcher;

use Bolt\Extension\DropBear\KoalaCatcher\Storage;
use Bolt\Extension\DatabaseSchemaTrait;
use Bolt\Extension\SimpleExtension;
use Silex\Application;

/**
 * An extension for catching koalas.
 *
 * @author Kenny Koala <kenny@dropbear.com.au>
 */
class KoalaCatcherExtension extends SimpleExtension
{
    use DatabaseSchemaTrait;

    /**
     * {@inheritdoc}
     */
    protected function registerServices(Application $app)
    {
        $this->extendDatabaseSchemaServices();
    }

    /**
     * {@inheritdoc}
     */
    protected function registerExtensionTables()
    {
        return [
            'gumtree' => Storage\Schema\Table\GumTree::class,
        ];
    }
```

**Note:** The above example uses "class name resolution" via the `::class` keyword.
