---
title: Container Service References
level: advanced
---
Container Service References
============================

Below you'll find a reference for some of the key services and parameters that
are accessible via the Bolt application container, i.e. `$app`.

Remember to see the [Debugging section](../debugging) for details on
interrogating the state of the application container.


## $app['config']

The `config` service provides access to all the configuration settings from the
various `.yml` files in `app/config`.

For example, to get the value for `homepage_template` set in `config.yml`:

```php
    $app['config']->get('general/homepage_template');
```

Much more detailed information on this topic can be found in
[Accessing & Reading Configuration][configuration].

## $app['filesystem']

The `filesystem` service is an instance of the `Bolt\Filesystem\Manager` class,
and is used for managing access to Bolt's filesystem abstraction layer.

For more details on using this service, see the [Filesystem Layer](../extensions/filesystem)
section.


## $app['storage']

The `storage` service is an instance of `Bolt\Storage\EntityManager`, and is
responsible for interaction with the configured database.

Internally, database transaction handling is performed via the `db` service, an
instance of a Doctrine Database Abstraction Layer (DBAL) connection object.

Because of the DBAL, you don't need to worry about whether the site is set up
as MySQL, PostgreSQL or SQLite. Just make sure to use SQL/DQL that Doctrine
understands.

For more details on using this service, see the [Storage Layer](../extensions/storage)
section. For more information on how DBAL operates, see the Doctrine's
[Data Retrieval And Manipulation][dbal] page.


## $app['mailer']

This is an instance of Swiftmailer.

- [http://silex.sensiolabs.org/doc/providers/swiftmailer.html][swift1]
- [http://swiftmailer.org/][swift2]


## $app['logger.flash']

This service is an instance implementing `Bolt\Logger\FlashLoggerInterface`.

Use this to set Flash messages, i.e. messages that appear on the current or
next page view for the current user, for example:

```php
    $app['logger.flash']->success('Something went A-OK.');
    $app['logger.flash']->info('A neutral message.');
    $app['logger.flash']->error('Something went horribly wrong.');
```


## $app['logger.system']

Instance of `Monolog\Logger` and implements the [PSR-3][psr3] logging interface

Example:

```php
    $message = 'Login: ' . $request->request->get('username');
    $app['logger.system']->info($message, ['event' => 'authentication']);
```

Logger calls can be any of:
  * emergency()
  * alert()
  * critical()
  * error()
  * warning()
  * notice()
  * info()
  * debug()

The first parameter is a message string.

The second parameter is the context array, and must contain an `event` key with
a value of any of the following:
  * authentication
  * config
  * content
  * cron
  * deprecated
  * exception
  * extension
  * news
  * nut
  * security
  * storage
  * template
  * translation
  * twig
  * upload


## $app['users']

Instance of `Bolt\Users`. See `src/Users.php` for details.


## $app['session']

The `session` service is an instance of `Symfony\Component\HttpFoundation\Session\Session`,
and is used to store and retrieve user-specific data between requests.

For details on configuration of the session service, see our section on
[session configuration](../configuration/advanced/sessions).

Symfony's page on [Session Management][session] provides more details on the
operation of the service.


## $app['cache']

The `cache` service is an instance of `Bolt\Cache`, that implements
`Doctrine\Common\Cache\FilesystemCache`.

For more information on the operation of this service, see the Doctrine
[Caching][doctrine-cache] page.


## $app['extensions']

This is an instance of `Bolt\Extension\Manager` used to manage the registration
and initialisation of Bolt's extensions.

See the page on [Bolt extensions](../extensions/introduction) for details.


## $app['twig']

This is an instance of Twig. A lot more information on this can be found both in
the Bolt documentation, as well as on the Twig website:

  - [Twig's website](http://twig.sensiolabs.org/)
  - [Templates in Bolt](../templating/templates-routes)


[configuration]: ../configuration/reading
[dbal]: http://docs.doctrine-project.org/projects/doctrine-dbal/en/latest/reference/data-retrieval-and-manipulation.html
[doctrine-cache]: http://docs.doctrine-project.org/projects/doctrine-common/en/latest/reference/caching.html
[psr3]: https://github.com/php-fig/fig-standards/blob/master/accepted/PSR-3-logger-interface.md
[session]: https://symfony.com/doc/2.8/components/http_foundation/sessions.html
[swift-silex]: http://silex.sensiolabs.org/doc/providers/swiftmailer.html
[swift]: http://swiftmailer.org/
