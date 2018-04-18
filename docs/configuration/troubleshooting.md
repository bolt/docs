---
title: Troubleshooting configuration
---
Troubleshooting configuration
=============================

Cache folder outside of the app folder
--------------------------------------

Normally the `cache` folder is inside of the `app` folder and the site
structure will look like this:

```
.
└── example.org/
    ├── app/
    │   ├── cache/
    │   ├── config/
    │   └── database/
    ├── extensions/
    ├── public/
    └── vendor/
```

In some cases you want the cache folder to be outside of that structure, for
example if you have a deploy process that has a shared folder. In that case you
want to use an absolute path for the cache folder.


```
.
├── current -> releases/2
├── releases/
│   ├── 1/
│   │   ├── app/
│   │   ├── extensions/
│   │   ├── public/
│   │   └── vendor/
│   └── 2/
│       ├── app/
│       ├── extensions/
│       ├── public/
│       └── vendor/
└── shared/
    ├── cache/
    └── files/
```

The Bolt composer update or installation will attempt to update the paths in
`.bolt.yml`. If the cache path is absolute it will add an `app` path that will
look like `app: %site%/../../shared/cache` or similar. You have to manually set
the `app` path in the `.bolt.yml` configuration file to `app: %site%/app` for
Bolt to work.

```
paths:
    cache: /shared/cache
    files: /shared/files
    app: %site%/app
```
