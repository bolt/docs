# config

`config = object(Bolt\Configuration\Config)` is a Twig global to be used to access the
configuration available in your config.yaml and contenttypes.yaml files. It has a bunch of useful methods.

###get(path)
Returns a config value using a path

```twig
{% set sitename = config.get('general/sitename') %}
{% set accepted_file_types = config.get('general/accept_file_types') %}
```


###has(path)
Returns true if config matches path, and false otherwise.

```twig
{% set has_sitename = config.get('general/sitename') %} # returns true
{% set has_fakedummy = config.get('fake/dummy) %} # returns false
```

###contentType(contenttype)
Returns the configuration for the given contenttype.

```twig
{% set homepage_config = config.contentType('homepage') %}
```