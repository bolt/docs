Extensions: Providing a New Field Type
======================================

Bolt 3.0 now gives extension developers access to the complete lifecycle of a field, from the database query that
loads it, through to the template that displays it to the end user. To tak advantage of that there is a new 
`FieldManager` class within Bolt along with a new structure which you can use to build custom fields.

As ever, the best way to see the potential of this system is a walk-through tutorial.

### The plan

To show how we can take advantage of custom hydration and persistence we're going to make a field that acts similarly
to a traditional text field, but instead of returning a plain string gives us a more useful value object that we can
use on the frontend. For this example we've chosen a URL field, that will take a plain string as input and convert it 
to a custom `Url` object.
 
### How we will use it

As with all fields within Bolt we use them via configuration in `contenttypes.yml` so this is where we will begin.
Normally we would store a URL as a plain text field but instead we're going to add some extra features and so we
use a custom type. The config will look like this:

```
fields:
    web:
        type: url
        label: Enter a web address
```

