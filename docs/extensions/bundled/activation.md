---
title: Activation
level: advanced
---
Activation
==========

Once your Bundle can be autoloaded, then one more step is needed to enable Bolt
to load them.

To active a Bundle, you need to add an `extensions` key to either your
`.bolt.yml` or `.bolt.php` file in the root of your project, with the values
being the Bundles you want Bolt to load.


Updating `.bolt.yml` or `.bolt.php`
-----------------------------------

An example using `.bolt.yml`:

```yaml
extensions:
    - BundleBaseNamespace\MyBundleExtension
```

To clarify, the value you put in the yml file is exactly what you would use to
instantiate the class, so in code the above is equivalent to
`new \BundleBaseNamespace\MyBundleExtension()`

An example using `.bolt.php`

```php
<?php

use BundleBaseNamespace\MyBundleExtension;

return [
    'extensions' => [
        new MyBundleExtension()
    ]
];
```

