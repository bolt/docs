Install Bolt With Composer
=============================

If you've read through the previous installation options the principle has been that Bolt is the primary application. With this latest version of Bolt we've ensured that you can also install Bolt as a dependency of any other Composer based project.

### Single command install

If you are starting a new project from scratch then we've made this very simple. Just run the following from a command line:

`composer create-project bolt/composer-install <MYPROJECT> --prefer-dist`

Change <MYPROJECT> to the name of your project before running the installer.

The install process will ask you some questions about your required install strategy, you can install Bolt inside a single directory, or you can install the public assets inside a public directory and keep the application code outside the web root.

Here's what you should see...

<video controls="controls">
  <source src="https://dl.dropboxusercontent.com/u/20154/composer-install-video.mp4" type="video/mp4">
</video>

### Adding to an existing Composer project

If you already have a Composer project setup then run this command inside the root directory:

`composer require bolt/bolt ~2.0`



