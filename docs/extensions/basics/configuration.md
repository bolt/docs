---
title: Configuration
level: intermediate
---
Extension Building: Configuration
=================================

It is very useful to allow users of your application control over how it behaves.

Bolt uses configuration files in the [YAML](http://www.yaml.org/) format, and the
same is true for extensions.

Should you wish to provide a configuration file for your extension users, you
need to create the template as `config/config.yml.dist`. Upon installation,
that file will be copied to Bolt's `app/config/extensions/` directory and be
renamed to the lower-case version of `extension_name.vendor_name.yml`

Configuration Files
-------------------

The layout of YAML configuration files needs to adhere to the
[Symfony YAML format](http://symfony.com/doc/current/components/yaml/yaml_format.html).

```
pets:
    kittens: 11
    puppies: 12
    turtles: 13

```

Providing Defaults
------------------

Sometimes things are accidentally removed, or even added to the extension and
older configuration files not updated.

To cope with this, Bolt extensions can define a `getDefaultConfig()` function
that returns an array of parameters that will have user specified parameters
merged over the top of.

An example of this would look like:
```php
    /**
     * {@inheritdoc}
     */
    protected function getDefaultConfig()
    {
        return [
            'pets' => [
                'kittens' => 10,
                'puppies' => 20,
                'turtles' => 30,
            ]
        ];
    }
```

In the above example, `puppies` would have a default value of 20, unless a
value was specificed in the configuration file, in that case the provided value
would override this default.

Accessing Configuration Values
------------------------------

An extension's configuration array can simply be accessed with the `getConfig()`
function.

```php
$config = $this->getConfig();

echo 'We are configured to pat ' . $config['pets']['kittens'] . ' kittens.';
```

**NOTES:**

 * Configuration files are lazy loaded, so the `$config` class parameter is
   `private` and can not be directly accessed.
 * The `getConfig()` function is `protected` to prevent leaking of configuration
   data. Should you need your configuration data to be shared, you can either:
   * Pass in the configuration array from `$this->getConfig()` to class
     constructors
   * Extend `getConfig()` and call `return parent::getConfig();`
