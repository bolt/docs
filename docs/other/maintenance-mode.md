---
title: Maintenance (offline) mode
---
Maintenance (offline) mode
==========================

Bolt comes with a built-in 'Maintenance Mode'. If this mode is active, regular
visitors to the site will see the website's configured maintenance page, or a default.

<p class="tip"><strong>Note:</strong> This page returns a HTTP 503 status code.
This means "Service Unavailable" and makes the maintenance page search engine friendly.</p>

Any users that are logged in, will be able to use the site as normal, while
other visitors will see the maintenance screen. You can enable the Maintenance
mode with these settings in the `config.yml` file:

```
maintenance_mode: true
maintenance: [ blocks/503-maintenance-mode, 'helpers/page_503.html.twig' ]
```

The first value turns the maintenance mode on or off. The second option sets
the template to use. This an be an (array of) template names or identifiers for 
records, which will be tried until a match is found. If you wish to change this
file, you should set it to another filename, and place that file in your own
theme- folder. Otherwise it might be overwritten during an update of Bolt.

<p class="tip"><strong>Note:</strong> If you're testing this feature, be aware
that you will <em>not</em> see the maintenance screen if you are logged in. Use
another browser to test it. </p>

