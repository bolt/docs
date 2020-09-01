---
title: user:add
level: intermediate
---
bolt:add-user
========

Console's `bolt:add-user` command adds a new Bolt user account.

## Usage

```bash
    php ./bin/console bolt:add-user <username> <password> <email> <display-name>
```

or

```bash
    php ./bin/console bolt:add-user
```

to use the interactive interface.

## Arguments

| Argument | Description |
|----------|-------------|
| username    | Username (login name) for the new user
| display-name | Display name for the new user
| email       | Email address for the new user
| password    | Password for the new user


## Example

```bash
]$ php ./bin/console bolt:add-user kenny GumLe@ves kenny@example.org Kenny
 [OK] User was successfully created: kenny (kenny@example.org)
```

