---
title: Event Dispatcher
---

Event dispatcher (Event Listeners and Subscribers)
==================================================


During the execution of a Symfony/Bolt application, 
lots of event notifications are triggered. Your project can create and listen to 
these notifications and respond to them by executing any piece of code.

## Listening to events

Symfony allows two distinct ways for executing code in response to an event: 
*Listeners* and *Subscribers*.

While similar in what they accomplish, there are a couple of differences that may
sometimes sway you to use a listener or a subscriber:

* *Subscribers* are easier to reuse because the knowledge of the events is kept 
in the class rather than in the service definition. 
This is the reason why Symfony uses subscribers internally;
* Listeners are more flexible because bundles can enable or disable each of them 
conditionally depending on some configuration value.
* Listeners require further configuration in the `services.yaml` file. Subscribers do not.

<p class="note">Due to the last difference (see above), the recommended way in Bolt
is to use subscribers, unless you have a good reason for preferring listeners.</p>

### Creating an event subscriber

Each subscriber has two required components:

* An event or events it subscribes to (i.e., in when does your custom code execute)
* A handler or handlers that contain the custom code in response to the triggered event.

The list of available events is available by running `php bin/console debug:event-dispatcher`

You can put subscribers in the `src` folder in the root of your Bolt project, like so:

```php
<?php

namespace App;

use Bolt\Event\ContentEvent;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;

class OnSaveSubscriber implements EventSubscriberInterface
{
    const PRIORITY = 0; // default priority

    /**
     * This is the handler
     */
    public function onPostSave(ContentEvent $event): void
    {
        // Each event passes an optional event class.
        // Bolt's POST_SAVE event passes a ContentEvent object.

        // Get the content from the event
        $content = $event->getContent();

        // Do something with it, e.g. print the ID.
        dump($content->getId());
    }

    /**
     * Returns an array of event names this subscriber wants to listen to.
     *
     * The array keys are event names and the value can be:
     *
     *  * The method name to call (priority defaults to 0)
     *  * An array composed of the method name to call and the priority
     *  * An array of arrays composed of the method names to call and respective
     *    priorities, or 0 if unset
     *
     * For instance:
     *
     *  * ['eventName' => 'methodName']
     *  * ['eventName' => ['methodName', $priority]]
     *  * ['eventName' => [['methodName1', $priority], ['methodName2']]]
     *
     * The code must not depend on runtime state as it will only be called at compile time.
     * All logic depending on runtime state must be put into the individual methods handling the events.
     *
     * @return array The event names to listen to
     */
    public static function getSubscribedEvents()
    {
        return [
            // This is the event
            ContentEvent::POST_SAVE => ['onPostSave', self::PRIORITY]
        ];
    }
}
```

## Creating a custom event

Assuming there is a class that handles custom work in your project,
called `CustomWorker`, you can use the `EventDispatcher` service to create an event.

First, we need a new `Event` object. For example, here is Bolt's own `ContentEvent`:

```php
<?php

declare(strict_types=1);

namespace Bolt\Event;

use Bolt\Entity\Content;
use Symfony\Contracts\EventDispatcher\Event;

class ContentEvent extends Event
{
    // All possible events
    public const PRE_SAVE = 'bolt.pre_save';
    public const POST_SAVE = 'bolt.post_save';
    public const ON_EDIT = 'bolt.pre_edit';
    public const ON_PREVIEW = 'bolt.pre_edit';
    public const ON_DUPLICATE = 'bolt.on_duplicate';
    public const PRE_STATUS_CHANGE = 'bolt.pre_status_change';
    public const POST_STATUS_CHANGE = 'bolt.post_status_change';
    public const PRE_DELETE = 'bolt.pre_delete';
    public const POST_DELETE = 'bolt.post_delete';

    /** @var Content */
    private $content;

    // The constructor for each ContentEvent
    public function __construct(Content $content)
    {
        $this->content = $content;
    }

    // Methods that are available in the event handlers (listeners and subscribers)
    public function getContent(): Content
    {
        return $this->content;
    }
}
```

Now, we can dispatch (also known as trigger) that event in the example `CustomWorker` class:

```php
<?php

namespace App;

use Bolt\Entity\Content;
use Bolt\Event\ContentEvent;
use Symfony\Component\EventDispatcher\EventDispatcherInterface;

class CustomWorker
{
    /** @var EventDispatcherInterface */
    private $dispatcher;

    public function __construct(EventDispatcherInterface $dispatcher)
    {
        $this->dispatcher = $dispatcher;
    }

    public function work(): void
    {
        // Do some work...
        $content = new Content();

        // Dispatch a new event, in this case a PRE_SAVE.
        $event = new ContentEvent($content);
        $this->dispatcher->dispatch($event, ContentEvent::PRE_SAVE);
    }
}
```


Read more about this topic in Symfony's official documentation: [Event Dispatcher][docs].

[docs]: https://symfony.com/doc/current/event_dispatcher.html
