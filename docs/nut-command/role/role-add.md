---
title: role:add
level: intermediate
---
role:add
========

Nut's `role:add` command adds a given role to a user's Bolt account.

## Usage

```bash
    php ./bin/console role:add <username> <role>
```


## Arguments

| Argument | Description |
|----------|-------------|
| username | The username (login name) you wish to add a role to
| role     | The role you wish to give them


## Example

### Giving user 'chief-editor' role


```bash
$ php ./bin/console role:add kenny chief-editor

User 'kenny' now has role 'chief-editor'.
```

