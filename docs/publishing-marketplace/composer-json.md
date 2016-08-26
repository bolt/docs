---
title: Composer.json
---
Composer.json
=============

Each extension or theme requires a `composer.json`, which holds some important meta data. 
That meta data includes information like name, author, keywords, icon, screenshots and so on.

For extensions, it also includes information about the extension class and the public assets folder.

## Example composer.json for Themes

```
{
    "name": "dropbear/jungle",
    "description": "Full responsive blog template in jungle style",
    "type": "bolt-theme",
    "keywords": ["jungle", "responsive", "blog", "modern"],
    "require": {
        "bolt/bolt": "^3.0"
    },
    "license": "MIT",
    "authors": [
        {
            "name": "Kenny Koala",
            "email": "kenny@dropbear.com.au"
        }
    ],
    "extra": {
        "bolt-icon": "icon.png",
        "bolt-screenshots": [
            "screenshots/teaser.png",
            "screenshots/screenshot1.png",
            "screenshots/screenshot2.png"
        ]
    }
}
```

## Example composer.json for Extensions

```
{
    "name": "dropbear/koala-catcher",
    "description": "Catching koalas like a Pro",
    "type": "bolt-extension",
    "keywords": ["dropbear", "dangerous"],
    "require": {
        "bolt/bolt": "^3.0"
    },
    "license": "MIT",
    "authors": [
        {
            "name": "Kenny Koala",
            "email": "kenny@dropbear.com.au"
        }
    ],
    "autoload": {
        "psr-4": {
            "Bolt\\Extension\\DropBear\\KoalaCatcher\\": "src"
        }
    },
    "extra": {
        "bolt-assets": "web",
        "bolt-class": "Bolt\\Extension\\DropBear\\KoalaCatcher\\KoalaCatcherExtension",
        "bolt-icon": "icon.png",
        "bolt-screenshots": [
            "screenshots/teaser.png",
            "screenshots/screenshot1.png",
            "screenshots/screenshot2.png"
        ]
    }
}
```

## General Required Fields

- `name`
- `description`
- `type`
- `keywords`
- `bolt/bolt`: in the `require` section, must be a version constraint of Bolt
- `license`
- `authors`: at least one author item

## Additional Extension Required Fields

- `autoload` section for the extension class
- `bolt-class` in the `extra` section

## General Optional Fields

- `bolt-icon` in the `extra` section
- `bolt-screenshots` in the `extra` section