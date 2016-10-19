<?php

namespace Bolt\Docs;

use Silex;
use Silex\Api\ControllerProviderInterface;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class Controllers implements ControllerProviderInterface
{
    /** @var Silex\Application */
    private $app;

    public function connect(Silex\Application $app)
    {
        $this->app = $app;

        /** @var $ctr \Silex\ControllerCollection */
        $ctr = $app['controllers_factory'];

        $ctr->get('/{version}/class-reference', [$this, 'classReference'])
            ->bind('classReference');

        $ctr->get('/{version}/cheatsheet', [$this, 'cheatsheet'])
            ->bind('cheatsheet');

        $ctr->get('/{version}/{slug}', [$this, 'page'])
            ->bind('page')
            ->assert('slug', '.*');

        $ctr->convert('version', function ($version) {
            if ($version === null) {
                return $version = $this->app['documentation']->getDefault();
            }
            return $this->app['documentation']->getVersion($version);
        });
        $ctr->assert('version', join('|', $this->app['documentation']->getVersions()));

        $app->error([$this, 'error']);

        return $ctr;
    }

    /**
     * Controller for pages
     *
     * @param Version $version
     * @param string $slug
     *
     * @return string
     */
    public function page(Version $version, $slug)
    {
        try {
            $page = $version->getPage($slug);
        } catch (\Exception $e) {
            throw new NotFoundHttpException('Page does not exist.', $e);
        }
        if ($redirect = $page['redirect']) {
            return new RedirectResponse("/$version/$redirect");
        }

        return $this->renderPage($version, $page, $slug);
    }

    /**
     * Controller for the class reference page
     *
     * @param Version $version
     *
     * @return mixed
     */
    public function classReference(Version $version)
    {
        $twigVars = [
            'title'   => 'Bolt Class Reference',
            'menu'    => $version->getMenu(),
            'version' => $version->getVersion(),
            'classes' => $version->getClassReference(),
        ];

        return $this->render('classreference.twig', $twigVars);
    }

    /**
     * Controller for the cheatsheet reference page
     *
     * @param Version $version
     *
     * @return mixed
     */
    public function cheatsheet(Version $version)
    {
        $twigVars = [
            'title'      => 'Bolt Cheatsheet',
            'menu'       => $version->getMenu(),
            'version'    => $version->getVersion(),
            'cheatsheet' => $version->getCheatSheet(),
            'slug'       => 'cheatsheet'
        ];

        return $this->render('cheatsheet.twig', $twigVars);
    }

    protected function renderPage(Version $version, Page $page, $slug = '')
    {
        $twigVars = [
            'page'            => $page,
            'title'           => $page->getTitle(),
            'slug'            => $slug,
            'menu'            => $version->getMenu(),
            'current'         => $page->getSlug(),
            'version'         => $version,
            'versions'        => array_keys($this->app['documentation']->getVersions()),
            'default_version' => $this->app['documentation']->getDefault(),
        ];

        return $this->render('index.twig', $twigVars);
    }

    protected function render($template, array $variables = [])
    {
        return $this->app['twig']->render($template, $variables);
    }

    /**
     * Controller for error pages.
     *
     * @param \Exception $e
     * @param Request    $request
     * @param integer    $code
     *
     * @return Response|null
     */
    public function error(\Exception $e, Request $request, $code)
    {
        $requestUri = explode('/', $request->getRequestUri());

        // Don't trap Symfony shizzle.
        if (in_array($requestUri[1], ['a', '_profiler']) || $this->app['debug']) {
            return null;
        }

        $docs = $this->app['documentation'];

        // If the request didn't start with something that looks like a version,
        // redirect to the current version, only with the version prefixed.
        if (!$docs->hasVersion($requestUri[1])) {
            return new RedirectResponse('/' . $docs->getDefault() . $request->getRequestUri());
        }

        // If we have a 404 error, show the 404 page.
        if ($code == 404) {
            $page = new Page();
            $page->setTitle('404 - Page not found');
            $page->setSource(<<<HTML
<h1>404 - Page not found</h1>
<p class="note">
    We changed a lot of the documentation structure in order to provide a better and more structured experience. 
    We might have missed to fix certain links. 
    If you think this could be one of this cases, 
    please report it to us via <a target="_blank" href="https://bolt.cm/community">Twitter, Slack, IRC, ...</a>
</p>
This page could not be found. Please click one of the menu items in the
sidebar, or use the search form to look for a specific keyword.
HTML
            );
            return $this->renderPage($docs->getDefault(), $page);
        }

        // Otherwise, we return, and let Silex handle it.
        return null;
    }

}
