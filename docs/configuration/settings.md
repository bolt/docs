---
section:
title: Configuration Settings

---

Configuration Settings
======================

This page lists most of the common configuration settings, found in the
`config.yaml` configuration file and in the `.env` settings.

Note: Database setup is best done in ENV variables. See the file `.env` in the
project root.

## Config.yaml

### Sitename and Payoff

The name of the website, as shown on the Dashboard and often used as the main
title of the site, depending on your theme.

These can be used in your theme as `{{ config.get('general/sitename') }}` and
`{{ config.get('general/payoff') }}`.

```yaml
sitename: Bolt Core Git Clone
payoff: The amazing payoff goes here
```

### Theme

The theme to use. Dont edit the provided templates directly, because they
_will_ get updated in next releases. If you wish to modify a default theme,
copy its folder, and change the name accordingly.

```yaml
theme: site-2020
```

Set the timezone to be used on the website. For a list of valid timezone
settings, see: [timezones][timezones] on the PHP website.

```yaml
timezone: UTC
```

### Date_format

Set the default time format used on this website. For a list of valid date
format settings, see: [date][date] on the PHP website.

```yaml
date_format: 'F j, Y H:i'
```

### Omit Backgrounds

If you don't like pretty pictures, you can set a preference to omit the
background images on the login screen.

```yaml
omit_backgrounds: true
```

### Omit the `generator` meta tag and `x-powered-by` header

By default, Bolt adds an `generator` meta tag and `x-powered-by` header 
to the output. If you do not wish to include these headers, you can 
disable them using the following: 

```yaml
omit_meta_generator_tag: true
omit_powered_by_header: true
```

### Canonical

If your site is reachable under different urls (say, both `blog.example.org/`
as well as `example.org/`), its a good idea to set one of these as the
canonical, so its clear which is the primary address of the site to be indexed
by search engines.

If you include `https://`, it will be included in the canonical urls.

```yaml
canonical: example.org
```

Bolt can insert a `<link rel="shortcut icon">` for all pages on the site.

Note: The location given is relative to the currently selected theme. If you
want to set the icon yourself in your custom HTML theme, just dont enable the
following line.

```yaml
favicon: images/favicon-bolt.ico
```

### Homepage

The default content to use for the homepage, and the template to render it
with. This can either be a singleton like `homepage`, a specific record (like
`pages/1`) or a listing of records (like `entries`). In the chosen
homepage_template, you will have `record` or `records` at your disposal,
depending on the homepage setting.

Note: If you've changed the filename, and your changes do not show up on the
website, be sure to check for a `theme.yaml` file in your themes folder. If a
template is set there, it will override the setting here.

```yaml
homepage: homepage
homepage_template: index.twig
```

### Not Found (Status `404`)

The default content for the "Not Found" (404) page. Can be an (array of)
template names or identifiers for records, which will be tried until a match is
found. When developing your own theme, be sure to make a nice looking 404 page,
because it'll help visitors find their way, if they inadvertently land on a
non-existing page.

```yaml
notfound: [ blocks/404-not-found, 'helpers/page_404.html.twig' ]
```

### Maintenance Mode (Status `503`)

Toggle maintenance mode on or off. Note: If you're logged in, you'll still see
the website as usual. Use an incognito window to see the "maintenance" page.

```yaml
maintenance_mode: false
```

The default for the "Maintenance mode" (503) page. Can be an (array of) template
names or identifiers for records, which will be tried until a match is found.

```yaml
maintenance: [ blocks/503-maintenance-mode, 'helpers/page_503.html.twig' ]
```

### Forbidden (Status `403`)

The default content for the "Forbidden" (403) page. Can be an (array of) template
names or identifiers for records, which will be tried until a match is found.

```yaml
forbidden: [ blocks/403-forbidden, 'helpers/page_403.html.twig' ]
```

### Internal Server Error (Status `500`)

The default content for the "Internal Server Error" (500) page. Can be an
(array of) template names or identifiers for records.
Note: Only used in `APP_ENV=prod` mode. You're advised to keep this as simple
as possible, because if an error occurs in this template, it can not be
handled, and you'll have a bad time debugging it!

```yaml
internal_server_error: [ 'helpers/page_500.html.twig' ]
```

### Record Template

The default template and amount of records to use for listing-pages on the
site.

Can be overridden for each content type and for each record, if it has a
templateselect field.

Note: If you've changed the filename, and your changes do not show up on the
website, be sure to check for a `theme.yaml` file in your themes folder. If a
template is set there, it will override the setting here.

```yaml
record_template: record.twig
```

### Listing Template

The default template and amount of records to use for listing-pages on the
site.

Can be overridden for each content type.

Note: If you've changed the filename, and your changes do not show up on the
website, be sure to check for a `theme.yaml` file in your themes folder. If a
template is set there, it will override the setting here.

```yaml
listing_template: listing.twig
listing_records: 6
listing_sort: datepublish DESC
```

### Query Search

Allow filtering on listing pages using query parameters, much like you would
with `{% setcontent %}`. E.g. `/pages?order=id` and `/pages?title=%voluptat%`
Useful for search.

```yaml
query_search: true
```

### Maximum Listing

Maximum amount of items to show in a `<select>` for picking a record. For
example in `type: select`.

```yaml
maximum_listing_select: 1000
```

### Search Results

Template for showing the search results. If not defined, uses the settings for
listing_template and listing_records.

Note: If you've changed the filename, and your changes do not show up on the
website, be sure to check for a `theme.yaml` file in your themes folder. If a
template is set there, it will override the setting here.

```yaml
search_results_template: search.twig
search_results_records: 10
```

### Records per page

The default amount of records to show on overview pages in the Bolt backend.
Can be overridden for each content type.

```yaml
records_per_page: 8
```

### Default settings for thumbnails

| Option          | Description |
|-----------------|-------------|
| `quality`       |       Quality should be between 0 (horrible, small file) and 100 (best, huge file).|
| `fit`           |           One of either none, crop (= crop-center), crop-top-left, crop-top, crop-top-right, crop-left, crop-right, crop-bottom-left, crop-bottom or crop-bottom-right. |
| `allow_upscale` | Determines whether small images will be enlarged to fit the requested dimensions. |
| `save_files`    |    Save files in the thumbs/ folder, so subsequent requests will serve file directly. Great for performance |

Note: If you change these values, you might need to clear the cache before
      they show up.

```yaml
thumbnails:
    default_thumbnail: [ 320, 240 ]
    default_image: [ 1000, 750 ]
    quality: 80
    cropping: crop
    save_files: true
    allow_upscale: false
```

### File Permissions

File permissions for read/write/execute to set on folders and files that are
created. The exact permissions you should be setting depends on the system
user that PHP (and/or your webserver) is running as, and the user who owns the
actual folders/files.

 - If they are the same user, use `0o755` for folders and `0o644` for files.
 - If they're in the same group, use use `0o775` for folders and `0o664` for files.
 - If you don't know, or you can't make it work otherwise, then use `0o777` for folders and `0o666` for files.

```yaml
filepermissions:
    folders: 0o775
    files: 0o664
```

### HTML Cleaner

Define the HTML tags and attributes that are allowed in cleaned HTML. This is
used for sanitizing HTML, to make sure there are no undesirable elements left
in the content that is shown to users. For example, tags like `<script>` or
`onclick`-attributes.

Note: enabling options in the `wysiwyg` settings will implicitly add items to
the allowed tags. For example, if you set `images: true`, the `<img>` tag will
be allowed, regardless of it being in the `allowed_tags` setting.

```yaml
htmlcleaner:
    allowed_tags: [ div, span, p, br, hr, s, u, strong, em, i, b, li, ul, ol, mark, blockquote, pre, code, tt, h1, h2, h3, h4, h5, h6, dd, dl, dt, table, tbody, thead, tfoot, th, td, tr, a, img, address, abbr, iframe, caption, sub, super, figure, figcaption ]
    allowed_attributes: [ id, class, style, name, value, href, src, alt, title, width, height, frameborder, allowfullscreen, scrolling, target, colspan, rowspan ]
    allowed_frame_targets: [ _blank, _self, _parent, _top ]
```

### Allowed File Types / Sizes (For Uploading)

Define the file types (extensions to be exact) that are acceptable for upload
in either file fields or through the files screen.

```yaml
accept_file_types: [ twig, html, js, css, scss, gif, jpg, jpeg, png, ico, zip, tgz, txt, md, doc, docx, pdf, epub, xls, xlsx, ppt, pptx, mp3, ogg, wav, m4a, mp4, m4v, ogv, wmv, avi, webm, svg]
```

Alternatively, if you wish to limit these, uncomment the following list
instead. It just includes file types / extensions that are harder to exploit.

```yaml
accept_file_types: [ gif, jpg, jpeg, png, txt, md, pdf, epub, mp3, svg ]
```

```yaml
accept_media_types: [ gif, jpg, jpeg, png, svg, pdf, mp3, tiff ]
```

Set the maximum upload size. Note, this can never exceed the PHP settings for
`post_max_size` and `upload_max_filesize` in `php.ini`.

```yaml
accept_upload_size: 8M
```

### Upload Location

Default location for uploading files. Use `/` to create new directories. These
directories will be created in `public/files/`.

| Option        | Description |
|---------------|-------------|
| `date`        | The current date, formatted as `2020-10-16`. |
| `day`         | The current day of the month. |
| `month`       | The current month. |
| `year`        | The current year. |
| `contenttype` | The current ContentType slug, like `entries` |
| `random`      | Add a short random string hash, like `AB34CD78` |

```yaml
upload_location: "{contenttype}/{year}/{month}/"
```

<p class="note"><b>Note:</b> You can <em>not</em> use the current Record's
<code>slug</code> as (sub)folder for uploading of files. This is because at the
time you're uploading the files, the slug is often not yet known. Let's say you
create a new Page, you upload an image, type a title and then save it. The file
would be uploaded before the given title determines the slug. So, the image
would be uploaded <em>somewhere</em>, but most likely <em>not</em> where the
Editor would expect it. To prevent this confusion, you cannot use
<code>slug</code> in this setting.</p>

### Curl Options

Options to use with curl requests. For all options, check the official [curl
documentation][curl].

```yaml
curl_options:
    verify_peer: false
```

### Fixtures seed

The fixtures are used to generate random content. However, in a testing or 
CI-environment, this randomness might cause side-effects. By setting the seed 
to a fixed number, you can produce the same output every time it runs: 

```yaml
fixtures_seed: 87654
```


### Localization settings

When set to true, fields with empty values in the current locale will fallback to the default 
locale's value.

```yaml
localization:
    fallback_when_missing: true 
```

## .env

Some Application-specific settings are best done in the Environment, instead of
in a configuration file. You can choose to set these as you please (or as your
hosting provider allows), or simply in a `.env` file in the project root.

 - See also [debugging](../debugging#configuring-bolt).
 - See also [database setup](../installation/installation).

```bash
APP_ENV=dev
APP_DEBUG=1
```

```bash
APP_SECRET=fbeba65dd5d06e6c55e79d69d6e8fe8c
```

[curl]: https://curl.haxx.se/libcurl/c/curl_easy_setopt.html
[date]: https://www.php.net/manual/en/function.date.php
[timezones]: http://php.net/manual/en/timezones.php
