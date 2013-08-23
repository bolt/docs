Templates and routes
====================

Whenever your browser gets a page on a Bolt website, it uses an URL like `/entries` or `/page/lorem-ipsum`. Bolt knows
how to handle URLs like this, and displays the information the browser requested. Bolt does this by mapping the URL to a
so-called Route. This Route is the controller that (when called) fetches the content from the database, selects the
template to use, renders the HTML page according to that template and the content and serves it to the browser.

At the same time, if you create a new record, Bolt will know what the URL for that content is. So when that URL is
requested by a browser, it can map it back to the correct content.

For example, if you have a 'Pages' contenttype, with 'Page' as a singular_name, your site will automatically have pages
like:

  - `http://example.org/pages`
  - `http://example.org/page/lorem-ipsum-dolor`

How does Bolt select what template to use for a given request? Unless specified, Bolt will determine the names of these
templates automatically via a method we call 'cascading templates'. This allows for great flexibility, as well as ease
of use. Unless you specify anything, pages will get rendered using the basic default templates, but you can refine this
in the definition of the contenttypes or even on a per-record basis. The rules for selecting a template are as follows.

Selection of a template for an single record page:

  - If an overview page like `/page/foo-bar` is requested, and the contenttype has a 'templateselect field' and a
    template is selected for this record, that template will be used.
  - Otherwise, if the contenttype definition has a value for `record_template`, that template will be used.
  - Otherwise, Bolt will check if a template with a suited name exists. For example, if the contenttype's singular_name
    is 'Entry', Bolt will check for an `entry.twig` template. If it exists, that template will be used.
  - Otherwise, if `record_template` is set in `config.yml`, that template will be used.
  - If no other rule matches, Bolt will use a template named `record.twig`.

Selection of a template for an overview page:

  - If an overview page like `/entries` is requested, and the contenttype definition has a value for `listing_template`,
    that template will be used.
  - Otherwise, Bolt will check if a template with a suited name exists. For example, if the contenttype's name is
    'Entries', Bolt will check for an `entries.twig` template. If it exists, that template will be used.
  - Otherwise, if `listing_template` is set in `config.yml`, that template will be used.
  - If no other rule matches, Bolt will use a template named `listing.twig`.

In the default template for a single record, it is available as both `{{ record }}` and also by the name of the singular
name. So, in the above example, you can also use `{{ page }}`, without having to set it specifically. Likewise, in the
default template for multiple records, the content is available as `{{ records }}` and also by the name of the
contenttype, for example `{{ pages }}`.

<p class="note"><strong>Note:</strong> As you might've noticed, sometimes the examples use {{ page }}, sometimes {{
entry }} and sometimes something altogether. These are just the names of the variables containing the content, or the
array with several records of content. By default you can use the singular name of your contenttype, so be sure to
replace them with whatever the names of your content types or variables are.</p>


Routing
-------

The URLs mentioned in the previous paragraphs are actually just defaults. Each can be adjusted to your own liking.
There are some caveats with regards to correct canonical URLs, but otherwise you can change it to anything you like.

Below you will find a complete description of the definition in the YAML file.

The easiest way to add your own is to follow the examples defined in the distributed `routes.yml.dist` file.
Do take care to order the routes correctly because it is a first-come first-serve architecture.


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
    host:      :        hostname            # optional
    contenttype:        contenttypeslug     # optional
</pre>


Explanation of each argument:

  - `bind-name`  - name to bind the route to, used for generating URLs.
  - `path` - URL of this route, use {..} for parameters.
  - `_controller` - controller method which will be called when this route matches.
  - `_before`  - called before the controller action will be called.
    if not set the method `before()` will be called in the controller.
  - `_after` - called after the controller action is called.
    if not set the method `after()` will be called in the controller.
  - `parameter..` - name of the named parameter see `path`.
  - `required-regexp` - regular expression which should be true for this route to be matched.
  - `hostname` - hostname to match for this route.
  - `contenttypeslug` - if this route represent a new route for a contenttype, the contenttype should be specified.

