Extensions: Testing and debugging
=================================

It's essential that by the time you submit your extension to the Bolt Marketplace you have tested your extension as thouroughly as possible. To help you do this we've put together some suggested workflows that will help you to both get started, develop and then deploy your extension.

### Starting a new Extension Project

The easiest way to get started is by using our skeleton extension project. You'll <a href="/extensions/config#using-starter-package">find the instructions here</a> .


### Testing locally

There are a few strategies available to test your extensions while you are developing, in the early stages you will want speed so your edits are visible immediately, as your extension nears completion you will want to simulate the process that your end users will use to install and use your extension.

#### Phase 1 - Develop your extension within a Bolt project

This is the fastest way to get started, in any Bolt site you can put local extensions within `extensions/local/{author_name}/{extension_name}` for the details see the <a href="/howto">how-to article</a>

In this phase you can edit the extension files directly and the changes will immediately take effect in your Bolt app.


#### Phase 2 - Moving to a Composer Package

Bolt Extensions submitted to the marketplace need to install as Composer packages so once you are ready to move into the testing phase you will need to get your extension into this format. This is also an ideal time to set it up as a Git repository if it isn't already.

The goal now is to have a directory on your local machine that is a valid git repo and contains your `composer.json`, `init.php` and other extension files.

Once you have that you can now simulate the Marketplace install but from your local folder. Within the Bolt application that you want to test it, open up `extensions/composer.json`

Next you want to add an additional repository to the `repositories` section of `extensions/composer.json`

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
            "url": "https://extensions.bolt.cm/satis/"
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

In the require section above you then need to change the `authorname/extensionname` to be exactly the same as the name in your Extensions's composer.json file.

Once this is done you can now use the normal Bolt interface to install your extension. Visit the Extend Bolt page in the backend and use the install all packages button. You can now make sure that everything still works as it should. If it does then you are ready to move to the Bolt Extensions marketplace.


#### Phase 3 - Moving to the Bolt Marketplace

Assuming your local Git repository test was successful we can now start the publishing process. Firstly you'll need to publish your Git repository so it's publicly readable online. If you have a <a href="http://github.com">Github</a> or <a href="http://bitbucket.com">Bitbucket</a> account then those are ideal places to push to.

Once you have a public url for the Git repository then you can submit your extension to the Bolt Marketplace. To do so visit <a href="http://extensions.bolt.cm">extensions.bolt.cm</a>, sign up for an account if you need to and then submit your extension.

If everything looks ok at this point you will be able to see your extension listed on the marketplace.
