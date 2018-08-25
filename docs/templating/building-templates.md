---
title: Building templates
---
Building templates in Bolt
===========================

To render HTML pages with dynamic content, Bolt uses the [Twig][twig]
templating language. This means that everybody who is familiar with Twig can
easily get started with building templates in Bolt.

In short, Twig can be described as a 'flexible, fast, and secure template
engine for PHP'. Primarily, it separates the markup of your templates from the
PHP code in the CMS. It does this elegantly and quickly, which means that
writing your HTML templates in Twig will give you clean and legible templates.

That means you don't have to use PHP-like statements in your markup, so there's
less code like this:

```
<?php if ( the_something('3') ) { ?>
<h1>Title is: <?php echo the_title() ?>.</h1>
<?php } ?>
```

Instead, more like this:

```
{% if something('3') %}
    <h1>Title is: {{ title }}.</h1>
{% endif %}
```

A template in Bolt can use all standard Twig [tags][twig-tags],
[functions][twig-functions], [filters][twig-filters] & [tests][twig-tests] with
a few additions that are specific to working with Bolt.

If you're not familiar with Twig yet, you should read
"[Twig for Template Designers][twig-designers]", on the official Twig website.


Twig syntax basics
------------------

There are basically three different types of Twig delimiters that you can use
in your templates:

  - `{%  %}` — Control structures, or "do something" actions
  - `{{  }}` — Output structures, or "output something" action
  - `{#  #}` — Comments that are not meant for outputting to the rendered page

Inside control & output structures you can use expressions, statements, variables,
functions and filters.

A simple example of these together might look like this:

```twig
{# Render the content in template.twig here #}
{% include 'template.twig' %}

{# Create a varable called "vars" containing an array #}
{% set vars = {'foo': 'bar'} %}

{# Check if the "vars" variable can be looped over #}
{% if vars is iterable %}
    {# Loop over our variable #}
    {% for key, value in vars %}
        <p>{{ key }} has the {{ value }}</p>
    {% endfor %}
{% else %}
    <p>Well this is strange!</p>
{% endif %}
```

For in-depth coverage you should read the [Twig manual][twig].


### Control structures

Simply, [control structures][control-structure] are sections of logic in your
template file that "does something".

They are defined using by pairing a curly brace and a percentage sign —
`{%  %}` — that contains a "[tag][twig-tags]".

The most common tags used in a Twig template are typically:
 - [`for`][tag-for] that is used to iterate over an array
 - [`if`][tag-if] statements allow you to conditionally perform actions
 - [`set`][tag-set] is used to "set" a variable's value
 - [`include`][tag-include] statements return the rendered content of another template
 - [`block`][tag-block] tags are used to break out inheritable sections of templates for re-use or overriding in child templates

For example, `{% if foo == "bar" %}` is a statement that tests if the variable
`foo` is equal to the value "bar". If so, the part that's between the opening
statement and the corresponding `{% endif %}` will be rendered.


### Output structures

As the name suggests, output structures are used to display the output of
variables, or Twig functions & filters.

They are defined using by pairing two curly braces — `{{  }}` —  that contain
the instructions to give to Twig in order to output the desired text.

For example:
  - `{{ foo }}` outputs the contents of the variable `foo`
  - `{{ bar(foo) }}` outputs the results of the function `bar()`. In this case,
    'foo' is used as an argument in the function, so the output is most likely
    dependent on the contents of `foo`.
  - `{{ foo|bar }}` Outputs the variable `foo`, but with `bar` as a filter. If
    `foo` is "hello", `{{ foo|upper }}` would output "HELLO".


### Comments

Comments are just that, to add comments to your templates, that don't do
anything, but leave yourself useful information relevant to that part of the
template.

They are comparable to the HTML comments like `<!-- foo -->`, except for the
fact that Twig comments don't get sent to the browser,so you can't see them
using 'view source'.

They are defined using by pairing a curly brace with a # sign — `{#  #}` —
that contain the comment's text.

For example, the following lines of a Twig template would render an empty HTML
`<div>`, but leaves yourself a reminder to why.


```twig
<div>
    {# TODO: Add something here #}
</div>
```


Filesystem Layout
-----------------

A Bolt website theme consists of a set of Twig templates, that are located in
the `theme` folder in the public directory of your site.

You can always add more templates, if you want to. By default, the `index.twig`
template is the homepage, but you can override it using the configuration settings.

The current default theme contains the following files and folders:

| File       | Description |
|------------|-------------|
| `index.twig` | Front page of the web site |
| `page.twig` | For a single `pages` ContentType record |
| `listing.twig` | Displaying listings, like 'latest pages', but also taxonomy overview pages |
| `record.twig` | A 'generic record' page, used if the ContentType has no template specified |
| `search.twig` | Displaying search results. |
| `partials/_master.twig` | Base layout template, that other templates [`extend`](template-inheritance) to inherit the properties of |
| `partials/_aside.twig` | Helper template that gets included as the sidebar |
| `partials/_header.twig` | Helper template that gets included as the header. |
| `partials/_footer.twig` | Helper template that gets included as the footer. |
| `partials/_recordfooter.twig` | Footer specifically for ContentType records |
| `theme.yml` | A file with configuration related to the theme and how it works with bolt. Can also contain configuration for template specific fields and values for the theme to use in its templates. |
| `js/` | Compiled JavaScript files |
| `css/` | Compiled CSS files |

The file names of the 'helper' templates all start with an underscore. This is
just a convention, to make it easier to recognize which template does what. If
one of your ContentTypes have a 'template select' field, Bolt will skip these
helper templates by default, when providing you with a list to select your template.

<p class="tip"> <strong>Tip:</strong> the default template set uses the
<code>include</code> tag to insert the header, footer and such, but you're free to use
<a href="template-inheritance">Template Inheritance</a> if you prefer.</p>

By default, Bolt creates links to single pages based on the ContentTypes, and
it uses a template based on its name.

For instance, if your site has a ContentType `foos`, a single record in that
ContentType will be available under <a>domain.com/foo/slug-of-record</a>, where
`slug-of-record` is the "slugified" version of the title. Bolt will try to use
`foo.twig` as the template to render the page.

You can change this by either defining another template in `contenttypes.yml`,
or using a 'template select' field in the ContentType. More information about
this can be found in the section on working with [ContentTypes](../contenttypes/intro).

Using your themes `theme.yml` you can provide overrides for certain settings
of the main `config.yml`. These are useful when building themes and you want to
provide your own templates.

These are (provided with examples):

```yaml
homepage_template: index.twig
record_template: record.twig
listing_template: listing.twig
search_results_template: listing.twig
maintenance_template: maintenance.twig
```

`listing_template` is used for both ContentType listings and taxonomy listings.

By using the `template_directory` setting in your themes `theme.yml` you can
choose the location of the templates within your theme structure.

For example to place all your templates in a directory called `twig` you would
add the following to your theme's theme.yml:

```yaml
template_directory: twig
```


Template structure
------------------

A simple `page.twig` template could look something like the example you see
below.

Using this example we'll go over some of the details of the Twig Template
language. As mentioned before: Much, much more detailed info can be found at
[Twig for Template Designers][twig-designers] on the official Twig site.

```
{% extends 'partials/_master.twig' %}

{% block main %}
<article>

    <h1><a href="{{ record.link }}">{{ record.title }}</a></h1>

    {# Only display the image, if there's an actual image to display #}
    {% if record.image != "" %}
        <div class='image'>
            <img src="{{ record.image|thumbnail(320, 240) }}">
        </div>
    {% endif %}

    {{ record.body }}

    <p class="meta">
        Posted by {{ record.user.displayname }} on
        {{ record.datecreated|date("M d, ’y")}}
    </p>

</article>
{% endblock main %}
```

What happens in this example is the following:

  - `{% extends 'partials/_master.twig' %}`, line 1: The `extends` tag tells
    Twig that this is a child template, that inherits the content and
    functionality from `_master.twig`

  - `{% block main %}`, line 3: The `block` tag, and its matching `endblock` on
    line 23, tells Twig to override the contents of the block called "main" in
    `_master.twig`

  - `{{ record.title }}`, line 6: Since this is a generic template, `record`
    contains the record of the current requested page. For example, if the
    current page is <a>domain.com/news/the-website-is-live</a>, `record` would
    contain the record from the `news` ContentType that has 'the-website-is-live'
    as a slug. The `record` variable acts like an array, so to output the
    `title` field, we use dot-notation (`.`)

  - `{{ record.link }}`, line 6: Here we use the link property to get the URL
    that links to the content

  - `{# Only display .. #}`, line 8: This is a simple comment. It will be
    removed when the template is rendered to the browser, so it will not show
    up in 'view source'

  - `{% if content.image != "" %} … {% endif %}`, lines 9 - 13: The `if`
    statement only parses the part between the start and end tag, if the given
    condition is true. So, in this case, the image is only rendered to the browser, if
    `content.image` does not equal an empty string (`""`), i.e. if it is not empty

  - `{{ record.image|thumbnail(320, 240) }}`, line 11: By using the
    `thumbnail` filter, we can create thumbnail images on the fly. In this
    case, the image source attribute in the HTML will be something like
    '/thumbs/300x240/imagename.jpg'. Bolt has a built-in image resizer that
    will create the image with the exact dimensions, and caches it for further
    use.

  - `{{ record.body }}`, line 15: This renders the `body` field of the
    ContentType record

  - `{{ record.datecreated|date("M d, ’y")}}`, line 19: `datecreated` is one
    of the elements that is always present in all ContentTypes, and it
    contains the date the record was created. It's stored in a machine-readable
    format, so to display it the way we want, we use the `date()` filter. In
    this case, it will output something like 'August 26, ’12'.



[twig]: http://twig.sensiolabs.org/documentation
[twig-designers]: http://twig.sensiolabs.org/doc/templates.html
[control-structure]: https://twig.sensiolabs.org/doc/1.x/templates.html#control-structure
[twig-tags]: https://twig.sensiolabs.org/doc/1.x/tags/index.html
[twig-filters]: https://twig.sensiolabs.org/doc/1.x/filters/index.html
[twig-functions]: https://twig.sensiolabs.org/doc/1.x/functions/index.html
[twig-tests]: https://twig.sensiolabs.org/doc/1.x/tests/index.html
[tag-for]: https://twig.sensiolabs.org/doc/1.x/tags/for.html
[tag-if]: https://twig.sensiolabs.org/doc/1.x/tags/if.html
[tag-set]: https://twig.sensiolabs.org/doc/1.x/tags/set.html
[tag-include]: https://twig.sensiolabs.org/doc/1.x/tags/include.html
[tag-block]: https://twig.sensiolabs.org/doc/1.x/tags/extends.html#how-do-blocks-work
