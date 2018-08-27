---
title: Back-end Menu Items
level: advanced
---
Extension Building: Admin Menus
===============================

Bolt allows extensions to insert items below the `Extensions` menu in the admin
UI.

Bolt provides a helper function that will allow additional `MenuEntry` objects
to be added to the admin UI menus when they are built in the
`Bolt\Menu\AdminMenuBuilder` class.

Registering Menu Entries
------------------------

Menu objects for registration can be created using a `Bolt\Menu\MenuEntry`
class object.


```php
    protected function registerMenuEntries()
    {
        $menu = MenuEntry::create('koala-menu', 'koala')
            ->setLabel('Koala Catcher')
            ->setIcon('fa:leaf')
            ->setPermission('settings')
            ->setRoute('KoalaExtension')
        ;

        return [
            $menu,
        ];
    }
```

In the above example:

  * `koala-menu` parameter in the constructor is used internally and should
    just be a brief name, and only needs to be unique for submenus of Extend.
  * `koala` parameter in the constructor will set the route for the menu to be
    `bolt/extend/koala` (where branding path is still set to `bolt/`
  * `setLabel('Koala Catcher')` sets the displayed menu label in the left side
    bar to "Koala Catcher"
  * `setIcon('fa:leaf')` set the icon for the menu to any of the
    [Font Awesome icons](https://fontawesome.com/v4.7.0/icons/)
  * `setPermission('settings')` sets the required permission, as defined in the
    `app/config/permissions.yml` file
  * `setroute('KoalaExtension')` sets the route to "KoalaExtension", which is
    used for generating paths and URLs, like in `{{ path() }}`. Strictly
    speaking this is optional, but we strongly recommend it, to prevent problems
    with the routing in non-trivial applications.

<p class="note"> <strong>Note:</strong> Menu entries are mounted on
<tt>extensions/</tt>, because they fall under Extensions, logically. When
adding an <a href='controllers-routes'>accompanying route</a> for a new menu
item, make sure to catch it correctly. For the above example, it should match
<tt>/extensions/koala</tt>. </p>

Adding submenus
---------------

Similarly as described above, you can add submenu items to a menu, by "adding"
them to a previously defined menu item. Below is a full example of how to add a
menu with two submenu items:

```php
    protected function registerMenuEntries()
    {
        $menu = MenuEntry::create('koala-menu', 'koala')
            ->setLabel('Koala Catcher')
            ->setIcon('fa:leaf')
            ->setPermission('settings')
        ;

        $submenuItemOne = MenuEntry::create('koala-submenu-one', 'koala-tree')
            ->setLabel('Koala One')
            ->setIcon('fa:tree')
        ;

        $submenuItemTwo = MenuEntry::create('koala-submenu-two', 'koala-food')
            ->setLabel('Koala Two')
            ->setIcon('fa:tree')
        ;

        $menu->add($submenuItemOne);
        $menu->add($submenuItemTwo);

        return [
            $menu,
        ];
    }
```

The result will look like this:

<img src="/files/extensions-menu.png" width="517">

<p class="note"> <strong>Note:</strong> For the sake of brevity, we omitted
<tt>->setRoute()</tt> and <tt>->setPermission()</tt> in the above example. In
your own code, you should add these.</p>
