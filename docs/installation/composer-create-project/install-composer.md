---
title: Install with Composer
level: advanced
---
Installing Bolt with Composer
=============================

Since Bolt 3.0 production installs are based around Composer installation
methodology, by default. Even if you install from a distribution archive file,
you are basically getting a pre-prepared Composer install.

Getting Composer
----------------

If you don't have Composer installed on your system already, it can be obtained
from the [Composer project website](https://getcomposer.org/download/), or by
running the following command:

```
curl -sS https://getcomposer.org/installer | php
```

<p class="tip"><strong>Tip:</strong> The Bolt documentation assumes that you
have renamed <code>composer.phar</code> to <code>composer</code>. If not, you
can use <code>php composer.phar</code> wherever composer is used in command
line snippets.</p>

### Interactive Install

To start a basic interactive install, navigate to the parent directory of your
desired project (site), and run the following:

```
composer create-project bolt/composer-install:%%VERSION%%.x <MYPROJECT> --prefer-dist
```

**NOTE:** Change `<MYPROJECT>` to the name of your project before running the
installer.

The install process will ask you some questions about your required install
strategy, you can install Bolt inside a single directory, or you can install the
public assets inside a public directory and keep the application code outside
the web root.

After this command, continue with the steps as in [Quick install: Next steps][next]

<p class="tip"><strong>Tip:</strong> Always run <code>composer update</code>
after doing the initial setup. This ensures you that you're running the
latest versions of packages, suitable for your platform.</p>

### Choosing an install type

Depending on your needs, there are two different approaches, which offer
more options:

  * [Creating a new Composer based project](creating-a-new-project)
  * [Adding Bolt to an existing Composer based project](adding-to-an-existing-project)

[next]: ../quick-install#next-steps