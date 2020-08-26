---
title: role:remove
level: intermediate
---
role:remove
===========

Nut's `role:remove` command removes a given role from a user's Bolt account.

## Usage

```bash
    php ./bin/console role:remove <username> <role>
```


## Arguments

| Argument | Description |
|----------|-------------|
| username | The username (login name) you wish to remove a role from
| role     | The role you wish to remove


## Example

### Removing a user's 'editor' role


```bash
$ php ./bin/console role:remove kenny editor

User 'kenny' no longer has role 'editor'.
```

