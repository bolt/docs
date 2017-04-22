---
title: user:reset-password
level: intermediate
---
user:reset-password
===================

Nut's `user:reset-password` command resets a given user's Bolt account
password.

## Usage

```bash
    php ./app/nut user:reset-password [options] [--] <username>
```


## Arguments

| Argument | Description |
|----------|-------------|
| username | The username (login name or e-mail address) you wish to reset the password for


## Example

```bash
$ php ./app/nut user:reset-password kenny
Are you sure you want to reset the password for 'kenny'? yes
New password for kenny is R@nd0mStr1ng
```

