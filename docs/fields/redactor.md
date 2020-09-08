---
title: Redactor field
---
Redactor field
==========

Provides a "Redactor" field type, which is a sophisticated,
lightweight and elegant WYSIWYG editor component for
[Bolt](https://boltcms.io). The editor itself is developed by
[Imperavi](https://imperavi.com/redactor), and is licensed for usage in Bolt.

This extension allows you to add fields of `type: redactor` in your
ContentTypes, as defined in `contenttypes.yaml`, like any other Field type.

## Basic Configuration:

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
buttons][buttons]. Note that some buttons might require you to enable the
corresponding plugin as well. See here for a list of
[the available plugins][plugins].

## Settings

Where applicable, you can add extra settings under the `default:` key in the
`bolt-redactor.yaml` configuration. See the documentation for available
settings.

Note that this documentation uses Javascript, whilst Bolt's configuration uses
Yaml. For example, the documentation for '[Paste][paste]' has this example:

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
[for Creating Plugins][create-plugin], you can add it to the editor in Bolt, by
placing it in `/public/assets/redactor/_plugins`. Then, add it to the
`bolt-redactor.yaml` configuration:

```yaml
default:
  buttons: [ … ]
  plugins: [ … ]

plugins:
  myplugin: [ 'myplugin/myplugin.js', 'myplugin/myplugin.css' ]
```
