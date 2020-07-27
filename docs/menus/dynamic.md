
Dynamic menus
=============

<p class="note"><strong>Note: </strong> This feature is not yet implemented. If
this is something you'd value, please <a href="https://bolt.kampsite.co/suggestions/077fe10f-6e59-4d10-b66e-d4733c86565f">
upvote it here</a> on our <a href="https://bolt.kampsite.co/">Ideas website</a>.</p>
You can use other `menu.yaml` parameters to make a more dynamic menu. In this
example we will use taxonomies combined with the menu to create taxonomy-based
submenus. Let's say you want to have a few static pages to be listed as
submenus under "Pages" in your menu.

Start with creating a new taxonomy in `taxonomy.yaml` to control what pages are
to be listed under "Pages":

```yaml
menu:
    name: Menu
    singular_name: Menu item
    behaves_like: categories
    multiple: false
    options: [ about, pages, more ]
```

Then, in your `menu.yaml` change your "Pages" to the following.

```yaml
- label: Pages
      path: pages
      list:
          contenttype: pages
          where:
              menu: pages
              limit: 5
```

Now all that's left is to modify your submenu template (`_sub_menu.twig`) so that it adds the pages with the "pages" taxonomy.

```twig
{% macro display_menu_item(item, loop, extraclass, withsubmenus) %}
    {% from _self import display_menu_item %}
    {% apply spaceless %}
    <li class="index-{{ loop.index -}}
        {{ item.path|default('') == '/' ? ' menu-text' -}}
        {{ loop.first ? ' first' -}}
        {{ loop.last ? ' last' -}}
        {{ (item.submenu|default(false) and withsubmenus) ? ' is-dropdown-submenu-parent' -}}
        {{ item|current ? ' active' }}">

        <a href="{{ item.link }}" title='{{ item.title|default('')|escape }}' class='{{ item.class|default('') }}'>
            {{- item.label|default('-') -}}
        </a>

        {% set list = [] %}

        {% if item.submenu is defined and withsubmenus %}
            <ul class="menu submenu vertical" data-submenu>
                {% for submenu in item.submenu %}
                    {{ display_menu_item(submenu, loop) }}
                {% endfor %}
                {% if item.list|default(false) %}
                    {% setcontent listedcontent = item.list.contenttype where item.list.where %}
                    {% for listitem in listedcontent %}
                        {% set list = list|merge([{title: listitem.title, link: listitem.link, label: listitem.title}]) %}
                    {% endfor %}
                    <ul class="menu submenu vertical" data-submenu>
                        {% for submenu in list %}
                            {{ display_menu_item(submenu, loop) }}
                        {% endfor %}
                    </ul>
                {% endif %}
            </ul>
        {% elseif item.list|default(false) %}
            {% setcontent listedcontent = item.list.contenttype where item.list.where %}
            {% for listitem in listedcontent %}
                {% set list = list|merge([{title: listitem.title, link: listitem.link, label: listitem.title}]) %}
            {% endfor %}
            {% if list is not empty %}
            <ul class="menu submenu vertical" data-submenu>
                {% for submenu in list %}
                    {{ display_menu_item(submenu, loop) }}
                {% endfor %}
            </ul>
            {% endif %}
        {% endif %}

    </li>
    {% endapply %}
{% endmacro %}
```
