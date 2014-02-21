Templates and routing
=====================

Whenever your browser gets a page on a Bolt website, it uses an URL like
`/entries` or `/page/lorem-ipsum`. Bolt knows how to handle URLs like this, and
displays the information the browser requested. Bolt does this by mapping the
URL to a so-called Route. This Route is the controller that (when called)
fetches the content from the database, selects the template to use, renders the
HTML page according to that template and the content and serves it to the
browser.

At the same time, if you create a new record, Bolt will know what the URL for
that content is. So when that URL is requested by a browser, it can map it back
to the correct content.

For example, if you have a 'Pages' contenttype, with 'Page' as a singular_name,
your site will automatically have pages like:

  - `http://example.org/pages`
  - `http://example.org/page/lorem-ipsum-dolor`

How does Bolt select what template to use for a given request? Unless specified,
Bolt will determine the names of these templates automatically via a method we
call 'cascading templates'. This allows for great flexibility, as well as ease
of use. Unless you specify anything, pages will get rendered using the basic
default templates, but you can refine this in the definition of the contenttypes
or even on a per-record basis. The rules for selecting a template are as
follows.

Selection of a template for an single record page:

  - If an overview page like `/page/foo-bar` is requested, and the contenttype
    has a 'templateselect field' and a template is selected for this record,
    that template will be used.
  - Otherwise, if the contenttype definition has a value for `record_template`,
    that template will be used.
  - Otherwise, Bolt will check if a template with a suited name exists. For
    example, if the contenttype's singular_name is 'Entry', Bolt will check for
    an `entry.twig` template. If it exists, that template will be used.
  - Otherwise, if `record_template` is set in `config.yml`, that template will
    be used.
  - If no other rule matches, Bolt will use a template named `record.twig`.

Selection of a template for an overview page:

  - If an overview page like `/entries` is requested, and the contenttype
    definition has a value for `listing_template`, that template will be used.
  - Otherwise, Bolt will check if a template with a suited name exists. For
    example, if the contenttype's name is 'Entries', Bolt will check for an
    `entries.twig` template. If it exists, that template will be used.
  - Otherwise, if `listing_template` is set in `config.yml`, that template will
    be used.
  - If no other rule matches, Bolt will use a template named `listing.twig`.

In the default template for a single record, it is available as both `{{ record}}`
and also by the name of the singular name. So, in the above example, you can
also use `{{ page }}`, without having to set it specifically. Likewise, in the
default template for multiple records, the content is available as `{{ records }}`
and also by the name of the contenttype, for example `{{ pages }}`.

<p class="note"><strong>Note:</strong> As you might have noticed, sometimes the
examples use <code>{{ page }}</code>, sometimes <code>{{ entry }}</code> and
sometimes something different altogether. These are just the names of the
objects containing the content, or the array with several records of content. By
default you can use the singular name of your contenttype, so be sure to replace
them with whatever the names of your content types or variables are.</p>


Routing
-------

The URLs mentioned in the previous paragraphs are actually just defaults. Each
can be adjusted to your own liking. There are some caveats with regards to
correct canonical URLs, but otherwise you can change it to anything you like.

Below you will find a complete description of the route definition in the YAML
file.

The easiest way to add your own is to follow the examples defined in the
distributed `routing.yml.dist` file. The order of the routes is important
because it is a first-come first-serve architecture. So if you add your own
contenttype routes it will probably need to be defined before the general
**contentlink** route.

#### Some routing examples


##### Make old .html pages work

In this example we add routes to make old `/contact.html` links work with your
new Bolt system.

<pre class="brush: plain">
oldpages:
    path:           /{slug}.html
    defaults:       { _controller: 'Bolt\Controllers\Frontend::record', 'contenttypeslug': 'page' }
    requirements:
        slug:       '[a-z0-9-_]+'
</pre>


##### Host requirement

In this example we use the host requirement to show a specific page on the home
of a particular host. The _defaults_ are set to the regular record-action with a
specific contenttype and slug set up.

<pre class="brush: plain">
example:
    path:     /
    defaults: { _controller: 'Bolt\Controllers\Frontend::record', 'contenttypeslug': 'page', 'slug': 'example' }
    host:     'example.mydomain.org'
</pre>


##### Contenttype overrides

This case overrides the default routing for contenttype **page**. Bolt will no
longer create `/page/{slug}` links but will now create `/{slug}` routes. The old
routes will still work, but the canonicals will be fixed to the new routes. The
_defaults_ are set to the regular record-action but we also added an additional
`contenttype: page` line to tell Bolt to use this route for all records with
contenttype **page**.

<pre class="brush: plain">
pagebinding:
    path:           /{slug}
    defaults:       { _controller: 'Bolt\Controllers\Frontend::record', 'contenttypeslug': 'page' }
    contenttype:    pages
</pre>

An alternative is to also add the creation date:

<pre class="brush: plain">
pagebinding:
    path:           /{datecreated}/{slug}
    defaults:       { _controller: 'Bolt\Controllers\Frontend::record', 'contenttypeslug': 'page' }
    requirements:
        datecreated:    '\d{4}-\d{2}-\d{2}'
    contenttype:    pages
</pre>


##### Single record override

This example overrides a single record to a specific URL. Useful if you only
want to exempt a few pages and not a complete contenttype. Don't forget to add
the `recordslug: page/about` line. This route should be high in the route list
for it to work correctly.

<pre class="brush: plain">
aboutbinding:
    path:           /about
    defaults:       { _controller: 'Bolt\Controllers\Frontend::record', 'contenttypeslug': 'page', 'slug': 'about' }
    recordslug:     page/about
</pre>


##### Filesystem based page generation

There is a way to configure router to generate statically stored content.
For the `Bolt\Controllers\Frontend::template` default controller can be
assigned a parameter `template` that may points out a template that
should be stored as a regular file under currently selected theme in the
filesystem. Using file extension `.twig` is optional.

<pre class="brush: plain">
templatebinding:
hirbinding:
  	path: /mytemplate
  	defaults: { _controller: 'Bolt\Controllers\Frontend::template', template: 'mytemplate' }
</pre>


#### YAML description of a routing entry

The complete format of a single route in YAML is as follows:

<pre class="brush: plain">
bind-name:
    path:       /{parameter..}/
    defaults:
        _controller:    'controller'
        _before:        'before'            # optional
        _after:         'after'             # optional
    requirements:
        parameter..:    required-regexp
    host:               hostname            # optional
    contenttype:        contenttype         # optional
</pre>


Explanation of each argument:

  - `bind-name` - name to bind the route to, used for generating URLs.
  - `path` - URL of this route, use {..} for parameters.
  - `_controller` - controller method which will be called when this route
    matches.
  - `_before` - called before the controller action will be called. if not set
    the method `before()` will be called in the controller.
  - `_after` - called after the controller action is called. if not set the
    method `after()` will be called in the controller.
  - `parameter..` - name of the named parameter see `path`.
  - `required-regexp` - regular expression which should be true for this route
    to be matched. it's also possible to add a callback here. it should return a
    regular expression which should match
  - `hostname` - hostname to match for this route.
  - `contenttypeslug` - if this route represent a new route for a contenttype,
    the contenttype should be specified.

##### Path

You are free to specify your own parameters, however when you are adding routes
for contenttypes' or recordslugs you are limited to which parameters you can
add. At least when you don't want to code your own Content-object. The following
fields from a contenttype can be used as a parameter:

  - **contenttypeslug**
  - **id**
  - **slug**
  - **datecreated** - only the date part is returned (so yyyy-mm-dd)
  - **datepublish** - only the date part is returned (so yyyy-mm-dd)

##### Required regular expressions

When the routing is processed no content has been loaded yet, so validation
cannot be based on actual database checks. Therefore the check is purely a
syntax check using regular expressions. Bolt adds the ability to specify a
callback which returns a regular expression. This allows us to dynamically enter
contenttype slugs as valid URL parts.

You can either enter your own regular expression or use the callback notation
which is `class::method`.
