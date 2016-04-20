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

Nut
---

Bolt also supports password resets from the command line utility Nut. Use `user:reset-password` and
provide the username or e-mail address of the user. Bolt will immediately set a new random password and
print it to you. Unlike with the login page, no e-mail is sent and a shadow password is not used.
