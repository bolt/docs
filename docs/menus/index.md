---
title: Creating Menus
short_title: Menu
pages:
  - detailed
  - dynamic
  - custom
---
Creating menus
==============

Bolt has built-in functionality to create menus in your frontend templates. You
can define one or more menus in the file `config/bolt/menu.yaml`, which can then
be inserted in your templates using the `{{ menu() }}` tag.

To change one or more of the menus, edit the file `config/bolt/menu.yaml`. You
can add more separate menus, if you wish, and each menu can have one level of
items below it. See the default `menu.yaml` for an example of the supported
options:

```yaml
main:
  - label: Home
    title: This is the first menu item. Fo shizzle!
    link: homepage
    class: first
  - link: entry/1
    label: Second item
    submenu:
      - label: Sub 1
        link: entry/2
      - label: Sub 2
        class: menu-item-class
        link: entry/3
```

In this case `main` is the name of the menu. The options are:

| Option     | Description |
|------------|-------------|
| `label` | override the 'title' of the record with a defined label. If omitted, the 'title' of the record is used. |
| `title` | used as a 'title'-attribute in the rendered HTML. If omitted this can be substituted for the `subtitle`-field in a record. |
| `class` | used to define an HTML `class`-attribute  |
| `link` | the `link` to a Bolt record, group of records or an external site. For example `link: page/about` will make this item link to a record of type 'page'  with the slug 'about'. `link: page/1` will link to the 'page' with id '1'. `link: entries` will link to the `/entries` overview page. `link: https://bolt.cm` will link to that external website. |
| `submenu` | defines a submenu. In the submenu you can define other items, with the same options as before. |

To insert a menu in your templates, use

```twig
{{ menu() }}
```

If you have more than one menu, you should use its name to make sure you get
the intended one:

```twig
{{ menu('foo') }}
```

Much more information on rendering menus in your templates can be found on the page on [menus in the Twig Components section][twig].

[twig]: ../twig-components/menu

