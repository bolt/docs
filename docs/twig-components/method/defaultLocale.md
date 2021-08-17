# defaultLocale

`defaultLocale = "en"` is a Twig global to access the default language set in your `services.yaml`

```twig
parameters:
    locale: nl
services:
    _defaults:
        bind:
            $defaultLocale: '%locale%'
```

See the Twig global [Localization / Locales](/5.0/localization/locales) documentation for further info.