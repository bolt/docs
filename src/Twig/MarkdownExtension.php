<?php

namespace Bolt\Docs\Twig;

use Parsedown;

class MarkdownExtension extends \Twig_Extension
{
    /** @var Parsedown */
    protected $markdown;

    /**
     * Constructor.
     *
     * @param Parsedown $markdown
     */
    public function __construct(Parsedown $markdown)
    {
        $this->markdown = $markdown;
    }

    /**
     * {@inheritdoc}
     */
    public function getFilters()
    {
        return [
            new \Twig_SimpleFilter('markdown', [$this, 'markdown'], ['is_safe' => ['html']]),
        ];
    }

    public function markdown($str)
    {
        return $this->markdown->text($str);
    }

    /**
     * {@inheritdoc}
     */
    public function getName()
    {
        return 'markdown';
    }
}
