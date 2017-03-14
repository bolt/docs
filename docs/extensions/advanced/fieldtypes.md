---
title: Providing New Field Types
level: advanced
---
Extensions: Providing a New Field Type
======================================

Bolt 3 now gives extension developers access to the complete lifecycle of a
field, from the database query that loads it, through to the template that
displays it to the end user. To take advantage of that there is a new
`FieldManager` class within Bolt along with a new structure which you can use to
build custom fields.

As ever, the best way to see the potential of this system is a walk-through
tutorial.

The plan
--------

To show how we can take advantage of custom hydration and persistence we're
going to make a field that acts similarly to a traditional text field, but
instead of returning a plain string gives us a more useful value object that we
can use on the frontend. For this example we've chosen a URL field, that will
take a plain string as input and convert it to a custom `Url` object.

How we will use it
------------------

As with all fields within Bolt we use them via configuration in
`contenttypes.yml` so this is where we will begin. Normally we would store a URL
as a plain text field but instead we're going to add some extra features and so
we use a custom type. The config will look like this:

```
fields:
    web:
        type: url
        label: Enter a web address
```

Getting started
---------------

First up we'll need a skeleton extension setup, we won't run through the setup
here but you can use the [Bolt Extension Starter Kit][starterkit] to get one
setup. Once that's done we can start building our extension.

We'll start with the main Extension class itself. Here's what we need:

```
<?php

namespace Bolt\Extension\Ross\URLField;

use Bolt\Extension\Ross\URLField\Provider\FieldProvider;
use Bolt\Extension\SimpleExtension;

/**
 * The main extension class.
 *
 * @author Ross Riley <riley.ross@gmail.com>
 */
class Extension extends SimpleExtension
{

    public function getServiceProviders()
    {
        return [
            $this,
            new FieldProvider()
        ];
    }

    protected function registerTwigPaths()
    {
        return [
            'templates/bolt' => ['position' => 'prepend', 'namespace'=>'bolt']
        ];
    }

}

```

There's only two things we're doing here, adding our new FieldProvider to the
registered providers and in the `registerTwigPaths()` method we add our
extensions templates directory to the Twig loader. Note that new extensions
targeting Bolt 3.0 and later need to extend the built in `SimpleExtension`
class.

Our Field Provider Class
------------------------

Fields within Bolt are now controlled by a `FieldManager` instance and its
primary job is to map field names to handler classes. So our new field will use
the `url` name and we'll be making a handler class within this extension. So
here is the code needed to extend the base FieldManager and add our custom one
to it.

```
<?php

namespace Bolt\Extension\Ross\URLField\Provider;

use Bolt\Extension\Ross\URLField\Field\URLFieldType;
use Bolt\Storage\FieldManager;
use Silex\Application;
use Silex\ServiceProviderInterface;

class FieldProvider implements ServiceProviderInterface
{
    public function register(Application $app)
    {
        $app['storage.typemap'] = array_merge(
            $app['storage.typemap'],
            [
                'url' => URLFieldType::class
            ]
        );

        $app['storage.field_manager'] = $app->share(
            $app->extend(
                'storage.field_manager',
                function (FieldManager $manager) {
                    $manager->addFieldType('url', new URLFieldType());

                    return $manager;
                }
            )
        );

    }

    public function boot(Application $app)
    {
    }
}

```

To achieve this there are two things to extend, we need to add a map from `url`
to `Bolt\Extension\Ross\URLField\Field\URLFieldType`, which is the type class we
are going to write next.

Then we need to instantiate the class and add it to the FieldManager, these are
the only two steps needed.

Writing the Field Type Class
----------------------------

Now we move onto the Field Type class. This is where we define the lifecycle
transforms that will happen to our field. First of all here is the final code
for the class:

```
<?php
namespace Bolt\Extension\Ross\URLField\Field;

use Bolt\Extension\Ross\URLField\Value\Url;
use Bolt\Storage\EntityManager;
use Bolt\Storage\Field\Type\FieldTypeBase;
use Bolt\Storage\QuerySet;

class URLFieldType extends FieldTypeBase
{

    public function persist(QuerySet $queries, $entity, EntityManager $em = null)
    {
        $key = $this->mapping['fieldname'];
        $qb = $queries->getPrimary();
        $value = $entity->get($key);

        if (!$value instanceof Url) {
            $value = Url::fromNative($value);
        }

        $qb->setValue($key, ':' . $key);
        $qb->set($key, ':' . $key);
        $qb->setParameter($key, (string)$value);

    }


    public function hydrate($data, $entity)
    {
        $key = $this->mapping['fieldname'];

        $val = isset($data[$key]) ? $data[$key] : null;
        if ($val !== null) {
            $value = Url::fromNative($val);
            $this->set($entity, $value);
        }
    }

    public function getName()
    {
        return 'url';
    }

    public function getStorageType()
    {
        return 'string';
    }

    public function getStorageOptions()
    {
        return [
          'default' => ''
        ];
    }

}

```

This class contains a few simple methods and a couple that are a little more
complicated. We'll cover off the simple ones first.

The `getName()` method provides the name of the field, this is primarily used
for deciding which template to request. In this case we return `url` so when
Bolt tries to render it in the backend it will request a template at
`editcontent/fields/_url.twig` which we are going to provide.

The `getStorageType()` method tells Bolt how this will need to be saved in the
database. Bolt uses Doctrine DBAL and supports any of the built in types by
default, so potential values for this may be `string`, `text`, `decimal`, 
`integer` and `float` along with many more. In our case we just want to
store a plain string in the database, so this is what we return.

Then the `getStorageOptions()` method provides an array of options passed to the
storage engine. Bolt fields need to be able to handle empty values (eg. when a
record is saved without a value being entered) so we provide a default of an
empty string. This prevents us getting an error in stricter database engines
where we save a null value to a string column.

That's our basic setup taken care of, now we want to define the behaviour of our
field. Put simply we want to ensure two things, 1: that whatever is set as the
value of `$content['url']` when we write it to the database it is converted to a
string, and 2: that after we fetch a plain string from the database, we convert
it to our (soon to be built) `Url` object. That will mean that when we interact
with it in our templates instead of being only able to do `{{ record.url }}`
which is the behaviour of a normal text field we'll be able to do other
operations, like: `{{ record.url.scheme }}`, `{{ record.url.domain }}` and any
other methods we define on our url object.

These two steps describe what happens at 'persistence' and 'hydration' and so we
looking at the code, here's where we describe what happens at persistence:

```
    public function persist(QuerySet $queries, $entity, EntityManager $em = null)
    {
        $key = $this->mapping['fieldname'];
        $qb = $queries->getPrimary();
        $value = $entity->get($key);
        if (!$value instanceof Url) {
            $value = Url::fromNative($value);
        }
        $qb->setValue($key, ':' . $key);
        $qb->set($key, ':' . $key);
        $qb->setParameter($key, (string)$value);
    }
```

This may look a little complicated at first, but the advantage is that your
field can have input on the actual database query that Bolt uses to save a
record of content. That's important because it gives you the ability to provide
very advanced functionality which includes writing to join tables or adding
additional queries to execute on save.

So let's walk through. Our first line `$key = $this->mapping['fieldname'];`
looks up the name of the field as configured in `contenttypes.yml` it may be
called 'web', 'webaddress', 'siteurl' or whatever the end user sets it up as so
we need to make sure we're looking at the correct value. Next we get the
`QueryBuilder` object that will control the write to the database. Bolt uses an
instance of Doctrine's QueryBuilder to compose the query that updates the
content record in the database. In its simplest form this will look something
like `UPDATE bolt_pages SET url='http://google.com' WHERE id=1;` or to be more
precise using parameterised queries: `UPDATE bolt_pages SET url=:url WHERE
id=1;`.

In most situations this will be a single query, but you will have noticed that
the first parameter passed in to the persist method is an instance of QuerySet.
This is an important abstraction since it leaves open the possibility to send
multiple queries, but in this case we want to add only to the main query, so we
call `$qb = $queries->getPrimary();`.

Each field is responsible for adding itself and its value to the query on
persist, so it's at this stage we prepare the value to go to the database. First
we get the current value from the entity passed in. It's worth remembering that
this could feasibly be set to any value, at this point in time Bolt does not do
any strict type checking although it may do in the future, so we need to make
sure that if it isn't a type we expect then we set the value to a default.

So we call these commands:
```
if (!$value instanceof Url) {
    $value = Url::fromNative($value);
}
```

Our `Url` class provides an initializer that casts any non-url value to an
instance of `Url` so now moving on to the final commands we can guarantee that
`$value` is the type we expect.

```
$qb->setValue($key, ':' . $key);
$qb->set($key, ':' . $key);
$qb->setParameter($key, (string)$value);
```

This is the part where we modify the query object itself. The first two commands
cover both updates and inserts, there's no side effects to calling both methods
and it saves detecting the type of query we're calling. Finally we bind the
value to the key parameter. You'll note that when we do this
`$qb->setParameter($key, (string)$value)` we are casting our object to a string
which is how it needs to be saved to the database. This conversion will all be
handled in the `__toString()` method of our `Url` object.

Now we move onto the inverse of persistence, which in Bolt is known as
hydration. This is when we take the raw data that is fetched from the database
and turn it into an object or structure that we want to provide to our users.

In this case we're letting our `Url` class do the work of this, so once again here is the code:

```
public function hydrate($data, $entity)
{
    $key = $this->mapping['fieldname'];

    $val = isset($data[$key]) ? $data[$key] : null;
    if ($val !== null) {
        $value = Url::fromNative($val);
        $this->set($entity, $value);
    }
}
```

A hydrate method within Bolt is passed two parameters, the raw data from the
database, and an entity object which will be the end result of the hydration
process. So again, we want to lookup the specific value from the data that we
are interested in, so we consult the mapping data to find out the name of the
field - `$key = $this->mapping['fieldname']`. then we can look at the raw data
value (which is an array) by asking for `$data[$key]`. In the case of our field
we only want to make the transformation if the value is not null, and so we then
call `$this->set($entity, $value)` which sets the value to our newly constructed
`Url` class.

So now we have a complete custom field type extension, the only thing we haven't
walked through here is the `Url` class itself, but you can see more by
[sourcecode][viewing the extension source code]. The final check to do is to see
what we have in our frontend templates. To do this we just dump the field from
the ContentType page we set it up in, you should see something like this:

```
"web" => Url {#1604 ▼
      #scheme: "http"
      #user: "username"
      #password: "password"
      #domain: "hostname.com"
      #path: "/path"
      #port: 9090
      #queryString: "arg=value"
      #fragmentIdentifier: "anchor"
    }
```

Within our url class we provide getters to all the parts of the Url, so we can
use `{{ record.web.port }}` or `{{ record.web.queryString }}` to access our
enhanced field value.


[starterkit]: https://github.com/bolt/bolt-extension-starter/tree/master
[sourcecode]: https://github.com/rossriley/bolt-url-field
