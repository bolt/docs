---
title: Redactor field
---
Redactor field
==========

Provides a "Redactor" field type, which is a sophisticated,
lightweight and elegant WYSIWYG editor component for
[Bolt](https://boltcms.io). The editor itself is developed by
[Imperavi](https://imperavi.com/redactor), and is licensed for usage in Bolt.

The Redactor extension ships with Bolt by default. If you're on a custom install, 
it might need to be installed before you can use it in your website. If so, run 
the following command to install it: 

```
composer require bolt/redactor
```

This extension allows you to add fields of `type: redactor` in your
ContentTypes, as defined in `contenttypes.yaml`, like any other Field type.

## Basic Configuration:

To add Redactor fields in your ContentTypes, use `type: redactor` in `contenttypes.yaml`:

```yaml
        content:
            type: redactor
```

## Example usage in templates:

To print out the Redactor field you just need to do in your templates:

```twig
{{ record.content }}
```

The result will look like this:

![image](https://raw.githubusercontent.com/eduardomart/docs/patch-15/bolt_v4_redactor_field.png)

You can configure the editor in `config/extensions/bolt-redactor.yaml`. This
configuration affects all the instances of the Redactor field that you've
configured in your ContentTypes. The default configuration looks like this:

```yaml
default:
  buttons: [ bold, italic, format, lists, link, html, image ]
  plugins: [ fullscreen, table, inlinestyle, video, widget ]
  source: true

plugins:
  ~
```

## Configuring the buttons

Bolt's version of Redactor ships with all the official plugins and options. you
can add or remove buttons by configuring them in the `buttons:` and `plugins:`
parameters. Check the official Redactor documentation for [all available
buttons](https://imperavi.com/redactor/docs/settings/button/). Note that some buttons might require you to enable the
corresponding plugin as well. See here for a list of
[the available plugins](https://imperavi.com/redactor/plugins/).

## Settings

Where applicable, you can add extra settings under the `default:` key in the
`bolt-redactor.yaml` configuration. See the documentation for available
settings.

Note that this documentation uses Javascript, whilst Bolt's configuration uses
Yaml. For example, the documentation for '[Paste](https://imperavi.com/redactor/docs/settings/paste/)' has this example:

```javascript
$R('#content', {
        pastePlainText: true
});
```

In `bolt-redactor.yaml` you can add this as:

```yaml
default:
  buttons: [ …]
  plugins: [ … ]
  pastePlainText: true
```

## Adding custom plugins

If you've written your own plugin for Redactor according to the documentation
[for Creating Plugins](https://imperavi.com/redactor/docs/how-to/create-a-plugin/), you can add it to the editor in Bolt, by
placing it in `/public/assets/redactor/_plugins`. Then, add it to the
`bolt-redactor.yaml` configuration:

```yaml
default:
  buttons: [ … ]
  plugins: [ … ]

plugins:
  myplugin: [ 'myplugin/myplugin.js', 'myplugin/myplugin.css' ]
```

## Input Sanitisation

All content in this field type will be sanitised before it gets inserted into
the database. This means that only 'whitelisted' HTML like `<b>` and
`<img src="…">` is kept, while things like `<embed>` and `<script>` are scrubbed
from the field before being stored. As a site-implementor you can control the
whitelisted tags and attributes using the following section in `config.yaml`:

```yaml
htmlcleaner:
    allowed_tags: [ div, span, p, br, hr, s, u, strong, em, i, b, li, ul, ol, …, … ]
    allowed_attributes: [ id, class, style, name, value, href, src, alt, title, …, … ]
```

To disable sanitisation for this field, you can add `sanitise: false` to the field config, like so:

```yaml
        title:
            type: redactor
            sanitise: false
```
