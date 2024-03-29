---
title: Linking in Templates
---
Linking in Templates
====================

There are a number of Twig functions in Bolt that you can use to link to other
pages, or to include assets like CSS and Javascript resources in your HTML.
They are:

 - To link to assets, like CSS, Javascript or other files, use `{{ asset(…) }}`
 - To link to the 'current page', use `{{ canonical() }}` or `{{ record|link() }}`
 - To generate a relative or absolute path, use `{{ path(…) }}`
 - To generate a scheme-relative or absolute url, use `{{ url(…) }}`
 - To generate sensible links from user-provided input, use `{{ absolute_link(…) }}`
 - To generate absolute links from relative links, use `{{ absolute_url(…) }}`

The following sections of this page will detail the different functions, and how
to use them effectively.

## Using `asset` to link to assets or files.

Use the `{{ asset() }}` Twig function to create public links to the so-called
assets in your theme, like JavaScript, CSS or other files.

The `asset` function definition is:

```twig
{{ asset(path, packageName) }}
```

The `asset` function takes two parameters:

| Parameter     | Description |
|---------------|-------------|
| `path`        | The path, relative to the base of location of a package, of a file, where these paths can be found.
| `packageName` | This parameter needs to provide a package name containing.

Packages are analogous to locations of "groups of file assets". Bolt defines a
few of these packages, that can be used to create links to files in specific
areas of Bolt.

Defined package names are:

| Packages     | Description |
|--------------|-------------|
| `theme`      | The path to the currently selected theme folder, as defined in your `config.yaml`. Use this in your theme to transparently create links to your `.js` and `.css` files. Doing this ensures the links will still work, if your theme gets renamed, or if the site gets installed in a sub-folder. This is the default, if you omit the `package` parameter.
| `files`      | The path to the `files/` folder where images and other files are uploaded by the Editors to be used in the content of the website.
| `bolt`       | Used to link to Bolt's core asset files. Use of this package name is discouraged in your own theme, because there is no guarantee that these files that are shipped with Bolt will remain unchanged after an update of Bolt.
| `extensions` | The path to the publicly accessible assets of extensions. For example, if an extension requires a `.js` or `.css` file, it will use this, to ensure it gets included in the theme. As with `bolt`, it's usually not necessary to use these yourself if you're developing a theme.

Examples:

```twig
{# Include theme.css from the 'css' folder in your theme.  #}
<link rel="stylesheet" href="{{ asset('css/theme.css') }}">

{# Include jquery.min.js from the 'js' folder in your theme. #}
<script src="{{ asset('js/jquery.min.js', 'theme') }}"></script>

{# Display the kitten.jpg image, that was uploaded to the `files/` folder. #}
<img src="{{ asset('kitten.jpg', 'files') }}" />
```

This would produce, on an default install, the following output:

```twig
<link rel="stylesheet" href="/theme/base-2021/css/theme.css">

<script src="/theme/base-2021/js/jquery.min.js"></script>

<img src="/files/kitten.jpg">
```

For a more in-depth description of the `asset` function, see the
[Symfony documentation on assets][symfonyasset].

<p class="note"><strong>Note:</strong> This function replaces the deprecated
<code>{{ paths }}</code> template variable. As such, it's encouraged to use this
function instead.</p>

## Linking to the current page

It is a very common task to make links to the "current page". For instance to
use in a 'permalink' button, or to link to the current page from social media,
email or some other external source. The easiest way to do this is by using the
`canonical` Twig function:

```twig
<a href="{{ canonical() }}">Link to this</a>

{# -> <a href="http://example.org/page/lorum-ipsum">Link to this</a> #}
```

The canonical link is a fully specified link, which includes the scheme and
domain name. It is defined dynamically by Bolt, and can be influenced using the
`canonical: ` setting in your `config.yaml`.

Alternatively, if you want to create links to a specific page in a listing, or a
record you've fetched using `{% setcontent %}`, you can use the `"link"`
filter to get the link. For example:

```twig
<a href="{{ record|link }}">{{ record.title }}</a>

{# -> <a href="http://example.org/page/lorum-ipsum">Lorum Ipsum</a> #}
```

## Using `path` and `url` to link to named routes

You can use the `path` and `url` Twig functions to create valid URI/URL strings
to paths or routes in your site's configuration. The main difference between
the two functions is that one will output a relative link, and the other one a
fully specified URL.

The `path` and `url` function definitions are:

```twig
    {{ path(name, parameters = [], relative = false) }}
    {{ url(name, parameters = [], schemeRelative = false) }}
```

The `path` and `url` functions take three parameters:

| Parameter        | Description |
|------------------|-------------|
| `name`           | Name of a registered path route
| `parameters`     | A named array of parameters that can be either route function parameters, or query parameters to be appended to the generated URI.
| `relative`       | Whether or not the URI will be relative to the **current page** (optional, defaults to `false`)
| `schemeRelative` | Whether or not the URL will include the **current scheme** (optional, defaults to `false`)

For example:

```twig
<a href="{{ path('homepage') }}">Home path</a> -
<a href="{{ url('homepage') }}">Home URL</a>

{# <a href="/">Home path</a> - <a href="http://example.org/">Home URL</a> #}
```

This will create a simple link to the homepage of the site. Bolt has a Route
defined that's called 'homepage', and as such, Bolt can generate a link to that
specific route. Note the difference in the output for the `path` and `url`
functions.

In practice, you will most often use `path` to create links, and only use `url`
in those cases where you specifically want to create a link with the scheme and
domain name. For example, use `url` when you need the link to insert in an
email, or to link to the page from an external source, like social media. In
other cases you should just stick with `path` for simplicity.

```twig
<a href="{{ path(
    'listing',
    {
        'contentTypeSlug': link_content_type,
        'section': query_section
    })
}}">
    Link to a absolute path of the ContentType "{{ link_content_type }}" with
    the query parameter `section` with the value of {{ query_section }}
</a>
```

This would produce, on an default install, the following output:

```html
<a href="/pages?section=koala">
    Link to a absolute path of the ContentType "pages", with the query parameter
    `section` with the value of koala
</a>
```

Alternatively, if you wish to have the link relative to the current page or
scheme, you can set the `relative` parameter to `true`. Unless you have a good
reason, you should probably omit this parameter so it defaults to `false`. Doing
so will give you absolute links, which are less error prone.

The different output for 'relative' illustrated:

```twig
{% set parameters = {'contentTypeSlug': 'pages', 'slugOrId': 'dicis-vicimus'} %}

{{ path('record', parameters) }} => /pages/dicis-vicimus
{{ path('record', parameters, true) }} => ../pages/dicis-vicimus
{{ url('record', parameters) }} => http://example.org/pages/dicis-vicimus
{{ url('record', parameters, true) }} => //example.org/pages/dicis-vicimus
```

Under the hood, these functions create links to routes defined in the Routing
inside Bolt. This is the case for both Bolt core functionality, but extensions
can also add paths that can be used with this function.

## Most commonly used routes are:

| Route            | Description |
|------------------|-------------|
| `homepage`       |  Generate a link to the homepage of the site.
| `homepage_locale`|  Generate a link to the homepage in a non-default locale
| `listing`        | Used for links to the listing view of a ContentType. For example: `{{ path('listing', {'contentTypeSlug': 'pages'}) }}` will generate a link like `/pages`.
| `listing_locale` |  Used for links to the listing view of a ContentType in a non-default locale. For example: `{{ path('listing', {'contentTypeSlug': 'pages', '_locale': 'nl'}) }}` will generate a link like `/nl/pages`.
| `record`         |  Used for links to a single record in a ContentType.
| `record_locale`  | Used for links to a single record in a ContentType in a non-default locale.
| `search`         |  Generate a link to the search results page of the site. Often used as the 'target' of a form that allows the user to perform a search, e.g.: `<form method="get" action="{{ path('search') }}">`

For example, with default `en` locale:

```twig
    {{ path('record', { 'contentTypeSlug' : 'pages', 'slugOrId' : '24' } ) }} # /pages/dicis-vicimus (assuming record with id 24 is a page)
    {{ path('record_locale', { 'contentTypeSlug' : 'pages', 'slugOrId' : '24', '_locale' : 'nl' }) }} # /nl/pages/dicis-vicimus #if the slug is localized, the translated slug will be used. Otherwise, the slug of the page in the default locale will be used instead.
    {{ path('record_locale', { 'contentTypeSlug' : 'pages', 'slugOrId' : '24', '_locale' : 'en' }) }} # /pages/dicis-vicimus
    {{ path('record', { 'contentTypeSlug' : 'pages', 'slugOrId' : 'dicis-vicimus' }) }} # /pages/dicis-vicimus
```

You can inspect the `routing.yaml` file for more of the 'baked in' routes for the
front end, as well as the "Routing" panel in the debug toolbar.

You can also view all defined routes by running `bin/console debug:router`.

For more in-depth information about this function, see [Linking to pages][page]
in the Symfony documentation.

## Working with "raw links", using `absolute_link`

As you've seen in the examples above, these mostly deal with paths and urls
programmatically. Often you will find that a client or editor wants to have a
field in content where they can "just put in a link". Of course you can create
a regular field with `type: text` to handle this, and insert these in the
templates, but you'll get quirky results if the editor isn't very strict in how
they use the field. So, using `<a href='{{ record.contentlink }}'>Link</a>`
isn't the best way to handle this.

You can do this in a better way, like is done in the default Blocks ContentType:

```yaml
blocks:
    name: Blocks
    singular_name: Block
    fields:
        …
        contentlink:
            type: text
            label: Link
            placeholder: 'contenttype/slug or http://example.org/'
            postfix: |
                Use this to add a link for this Block. This could either be an
                'internal' link like <tt>page/about</tt>, if you use a
                contenttype/slug combination. Otherwise use a proper URL, like
                `http://example.org`.
```

Then, in your templates you can insert the correct link, depending on what the
editor provided:

```twig
{% if record.contentlink %}
    <a href="{{ absolute_link(record.contentlink|e) }}">Read more</a>
{% endif %}
```

This way, the website will show a correct relative or absolute link, if the
editor provided something like `page/about` or `https://bolt.cm`.

## Generate absolute links using `{{ absolute_url() }}`

Often a link like `/foo/bar` is preferred over an absolute one which includes
the scheme and the domain name. This is because it can prevent cross-domain
quirks and other inconsistencies. Sometimes, however, you need absolute links.
For example when generating a feed, an email or content that's consumed by a
remote API.

For these cases, the `absolute_url` function is very useful. It takes a
relative url, and transforms it into an absolute one. You can use it on links
to content and file assets alike. For example:

```twig
{# Example use with a link to content #}
<a href="{{ absolute_url( record.link() ) }}" />

{# Example use with `asset` #}
<img src="{{ absolute_url( asset('kitten.jpg', 'files') ) }}" />

{# Example use with `image` #}
<img src="{{ absolute_url ( record.image ) }}" />
```

For more in-depth information about this function, see
[absolute_url][absolute_url] in the Symfony documentation.

[symfonyasset]: http://symfony.com/doc/current/templating.html#templating-assets
[page]: http://symfony.com/doc/current/templating.html#linking-to-pages
[absolute_url]: https://symfony.com/doc/current/reference/twig_reference.html#absolute-url
