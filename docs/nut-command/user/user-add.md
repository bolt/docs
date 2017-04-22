---
title: user:add
level: intermediate
---
user:add
========

Nut's `user:add` command adds a new Bolt user account.

## Usage

```bash
    php ./app/nut user:add <username> <displayname> <email> <password> <role>
```


## Arguments

| Argument | Description |
|----------|-------------|
| username    | Username (login name) for the new user
| displayname | Display name for the new user
| email       | Email address for the new user
| password    | Password for the new user
| role        | Role you wish to give them


## Example

```bash
]$ php ./app/nut user:add kenny "Kenny Koala" kenny@koala.com.au GumLe@ves editor
Successfully created user: kenny
```

