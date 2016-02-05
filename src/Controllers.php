<?php

namespace Bolt\Docs;

use Silex\Api\ControllerProviderInterface;
use Silex\Application;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Symfony\Component\Yaml\Parser;

class Controllers implements ControllerProviderInterface
{

    public function connect(Application $app)
    {
        /** @var $ctr \Silex\ControllerCollection */
        $ctr = $app['controllers_factory'];

        $ctr->get("/", array($this, 'home'))
            ->bind('home');

        $ctr->get("/tree/{version}.json", array($this, 'tree'))
            ->bind('tree');

        $ctr->get("/{version}/{slug}", array($this, 'page'))
            ->bind('page')
            ->assert('slug', '.+');

        $ctr->before(array($this, 'before'));

        return $ctr;

    }

    public function home(Application $app)
    {
        return $app->redirect($app['config']['start-page']);
    }

    public function tree(Application $app, $version)
    {
        $contentGetter = new ContentGetter($version);

        $menu = $contentGetter->getJsonMenu('menu_docs.yml');

        $response = new Response(json_encode($menu, JSON_PRETTY_PRINT), 201);
        $response->headers->set('Access-Control-Allow-Origin', '*');
        $response->headers->set('Content-Type', 'application/vnd.api+json');

        return $response;
    }

    public function page(Application $app, $version, $slug)
    {
        $contentGetter = new ContentGetter($version, $slug);

        $source = $contentGetter->source();

        if (empty($source)) {
            // todo: 404 handling
            return "404, dude";
        }

        $twigVars = [
            'title'   => $contentGetter->getTitle(),
            'source'  => $source,
            'menu'    => $contentGetter->getMenu('menu_docs.yml'),
            'submenu' => $contentGetter->getSubmenu(),
            'current' => $slug,
            'version' => $version,
            // 'prefix' => ($prefix == "/" ? "" : $prefix)
        ];

        $html = $app['twig']->render('index.twig', $twigVars);

        return $html;
    }



    /**
     * Middleware function to do some tasks that should be done for all requests.
     */
    public function before(Request $request, Application $app)
    {
        $app['twig']->addGlobal('config', $app['config']);
    }

    public function error(\Exception $e, Request $request, $code)
    {
        if ($app['debug']) {
            return;
        }

        // 404.html, or 40x.html, or 4xx.html, or error.html
        $templates = [
            'errors/'.$code.'.html.twig',
            'errors/'.substr($code, 0, 2).'x.html.twig',
            'errors/'.substr($code, 0, 1).'xx.html.twig',
            'errors/default.html.twig',
        ];

        return new Response($app['twig']->resolveTemplate($templates)->render(array('code' => $code)), $code);
    }

}
