Extension Building: Controllers & Routes
========================================

Depending you your reqirements, there are two ways to create and manage routes
for your Bolt extension:
  * Descrete route functions in the class loader for simple routes
  * Controller classes for more complex routing functionality

Route Callback Functions
------------------------

Bolt provides extensions with two functions to register descrete routes:
  * `registerFrontendRoutes()` 
  * `registerBackendRoutes()`

Both of these functions are passed a `Silex\ControllerCollection` object.

Routes registered via `registerBackendRoutes()` will automatically have the
admin route added, `/bolt/` by default. 

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
        $collection->match('/koala', 'callbackKoalaCatching');
    }

    /**
     * {@inheritdoc}
     */
    protected function registerBackendRoutes(ControllerCollection $collection)
    {
        // GET requests on the /bolt/koala route
        $collection->get('/koala', 'callbackKoalaAdmin');
        
        // POST requests on the /bolt/koala route 
        $collection->post('/koala', 'callbackKoalaAdmin');
    }

    /**
     * @param Application $app
     * @param Request     $request
     */
    public function callbackKoalaCatching(Application $app, Request $request)
    {
        return new Response('Drop bear sighted!', Response::HTTP_OK);
    }

    /**
     * @param Application $app
     * @param Request     $request
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

Controller Callback Classes
---------------------------

When extensions grow lager and have more complex routing requirements, it is 
without doubt better to implement a controller class.

Controller classes nee to implement the `Silex\ControllerProviderInterface`
interface contract.

Bolt provides two functions to register controller classes:
  * `registerFrontendControllers()` 
  * `registerBackendControllers()`
  
Controllers registered via `registerBackendControllers()` will automatically 
have the admin route added, `/bolt/` by default.

An example of an extension registering these controller classes would look like:

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


/**
 * The controller for Drop Bear routes. 
 *
 * @author Kenny Koala <kenny@dropbear.com.au>
 */
DropBearController Base implements ControllerProviderInterface
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

        $ctr->match('/koala/{type}', 'callbackKoalaCatching');

        return $ctr;
    }
    
    /**
     * @param Request $request
     * @param string  $type
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

