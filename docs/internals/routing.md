---
title: Routing
level: advanced
---
Routing
=======

Every request to a page on a Bolt website is routed to a Silex controller,
regardless of whether the request is for a page in the 'backend', 'frontend' or
'asynchronous'.

There are four files that contain the controller collections, located in
`src/Controllers/`: `Backend.php`, `Frontend.php`, `Async.php` and
`Routing.php`.

As such, they are all in the `\Bolt\Controllers` namespace. They are 'set up'
in `src/Application.php`.

* `Backend` routes are all pretty straightforward.
* `Async.php` routes are used for 'ajaxy' requests, like the
'latest activity' widget on the dashboard.
* `Routing` is the actual Controller that parses the routes found in `routing.yml`
* `Frontend` contains the methods for all standard routes as defined in `routes.yml`.

You can modify the `routing.yml` to suit your own needs. Examples are included.
