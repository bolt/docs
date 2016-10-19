<?php

namespace Bolt\Docs;

class Page implements \ArrayAccess
{
    /** @var Page|null */
    private $parent;
    /** @var string */
    private $version;
    /** @var string The file path relative to the version's "docs" folder. */
    private $path;
    /** @var string */
    private $name;

    /** @var string */
    private $source;
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
        $menu = [
            'label' => $this->getTitle(),
            'id'    => $this->getSlug(), // needed for saving state
            'url'   => $this->getSlug(),
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
    public function getSlug()
    {
        $parent = $this->parent ? rtrim($this->parent->getSlug(), '/') : '';

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
     * @param Page $parent
     */
    public function setParent(Page $parent)
    {
        $this->parent = $parent;
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
    public function getSource()
    {
        return $this->source;
    }

    /**
     * @param string $source
     */
    public function setSource($source)
    {
        $this->source = $source;
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
        $this->subPages[$page->getName()] = $page;
        $page->setParent($this);
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
}
