Extension Building: Admin Menus
===============================

Bolt allows extensions to insert submenus under the `Extend` menu in the admin
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
        $menu = new MenuEntry('koala-menu', 'koala');
        $menu->setLabel('Koala Catcher')
            ->setIcon('fa-tree')
            ->setPermission('settings')
        ;
        
        return [
            $menu,
        ];
    }
```

In the above example:
  * `koala-menu` parameter in the constructor is used internally and should just be a brief name, and only needs to be unique for submenus of Extend.
  * `koala` parameter in the constructor will set the route for the menu to be `bolt/extend/koala` (where branding path is still set to `bolt/`
  * `setLabel('Koala Catcher')` sets the displayed menu label in the left side bar to "Koala Catcher"
  * `setIcon('fa-tree')` set the icon for the menu to any of the [Font Awesome icons](https://fortawesome.github.io/Font-Awesome/cheatsheet/)
  * `setPermission('settings')` sets the required permssion, as defined in the `app/config/permissions.yml` file
