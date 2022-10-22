---
title: Twig functions
---

Twig functions
==============

## absolute_link

Use `absolute_link` to create a proper link to either a relative page, or to an
external source. In the below example, the editor can provide either
`page/about`, or `https://boltcms.io`, and both will work:

```twig
<a href="{{ absolute_link(block.contentlink|e) }}">Read more</a>
```

See also [Linking in templates][linkintpl], with a detailed
description of a good use case.


## absolute_url

Use `absolute_url` to create a full link with scheme and domain name from a link

See also [Linking in templates][linkintpl], with a detailed
description of a good use case.


## all_related_content()

See [related_all filter](#related-all-bidirectional-true-limit-true-pubishedonly-true)


## asset

Use the `{{ asset() }}` Twig function to create public link to the so-called
assets in your theme, like JavaScript, CSS or other files.

For more information, see [Linking in templates][linkintpl-asset].

## canonical

Use the `canonical` Twig function to create a valid URI to the current page, to
use in as an external link. If a path is given, returns the `canonical` URL for that given path.

For more information, see [Linking in templates][linkintpl-pathurl].


## countwidgets()

Please refer to the [widgets][widgets-page] documentation.


## dump()

Dumps the entire object, similar to PHP's `var_dump`

```twig
{% set about = content('page', {'slug': 'about'}) %}

{{ dump(about) }}
```

For more info on debugging your Bolt site, see the chapter on
[Debugging Bolt][debugging-page].

<p class="note"><strong>Note:</strong> Don't forget to set <code>APP_DEBUG=1
</code> in your <code>.env</code> file. Otherwise the
<code>dump()</code> will output nothing at all.</p>


## excerpt()

See [excerpt filter][excerpt_filter].

## field_factory

The field factory function creates a field on the fly with a name and optional definition.

| Parameter      | Description |
|----------------|-------------|
| `name`         | The name of the field |
| `definition`   | The definition of the field, same options as a field definition in `contenttypes.yaml`  |

```twig
{% set field = field_factory('title', { 'type': 'text', 'label' : 'Awesome title' }) %}
```


## find_translations(field, *locale=null*)

Returns an array of all translated versions of the specified field, if the `locale` parameter is not give/null.
When `locale` is specified, returns only the translation for that locale if it exists, and null otherwise.
In that case, the `find_translation()` function works like the [translated](#translated-locale) filter.

```twig
{% set translated_array = find_translations(fieldwithtranslations) %} # returns an array of translated fields
{% set translated = find_translations(fieldwithtranslations, 'nl') %} # returns the NL translation, or null if it does not exist.
```


## first_related_content()

See [related_first filter](#related-first-name-null-contenttype-null-bidirectional-true-publishedonly-true)


## getuser()

Sometimes you need to fetch a specific record based on the correct user. In
cases like these, You'll need to be able to get the data for this user, and the
user's id. For these occasions, the function `getuser` comes in
handy.

To fetch a user, pass at least one of the arguments below:

| Argument name | Explanation        |
| ------------- |--------------------|
| `username`    | Search by username |
| `id`          | Search by id       |
| `displayname` | Search by display name |
| `email`       | Search by email    |

Example 1: Getting a user

```twig
    {{ getuser(username = 'admin') }} {# fetches the user with username 'admin'. If it does not exist, returns null #}
    {{ getuser(id = 1) }} {# fetches the user with id '1' #}
    {{ getuser(displayname = 'Administrator') }}
    {{ getuser(email = 'admin@example.org' }}

    {# Or even like this: #}
    {{ getuser(username = 'admin', id = 1) }}
```

Example 2: Using in `setcontent`

```twig
{% setcontent pages = "pages" where { ownerid: getuser('admin').id } %}
```

### User properties

Every user in Bolt has the following properties: `id`, `username`, `email`, `displayname`, `lastIp`,
`roles`, `lastseenat`, `locale`, `backendtheme` and `disabled`.

The user also has a `password` property, but for security reasons the value of that property
will always be empty.

For example, here is how to fetch the user with `username = 'admin'` and use its properties:

```twig
    {% set firstuser = getuser(username='admin') %}
    <p>Username: {{ firstuser.username }} </p>
    <p>Last seen: {{ firstuser.lastseenat|date }} </p>
    <p>User locale: {{ firstuser.locale }} </p>
```

## haswidgets()

Please refer to the [widgets][widgets-page] documentation.

## htmllang()

Returns the appropriate code for the `lang` attribute of the `<html>` tag for
the current locale.

This Twig function will output the currently set locale in a suitable format
for the HTML lang attribute in your templates. For example, if you've set
`locale: en_GB`, this is the result:

```twig
<html lang="{{ htmllang() }}">

# <html lang="en-GB">
```

## icon(*record=null*, *icon='question-circle'*)

Returns an `<icon>` tag using FontAwesome icons. This function has two usages:
to get the icon for the given record, or if `record=null`, to get the icon specified in the `icon` parameter.

### Record icon

When a contenttype record is passed, the `icon` function first looks for the `icon_one` definition
in your `contenttypes.yaml`. If this is not set, then the `icon_many` setting is used instead.

Assuming Bolt's default `showcases` contenttype:
```twig
{{ icon(showcase) # returns <i class='fas mr-2 fa-gift'></i> }}
```

### Icon specified in icon parameter

The `icon` function can also be used to return any of FontAwesome's icons. This happens when the first
parameter is set to null, and the second parameter is the icon to retrieve.

```twig
{{ icon(null, 'biking') # returns <i class='fas mr-2 fa-biking'></i> }}
```

## include

Use this to include another Twig template in the current template. Twig parses
the template like any other template, so included templates have access to the
variables of the active template, e.g. those that you would use in the 'main'
template.

You can also use `include` inside the included templates.

```twig
{{ include('_header.twig') }}
```

For more information, see [include][inc].

An alternative to using 'include', is to set up your templates using Template
Inheritance. This is a method of defining a base template, and then expand it in
more detail in the templates that extend this base template. See the section on
[Template inheritance][inheritance] on the twig website.

## list_templates(templateselect)

Returns the templates for the `templateselect` field. Note the `list_records()` function
should only be called with instances of templateselect.

## listwidgets

Please refer to the [widgets][widgets-page] documentation.


## locale(localecode)

Returns the locale for the given localecode. Please refer to the [locales][locales-page] documentation.

## locales()

Takes the list of codes of the locales (languages) enabled in the
application and returns an array with the name of each locale written
in its own language (e.g. English, Français, Español, etc.).

```twig
{% for locale in locales() %}
    <p>
        {{ locale.emoji }}
        {{ locale.flag }}
        {{ locale.code }}
        {{ locale.name }}
        {{ locale.localizedname }}
        {{ locale.link }}
        {{ locale.current }}
    </p>
{% endfor %}
```

Will output something like:

```html
<p>🇬🇧 gb en English English {{ link-to-translated-page }} 1</p> <!-- 1 because current is truthy -->

<p>🇳🇱 nl nl Dutch Nederlands {{ link-to-translated-page }}</p>

<p>🇯🇵 jp ja Japanese 日本語 {{ link-to-translated-page }}</p>

<p>🇳🇴 no nb Norwegian Bokmål norsk bokmål {{ link-to-translated-page }}</p>
```

Please refer to the [locales][locales-page] documentation.

## markdown(content)

See [markdown filter][markdown_filter].

## media()

See [media filter][media_filter].


## next_record()

See [next filter][next_filter].


## path()

Use the `path` Twig function to create valid URI strings to paths configured on
your site.

For more information, see [Linking in templates][linkintpl-current].


## popup()

To insert an image in the HTML, which functions as an image popup use either
the `popup` function or filter.

You can optionally provide the width, height and cropping parameters, like you
can do with the `thumbnail` filter.

```twig
{{ record.photo|popup(100, 100, "r") }}
or
{{ popup("2020-08/foo.jpg", 100, 100) }}
```

By default, Magnific will display the filename under the image in the popup.
You can specify another value for this caption by using a fourth parameter
(e.g alt or title tag).

```twig
{{ popup("2020-08/foo.jpg", 100, 100, 'My title') }}
or
{{ popup("2020-08/foo.jpg", 100, 100, record.values.image.alt) }}
```

Note that you should include the Magnific Popup `.js` and `.css` yourself, as
well as set up the 'initialization' code:

```twig
<script src="/app/view/js/jquery.magnific-popup.min.js"></script>
<link rel="stylesheet" type="text/css" href="/app/view/css/magnific-popup.css">

{# set up lightbox script here, or do this in your own .js file somewhere #}
<script type="text/javascript">
  $(document).ready(function() {
    $('.magnific, div.imageholder a').magnificPopup({
        type: 'image'
        // other options
    });
  });
</script>
```

For more information about Magnific Popup, see the
[Magnific Popup website][popup].



## previous_record()

See [previous filter][previous_filter].



## redirect

Use this function to redirect from a page to another page or domain. Commonly
used in an if/else clause, to redirect visitors based on some criteria.

```twig
{% if record.image!="" %}
    <a href="{{ image(record.image) }}">
        <img src="{{ thumbnail(record.image, 400, 260) }}">
    </a>
{% else %}
    {# passive-aggressive way to tell people to find their own image #}
    {{ redirect('http://images.google.com/') }}
{% endif %}
```

```twig
{% setcontent records = "pages" limit latest 5 %}
{% for record in records %}

    <h2><a href="{{ record|link }}">{{ record.title }}</a></h2>
    <p>{{ record.excerpt() }}</p>

{% else %}

    {{ redirect(path('homepage')) }} or {{ redirect('page/some-page') }}

{% endfor %}
```

## related_content()

See [related filter](#related-name-null-contenttype-null-bidirectional-true-publishedonly-true)

## select_options(selectfield)

Returns an array of all options of the select field. Each array contains the `key`, `value` and a `selected` flag
for the select option. Note the `select_options()` function should only be called with instances of select fields.

Example output of `select_options(field)`
```twig
array:3 [▼
  0 => array:3 [▶
    "key" => "milk"
    "value" => "Milk"
    "selected" => false
  ]
  1 => array:3 [▶
    "key" => "cake"
    "value" => "Cake"
    "selected" => true
  ]
  2 => array:3 [▶
    "key" => "egg"
    "value" => "Egg"
    "selected" => false
  ]
]
```

For more select fields, check out the [Select field][select-page] page.

## url

Use the `path` Twig function to create valid URL strings to paths configured on
your site.

For more information, see [Linking in templates][linkintpl-pathurl].


## widgets()

Please refer to the [widgets][widgets-page] documentation.


[widgets-page]: ../templating/widgets
[debugging-page]: ../debugging
[select-page]: ../fields/select
[locales-page]: ../localization/locales
[linkintpl]: ../templating/linking-in-templates
[linkintpl-asset]: ../templating/linking-in-templates#using-asset-to-link-to-assets-or-files
[linkintpl-pathurl]: ../templating/linking-in-templates#using-path-and-url-to-link-to-named-routes
[linkintpl-current]: ../templating/linking-in-templates#linking-to-the-current-page
[twig]: http://twig.symfony.com/doc/templates.html
[inc]: http://twig.symfony.com/doc/functions/include.html
[inheritance]: http://twig.symfony.com/doc/templates.html#template-inheritance
[number]: http://twig.symfony.com/doc/filters/number_format.html
[popup]: http://dimsemenov.com/plugins/magnific-popup/
[strftime]: http://php.net/manual/en/function.strftime.php
[date]: http://php.net/manual/en/function.date.php
[for]: http://twig.symfony.com/doc/tags/for.html
[switch]: http://php.net/manual/en/control-structures.switch.php
[extras]: ./twig-components/extras
[excerpt_filter]: ./filters#excerpt
[excerpt_filter]: ./filters#excerpt
[previous_filter]: ./filters#previous
[next_filter]: ./filters#next
[markdown_filter]: ./filters#markdown
[media_filter]: ./filters#media