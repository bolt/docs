Bolt Widgets
============

Widgets allow you to provide an interface to the user
for your extensions. For example, a widget can add a
card element to the Bolt Dashboard, or an extra button
to the frontend of the site.

To create a widget, simply create a new class in your extension
that extends Bolt's `BaseWidget` class like so:

```php
<?php

declare(strict_types=1);

namespace App;

use Bolt\Widget\BaseWidget;
use Bolt\Widget\Injector\RequestZone;
use Bolt\Widget\Injector\AdditionalTarget;
use Bolt\Widget\TwigAwareInterface;

class TimeWidget extends BaseWidget implements TwigAwareInterface
{
    protected $name = 'Edit This Page Widget';
    protected $target = ADDITIONALTARGET::WIDGET_BACK_DASHBOARD_ASIDE_TOP;
    protected $priority = 300;
    protected $template = '@time-extension/time.html.twig';
    protected $zone = RequestZone::FRONTEND;
    protected $cacheDuration = 0;

    public function run(array $params = []): ?string
    {
        $time = new \DateTime();
        return parent::run(['time' => $time]);
    }
}
```

The `TimeWidget` class above will run on the frontend of the site, all that is left
for to do now is create a twig template to render the current time. Simply
create a `templates` folder at the root level of your extension, with the `time.html.twig`
file inside:

```twig
<p>Current time: {{ time|date }} </p>
```

## Configuring the widget

The `TimeWidget` class above used several variables to configure how and where a widget
is displayed, using the following options:

| Option      | Description |
|-------------|-------------|
| `name`      | The name of the widget can be used to display the widget in your twig templates. See the [Using widgets][using-widgets] page. |
| `slug`      | The slugified name of the widget, which is used in Twig functions. If not set, Bolt will automatically set it from the widget name. |
| `zone`      | Specifies which part of the Bolt site the widget is relative to, e.g. backend, frontend or everywhere. Options are defined in Bolt's `RequestZone` class. |
| `target`    | Specifies the location on the page where the widget should be displayed. The options are defined in Bolt's `Target` class, with extra targets available for template designers in Bolt's `AdditionalTarget` class. |
| `template`  | The Twig template used to render the html to display the widget. Put the twig file inside `templates/` of your root and use the same Twig namespace as the namespace of your extension, e.g. `@time-extension`. |
| `priority`  | The priority of the widget relative to other widgets. Higher priority widgets are rendered first. |
| `cacheDuration` | The cache time can be an integer (seconds), or a [DateInterval][php-date-interval].

[using-widgets]: ../templating/widgets
[php-date-interval]: https://www.php.net/manual/en/class.dateinterval.php