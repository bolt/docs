---
title: Linking in Templates
---
Linking in Templates
====================

There are three functions in Twig you can use to link to other pages, or to
include assets like CSS and Javascript resources in your HTML. They are:

 - To generate a relative or absolute path, use `{{ path() }}`
 - To generate a scheme-relative or absolute url, use `{{ url() }}`
 - To link to assets, like CSS / JS files, use `{{ asset() }}`

## asset

Use the `{{ asset() }}` Twig function to create public link to the so-called
assets in your theme, like JavaScript, CSS or other files.

The `asset` function definition is:

```twig
    {{ asset(path, packageName) }}
```

The `asset` function takes two parameters:

 - `path` — The path, relative to the base of location of a package, of a
             file, where these paths can be found.
 - `packageName` — This parameter needs to provide a package name containing.

Packages are analogous to locations of "groups of file assets". Bolt defines a
few of these packages, that can be used to create links to files in specific
areas of Bolt.

Defined package names are:

 - `theme`: The path to the currently selected theme folder, as defined in your
   `config.yml`. Use this in your theme to transparently create links to your
   `.js` and `.css` files. Doing this ensures the links will still work, if your
   theme gets renamed, or if the site gets installed in a sub-folder.
 - `files`: The path to the `files/` folder where images and other files are
   uploaded by the Editors to be used in the content of the website.
 - `bolt`: Used to link to Bolt's core asset files. Use of this package name is
   discouraged in your own theme, because there is no guarantee that these files
   that are shipped with Bolt will remain unchanged after an update of Bolt.
 - `extensions`: The path to the publicly accessible assets of extensions. For
   example, if an extension requires a `.js` or `.css` file, it will use this,
   to ensure it gets included in the theme. As with `bolt`, it's usually not
   necessary to use these yourself if you're developing a theme.

Examples:

```twig
{# Include theme.css from the 'css' folder in your theme. #}
<link rel="stylesheet" href="{{ asset('css/theme.css', 'theme') }}">

{# Include jquery.min.js from the 'js' folder in your theme. #}
<script src="{{ asset('js/jquery.min.js', 'theme') }}"></script>

{# Display the kitten.jpg image, that was uploaded to the `files/` folder. #}
<img src="{{ asset('kitten.jpg', 'files') }}"></script>
```

This would produce, on an default install, the following output:

```twig
<link rel="stylesheet" href="/theme/base-2016/css/theme.css">

<script src="/theme/base-2016/js/jquery.min.js"></script>

<img src="/files/kitten.jpg">
```

For a more in-depth description of the `asset` function, see the
[Symfony documentation on assets][symfonyasset].

<p class="note"><strong>Note:</strong> This function replaces the deprecated <code>
{{ paths }}</code> template variable. As such, it's encouraged to use this
function instead.</p>

## path

Use the `path` Twig function to create valid URI strings to paths configured on
your site.

The `path` function definition is:

```twig
    {{ path(name, parameters = [], relative = false) }}
```

The `path` function takes three parameters:

  - `name` — Name of a registered path route
  - `parameters` — A named array of parameters that can be either route function
                 parameters, or query parameters to be appended to the
                 generated URI.
  - `relative` — (optional) Will the URI be relative to the **current page**

Example 1:

```twig
<a href="{{ path('homepage') }}">Home</a>
```

This will create a simple link to the homepage of the site. Bolt has a Route
defined that's called 'homepage', and as such, Bolt can generate a link to that
specific route.

You can also pass in extra parameters, that are used to generate the link.

For example, to produce a link relative to the base of your site:

```twig
<a href="{{ path(
    'contentlink',
    {
        'contenttypeslug': link_content_type,
        'slug': link_slug,
        'section': query_section
    })
}}">
    Link to a relative path of the ContentType "{{ link_content_type }}", with
    the slug of "{{ link_slug }}", and the query parameter `section` with the
    value of {{ query_section }}
</a>
```

This would produce, on an default install, the following output:

```html
<a href="/pages/about?section=koala">
    Link to a relative path of the ContentType "pages", with the slug of
    "about", and the query parameter `section` with the value of koala
</a>
```

Alternatively, if you wish to have the link relative to teh current page, you
can set the `relative` parameter to `true, e.g.:


```twig
<a href="{{ path(
    'contentlink',
    {
        'contenttypeslug': link_content_type,
        'slug': link_slug,
        'section': query_section
    },
    true)
}}">
    Link to an absolute URL of the ContentType "{{ link_content_type }}", with the
    slug of "{{ link_slug }}", and the query parameter `section` with the value of
    {{ query_section }}
</a>

```

This would produce, on an default install, the following output:

```html
<a href="../pages/about?section=koala">
    Link to an absolute URL of the ContentType "pages", with the
    slug of "about", and the query parameter `section` with the value of
    koala
</a>
```

Under the hood, this function creates links to routes defined in the Routing
inside Bolt. This is the case both Bolt core functionality, but extensions can
also add paths that can be used with this function.

The most commonly used routes are:

 - `homepage`: Generate a link to the homepage of the site.
 - `contentlisting`: Used for links to the listing view of a contenttype. For
    example: `{{ path('contentlisting', {'contenttypeslug': 'pages'}) }}` will
    generate a link like `/pages`.
 - `contentlink`: Used for links to ContentTypes by ContentType name and slug
 - `search`: Generate a link to the search results page of the site. Often used
   as the 'target' of a form that allows the user to perform a search, e.g.:
   `<form method="get" action="{{ path('search') }}">`

For more in-depth information about this function, see [Linking to pages][page]
in the Symfony documentation.



## url

The `url` function definition is:

```twig
    {{ url(name, parameters = [], schemeRelative = false) }}
```

The `url` function takes three parameters:
  - `name` — Name of a registered path route
  - `parameters` — A named array of parameters that can be either route function
                 parameters, or query parameters to be appended to the
                 generated URL.
  - `schemeRelative` — (optional) Will the URL include the current scheme

```twig
{% set link_content_type = 'pages' %}
{% set link_slug = 'about' %}
{% set query_section = 'about' %}

<a href="{{ url('contentlink',
    {
        'contenttypeslug': link_content_type,
        'slug': link_slug,
        'section': query_section
    })
}}">
    Link to a relative URL of the ContentType "{{ link_content_type }}", with the
    slug of "{{ link_slug }}", and the query parameter `section` with the value of
    {{ query_section }}
</a>
```

This would produce, on an default install, the following output:

```html
<a href="/pages/about?section=about">
    Link to a relative path of the ContentType "pages", with the
    slug of "about", and the query parameter `section` with the value of
    koala
</a>
```


```twig
{% set link_content_type = 'pages' %}
{% set link_slug = 'about' %}
{% set query_section = 'about' %}

<a href="{{url(
        'contentlink',
        {
            'contenttypeslug': link_content_type,
            'slug': link_slug,
            'section': query_section
        },
        true)
}}">
    Link to an absolute URL of the ContentType "{{ link_content_type }}", with the
    slug of "{{ link_slug }}", and the query parameter `section` with the value of
    {{ query_section }}
</a>
```

This would produce, if for example you were at the site URL`/people/me`, the
following output:

```twig
<a href="../pages/about?section=about">
   Link to an absolute URL of the ContentType "pages", with the
   slug of "about", and the query parameter `section` with the value of
   koala
</a>
```

[symfonyasset]: http://symfony.com/doc/current/templating.html#templating-assets
[page]: http://symfony.com/doc/current/templating.html#linking-to-pages
