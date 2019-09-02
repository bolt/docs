<?php

declare(strict_types=1);

namespace Bolt\Docs\Controller;

use Bolt\Docs\Documentation;
use Bolt\Docs\Page;
use Bolt\Docs\Version;
use Exception;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Symfony\Component\Yaml\Exception\ParseException;

/**
 * Site controller.
 *
 * @author Carson Full <carsonfull@gmail.com>
 * @author Gawain Lynch <gawain.lynch@gmail.com>
 */
class Site extends AbstractController
{
    /** @var Documentation */
    private $documentation;

    /** @var bool */
    private $debug;

    /**
     * Constructor.
     */
    public function __construct(Documentation $documentation, bool $debug)
    {
        $this->documentation = $documentation;
        $this->debug = $debug;
    }

    /**
     * Controller for pages.
     *
     * @throws Exception
     */
    public function getPage(Version $version, string $page): Response
    {
        try {
            $page = $version->getPage($page);
        } catch (\Throwable $e) {
            return $this->error(
                new NotFoundHttpException("Page '${page}' does not exist.", $e),
                $this->get('request_stack')->getCurrentRequest(),
                Response::HTTP_NOT_FOUND
            );
        }
        if ($page['redirect']) {
            return new RedirectResponse("/${version}/${page['redirect']}");
        }

        return $this->renderPage($version, $page);
    }

    /**
     * Controller for the class reference page.
     *
     * @throws ParseException
     */
    public function getClassReference(Version $version): Response
    {
        return $this->render('classreference.twig', [
            'title' => 'Bolt Class Reference',
            'menu' => $version->getMenu(),
            'version' => $version->getVersion(),
            'classes' => $version->getClassReference(),
        ]);
    }

    /**
     * Controller for the cheatsheet reference page.
     *
     * @throws ParseException
     */
    public function getCheatsheet(Version $version): Response
    {
        return $this->render('cheatsheet.twig', [
            'title' => 'Bolt Cheatsheet',
            'menu' => $version->getMenu(),
            'version' => $version->getVersion(),
            'cheatsheet' => $version->getCheatSheet(),
            'default_version' => $this->documentation->getDefault(),
        ]);
    }

    /**
     * Controller for sitemap (single).
     *
     * @throws \InvalidArgumentException
     */
    public function getSitemap(Version $version): Response
    {
        $xml = $this->renderView('sitemap.twig', [
            'root' => $version->getPage(''),
        ]);

        return new Response($xml, Response::HTTP_OK, ['Content-Type' => 'application/xml']);
    }

    /**
     * Controller for sitemap-sitemap (multiple).
     *
     * @throws \InvalidArgumentException
     */
    public function getSitemapList(): Response
    {
        $xml = $this->renderView('sitemap_list.twig', [
            'versions' => $this->documentation->getVersions(),
        ]);

        return new Response($xml, Response::HTTP_OK, ['Content-Type' => 'application/xml']);
    }

    /**
     * Controller for error pages.
     */
    protected function error(\Throwable $e, Request $request, $code): ?Response
    {
        $requestUri = \explode('/', $request->getRequestUri());

        // Don't trap Symfony shizzle.
        if ($this->debug || \in_array($requestUri[1], ['a', '_profiler'], true)) {
            throw $e;
        }

        // If the request didn't start with something that looks like a version,
        // redirect to the current version, only with the version prefixed.
        if (! $this->documentation->hasVersion($requestUri[1])) {
            return new RedirectResponse('/' . $this->documentation->getDefault() . $request->getRequestUri());
        }

        // If we have a 404 error, show the 404 page.
        if ($code !== Response::HTTP_NOT_FOUND) {
            throw $e;
        }

        $page = new Page();
        $page->setTitle('404 - Page not found');
        $page->setContent(
            <<<'HTML'
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

        return $this->renderPage($this->documentation->getDefault(), $page);
    }

    /**
     * @return Response
     */
    protected function renderPage(Version $version, Page $page): ?Response
    {
        return $this->render($page['template'] ?: 'index.twig', [
            'page' => $page,
            'title' => $page->getTitle(),
            'version' => $version,
            'versions' => $this->documentation->getVersions(),
            'default_version' => $this->documentation->getDefault(),
            'filelist' => $this->documentation->getFileStructure(),
        ]);
    }
}
