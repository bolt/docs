---
title: Service Providers
level: intermediate
---
Service Providers
=================

Nut's `debug:service-providers` command displays all configured service
providers, and their registration order, and effective `boot()` order.


## Use cases

Debugging your service providers registration is usually for the following
reasons:
  * Finding out what service providers are registering
  * A higher ordered (later registering) provider is replacing a service
    unexpectedly
  * You're getting exceptions trying to `extend()` a service that hasn't been
    defined yet


## Usage

```bash
    php .bin/console debug:service-providers [options]
```

## Options

| Option | Description |
|--------|-------------|
| --sort-class | Sort by provider class names.


## Example

An edited-down example of the output:


```bash
$ php ./bin/console debug:service-providers
+---------------------------------------------------+-------+
| Provider Class Name                               | Order |
+---------------------------------------------------+-------+
| Bolt\Provider\ConfigServiceProvider               |     8 |
| Bolt\Provider\TranslationServiceProvider          |    12 |
| Silex\Provider\TranslationServiceProvider         |    13 |
| Bolt\Provider\TwigServiceProvider                 |    14 |
| Silex\Provider\TwigServiceProvider                |    15 |
| Bolt\Provider\SecurityServiceProvider             |    25 |
| Silex\Provider\SecurityServiceProvider            |    26 |
+---------------------------------------------------+-------+
```
