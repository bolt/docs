# asset

`asset(path, packageName = null)` is a Twig function to return the public path of the given asset path (which can be a
CSS file, a JavaScript file, an image path, etc.). This function takes into account where the application is installed (
e.g. in case the project is accessed in a host subdirectory) and the optional asset package base path.

Symfony provides various cache busting implementations via the version, version_strategy, and json_manifest_path
configuration options.

Source: [Twig](https://twig.symfony.com/asset)