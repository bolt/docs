---
title: Events
level: advanced
---
Extension Building: Events
==========================

Bolt uses Symfony run-time events at various points in the application life
cycle to allow other part of code to interact.

The following events are dispatched and can be listened for, or subscribed to:

  * `\Bolt\Events\AccessControlEvents::LOGIN_SUCCESS`
  * `\Bolt\Events\AccessControlEvents::LOGIN_FAILURE`
  * `\Bolt\Events\AccessControlEvents::RESET_REQUEST`
  * `\Bolt\Events\AccessControlEvents::RESET_SUCCESS`
  * `\Bolt\Events\AccessControlEvents::RESET_FAILURE`
  * `\Bolt\Events\ControllerEvents::MOUNT`
  * `\Bolt\Events\CronEvents::CRON_HOURLY`
  * `\Bolt\Events\CronEvents::CRON_DAILY`
  * `\Bolt\Events\CronEvents::CRON_WEEKLY`
  * `\Bolt\Events\CronEvents::CRON_MONTHLY`
  * `\Bolt\Events\CronEvents::CRON_YEARLY`
  * `\Bolt\Events\StorageEvents::PRE_SAVE`
  * `\Bolt\Events\StorageEvents::POST_SAVE`
  * `\Bolt\Events\StorageEvents::PRE_DELETE`
  * `\Bolt\Events\StorageEvents::POST_DELETE`
  * `\Bolt\Events\StorageEvents::PRE_HYDRATE`
  * `\Bolt\Events\StorageEvents::POST_HYDRATE`


Subscribing to Events
------------------------

Often you might want to build an extension that has the simple task for
subscribing to a set of events and responding as you see fit.

To make this easy, by extending `SimpleExtension` your extension will implement
the `EventDispatcherInterface` and will be able to subscribe to events of your
choosing.

Below is an example of an extension that listens for `AccessControlEvents` for
login success & failure events dispatches.

```php
namespace Bolt\Extension\DropBear\KoalaCatcher;

use Bolt\Events\AccessControlEvent;
use Bolt\Events\AccessControlEvents;
use Bolt\Extension\SimpleExtension;
use Symfony\Component\EventDispatcher\EventDispatcherInterface;

/**
 * An extension for catching koalas.
 *
 * @author Kenny Koala <kenny@dropbear.com.au>
 */
class KoalaCatcherExtension extends SimpleExtension
{
    /**
     * {@inheritdoc}
     */
    public static function getSubscribedEvents()
    {
        $parentEvents = parent::getSubscribedEvents();
        $localEvents = [
            AccessControlEvents::LOGIN_SUCCESS => [
                ['onLoginSuccess', 0],
            ],
            AccessControlEvents::LOGIN_FAILURE => [
                ['onLoginFailure', 0],
            ],
        ];

        return $parentEvents + $localEvents;
    }

    /**
     * AccessControlEvents::LOGIN_SUCCESS event callback.
     *
     * @param AccessControlEvent $event
     */
    public function onLoginSuccess(AccessControlEvent $event)
    {
        // Do something with the event.
    }

    /**
     * AccessControlEvents::LOGIN_FAILURE event callback.
     *
     * @param AccessControlEvent $event
     */
    public function onLoginFailure(AccessControlEvent $event)
    {
        // Do something with the event.
    }
}
```
When a login event is triggered, one of the two public functions will be called
and passed in an event object.


Listening for Events
------------------------

Extensions that extend `SimpleExtension` can implement a function called
`subscribe()` that allows the extension to tell Bolt what events it is
listening out for, and when they occur what function should be called.

This is most applicable for when you want to use distinct classes to act on events.

Below is an example of an extension that listens into `AccessControlEvents` for
login success & failure event dispatches.

```php
namespace Bolt\Extension\DropBear\KoalaCatcher;

use Bolt\Events\AccessControlEvent;
use Bolt\Events\AccessControlEvents;
use Bolt\Extension\SimpleExtension;
use Symfony\Component\EventDispatcher\EventDispatcherInterface;

/**
 * An extension for catching koalas.
 *
 * @author Kenny Koala <kenny@dropbear.com.au>
 */
class KoalaCatcherExtension extends SimpleExtension
{
    /**
     * {@inheritdoc}
     */
    protected function subscribe(EventDispatcherInterface $dispatcher)
    {
        $config = $this->getConfig();
        $koalaListener = new KoalaListener($config);
        $dispatcher->addListener(AccessControlEvents::LOGIN_SUCCESS, [$koalaListener, 'onLoginSuccess']);
        $dispatcher->addListener(AccessControlEvents::LOGIN_FAILURE, [$koalaListener, 'onLoginFailure']);
    }
}
```
