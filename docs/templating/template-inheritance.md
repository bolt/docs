---
title: Template inheritance
---
Template inheritance
====================

To quote the [Twig documentation][twig-inheritance]
"The most powerful part of Twig is template inheritance", and
"[it] sounds complicated but it is very basic"

By harnessing this power, Twig allows you to build a base "master", or
"skeleton", template for your Bolt site, that contains all the common elements
for your site. You can also define "blocks" that child templates can override.

For example you might want your `pages` ContentType to display an image at the
top of the sidebar, but still use the same layout as the rest of the site.

Easy!

Let's take a closer look at this example in the sections below.


### Parent templates

A parent template is just a Twig template file that contains
[`block`][twig-tag-block] tags. All the `block` tag itself does is to tell
Twig that a child template may override that portion of the template contained
inside the block.

Let's call our master template `_master.twig`, and assume it is located in the
root of your site's theme directory, e.g. `public/theme/your-theme/`.

Inside our `_master.twig` file, you will see a cut-down version of your HTML
`<body>`, you'll also notice that there are two `block` tags; "content" &
"sidebar". These would normally contain your beautifully designed layout, but
for the sake of simplicity we've just shown a template comment in the example
below.

```twig
    <body>
        <div id="content">
        {% block content %}
            {# Twig logic to display your content goes here #}
        {% endblock %}
        </div>

        <div id="sidebar">
        {% block sidebar %}
            {# Twig logic to display your sidebar goes here #}
        {% endblock %}
        </div>
    </body>
```

Any child template that extends this one can override the content of these
blocks by defining their own block of the same name.


### Child templates

A child template inherits a parent template's layout by using the
[`extends`][twig-tag-extends] tag followed by the template file name of the
parent. If your child template was to contain only the `extends` tag, it would
just render the extended parent template.

Overriding sections of the parent template is done with a `block` tag name
after a matching tag name in the parent template.

Using our example above, now in your `pages.twig` file that you've
[specified](templates-selection) in your ContentType, you would simply extend
the master template, to inherit your beautifully designed layout, and add a
block called "sidebar".

So you *entire* `pages.twig` file would look like:

```twig
{% extends '_master.twig' %}

{% block sidebar %}
    <img src="{{ record.sidebar_image|thumbnail(250, 250) }}">

    {{ parent() }}
{% endblock %}
```


Notice at the end of the sidebar block in your new `pages.twig` template a Twig
[`parent()`][twig-function-parent] function, this optional addition to a child
block tells Twig "Put the parent block's HTML here!".

In other words you can meticulously create your beautifully designed layout,
yet quickly & easily extend it for a specific purpose, with just a few lines of
Twig.

How awesome is that!


### Reusing blocks

Another flexible feature of Twig blocks is when it comes to reusing them, as
you can create  them in other templates. A factory of sorts.

Let's say that you want one consistent HTML layout for any images displayed.
You could add another block to your `pages.twig` file.

But wait, I want my `kittens` ContentType to use my new `sidebar_image` block
too!

Good news friendly Bolt template designer, you can create special template
files that contain only Twig blocks that you access via the special Twig
function, [`block()`][twig-function-block].

Let's assume we've created `_blocks.twig`, and moved the `sidebar_image` block
there. It would look like:

```twig
{% block sidebar_image %}
    <div class="image">
        <img src="{{ record.sidebar_image|thumbnail(250, 250) }}">
    </div>
{% endblock %}
```

Now we just tell Twig that we're going to ["use"][twig-tag-use] your
`_blocks.twig` template by adding `{% use '_blocks.twig' %}` to `pages.twig`.

Your `pages.twig` file would then look like this:

```twig
{% extends '_master.twig' %}
{% use '_blocks.twig' %}

{% block sidebar %}
    {{ block('sidebar_image') }}

    {{ parent() }}
{% endblock %}

```


#### Blocks & variables

Another common use-case that you might encounter, is that you want to define
a block used by several different ContentTypes, but with completely different
field names.

This is where Twig's [`with`][twig-tag-with] tag comes to the rescue, to wrap
around a `block` and tell Twig what variables to use.

In our example `_blocks.twig` file, we change the block to expect a variable
called `image`.

```twig
{% block sidebar_image %}
    <div class="image">
        <img src="{{ image|thumbnail(250, 250) }}">
    </div>
{% endblock %}
```

Then in your `pages.twig` file,  put your `sidebar_image` block inside a `with`
control structure.

```twig
{% extends '_master.twig' %}
{% use '_blocks.twig' %}

{% block sidebar %}
    {% with {'image': record.sidebar_image} %}
    {{ block('sidebar_image') }}
    {% endwith %}

    {{ parent() }}
{% endblock %}

```

… and in your `kittens.twig` template, the same thing except with the value of
the record's `cutest_kitten` field:

```twig
{% extends '_master.twig' %}
{% use '_blocks.twig' %}

{% block sidebar %}
    {% with {'image': record.cutest_kitten} %}
    {{ block('sidebar_image') }}
    {% endwith %}

    {{ parent() }}
{% endblock %}

```

[twig-function-block]: https://twig.symfony.com/doc/1.x/functions/block.html
[twig-function-parent]: https://twig.symfony.com/doc/1.x/functions/parent.html
[twig-tag-block]: https://twig.symfony.com/doc/1.x/tags/block.html
[twig-tag-extends]: https://twig.symfony.com/doc/1.x/tags/extends.html
[twig-tag-with]: https://twig.symfony.com/doc/1.x/tags/with.html
[twig-tag-use]: https://twig.symfony.com/doc/1.x/tags/use.html
[twig-inheritance]: https://twig.symfony.com/doc/1.x/templates.html#template-inheritance
