A detailed example
==================

In this section we'll show you a somewhat more elaborate example of how you can
create a menu, with submenus. First, start by adding a small menu to your
`config/bolt/menu.yml`-file:

```yaml
test:
  - label: Bolt
    link: https://bolt.cm
  - label: Example org
    link: http://example.org
  - label: Symfony
    link: https://symfony.com
```

As you can probably guess, this menu does nothing but provide links to three
external websites. To get started, edit the template where you want this menu.
Usually, menus are used in 'headers', 'footers' or 'aside' includes, but you
can use them anywhere. For now, just insert this code, somewhere:

```twig
{{ menu('test', 'partials/_menu_test.twig') }}
```

This inserts the menu, using the template `partials/_menu_test.twig` template. The file
probably isn't present yet, so create it in your own `theme/`-folder.

```twig
<ul>
{% for item in menu %}
    <li>
        <a href="{{ item.link }}">{{item.label}}</a>
    </li>
{% endfor %}
</ul>
```

Refresh a page that uses the template that you've added the `{{ menu() }}`-tag
to in your browser, and you should see a very simple menu, with the following
HTML-markup:

```twig
<ul>
    <li>
        <a href="https://bolt.cm">Bolt</a>
    </li>
    <li>
        <a href="http://example.org">Example org</a>
    </li>
    <li>
        <a href="https://symfony.com">Silex</a>
    </li>
</ul>
```

As you can see, the `{% for %}`-loop iterated over all of the items in the
`menu`-array, and wrote out the HTML that you specified. Let's change our menu,
so it has a submenu, listing some content on our site. In this example, we'll
assume that you have a `pages` ContentType, and that records `1`, `2` and `3`
exist. If they don't, just replace them with some contenttype/id pairs that you
do have. Edit the `config/bolt/menu.yml`-file:

```yaml
test:
  - label: Bolt
    link: https://bolt.cm
  - label: All pages
    path: pages/
    submenu:
      - path: page/1
      - path: page/2
      - label: last page
        path: page/3
        class: my_class
  - label: Symfony
    link: https://symfony.com
```

Now, the menu template needs to be extended, so that the submenu is output as
well. We'll do this by adding another `{% for %}`-loop. We'll wrap this loop in
an `{% if %}`-tag to prevent Bolt from outputting empty lists in the HTML. For
example:

```twig
<ul>
{% for item in menu %}
    <li class="{{ item.class }}">
        <a href="{{ item.link }}">{{item.label}}</a>
        {% if item.submenu is defined %}
            <ul>
            {% for item in item.submenu %}
                <li class="{{ item.class }}">
                    <a href="{{ item.link }}">{{item.label}}</a>
                </li>
            {% endfor %}
            </ul>
        {% endif %}
    </li>
{% endfor %}
</ul>
```

The output in HTML might look like this now:

```twig
<ul>
    <li class="">
        <a href="https://bolt.cm">Bolt</a>
    </li>
    <li class="">
        <a href="/pages">All pages</a>
            <ul>
                <li class="">
                    <a href="/page/sic-consequentibus-vestris">Sic consequentibus vestris</a>
                </li>
                <li class="">
                    <a href="/page/sublatis-prima-tolluntur">Sublatis prima tolluntur</a>
                </li>
                <li class="my_class">
                    <a href="/page/tria-genera-bonorum">last page</a>
                </li>
            </ul>
    </li>
    <li class="">
        <a href="https://symfony.com">Symfony</a>
    </li>
</ul>
```

