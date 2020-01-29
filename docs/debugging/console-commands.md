---
title: Console Commands
level: intermediate
---
Console Commands
============

Bolt's command line utility `console` has several commands that you may find very
helpful to query and debug certain parts to Bolt's internals. To run the utility,
type in `php bin/console` in Bolt's root directory.

  - [Event Listeners][debug-events]
    - Outputs configured event details such as name, listening function, and
      execution priority
  - [Routing Configuration][debug-router]
    - Displays the configured routes, or details of a named route
  - [Route Matcher][router-match]
    - Shows which routes match a given request, which don't, and for what reason
  - [Service Providers][debug-providers]
    - Displays all configured service providers, their registration order, and
      effective `boot()` order
  - [Twig Operations][debug-twig]
    - Outputs a list of twig functions, filters, globals and tests.

[debug-events]: ../nut-command/debug/debug-events
[debug-router]: ../nut-command/debug/debug-router
[debug-providers]: ../nut-command/debug/debug-service-providers
[debug-twig]: ../nut-command/debug/debug-twig
[router-match]: ../nut-command/debug/router-match
