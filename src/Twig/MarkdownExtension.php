<?php

declare(strict_types=1);

namespace Bolt\Docs\Twig;

use ParsedownExtra;
use Twig\Extension\AbstractExtension;
use Twig\TwigFilter;

/**
 * Twig Markdown extension.
 *
 * @author Carson Full <carsonfull@gmail.com>
 * @author Gawain Lynch <gawain.lynch@gmail.com>
 */
class MarkdownExtension extends AbstractExtension
{
    /** @var ParsedownExtra */
    protected $markdown;

    /**
     * Constructor.
     *
     * @param ParsedownExtra $markdown
     */
    public function __construct(ParsedownExtra $markdown)
    {
        $this->markdown = $markdown;
    }

    /**
     * {@inheritdoc}
     */
    public function getFilters(): array
    {
        return [
            new TwigFilter('markdown', [$this, 'markdown'], ['is_safe' => ['html']]),
        ];
    }

    /**
     * @param null|string $str
     *
     * @return array
     */
    public function markdown(?string $str): string
    {
        return $this->markdown->text($str);
    }
}
