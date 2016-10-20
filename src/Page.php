<?php

namespace Bolt\Docs;

class Page implements \ArrayAccess
{
    /** @var Page|null */
    private $parent;

    /** @var Page|null */
    private $nextSibling;
    /** @var Page|null */
    private $previousSibling;
    /** @var Page|null */
    private $next = false;
    /** @var Page|null */
    private $previous = false;

    /** @var string */
    private $version;
    /** @var string The file path relative to the version's "docs" folder. */
    private $path;
    /** @var string */
    private $name;

    /** @var string */
    private $content;
    /** @var array */
    private $variables = [];
    /** @var Page[] */
    private $subPages = [];
    /** @var array */
    private $subMenu = [];

    /**
     * @param string $path
     *
     * @return Page
     */
    public function getPage($path)
    {
        if ($path === '') {
            return $this;
        }

        $parts = explode('/', $path, 2);
        if (!isset($this->subPages[$parts[0]])) {
            throw new \InvalidArgumentException('Page not found.');
        }
        $subPage = $this->subPages[$parts[0]];

        if (!isset($parts[1])) {
            return $subPage;
        }

        return $subPage->getPage($parts[1]);
    }

    /**
     * @return array
     */
    public function getMenu()
    {
        $url = $this->getUrl();
        $menu = [
            'label' => $this->getTitle(),
            'id'    => $url, // needed for saving state
            'url'   => $url,
            'children' => [],
        ];

        foreach ($this->subPages as $subPage) {
            $menu['children'][] = $subPage->getMenu();
        }

        return $menu;
    }

    /**
     * @return string
     */
    public function getUrl()
    {
        $parent = $this->parent ? rtrim($this->parent->getUrl(), '/') : '';

        return $parent . '/' . $this->name;
    }

    /**
     * @return Page|null
     */
    public function getParent()
    {
        return $this->parent;
    }

    /**
     * @return Page|null
     */
    public function getNext()
    {
        if ($this->next === false) {
            $this->next = $this->prepareNext();
        }

        return $this->next;
    }

    /**
     * @return Page|null
     */
    public function getPrevious()
    {
        if ($this->previous === false) {
            $this->previous = $this->preparePrevious();
        }

        return $this->previous;
    }

    /**
     * @return string
     */
    public function getVersion()
    {
        return $this->version;
    }

    /**
     * @param string $version
     */
    public function setVersion($version)
    {
        $this->version = $version;
    }

    /**
     * The file path relative to the version's "docs" folder.
     *
     * @return string
     */
    public function getPath()
    {
        return $this->path;
    }

    /**
     * @param string $path
     */
    public function setPath($path)
    {
        $this->path = $path;
    }

    /**
     * @return string
     */
    public function getName()
    {
        return $this->name;
    }

    /**
     * @param string $name
     */
    public function setName($name)
    {
        $this->name = $name;
    }

    /**
     * @return string
     */
    public function getContent()
    {
        return $this->content;
    }

    /**
     * @param string $content
     */
    public function setContent($content)
    {
        $this->content = $content;
    }

    /**
     * @return array
     */
    public function getVariables()
    {
        return $this->variables;
    }

    /**
     * @param array $variables
     */
    public function setVariables($variables)
    {
        $this->variables = $variables;
    }

    /**
     * @return Page[]
     */
    public function getSubPages()
    {
        return $this->subPages;
    }

    /**
     * @param Page $page
     */
    public function addSubPage(Page $page)
    {
        $previous = end($this->subPages);
        if ($previous !== false) {
            $previous->nextSibling = $page;
            $page->previousSibling = $previous;
        }

        $this->subPages[$page->getName()] = $page;
        $page->parent = $this;
    }

    /**
     * Get the title for a page.
     *
     * @return string
     */
    public function getTitle()
    {
        return $this['title'];
    }

    /**
     * @param string $title
     */
    public function setTitle($title)
    {
        $this->variables['title'] = $title;
    }

    /**
     * Get a 'submenu', parsed from the <h2> headings in a page.
     *
     * @return array
     */
    public function getSubMenu()
    {
        return $this->subMenu;
    }

    /**
     * @param array $subMenu
     */
    public function setSubMenu($subMenu)
    {
        $this->subMenu = $subMenu;
    }

    /**
     * {@inheritdoc}
     */
    public function offsetExists($offset)
    {
        return isset($this->variables[$offset]);
    }

    /**
     * {@inheritdoc}
     */
    public function offsetGet($offset)
    {
        return isset($this->variables[$offset]) ? $this->variables[$offset] : null;
    }

    /**
     * {@inheritdoc}
     */
    public function offsetSet($offset, $value)
    {
        $this->variables[$offset] = $value;
    }

    /**
     * {@inheritdoc}
     */
    public function offsetUnset($offset)
    {
        unset($this->variables[$offset]);
    }

    /**
     * @return Page|null
     */
    private function prepareNext()
    {
        if ($this->subPages) {
            return reset($this->subPages);
        }

        $target = $this;
        do {
            if ($target->nextSibling !== null) {
                return $target->nextSibling;
            }
        } while (($target = $target->parent) !== null);

        return null;
    }

    /**
     * @return Page|null
     */
    private function preparePrevious()
    {
        if ($this->parent !== null &&
            $this->parent->subPages &&
            $this === reset($this->parent->subPages) &&
            !$this->parent['redirect']
        ) {
            return $this->parent;
        }

        $target = $this;
        do {
            if ($target->previousSibling !== null) {
                $target = $target->previousSibling;
                break;
            }
        } while (($target = $target->parent) !== null);

        if ($target !== null) {
            while ($target->subPages) {
                $target = end($target->subPages);
            }
        }

        return $target;
    }
}
