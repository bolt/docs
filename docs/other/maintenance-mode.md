---
title: Maintenance (offline) mode
---
Maintenance (offline) mode
==========================

Bolt comes with a built-in 'Maintenance Mode'. If this mode is active, regular
visitors to the site will see this page:

<a href="/files/maintenance.png" class="popup"><img src="/files/maintenance.png" width="450"></a>

<p class="tip"><strong>Note:</strong> This page returns a HTTP 503 status code.
This means "Service Unavailable" and makes the maintenance page search engine friendly.</p>

Any users that are logged in, will be able to use the site as normal, while
other visitors will see the maintenance screen. You can enable the Maintenance
mode with these settings in the `config.yml` file:

```
maintenance_mode: true
maintenance_template: maintenance_default.twig
```

The first value turns the maintenance mode on or off. The second option sets
the template to use. By default, the template `maintenance_default.twig` is
chosen, which can be found in `app/theme_defaults/`. If you wish to change this
file, you should set it to another filename, and place that file in your own
theme- folder. Otherwise it might be overwritten during an update of Bolt.

<p class="tip"><strong>Note:</strong> If you're testing this feature, be aware
that you will <em>not</em> see the maintenance screen if you are logged in. Use
another browser to test it. </p>

