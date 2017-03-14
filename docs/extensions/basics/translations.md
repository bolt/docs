---
title: Handling Translations
---
Registering Translations
========================

Translations can now be automatically included in your extension. This can be 
done by creating a new directory in the root folder of your extension called 
`translations`. 

Place translation files in that folder with the following naming scheme `en.yml`
or `sv.yml`. Then  you can use the translations anywhere in your extension. 


Using the Translations
======================

If you would like to use your translations in PHP, then you can do the following: 

```php

use Bolt\Translation\Translator as Trans;

class MyClass
{       
    public function doThing()
    {
        echo Trans::__('string to translate');
    }
}
```

Or in Twig:

```twig

    {{ __('string to translate') }}

```
