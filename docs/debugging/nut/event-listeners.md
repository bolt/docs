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
    php .app/nut debug:events [options]
```

## Options

| Option | Description |
|--------|-------------|
| --sort-listener | Sort events in order of callable name.


## Example

An edited-down example of the output:


```bash
$ php ./app/nut debug:events

+-----------------------+----------------------------------------------------------------------------------+----------+
| Event Name            | Listener                                                                         | Priority |
+-----------------------+----------------------------------------------------------------------------------+----------+
| kernel.request        | Silex\EventListener\LocaleListener::onKernelRequest()                            |       16 |
| kernel.finish_request | Silex\EventListener\LocaleListener::onKernelFinishRequest()                      |        0 |
| kernel.exception      | Silex\ExceptionHandler::onSilexError()                                           |     -255 |
| kernel.response       | Silex\EventListener\LogListener::onKernelResponse()                              |        0 |
| kernel.controller     | Silex\EventListener\ConverterListener::onKernelController()                      |        0 |
| kernel.view           | Silex\EventListener\StringToResponseListener::onKernelView()                     |      -10 |
| preSave               | Bolt\EventListener\StorageEventListener::onUserEntityPreSave()                   |      512 |
| postHydrate           | Bolt\EventListener\StorageEventListener::onPostHydrate()                         |        0 |
| controller.mount      | Bolt\Provider\ControllerServiceProvider::onMountBackend()                        |        0 |
| controller.mount      | Bolt\Provider\ControllerServiceProvider::onMountFrontend()                       |      -50 |
| kernel.terminate      | Symfony\Component\HttpKernel\EventListener\ProfilerListener::onKernelTerminate() |    -1024 |
+-----------------------+----------------------------------------------------------------------------------+----------+
```
