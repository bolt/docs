Creating menus
==============

Bolt has built-in functionality to create menus in your frontend templates.
Using this functionality, you can define one or more menus in the file
`app/config/menu.yml`, which can then be inserted in your templates using the
`{{ menu() }}` tag.

To change one or more of the menus, edit the file `app/config/menu.yml`. You can
add more separate menus, if you wish, and each menu can have one level of items
below it. See the default `menu.yml` for an example of the supported options:


<pre class="brush: plain">
main:
  - label: Home
    title: This is the first menu item. Fo shizzle!
    path: homepage
    class: first
  - path: entry/1
    label: Second item
    submenu:
      - label: Sub 1
        path: entry/2
      - label: Sub 2
        class: menu-item-class
</pre>

In this case `main` is the name of the menu. The options are:

  - `label` - override the 'title' of the record with a defined label. If
    omitted, the 'title' of the record is used.
  - `title` - used as a 'title'-attribute in the rendered HTML. If omitted this
    can be substituted for the `subtitle`-field in a record.
  - `class` - used to define an HTML `class`-attribute
  - `path` - The 'path' to a record in Bolt, or a group of records. For example
    `path: page/about` will make this item link to a record of type 'page' with
    the slug 'about'. `path: page/1` will link to the 'page' with id '1'. `path:
    entries` will link to the `/entries` overview page.
  - `link` - define an external link to another site. For example `link:
    http://bolt.cm`. Do not use `link` together with `path`!
  - `submenu` - defines a submenu. In the submenu you can define other items,
    with the same options as before.



To insert a menu in your templates, use

<pre class="brush: html">
	{{ menu() }}
</pre>

If you have more than one menu, you should use its name to make sure you get the
intended one:

<pre class="brush: html">
	{{ menu('foo') }}
</pre>

By default, the menu is rendered using the template
`/app/theme_defaults/_sub_menu.twig`. You can 'override' the default by
copying this file to your own theme folder. Bolt will pick your own version, and
then it will not be overwritten in a future update. However, it is good practice
to explicitly state which template file should be used to render a menu. Like
this:

<pre class="brush: html">
    {{ menu('foo', '_menu_foo.twig') }}
</pre>

Doing this will render the menu `foo`, using the template `_menu_foo.twig`. The
filename can be anything, but it's good practice to prefix it with `_menu`, so
it's always easily recognizable later, or to other people working with your
HTML.

<p class="note"><strong>Note:</strong> You can define more than one menu in your
<code>menu.yml</code> file, but you should define <em>only one</em> menu in each
template file. So, if you have multiple menus that should be rendered with
different HTML, you should have as many <code>_menu_<em>menuname</em>.twig</code> 
files in your theme.</p>


A detailed example
------------------

In this section we'll show you a somewhat more elaborate example of how you can
create a menu, with submenus. First, start by adding a small menu to your
`app/config/menu.yml`-file:

<pre class="brush: plain">
test:
  - label: Bolt
    link: http://bolt.cm
  - label: Example org
    link: http://example.org
  - label: Silex
    link: http://silex.sensiolabs.org
</pre>

As you can probably guess, this menu does nothing but provide links to three
external websites. To get started, edit the template where you want this menu.
Usually, menus are used in 'headers', 'footers' or 'aside' includes, but you can
use them anywhere. For now, just insert this code, somewhere:

<pre class="brush: html">
    {{ menu('test', '_menu_test.twig') }}
</pre>

This inserts the menu, using the template `_menu_test.twig` template. The file
probably is'nt present yet, so create it in your own `theme/`-folder.

<pre class="brush: html">
&lt;ul>
{% for item in menu %}
    &lt;li>
        &lt;a href="{{ item.link }}">{{item.label}}&lt;/a>
    &lt;/li>
{% endfor %}
&lt;/ul>
</pre>

Refresh a page that uses the template that you've added the `{{ menu() }}`-tag
to in your browser, and you should see a very simple menu, with the following
HTML-markup:

<pre class="brush: html">
&lt;ul>
    &lt;li>
        &lt;a href="http://bolt.cm">Bolt&lt;/a>
    &lt;/li>
    &lt;li>
        &lt;a href="http://example.org">Example org&lt;/a>
    &lt;/li>
    &lt;li>
        &lt;a href="http://silex.sensiolabs.org">Silex&lt;/a>
    &lt;/li>
&lt;/ul>
</pre>

As you can see, the `{% for %}`-loop iterated over all of the items in the
`menu`-array, and wrote out the HTML that you specified. Let's change our menu,
so it has a submenu, listing some content on our site. In this example, we'll
assume that you have a `pages` content type, and that records `1`, `2` and `3`
exist. If they don't, just replace them with some contenttype/id pairs that you
do have. Edit the `app/config/menu.yml`-file:

<pre class="brush: plain">
test:
  - label: Bolt
    link: http://bolt.cm
  - label: All pages
    path: pages/
    submenu:
      - path: page/1
      - path: page/2
      - label: last page
        path: page/3
        class: my_class
  - label: Silex
    link: http://silex.sensiolabs.org
</pre>


Now, the menu template needs to be extended, so that the submenu is output as
well. We'll do this by adding another `{% for %}`-loop. We'll wrap this loop in
an `{% if %}`-tag to prevent Bolt from outputting empty lists in the HTML. For
example:

<pre class="brush: html">
&lt;ul>
{% for item in menu %}
    &lt;li class="{{ item.class }}>
        &lt;a href="{{ item.link }}">{{item.label}}&lt;/a>
        {% if item.submenu is defined %}
            &lt;ul>
            {% for item in item.submenu %}
                &lt;li class="{{ item.class }}">
                    &lt;a href="{{ item.link }}">{{item.label}}&lt;/a>
                &lt;/li>
            {% endfor %}
            &lt;/ul>
        {% endif %}
    &lt;/li>
{% endfor %}
&lt;/ul>
</pre>

The output in HTML might look like this now:

<pre class="brush: html">
&lt;ul>
    &lt;li class=">
        &lt;a href="http://bolt.cm">Bolt&lt;/a>
    &lt;/li>
    &lt;li class=">
        &lt;a href="/pages">All pages&lt;/a>
            &lt;ul>
                &lt;li class="">
                    &lt;a href="/page/sic-consequentibus-vestris">Sic consequentibus vestris&lt;/a>
                &lt;/li>
                &lt;li class="">
                    &lt;a href="/page/sublatis-prima-tolluntur">Sublatis prima tolluntur&lt;/a>
                &lt;/li>
                &lt;li class="my_class">
                    &lt;a href="/page/tria-genera-bonorum">last page&lt;/a>
                &lt;/li>
            &lt;/ul>
    &lt;/li>
    &lt;li class=">
        &lt;a href="http://silex.sensiolabs.org">Silex&lt;/a>
    &lt;/li>
&lt;/ul>
</pre>

That's basically all there's to it. Since the menus use standard Twig tags, we
can enhance the lists with extra features, to automatically give special classes
to the first or last item, or highlight the 'current' page.

Some of the more commonly used 'tricks' are:

  - `index-{{ loop.index }}` - Add the current index of the loop, like
    'index-1', 'index-2', etc.
  - `{% if loop.first %}first{% endif %}` - Output 'first', but only for the
    first item in the loop.
  - `{% if loop.last %}last{% endif %}` - Output 'last', but only for the last
    item in the loop.
  - `{% if item|current %}active{% endif %}` - Output 'current', but only if
    we're on the page that the item links to.
  - `{% if item.title is defined %}title='{{ item.title|escape }}'{% endif %}` -
    Add a 'title' attribute, but only if it's defined in our `.yml`-file, or if
    the contenttype has a `subtitle` field.
  - `{% if item.class is defined %}class='{{item.class}}'{% endif %}` - Add a
    'class' attribute, but only it the item has a `class` defined in the
    `.yml`-file.

See the default `/app/theme_defaults/_sub_menu.twig` file for an in-depth
example of all of the things you can do with menus. Remember that you should
always copy this file to your own theme folder, or create your own from scratch.
If you modify the default file, it will most likely get overwritten when you
update Bolt to a newer version.

Normally you will only need the basic properties of each of the menu items, but
sometimes you might need to do more with the items. For this reason, each `item`
has access to the entire record. You can use `{{ item.record }}` like you would
use any other record. For instance, `{{ item.record.taxonomy }}`, or `{{
print(item.record) }}`.
