Using Composer Packages
=======================

By default, after installing Bolt you will get two composer files: `composer.json`
and `composer.lock`. Those files are there to manage the dependencies of your
project. Dependencies are third-party libraries that your code needs for it to
execute correctly.

For example, in the `composer.json` file in your project, you'll see something like this:

```json
"require": {
  "php": ">=7.2.9 || ^8.0",
  "bolt/core": "^5.0"
  "bolt/assets": "^5.0",
}
```

As the key of each dependency in `require` you'll find the name of the dependency,
like `php` and, yes, `bolt/core`. The value specifies the version constraints, i.e.
the versions of the third-party packages that your code is compatible with. `^5.0` means any version that is `5.0`
or higher, but lower than `6.0`.

### Managing dependencies

You can install packages using `composer require`, for example:

```
composer require bolt/forms
```

To remove:

```
composer remove bolt/forms
```

To update a specific package
```
composer update bolt/forms
```

To update all packages
```
composer update
```

The above commands will update *both* `composer.json` and `composer.lock`. Simply put, `composer.json` keeps the 
configuration and version constraints of your project. `composer.lock` keeps the exact versions of all packages
that you got with the most recent update command.

For more details, check [semantic versioning](https://semver.org/) and the [Packagist repository](https://packagist.org/).
