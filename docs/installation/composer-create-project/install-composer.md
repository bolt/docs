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
from the [Composer project website](https://getcomposer.org/download/), or by running the following command:

```
curl -sS https://getcomposer.org/installer | php
```

<p class="tip"><strong>Tip:</strong> The Bolt documentation assumes that you
have renamed <code>composer.phar</code> to <code>composer</code>. If not, you
can use <code>php composer.phar</code> wherever composer is used in command
line snippets.</p>

### Choosing an install type

Depending on your needs, there are two different approaches:
  * [Creating a new Composer based project](creating-a-new-project)
  * [Adding Bolt to an existing Composer based project](adding-to-an-existing-project)

