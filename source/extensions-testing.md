# Developing Extensions

## Testing

It's essential that by the time you submit your extension to the Bolt Marketplace you have tested your extension as thouroughly
as possible. To help you do this we've put together some suggested workflows that will help you to both get started, develop
and then deploy your extension.

#### Getting a skeleton Project

The easiest way to get started is by using our skeleton extension project. You'll need to use the command line to do this, and you'll need to already have composer installed and accessible from your command line. If you still need to do this you can find instructions <a href="https://getcomposer.org/">on the Composer site</a>.

From the command line enter the following: `composer create-project rossriley/bolt-extension-starter my-extension --no-install`. Replace my-extension with the name of the folder you want to create. Once this has run you can open up the project folder in your 
text editor or IDE and start customising it.

#### Customising with your own namespace and settings

Each extension needs to work in its own namespace, in the skeleton there are two files that you need to change the namespace and then in the composer.json you need to adjust the autoload setting to be the same as your namespace.

First open up `init.php` and rename the namespace declaration. Secondly rename the namespace on the first line in `Extension.php`. Finally you need to specify this namespace in the `composer.json` file. Look for the section `autoload` and adjust the PSR-4 namespace accordingly.


