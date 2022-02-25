---
title: Resetting a password
---
Resetting a password
====================

So you forgot a password? There are two ways to fix this.

Login page
----------

Bolt supports password resets from the login page. Just click `I forgot my password ...` and follow
the instructions. The user will receive an e-mail with a new password. Note that this is a shadow
password, the current active password will stay active until the shadow password is used.
This means you can't just reset a random user's password without his or her interaction.

Console
---

Bolt also supports password resets from the command line utility Console. Use `bin/console bolt:reset-password` and
provide the username or e-mail address of the user. Bolt will immediately set a new random password and
print it to you. Unlike with the login page, no e-mail is sent and a shadow password is not used.

Customizing the email
---

Bolt allows customizating the email through configuration. In your `config.yaml` file, search the (self-explanatory) section `reset_password_settings`.

For full cusomization, you can [decorate](https://symfony.com/doc/current/service_container/service_decoration.html) `ResetPasswordController` through Symfony's container.

```
# config/services.yaml
services:
    # this replaces the old Bolt's ResetPasswordController definition with the new one
    App\Controller\Backend\ResetPasswordController:
        decorates: Bolt\Controller\Backend\ResetPasswordController
```

Now do something useful with your new class:

```
<?php

declare(strict_types=1);

namespace App\Controller\Backend;

use Bolt\Controller\Backend\ResetPasswordController as BoltResetPasswordController;
use Symfony\Component\Mime\Email;

class ResetPasswordController extends BoltResetPasswordController
{

    protected function buildResetEmail($config, $user, $resetToken): Email
    {
        $email = parent::buildResetEmail($config, $user, $resetToken);

        $email->subject("Something really dynamic fetched from ... database, maybe?");

        return $email;
    }

}

```
