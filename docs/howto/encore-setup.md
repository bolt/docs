---
title: Encore setup
---
Encore setup
============

Bolt uses Symfony's Encore internally to build the admin pages.
Follow the steps below to use encore in your own Bolt-based project.

Install encore
--------------

Follow [the installation steps](https://symfony.com/doc/current/frontend/encore/installation.html) for Encore. 
Note that if you've installed Bolt using the bolt/project as a template your project is _not_ a flex project. 
You'll have to add some of the configuration files yourself.

webpack.config.js
-----------------

One step in the installation of encore is to create the `webpack.config.js` file. 
For the rest of the configuration important setting is `setOutputPath`.

```
# file: webpack.config.js
Encore
    // directory where compiled assets will be stored
    // this has to match the path specified in webpack_encore.yaml and assets.yaml
    .setOutputPath('public/my-assets/')
    ...
    // the 'app' is relevant for your encore_entry_*_tags() calls
    .addEntry('app', './assets/app.js')
    ...
```

Make sure that this path isn't the same as the one in use by Bolt, so DON'T make it `public/assets/`

Encore/Webpack will generate an `entrypoints.json` and `manifest.json` in the directory specified as outputPath. 
These files are needed to by `asset()` and `encore_entry_*_tags()` to generate the correct links to the resources.

Making encore_entry_*_tags() work
---------------------------------

To get the js (and maybe css included by webpack) into your page you should first configure `config/packages/webpack_encore.yaml` 
to use the correct entrypoints and manifest for your configuration.

After changes `config/packages/webpack_encore.yaml` could look like this:

```
file: config/packages/webpack_encore.yaml
webpack_encore:
    # The path where Encore is building the assets.
    # This should match Encore.setOutputPath() in webpack.config.js.
    output_path: '%kernel.project_dir%/%bolt.public_folder%/assets' # <-- this is the existing config for bolt's own assets
    builds:
        my-site: '%kernel.project_dir%/%bolt.public_folder%/my-assets' # <-- this points to your site's assets
```

After this change you can use these calls in your templates and get the correct js/css

```
{{ encore_entry_link_tags('app', null, 'my-site') }}
{{ encore_entry_script_tags('app', null, 'my-site') }}
```
Here 'my-site' refers to the 'my-site' specified under `builds` in `webpack_encore.yaml`.
The 'app' is a reference the the 'app' defined using addEntry() in your `webpack.config.js`.

Making assets() work
--------------------

For the assets() calls a similar configuration addition has to be made:

```
# file: config/packages/assets.yaml
framework:
    assets:
        json_manifest_path: '%kernel.project_dir%/%bolt.public_folder%/assets/manifest.json' # <-- this is the existing config for bolt's own assets
        packages:
            my-site:
                json_manifest_path: '%kernel.project_dir%/%bolt.public_folder%/my-assets/manifest.json' # <-- this points to your site's assets
```

After making this change you can reference your assets like this if you've copied them using (copyFiles)[https://symfony.com/doc/current/frontend/encore/copy-files.html]

```
{{ asset('my-assets/images/home-map.png', 'my-site') }}
```

Here 'my-site' refers to the 'my-site' under packages in `assets.yaml`

Build your files using encore (yarn ...), and refresh the page!
