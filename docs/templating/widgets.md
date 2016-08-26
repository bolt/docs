---
title: Using widgets
---
Using widgets
=============

Widgets in Bolt are small blocks of content, that can be used to display
content. Examples of this are a small list in the sidebar with "Latest entries"
or "The current weather".

By design, the widget has no access to the context of the page it is being
displayed on. This is because a Widget is a small block of content that can be
placed on various locations on a website. This should work regardless of what's
on the page. Or, to flip it around: If the contents of a widget would change
according to what's on the page, it would become a part of the page itself, and
strictly speaking it wouldn't be considered a 'widget' anymore.

One of the main advantages of these widgets is that they are not dependant on
the page they are displayed on, and as such, they can easily be placed on
different locations and in different themes.

Bolt itself does not come with any widgets, so they are usually added by
extensions, as the site-owner sees fit. A good example to get acquainted with
Widgets is the 'base widget', which can be installed directly from Bolt's
'Extras' menu. More information about the extension can be found on the
[Bolt extensions website][boltext]. The full [readme can be found here][read].

Setting up a widget usually consists of two parts:

 - Configuring the widget to assign it to a position, being a named area in the
   template, where it's allowed to be shown.
 - Adding a widget position to your template or theme, making the widget show
   up in that position.

Allowing for widgets in your theme
----------------------------------

Setting up an area in your template or theme, is as simple as:

    {{ widgets('aside_top') }}

You are free to choose any name for the position, but it is good practice to
stick with the default names if possible. This way it'll be easier for
developers to use extensions in your theme, without having to dig through the
template code to find which widget areas are defined.

Commonly used widget positions for the frontend are:

 - main_top
 - main_break
 - main_bottom
 - aside_top
 - aside_middle
 - aside_bottom
 - footer

Setting up the widget
---------------------

As mentioned before, setting up the widget itself is usually done by the
extension that provides the widget. As such, you should check out the
documentation of the extension in order to set up the widget.

Styling widgets, using CSS
--------------------------

Styling widgets in your theme should be minimal. Every widget is rendered in a
container that looks like this:

```
<div class='widget {{ widget.class }}' id='widget-{{ widget.key }}'
    data-key='{{ widget.key }}'>
        [ Widget content goes here ]
</div>
```

You can style the widget holder and its contents in CSS. However, try to
refrain from doing this too precisely, because you ultimately have no control
over what will be displayed in the widget itself.

At the same time, we urge widget developers to not override used fonts, colors
and text styles unless absolutely necessary. The less you change in the CSS,
the more seemless the widget will integrate in websites. When it comes to
widgets in the frontend, there are not many options to influence what they will
look like, by design:

 - The template designer merely allows for widgets to be added to the theme.
   The developer of the website determines which widgets will be shown where on
   the site
 - The developer of the Widget Extensions makes the widgets work, regardless of
   where they are placed.

Other functionality
-------------------

There are a few other Widget-related functions available, to help you integrate
the widgets in your theme, as you wish them to be.

### `countwidgets`
Return the number of widgets in the queue for a given type / location.

    {{ countwidgets('aside_bottom', 'frontend') }}

Note that this function also requires the 'zone' parameter, which is optional
in `widgets`. Zone must be either `frontend` or `backend`.

### `haswidgets`
This function returns whether or not a given location has any widgets assigned
to it. You can use this to display widgets, or a fallback in case there are
none.

```
    {% if haswidgets('aside_top') %}

        {{ widgets('aside_top') }}

    {% else %}

        <p>No widgets defined for this location!</p>

    {% endif %}
```

This function takes an optional second argument for the 'zone':
`haswidgets('dashboard_top', 'backend')`. Zone must be either `frontend` or
`backend`.

### `countwidgets`
This function returns the amount of widgets assigned to the given location.

```
    {{ countwidgets('aside_top') }}
```

This function takes an optional second argument for the 'zone':
`countwidgets('dashboard_top', 'backend')`. Zone must be either `frontend` or
`backend`.

Implementing widgets as extensions
----------------------------------

See the page [Extension Building: Creating widgets][ext], for more information.


[boltext]: https://extensions.bolt.cm/view/082a7153-8205-11e5-86fe-396a68cabe59
[read]: https://github.com/bolt/base-widget/blob/master/README.md
[ext]: ../extensions/intermediate/widgets
