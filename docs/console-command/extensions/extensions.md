---
title: extensions
level: intermediate
---
extensions
==========

Console's `extensions:list` command lists all installed extensions.

## Usage

```bash
    php ./bin/console extensions:list
```


## Example

```bash
$ ./bin/console extensions:list

 Currently installed extensions:
 -------------------------------------------- -----------------------------------
  Class                                        Extension name
 -------------------------------------------- -----------------------------------
  AcmeCorp\ReferenceExtension\Extension        AcmeCorp ReferenceExtension
  BobdenOtter\ConfigurationNotices\Extension   Bolt Configuration Notices Widget
  BobdenOtter\WeatherWidget\Extension          Dashboard Weather Widget
  Bolt\NewsWidget\Extension                    Dashboard News Widget
 -------------------------------------------- -----------------------------------
```

