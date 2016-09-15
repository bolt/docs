---
title: Handling Translations
---
Registering Translations
========================
As of Bolt *3.1* translations can be automatically included in your extension. This can be done 
by creating a new directory in the root folder of your extension called `translations`. You can
 place any translation in that folder with the following naming scheme `en.yml` or `sv.yml`. Then 
 you can use the translations anywhere in your extension. 

Using the Translations
======================
If you would like to use your translations in PHP, then you can do the following: 

```php

use Bolt\Translation\Translator as Trans;
        
$menu = (new MenuEntry('google', '/bolt/extensions/google-analytics'))
        ->setLabel(Trans::__('Statistics'))
        ->setIcon('fa:area-chart');
```

Otherwise in TWIG:

```twig

__(label)

```