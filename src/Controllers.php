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

        $ctr->get("/{version}/class-reference", array($this, 'classReference'))
            ->bind('classReference');

        $ctr->get("/{version}/cheatsheet", array($this, 'cheatsheet'))
            ->bind('cheatsheet');

        $ctr->get("/{version}/{slug}", array($this, 'page'))
            ->bind('page')
            ->assert('slug', '.+');

        $ctr->before(array($this, 'before'));

        return $ctr;

    }

    /**
     * Controller for homepage
     *
     * @param Application $app
     *
     * @return RedirectResponse
     */
    public function home(Application $app)
    {
        return $app->redirect($app['config']['start-page']);
    }

    /**
     * Controller for ajaxy fetching the menu tree
     *
     * @param Application $app
     * @param string      $version
     *
     * @return Response
     */
    public function tree(Application $app, $version)
    {
        $contentGetter = new ContentGetter($version);

        $menu = $contentGetter->getJsonMenu('menu_docs.yml');

        $response = new Response(json_encode($menu, JSON_PRETTY_PRINT), 201);
        $response->headers->set('Access-Control-Allow-Origin', '*');
        $response->headers->set('Content-Type', 'application/vnd.api+json');

        return $response;
    }

    /**
     * Controller for pages
     *
     * @param Application $app
     * @param string      $version
     * @param string      $slug
     *
     * @return string
     */
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
        ];

        $html = $app['twig']->render('index.twig', $twigVars);

        return $html;
    }

    /**
     * Controller for the class reference page
     *
     * @param Application $app
     * @param string      $version
     *
     * @return mixed
     */
    public function classReference(Application $app, $version)
    {
        $contentGetter = new ContentGetter($version);

        $cr = $contentGetter->getClassReference();

        $twigVars = [
            'title'   => 'Bolt Class Reference',
            'menu'    => $contentGetter->getMenu('menu_docs.yml'),
            'version' => $version,
            'classes' => $cr
        ];

        $html = $app['twig']->render('classreference.twig', $twigVars);

        return $html;
    }

    /**
     * Controller for the cheatsheet reference page
     *
     * @param Application $app
     * @param string $version
     *
     * @return mixed
     */
    public function cheatsheet(Application $app, $version)
    {
        $contentGetter = new ContentGetter($version);

        $cheatsheet = $contentGetter->getCheatsheet();

        $twigVars = [
            'title'      => 'Bolt Cheatsheet',
            'menu'       => $contentGetter->getMenu('menu_docs.yml'),
            'version'    => $version,
            'cheatsheet' => $cheatsheet,
            'slug'       => 'cheatsheet'
        ];

        $html = $app['twig']->render('cheatsheet.twig', $twigVars);

        return $html;
    }

    /**
     * Middleware function to do some tasks that should be done for all requests.
     *
     * @param Request     $request
     * @param Application $app
     */
    public function before(Request $request, Application $app)
    {
        // Fetch the available versions.
        $contentGetter = new ContentGetter();

        $versions = $contentGetter->getVersions();

        if ($app['config']['debug'] === true) {
            $versions[] = 'local';
        }

        $app['twig']->addGlobal('config', $app['config']);
        $app['twig']->addGlobal('versions', $versions);
    }

    /**
     * Controller for error pages.
     *
     * @param \Exception $e
     * @param Request    $request
     * @param integer    $code
     *
     * @return Response|void
     */
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
