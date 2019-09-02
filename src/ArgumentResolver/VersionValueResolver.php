<?php

declare(strict_types=1);

namespace Bolt\Docs\ArgumentResolver;

use Bolt\Docs\Documentation;
use Bolt\Docs\Version;
use Generator;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Controller\ArgumentValueResolverInterface;
use Symfony\Component\HttpKernel\ControllerMetadata\ArgumentMetadata;

/**
 * Version value resolver.
 *
 * @author Gawain Lynch <gawain.lynch@gmail.com>
 */
final class VersionValueResolver implements ArgumentValueResolverInterface
{
    /** @var Documentation */
    private $documentation;

    /**
     * Constructor.
     */
    public function __construct(Documentation $documentation)
    {
        $this->documentation = $documentation;
    }

    /**
     * {@inheritdoc}
     */
    public function supports(Request $request, ArgumentMetadata $argument): bool
    {
        return $argument->getType() === Version::class;
    }

    /**
     * {@inheritdoc}
     *
     * @throws \InvalidArgumentException
     */
    public function resolve(Request $request, ArgumentMetadata $argument): Generator
    {
        $version = $request->attributes->get('version');
        yield $version ? $this->documentation->getVersion($version) : $this->documentation->getDefault();
    }
}
