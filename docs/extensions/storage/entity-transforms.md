---
title: Hydration & Persistence
level: advanced
---
Entity Hydration & Persistence
==============================

Overview
--------

To provide flexibility within Bolt's different field types there needs to be two
sub-processes that happen when data is converted between data rows and PHP
objects and in reverse when committing PHP objects to the storage layer.

Throughout the documentation these processes will be referred to as
**Hydration** and **Persistence**. **Hydration** occurs when data from the
storage layer is converted into PHP objects, and in the reverse situation when a
PHP object is passed to the storage layer conversions will happen in the
opposite direction.

As a simple example take the following entity operation.

```
$content->setDatepublish = new \DateTime('2016-01-01 09:00');
$repo->save($content);
```

In this example the value of `datepublish` is set to a PHP object so before this
gets passed to the storage layer it needs to be converted to a database value.

Inversely when we do a fetch from the database, for example we can expect the
following:

```
$content = $repo->find(1);
$date = $content->getDatepublish(); // returns \DateTime instance
```
