Bolt's BaseExtension Class
==========================

If you're developing custom code in your project or in an extension, you're
free to do it however you'd like, if you're proficient with Symfony. Regardless
of that, it is often very convenient to make the 'entrypoint' of your Extension
or custom code `extend` the `Bolt\BaseExtension` class.

| Topic |    |
|-------|----|
| **Extension** | Bolt's BaseExtension class. Has some helpers and other functionality commonly used in an Extension scope |
| **Twig** | Bolt's TwigAwareController class has some helper functions for rendering records, listings and finding templates. |
| **Widget** | Bolt's BaseWidget class has helpers and functionality to add custom controls and elements to parts of the Bolt website, both frontend and backend. |
| **Command** | Extending Symfony Console's Command class allows you to create new commands through the `bin/console` script.
| **Listener** and **Subscriber** | You can use Symfony's [Listeners and Subscribers][symfony-events] to hook into [Bolt events][events] such as when saving content or editing a user. |

[events]: ./event
[symfony-events]: https://symfony.com/doc/current/event_dispatcher.html
