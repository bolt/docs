# has_path

`has_path(path)` is a Twig filter to return true if config matches path, and false otherwise.

```twig
{% set has_sitename = config.get('general/sitename') %} # returns true
{% set has_fakedummy = config.get('fake/dummy) %} # returns false
```

Source: Bolt