Creating (and updating) Content
===============================

Sometimes you will need to create content programatically. For example,
there may be an API of events that need to be managed in Bolt.

## Creating content in PHP

The recommended way for creating Content programatically in Bolt
is using the provided ContentFactory methods.

### Creating content using `ContentFactorry::create`

```php
<?php

namespace App;

use Bolt\Factory\ContentFactory;

class ExampleContentCreator
{
    /** @var ContentFactory */
    private $factory;

    public function __construct(ContentFactory $factory)
    {
        $this->factory = $factory;
    }

    public function run(): void
    {
        // Let's mock some data.
        $data = [
            [
                'title' => 'My first entry',
                'teaser' => 'Read more about programatically making content',
                'body' => 'Bla bla bla bla bla...'
            ],
            [
                'title' => 'My second entry',
                'teaser' => 'more more more more'
            ],
            [
                'title' => 'Last entry',
                'body' => "There's the last entry",
            ]
        ];

        // Now, let's create some content

        foreach($data as $fieldData) {
            // "entries" is the Content Type
            $content = $this->factory->create('entries');

            // Now add some content to it
            foreach($fieldData as $name => $value) {
                $content->setFieldValue($name, $value);
            }

            // Shorthand method for persisting and saving content
            $this->factory->save($content);
        }
    }
}
```

Soon you'll notice that, as many times as the `run` method runs, 
as many entry records will be created. In some cases, however, you'll
need to either update a record and only create it if no such record exists.

### Upserting content with `ContentFactory::upsert`

Upsert means To insert rows into a database table if they do not already exist, 
or update them if they do. In that case, we use the factory's `upsert` method.

It is useful when you want to _update_ existing records and automatically create
those records that are new.

To use `upsert`, we need to tell Bolt how to identify whether or not
a record already exists by passing criteria. For example, do we define a record as a duplicate by
its title, or a combination of fields, or something else.

The criteria is a PHP array that works much like the `setcontent` directives, e.g.
```php
    $criteria = [
        'title' => 'My first entry'
    ];
```

```php
    $criteria = [
        'title' => '%entry%',
        'status' => 'published',
        'id' => '>50'    
    ];
```

And now, to the full example script for upserting:

```php
<?php

namespace App;

use Bolt\Factory\ContentFactory;

class ExampleContentCreator
{
    /** @var ContentFactory */
    private $factory;

    public function __construct(ContentFactory $factory)
    {
        $this->factory = $factory;
    }

    public function run(): void
    {
        // Let's mock some data.
        $data = [
            [
                'title' => 'My first entry',
                'teaser' => 'Read more about programatically making content',
                'body' => 'Bla bla bla bla bla...'
            ],
            [
                'title' => 'My second entry',
                'teaser' => 'more more more more'
            ],
            [
                'title' => 'Last entry',
                'body' => "There's the last entry",
            ]
        ];

        // Now, let's upsert some content
        foreach($data as $fieldData) {

            // Look for records that have the title of the current record
            $criteria = [
                'title' => $fieldData['title']
            ];

            // This will fetch an existing record, or create a new one if none exists.
            $content = $this->factory->upsert('entries', $criteria);

            // Now add some content to it
            foreach($fieldData as $name => $value) {
                $content->setFieldValue($name, $value);
            }

            $this->factory->save($content);
        }
    }
}
```

### Create content using `ContentFactory::createStatic`

If you are not able to use Symfony's autowiring (recommended!),
you can also use a static method.

<p class="Note">As the <code>createStatic</code> method does NOT use Symfony
autoloading and autowiring, it is limited in the checks and initialisations
that it can do. Only use it if you cannot autoload and autowire the 
<code>ContentFactroy</code>.</p>

## Creating content in the API

For documentation on how to create content in the API,
check the in-CMS documentation at `/bolt/api`.
