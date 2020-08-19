---
title: Twig filters
---

Twig filters
============

## current

Checks if a given record or menu corresponds to the page being shown in the browser.
Useful for adding 'active' states to menus and such.

```twig
{% if page|current %}class="current"{% endif %}
```

or:

```twig
{% if page|current %}
    Yes, {{ page.title }} is the current page.
{% else %}
    No, you're viewing another page than {{ page.title}}
{% endif %}
```

## date

```twig
{{ content.datecreated|date("M d, ’y")}}
```

See the various options for 'date' on the [PHP website][date].

<p class="note"><strong>Note:</strong> This filter does <em>not</em> display a
localized version of the date. Use the <code>{{ localdate }}</code>-filter if
you want to display dates in other languages than English.</p>

## edit_link

Returns the edit link for the record in the Bolt backend.

## excerpt

The Excerpt filter creates a short, text-only, excerpt of a record or a string. It's
useful to get short blurbs of text for overview pages, listings, et cetera. If
you pass it a string, it will simply strip out HTML and, reduce it to a given
length:

```twig
{% set text = "Bonum patria: miserum exilium. Ut optime, secundum" %}
{{ text|excerpt(10) }}

=> Bonum pat…
```

If you get an excerpt of a Record, Bolt will attempt to get an excerpt that's
representative of the Record. If it has a recognisable title, it will start
with that, and it will use the other text-fields to complete it. In fact, it's
the same function that's used in the Bolt backend, on the dashboard. See also [extras][extras].

```twig
{% setcontent page = "pages/1" %}
{{ page|excerpt(200) }}

=> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Videsne quam sit magna
dissensio? Cum ageremus, inquit, vitae beatum et eundem supremum diem, scribebamus haec.
Duo Reges: constructio int…
```

It is also possible to highlight a keyword in an excerpt, which can be used in
search results.

```twig
{% set keyword = 'ageremus' %}{# this is the keyword you want to highlight #}
{% set include_title = false %}{# this will include the title in the results #}
{% setcontent page = "pages/1" %}
{{ page|excerpt(200, include_title, keyword|default('')) ) }}

=> …consectetur adipiscing elit. Videsne quam sit magna dissensio? Cum <mark>ageremus</mark>,
inquit, vitae beatum et eundem supremum diem, scribebamus haec. Duo Reges: constructio int…
```

| Parameter      | Description |
|----------------|-------------|
| `length`       | The maximum length of the excerpt                        |
| `includeTitle` | Whether to include the "title" in the excerpt or omit it |
| `focus`        | keyword to be highlighted with `<mark>` in the excerpt   |

## image

Use this modifier to create a link to an image of your choosing. For example:

```twig
<img src="{{ content.photo|image }}">
```

If `content.photo` is an image in your `files/` folder, like `2020-11/foo.jpg`,
this modifier will output a link like `/files/2020-11/foo.jpg`. This is useful
for creating absolute links to an image, regardless of whether Bolt is installed
in the root of your domain, a subdomain or a folder.

You can specify three parameters: the width, height, and the mode of cropping.
By doing so, the image will be resized, and it behave exactly like the
[thumbnail filter](#thumbnail).

```twig
<img src="{{ content.photo|image(100, 100, "s") }}">
```

To scale an image proportionally to a given width or height,
set the other dimension to `null`, and set cropping mode to contain.

```twig
<img src="{{ content.image|image(400, null, "n") }}">
```

See also [extras][extras].

## json_records

Encodes the given array of records into json.

## label

Returns the label of the field, as defined in the field's `contenttypes.yaml`
definition.

## localdate

Outputs a localized, readable version of a timestamp.

| Parameter  | Description |
|------------|-------------|
| `format`   | `Optional` The format used to display. If not provided, the default `date_format` from `config/config.yaml` will be used instead.        |
| `locale`   | `Optional` The locale (language) in which to translate the date. If not provided, the default locale from `config/services.yaml` will be used instead.

<p class="tip">To check all available date formats, please refer to the official php documentation
<a href="https://www.php.net/manual/en/function.date.php">
https://www.php.net/manual/en/function.date.php</a></a></p>

```twig
    {{ record.publishedAt|localdate }} {# Display published date with default format and locale #}
    {{ record.publishedAt|localdate(format='F j, Y H:i') }} {# Display published date with custom format and default locale #}
    {{ record.publishedAt|localdate(locale='nl') }} {# Display published date with default format and custom locale #}
    {{ record.publishedAt|localdate(format='F j, Y H:i', locale='nl') }} {# Display published date with default format and custom locale #}

    {{ "now"|localdate }} {# Display the current date and time #}
```

## markdown

Transforms the given markdown content into HTML content, i.e. parses markdown
into HTML.

## media

Returns the media array associated with the field. Note, this should only be
used with image and file fields.

## normalize_records

Returns an array of normalized records.

## order

In most cases the results of `{% setcontent %}` or `{{ record|related() }}` are
in the desired order. In some cases you might want to reorder them, by using the
`order`-filter.

| Parameter  | Description |
|------------|-------------|
| `on`       | The first field to order on. Appending a <code>-</code> will result in descending order. Default is <code>-datepublish</code> |
| `onSecondary` | If two records have the same <code>on</code> order, this is used to determine the appropriate order. |

```twig
{% set relatedrecords = record|related() %}
<p class="meta">Related content:
    <ul>
    {% for related in relatedrecords|order('datepublish') %}
        <li><a href="{{ related|link }}">{{ related.title }}</a></li>
    {%  endfor %}
    </ul>
</p>
```

or:

```twig
{# get the 10 latest entries by date, but sort them on the title field #}
{% setcontent entries = "entries/latest/10" %}
<ul>
{% for entry in entries|order('title', 'subtitle') %}
    <li><a href="{{ entry|link }}">{{ entry.title }}</a></li>
{%  endfor %}
</ul>
```

**Note:** Ordering with the `order`-filter is case sensitive. This means that
'banana' will come _before_ 'Apple'. If you're sorting on a title or name field
and this case sensitivity is undesirable, you can use `|order('slug')` instead.
The slug is always lowercase, so this will normalize the ordering.

## plaintext

Use this modifier to return a "plaintext" version of the string. For example:

```twig
{% set text = "Bonum patria: señor & <em>éxilium</em>!" %}
{{ text|plaintext }}

=> Bonum patria: señor & éxilium!
```

This returns a string with letters, numbers and common extra characters, but
without HTML tags. This makes the output very suited for - for example - use in
`<title>` tags.

The main difference between this filter and `|striptags` is that the output of
this filter is marked as HTML in Twig, meaning that characters like `&` and `'`
will not be escaped. If you wish these to be escaped, use `|striptags` instead.

## popup

See [popup function][popup_function]


## preg_replace

Makes PHPs `preg_replace()` function available as twig filter. Example usage:

```twig
{{ content.text|preg_replace('/[^a-z]+/', '_') }}
```

## previous and next

### previous
Returns the previous record from the database.
By default, `|previous` finds the left adjacent element for the
same contenttype using the record's database id.

```twig
{% set record_before = record|previous %}
```

| Parameter         | Description |
|-------------------|-------------|
| `byColumn`        | Sort records based on the passsed column's value. Default is `id` |
| `sameContentType` | If set to `true`, it only sorts records of the same contenttype. Default is `true` |

### next

Returns the next record from the database.
By default, `|next` finds the right adjacent element for the
same contenttype using the record's database id.

```twig
{% set record_after = record|next %}
```

| Parameter         | Description |
|-------------------|-------------|
| `byColumn`        | Sort records based on the passsed column's value. Default is `id` |
| `sameContentType` | If set to `true`, it only sorts records of the same contenttype. Default is `true` |


## raw

If the content contains HTML-fields, they will be rendered with escaped
characters by default. If you want to use the HTML as-is, add the raw modifier:

```twig
{{ page.tite|raw }}
```

If we didn't add the `raw` modifier, all '<' and '>' characters in the body
would be output as '&amp;lt;' and '&amp;gt;' respectively. If 'body' is an HTML
field in our ContentType, we want it to be output as normal HTML, so we have to
add the `raw` modifier.

## related

Returns an array of records that are related to the given record.

| Parameter      | Description |
|----------------|-------------|
| `name`         | The related content's name or contenttype. If not set, it will fetch all related records. |
| `bidirectional`| Performs bidirectional search. Default is `true` |
| `limit`        | Limits the number of related records that are returned.  |
| `publishedOnly`| Return only related records that are published. Default is `true` |

```twig
{% set relatedrecords = record|related() %}
<p class="meta">Related content:
    <ul>
    {% for related in relatedrecords %}
        <li><a href="{{ related|link }}">{{ related|title }}</a></li>
    {%  endfor %}
    </ul>
</p>
```

## related_by_type

Returns a two-dimensional array of related records, where the first key is the contenttype.

```
    [
        'entries' => [ related_entry_1, related_entry_2, ... ],
        'pages' => [ related_page_1, related_page_2, ... ]
    ]
```

| Parameter      | Description |
|----------------|-------------|
| `bidirectional`| Performs bidirectional search. Default is `true` |
| `limit`        | Limits the number of related records that are returned.  |
| `publishedOnly`| Return only related records that are published. Default is `true` |

## related_first

Returns the first of the returned related records.

| Parameter      | Description |
|----------------|-------------|
| `name`         | The related content's name or contenttype. If not set, it will fetch all related records. |
| `bidirectional`| Performs bidirectional search. Default is `true` |
| `publishedOnly`| Return only related records that are published. Default is `true` |

## round, ceil and floor

The `round` modifier can be used to round numbers (or
strings containing a numerical-like values) to the nearest integer, which
basically means "whole number".

```twig
{% set pi = 3.141592 %}

Rounded, Pi is {{ pi|round }} {# "3" #}

The constant Pi is somewhere between {{ pi|round(1, 'floor') }} and {{ pi|round(1, 'ceil') }}
{# "3 and 4" #}
```

If you need fancier number formatting than this, you can use the built-in Twig
`number_format`-filter. See the [docs here][number].


## safestring

Use this modifier to return a "safe" version of the string. For example:

```twig
{% set text = "Bonum patria: miserum exilium. Ut optime, secundum" %}
{{ text|safestring(true) }}

=> bonum-patria-miserum-exilium-ut-optime-secundum
```

Characters in the string are converted to lowercase, accented ones are converted to their lowercase ASCII equivalent.
Punctuation signs, and trailing space if present, are replaced by hyphens.

You can specify two parameters: strict mode and extrachars.

  - Strict mode (boolean, default to false): spaces are converted to hyphens.
  - Extra chars (string, default to empty): A string containing extra non-alphabetical characters to keep in result.

```twig
{# Default settings #}
{% set text = "Bonum patria: miserum exilium. Ut optime, secundum" %}
{{ text|safestring() }}

=> bonum patria-miserum exilium-ut optime-secundum

{# Strict mode #}
{% set text = "Bonum patria: miserum exilium. Ut optime, secundum" %}
{{ text|safestring(true) }}

=> bonum-patria-miserum-exilium-ut-optime-secundum

{# Keep dots #}
{% set text = "my beautiful image.jpg" %}
{{ text|safestring(true, ".") }}

=> my-beautiful-image.jpg
```

## showimage

Use this filter to insert an image in the HTML. You can optionally provide the
width, height and cropping parameters, like you can do with the `thumbnail`
filter.

```twig
{{ record.photo|showimage(800, 600) }}
or
{{ showimage("2020-03/foo.jpg", 800, 600) }}
```

## selected

Returns all selected records from the content select field. Note, this filter
should only be used on select fields that select from a list of Content, as
opposed to a list of items.

For a Content select field with `multiple: false`:
```twig
{% set selected_record = record.select_field|selected %}

{{ selected_record.id }} {{ selected_record|title }}<br>
```

For a Content select field with `multiple: true`:
```twig
{% set selected_records = record.select_field|selected %}

{% for selected_record in selected_records %}
    {{ selected_record.id }} {{ selected_record|title }} <br>
{% endfor %}
```

## shuffle

Randomly shuffles the passed array.

## shy

The "soft hyphenate" filter can be used for strings without spaces, that would
otherwise break the layout of your page. By adding these soft hyphens, the
browser knows it can wrap to the next line. For example:

```
|                         |
| Before: {{ file }}      |
| MyVeryLongFilenameWithoutSpacesOrDashesOrWhatever.jpg |
|                         |
| After: {{ file|shy }}   |
| MyVeryLongFilenameWith- |
| outSpacesOrDashesOrWha- |
| tever.jpg               |
|                         |
```

## slug

The `slug` filter can be used to transform any string into a slug-like value.
This can be very useful when you're hand-crafting links to categories, pages or
other structures where you need a URL-safe representation of a string.

In this example, we build links to all category listing pages:

```twig
<ul>
{% for category in app.config.get('taxonomy/categories/options') %}
    <li><a href="/category/{{ category|slug }}">{{ category }}</a></li>
{% endfor %}
<ul>
```

## svg

Use this filter to render an inlined SVG image. For example:

```twig
{{ content.photo|svg }}
```

If `content.photo` is an svg image (see [image filter](#image)), this filter
will output the contents of the svg file as plain HTML, for example:

```html
<svg height="100" width="100">
  <circle cx="50" cy="50" r="40" stroke="black" stroke-width="3" fill="red" />
  Sorry, your browser does not support inline SVG.
</svg>
```

If the `|svg` filter is called on a variable that is not an svg image, it will
not output anything.

To render an inlined svg, and a standard `<img>` tag otherwise, use this:

```twig
{% if content.photo|split('.')|last == 'svg' %} {# if extension is `.svg` #}
    {{ content.photo|svg }}
{% else %}
    {{ content.photo|showimage }}
{% endif %}
```

## taxonomies

Returns an array of all taxonomies linked to the record.

## thumbnail

Use this modifier to create a link to an automatically generated thumbnail of a
size of your choosing. For example:

```twig
<img src="{{ content.image|thumbnail(320, 240) }}">
```

If `content.image` is an image in your `files/` folder, like `foo.jpg`, this
modifier will output a link like `/thumbs/320x240/foo.jpg`. This is useful for
creating absolute links to a thumbnail, regardless of whether Bolt is installed
in the root of your domain, a subdomain or a folder.

| Parameter         | Description |
|-------------------|-------------|
| `width`           | The desired width of the resulting image. If empty, it will be relative to the height. |
| `height`          | The desired height of the resulting image. If empty, it will be relative to the width. |
| `location`        | An extra parameter to specify the location (folder) of the image on the server. Default is `files`, which is where the images are stored. |
| `path`            | The path to the image within the current location. |
| `fit`             | Specify the mode of cropping. See below. |

The mode of cropping is important if you're requesting a thumbnail that has
different proportions than the original image. Valid options for cropping are:

  - `n` ('contain', 'default') - Makes sure you always get an image that fits the
    specified width and height. The image is not transformed, so it will be
    resized to fit the boundaries that are necessary.
  - `m` ('max') - Resizes the image to fit within the width and height
    boundaries without cropping, distorting or altering the aspect ratio,
    and will also not increase the size of the image if it is smaller than
    the output size.
  - `f` ('fill') - Resizes the image to fit within the width and height boundaries
    without cropping or distorting the image, and the remaining space is filled
    with the background color. The resulting image will match the constraining dimensions.
  - `s` ('stretch') - Stretches the image to fit the constraining dimensions exactly.
    The resulting image will fill the dimensions, and will not maintain the aspect
    ratio of the input image.
  - `c` ('crop') - Resizes the image to fill the width and height boundaries and crops any
    excess image data. The resulting image will match the width and height
    constraints without distorting the image.

Use the fit parameter like this:

```twig
<img src="{{ content.image|thumbnail(width=100, height=100, fit="f") }}">
```

If you omit the width and height altogether, the thumbnail will use the
'default' size and cropping mode. Remember to add quotes around the cropping
mode.

```twig
<img src="{{ content.image|thumbnail }}">
```

## title

The Title filter creates a short, text-only, title of a record. It'll produce
a suitable title-like output that can be used for overview pages, listings, et
cetera. It does this, regardless of the actual structure of the ContentType. It
looks at fields named 'title' or 'heading', or at the fields used in the slug,
but as long as there's any text fields, you'll get a consistent and useable
output.

| Parameter  | Description |
|------------|-------------|
| `locale`   | The locale to generate the title for |
| `length`   | The maximum length of the title      |

<p class="note"><strong>Note:</strong> Twig supports named parameters. So, if
you want to set the length of the title, without having to explicitly set the
locale, you can use this: <code>{{ record|title(length = 100) }}</code>.</p>


## translate

Returns the field translate into the requested locale.

| Parameter      | Description |
|----------------|-------------|
| `locale`       | The requested translation's locale, as a string. |

```twig
    {% set image_nl = record.image|translate('nl') %}
```

<p class="warning"><strong>Note:</strong> The <code>|translate</code> filter
will return the field in the requested locale, but it will also
change the locale of the <code>record.image</code> itself.</p>


## type

Returns the field type of the field, as defined in the field's
`contenttypes.yaml` definition.

## ucwords

Converts the first character of every word into upper case.

## url_decode

This filter does the opposite of Twig's built-in `url_encode` filter: It
decodes a given URL-encoded string, replacing any `%##` encoding in the given
string. Plus symbols ('+') are decoded to a space character.

```twig
{{ "Mot%C3%B6rhead%20and%20Mg%C5%82a%20are%20cool"|url_decode }}

=> Motörhead and Mgła are cool
```

It works both on plain strings, as well as encoded arrays of URL parameters:

```twig
{% set params = {'param1': 'value', 'foo': 'bar', 'qux': 'Motörhead and Mgła are cool'} %}

{{ dump(params) }}
{{ dump(params|url_encode) }}
{{ dump(params|url_encode|url_decode) }}
```

![](https://user-images.githubusercontent.com/1833361/90623780-405a3400-e217-11ea-8fc8-b0a908530117.png)

<p class="warning"><strong>Note:</strong> If you're simply trying to get a 
parameter from the URL, you might want to use the built-in <code>app.request</code> 
instead. For example: <code>{{ app.request.get('foo') }}</code>.</p>

[widgets-page]: ../templating/widgets
[debugging-page]: ../debugging
[select-page]: ../fields/select
[locales-page]: ../other/locales
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
[popup_function]: ./functions#popup-magnific-popup
