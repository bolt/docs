Creating menus
==============

To change one or more of the menus, edit the file `app/config/menu.yml`. You can
add more seperate menus, if you wish. To insert a menu in your templates, use

<pre class="brush: html">
	{{ menu() }}
</pre>

If you have more than one menu, use its name to make sure you get the intended one:

<pre class="brush: html">
	{{ menu('foo') }}
</pre>

For now, the menu is always rendered using the template
`/app/theme_defaults/_sub_menu.twig`. if you wish to modify this file, just copy it to your own theme folder. Bolt will pick your own version, and then it will not be overwritten in a future update.
