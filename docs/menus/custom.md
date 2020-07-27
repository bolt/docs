
Further customizations
======================

That's basically all there's to it. Since the menus use standard Twig tags, we
can enhance the lists with extra features, to automatically give special
classes to the first or last item, or highlight the 'current' page.

Some of the more commonly used 'tricks' are:

  - `index-{{ loop.index }}` - Add the current index of the loop, like
    `index-1`, `index-2`, etc.
  - `{% if loop.first %}first{% endif %}` - Output `first`, but only for the
    first item in the loop.
  - `{% if loop.last %}last{% endif %}` - Output `last`, but only for the last
    item in the loop.
  - `{% if item.current %}active{% endif %}` - Output `active`, but only if
    we're on the page that the item links to.
  - `{% if item.title is defined %}title='{{ item.title|escape }}'{% endif %}`
    - Add a `title` attribute, but only if it's defined in our `.yaml`-file, or
    if the ContentType has a `subtitle` field.
  - `{% if item.class is defined %}class='{{item.class}}'{% endif %}` - Add a
    `class` attribute, but only it the item has a `class` defined in the
    `.yaml`-file.

See the default `/bolt/templates/helpers/_sub_menu.twig` file for an in-depth
example of all of the things you can do with menus. Remember that you should
always copy this file to your own theme folder, or create your own from
scratch. If you modify the default file, it will most likely get overwritten
when you update Bolt to a newer version.

Normally you will only need the basic properties of each of the menu items, but
sometimes you might need to do more with the items. For this reason, each
`item` has access to the entire record. You can use `{{ item.record }}` like
you would use any other record. For instance, `{{ item.record.taxonomy }}`, or
`{{ dump(item.record) }}`.
