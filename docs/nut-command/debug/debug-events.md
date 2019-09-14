---
title: Event Listeners
level: intermediate
---
Event Listeners
===============

Nut's `debug:events` command outputs configured event details such as name,
listening function, and execution priority.

A note on priority numbers. The event dispatcher calls listening functions by
name, in order of priority defined by the listener/subscriber.

<p class="note"><strong>Note:</strong> The default priority of listeners and
subscribers is `0`.</p>

<p class="tip"><strong>Tip:</strong> The higher the number, the earlier the
function will be called. So a callback function with the priority of `1` will
be executed <strong>before</strong> `-1`.</p>


## Use cases

Debugging event listeners is usually for the following reasons:
  * Calculate your event listener's priority, to execute before, or after,
    another listener
  * Finding listeners that may be unexpectedly halting propagation of events,
    meaning that remaining listeners to that event are not being called,
    commonly due to `Event::stopPropagation()` having been called by a prior
    listener

## Usage

```bash
    php .bin/console debug:events [options] [--] [<event>]
```

Running `debug:events`, without providing an event name, will output details on
all events.


## Arguments

| Option | Description |
|--------|-------------|
| event  | An event name


## Options

| Option | Description |
|--------|-------------|
| --sort-listener | Sort events in order of callable name
| --names         | Summary list of the event names listened to


## Example

### Query Single Event

To check what is listening to the `kernel.response` event:

```bash
$ php ./bin/console debug:events kernel.response

Registered Listeners for "kernel.response" Event
================================================

+-------+----------------------------------------------------------------------------------+----------+
| Order | Callable                                                                         | Priority |
+-------+----------------------------------------------------------------------------------+----------+
|    #1 | Bolt\EventListener\FlashLoggerListener::onEvent()                                |     1000 |
|    #2 | Silex\EventListener\MiddlewareListener::onKernelResponse()                       |      128 |
|    #3 | Symfony\Component\HttpKernel\EventListener\ResponseListener::onKernelResponse()  |        0 |
|    #4 | Silex\Application {closure}                                                      |        0 |
|    #5 | Silex\EventListener\LogListener::onKernelResponse()                              |        0 |
|    #6 | Symfony\Component\HttpKernel\EventListener\SurrogateListener::onKernelResponse() |        0 |
|    #7 | Bolt\EventListener\GeneralListener::onResponse()                                 |        0 |
|    #8 | Bolt\EventListener\SnippetListener::onResponse()                                 |        0 |
|    #9 | Bolt\EventListener\RedirectListener::onResponse()                                |        0 |
|   #10 | Symfony\Component\HttpKernel\EventListener\ProfilerListener::onKernelResponse()  |     -100 |
|   #11 | Bolt\Session\SessionListener::onResponse()                                       |     -128 |
|   #12 | Bolt\EventListener\FlashLoggerListener::onEvent()                                |     1000 |
+-------+----------------------------------------------------------------------------------+----------+
```

### Sort by Callable

To see the `kernel.response` events, sorted by the callable:

```bash
$ php ./bin/console debug:events kernel.response --sort-listener

Registered Listeners for "kernel.response" Event
================================================

+-------+----------------------------------------------------------------------------------+----------+
| Order | Callable                                                                         | Priority |
+-------+----------------------------------------------------------------------------------+----------+
|    #1 | Bolt\EventListener\FlashLoggerListener::onEvent()                                |     1000 |
|   #12 | Bolt\EventListener\FlashLoggerListener::onEvent()                                |     1000 |
|    #7 | Bolt\EventListener\GeneralListener::onResponse()                                 |        0 |
|    #9 | Bolt\EventListener\RedirectListener::onResponse()                                |        0 |
|    #8 | Bolt\EventListener\SnippetListener::onResponse()                                 |        0 |
|   #11 | Bolt\Session\SessionListener::onResponse()                                       |     -128 |
|    #4 | Silex\Application {closure}                                                      |        0 |
|    #5 | Silex\EventListener\LogListener::onKernelResponse()                              |        0 |
|    #2 | Silex\EventListener\MiddlewareListener::onKernelResponse()                       |      128 |
|   #10 | Symfony\Component\HttpKernel\EventListener\ProfilerListener::onKernelResponse()  |     -100 |
|    #3 | Symfony\Component\HttpKernel\EventListener\ResponseListener::onKernelResponse()  |        0 |
|    #6 | Symfony\Component\HttpKernel\EventListener\SurrogateListener::onKernelResponse() |        0 |
+-------+----------------------------------------------------------------------------------+----------+
```
