---
title: Controllers & Routes
level: advanced
---
Extension Building: Controllers & Routes
========================================

Depending on your requirements, there are two ways to create and manage routes
for your Bolt extension:

  * Discrete route functions in the class loader for simple routes
  * Controller classes for more complex routing functionality

Route Callback Functions
------------------------

Bolt provides extensions with two functions to register discrete routes:

  * `registerFrontendRoutes()`
  * `registerBackendRoutes()`

Both of these functions are passed a `Silex\ControllerCollection` object.

Routes registered via `registerBackendRoutes()` will automatically have the
admin route added, which is `/bolt/` by default.

An example of an extension using these descrete route functions:

```php
namespace Bolt\Extension\DropBear\KoalaCatcher;

use Bolt\Extension\SimpleExtension;
use Silex\Application;
use Silex\ControllerCollection;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

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
    protected function registerFrontendRoutes(ControllerCollection $collection)
    {
        // All requests to /koala
        $collection->match('/koala', [$this, 'callbackKoalaCatching']);
    }

    /**
     * {@inheritdoc}
     */
    protected function registerBackendRoutes(ControllerCollection $collection)
    {
        // GET requests on the /bolt/koala route
        $collection->get('/koala', [$this, 'callbackKoalaAdmin']);

        // POST requests on the /bolt/koala route
        $collection->post('/koala', [$this, 'callbackKoalaAdmin']);
    }

    /**
     * @param Application $app
     * @param Request     $request
     *
     * @return Response     
     */
    public function callbackKoalaCatching(Application $app, Request $request)
    {
        return new Response('Drop bear sighted!', Response::HTTP_OK);
    }

    /**
     * @param Application $app
     * @param Request     $request
     *
     * @return Response     
     */
    public function callbackKoalaAdmin(Application $app, Request $request)
    {
        if ($request->isMethod('POST')) {
            // Handle the POST data
            return new Response('Thanks, Kenny', Response::HTTP_OK);
        }

        return new Response('Welcome to your admin page, Kenny', Response::HTTP_OK);
    }
}
```

<p class="note"> <strong>Note:</strong>If you've added a menu entry in your
extension, it will be mounted on <tt>extend/</tt>, because it shows up under
the 'Extras' menu option. When adding an accompanying route for it,  make sure
to catch it correctly. For example, a menu with route 'koala', will match
<tt>/extend/koala</tt> in your controller. </p>

Controller Callback Classes
---------------------------

When extensions grow larger and have more complex routing requirements, it is
without doubt better to implement a controller class.

Controller classes need to implement the `Silex\ControllerProviderInterface`
interface contract.

Bolt provides two functions to register controller classes:

  * `registerFrontendControllers()`
  * `registerBackendControllers()`

Controllers registered via `registerBackendControllers()` will automatically
have the admin route added, which is `/bolt/` by default.

An example of an extension registering these controller classes would look
like:

```php
namespace Bolt\Extension\DropBear\KoalaCatcher;

use Bolt\Extension\SimpleExtension;

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
    protected function registerFrontendControllers()
    {
        return [
            '/dropbear' => new Controller\DropBearController(),
        ];
    }

    /**
     * {@inheritdoc}
     */
    protected function registerBackendControllers()
    {
        return [
            '/dropbear' => new Controller\DropBearController(),
        ];
    }
}
```

The controller class file `src/Controller/DropBearController.php` would
then look something like:

```php
namespace Bolt\Extension\DropBear\KoalaCatcher\Controller;

use Silex\Application;
use Silex\ControllerCollection;
use Silex\ControllerProviderInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

/**
 * The controller for Drop Bear routes.
 *
 * @author Kenny Koala <kenny@dropbear.com.au>
 */
class DropBearController implements ControllerProviderInterface
{
    /** @var Application */
    protected $app;

    /**
     * {@inheritdoc}
     */
    public function connect(Application $app)
    {
        $this->app = $app;

        /** @var ControllerCollection $ctr */
        $ctr = $app['controllers_factory'];

        $ctr->match('/koala/{type}', [$this, 'callbackKoalaCatching']);

        return $ctr;
    }

    /**
     * @param Request $request
     * @param string  $type
     *
     * @return Response
     */
    public function callbackKoalaCatching(Request $request, $type)
    {
        if ($type === 'dropbear') {
            return new Response('Drop bear sighted!', Response::HTTP_OK);
        }

        return new Response('Koala in a tree!', Response::HTTP_OK);
    }
}
```

The route will then then be accessed via `/dropbear/koala/{type}` for frontend
controllers or `/{admin_path}/dropbear/koala/{type}` for backend controllers.

Note that the `{admin_path}` value by default will be "_bolt_", unless you have
changed the `path:` value in your [branding configuration][branding], in which
case it will reflect that value.


[branding]: /howto/performance-tips#configure-the-backend-path-and-other-branding
