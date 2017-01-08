Set-up For Extension Development
================================

Basic Extension
---------------

Set up a git repository and commit a `composer.json`, `init.php` and an
`Extension.php`

You want to define the namespace, correctly, that you want to use and any
directories that are searched by the autoloader.

The important addition here is the `src/` to the PSR-4 path, this indicates
where the autoloader will look for additional class files in your namespace

```
{
    "name" : "authorname/extensionname",
    "description" : "Describe your extension here",
    "type" : "bolt-extension",
    "keywords" : [
        ""
    ],
    "require" : {
        "bolt/bolt" : ">=2.0.0,<3.0.0"
    },
    "license" : "GPL-3.0+",
    "authors" : [{
            "name" : "Your Name",
            "email" : "your.name@example.com"
        }
    ],
    "autoload" : {
        "files" : [
            "init.php"
        ],
        "psr-4" : {
            "Bolt\\Extension\\AuthorName\\ExtensionName\\" : [
                "",
                "src/"
            ]
        }
    }
}
```

Bolt Extend Composer
--------------------

Next you want to add an additional repository to the `repositories` section of
`extensions/composer.json`

Something similar to:
```
        "myrepo": {
            "type": "git",
            "url": "/home/user/git/myext"
        }
```

The end result looking something like this

```
{
    "require": {
        "authorname/extensionname": "dev-master"
    },
    "repositories": {
        "myrepo": {
            "type": "git",
            "url": "/home/user/git/myext"
        },
        "bolt": {
            "type": "composer",
            "url": "https://market.bolt.cm/satis/"
        },
        "packagist": false
    },
    "provide": {
        "bolt/bolt": "2.0.0"
    },
    "scripts": {
        "post-package-install": "Bolt\\Composer\\ExtensionInstaller::handle",
        "post-package-update": "Bolt\\Composer\\ExtensionInstaller::handle"
    },
    "extra": {
        "bolt-web-path": ".././"
    },
    "minimum-stability": "dev",
    "prefer-stable": true,
    "autoload": {
        "files": [
            "installer.php"
        ]
    }
}
```

Installing The Extension
------------------------

Change into your extensions directory and do the following:

```bash
curl -sS https://getcomposer.org/installer | php -- --filename=composer
./composer update
```

Your extension will now install from your git repo and build an autoloader.

