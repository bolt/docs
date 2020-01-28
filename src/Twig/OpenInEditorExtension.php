<?php

declare(strict_types=1);

namespace Bolt\Docs\Twig;

use Bolt\Docs\Page;
use http\Env;
use ParsedownExtra;
use Twig\Environment;
use Twig\Extension\AbstractExtension;
use Twig\TwigFilter;
use Twig\TwigFunction;

class OpenInEditorExtension extends AbstractExtension
{
    /** @var string */
    private $editor;

    /**
     * Constructor.
     */
    public function __construct(string $editor = '')
    {
        $this->editor = $editor;
    }

    /**
     * {@inheritdoc}
     */
    public function getFunctions(): array
    {
        return [
            new TwigFunction('openineditor', [$this, 'open'], [
                'is_safe' => ['html'],
            ]),
        ];
    }

    public function open(Page $page): ?string
    {
        $links = [
            'textmate' => 'txmt://open?url=file://%s',
            'macvim' => 'mvim://open?url=file://%s',
            'emacs' => 'emacs://open?url=file://%s',
            'sublime' => 'subl://open?url=file://%s',
            'phpstorm' => 'phpstorm://open?file=%s',
            'atom' => 'atom://core/open/file?filename=%s',
            'vscode' => 'vscode://file/%s',
        ];

        $path = dirname(dirname(dirname(__FILE__))) . '/var/versions/' . $page->getVersion() . '/docs/' . $page->getPath();

        if (! array_key_exists($this->editor, $links)) {
            return null;
        }

        $link = sprintf($links[$this->editor], $path);

        return $link;
    }
}
