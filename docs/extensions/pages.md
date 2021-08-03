Adding Pages in the backend
===========================

## Create a page in the Bolt's backend

You can add pages to Bolt's backend by creating a custom
Controller in the `src` folder of your project.

To configure it as a backend controller, two steps are necessary:
* The controller class needs to implement the `BackendZoneInterface`
 that Bolt provides
* The `routes.yaml` file needs to add Bolt backend prefix for
the controller's routes.

### Creating a backend page controller

```php
<?php

namespace App;

use Symfony\Component\Routing\Annotation\Route;
use Bolt\Controller\Backend\BackendZoneInterface;
use Symfony\Component\HttpFoundation\Response;

class UserContentController extends TwigAwareController implements BackendZoneInterface
{
    /**
     * @Route("/content-user/", name="app_content_user")
     */
    public function viewEdits(): Response
    {
        // content_user.html.twig is a custom file 
        // that needs to be located in the `templates`
        // folder in the root of your project.
        return $this->render('content_user.html.twig', [
            'title' => 'User content'
        ]);
    }
}
```


### Defining the controller route with the backend url prefix

Localte the `config/routes.yaml` file and add the following **after** 
`project`:

```yaml
app_panel:
    resource: '../src/UserContentController.php'
    prefix: '%bolt.backend_url%'
    type: annotation
```

<p class="note">Make sure to replace <code>UserContentController.php</code>
with the name of your controller class.</p>

### Using a Twig template to render the page

You can use any Twig template of your choosing to render the page.
In this example, the controller defined `content_user.html.twig` as
the template that will be used to generate the response. Make sure
to create a file with that name in the `templates` folder in the root of
your project.

For example, the `content_user.html.twig` file may contain the following:

```twig
{% extends '@bolt/_base/layout.html.twig' %}

{% block main %}
    <p>This is the content for a user. It is currently empty.</p>
{% endblock %}
```

#### Provided templates

Bolt provides two templates that you can extend when creating
custom backend pages:

| Template | Function | Link |
| --- | --- | --- |
| `@bolt/_base/layout.html.twig` | This is the standard template that any Bolt page uses. It contains the top bar, the sidebar and aside components. | [Layout link][layout-link]
| `@bolt/_base/layout_blank.html.twig` | This is the barebones version of the layout. Use it only if you do not want to show the default Bolt backend look and feel. | [Blank layout link][blank-layout-link]

All available templates that Bolt uses under the hood are available in Bolt's [repository][https://github.com/bolt/core/tree/master/templates].

## Add a page to Bolt's sidebar menu

Bolt allows the sidebar menu to be extended to add extra items and links.
To do so, create a class inside the `src` folder of your project that 
implements the `ExtensionBackendMenuInterface`.

The example below defines a new menu section for the User Content page shown above.

```php
<?php


namespace App;

use Bolt\Menu\ExtensionBackendMenuInterface;
use Knp\Menu\MenuItem;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;

class UserContentMenu implements ExtensionBackendMenuInterface
{
    /** @var UrlGeneratorInterface */
    private $urlGenerator;

    public function __construct(UrlGeneratorInterface $urlGenerator)
    {
        $this->urlGenerator = $urlGenerator;
    }

    public function addItems(MenuItem $menu): void
    {
        // This adds a new heading
        $menu->addChild('User Content Extension', [
            'extras' => [
                'name' => 'User Content Extension',
                'type' => 'separator',
            ]
        ]);

        // This adds the link
        $menu->addChild('Content list', [
           'uri' => $this->urlGenerator->generate('app_content_user'),
            'extras' => [
                'icon' => 'fa-user-circle'
            ]
        ]);
    }
}
```

[layout-link]: https://github.com/bolt/core/blob/master/templates/_base/layout.html.twig
[blank-layout-link]: https://github.com/bolt/core/blob/master/templates/_base/layout_blank.html.twig
[all-templates]: https://github.com/bolt/core/tree/master/templates
