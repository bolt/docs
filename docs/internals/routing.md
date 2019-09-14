---
title: Routing
level: advanced
---
Routing
=======

Every request to a page on a Bolt website is routed to a Silex controller,
regardless of whether the request is for a page in the back-end, front-end or
asynchronous.

A controller is just a PHP method that returns a response to a request, and are
grouped into collections in PHP classes. Bolt has three groups of controller
collection classes, located in the `Bolt\Controller` namespace.

| Class | Description |
| ----- | ----------- |
| `Bolt\Controller\Frontend`                | Routes serving end-user requests
| `Bolt\Controller\Backend\Authentication`  | Login, logout & password reset handling
| `Bolt\Controller\Backend\Database`        | Database checks & updates
| `Bolt\Controller\Backend\Extend`          | Extension management
| `Bolt\Controller\Backend\FileManager`     | File management & editing
| `Bolt\Controller\Backend\General`         | General administration routes such as the dashboard
| `Bolt\Controller\Backend\Log`             | System & change log management
| `Bolt\Controller\Backend\Records`         | Content record editing
| `Bolt\Controller\Backend\Upload`          | File upload handling
| `Bolt\Controller\Backend\Users`           | User managment
| `Bolt\Controller\Async\Embed`             | oEmbed request handline
| `Bolt\Controller\Async\FilesystemManager` | File CRUD requests
| `Bolt\Controller\Async\General`           | General administration routes
| `Bolt\Controller\Async\Records`           | Content record CRUD requests
| `Bolt\Controller\Async\Stack`             | The "Stack"
| `Bolt\Controller\Async\Widget`            | Extension Widget callback handling

You can modify some of the routing to suit your own needs in
`config/bolt/routing.yml`.
