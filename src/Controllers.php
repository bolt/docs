<?php

namespace Cheatsheet;

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

        $ctr->before(array($this, 'before'));

        return $ctr;

    }

    public function home(Application $app)
    {
        $yaml = new Parser();
        $cheatsheet = $yaml->parse(file_get_contents(__DIR__ . '/../app/cheatsheet.yml'));

        return $app['twig']->render('index.twig', ['cheatsheet' => $cheatsheet]);
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
