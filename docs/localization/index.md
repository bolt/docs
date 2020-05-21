---
title: Localization
pages:
    - locales
---

<!-- internationalization, i18n, translate, language -->
Bolt comes with built-in localization for all fields by default.
You do not have to install anything to use this. All it takes to use
the localization feature in Bolt is to configure your Content Types 
and Fields to be translatable.

## Localize Content Types

Bolt allows you to specify which languages are enabled for each Content Type.
This is done using the `locales` setting in the `contenttypes.yaml` file:

```yaml
pages:
    name: Pages
    singular_name: Page
    fields:
        heading:
            type: text
            class: large
            group: content
            localize: true
        subheading:
            type: text
            class: large
            localize: true
        slug:
            type: slug
            uses: [ heading ]
            localize: true
        photo:
            type: image
            label: "Eén plaatje"
            placeholder: https://source.unsplash.com/1280x768/?business,workplace/__random__
    locales: ['en', 'nl', 'ja', 'nb']
```

This will produce the following result in the editor:

<a href="/files/localize.png" class="popup"><img src="/files/localize.png"></a><br>


<p class="note"><strong>Note:</strong> The <code>locales</code> setting for a content type
<strong>only defines the allowed languages</strong> for the content type.
You can control which fields are localizable on a per-field basis using the
<code>localize</code> option (see below).</p>

The above example will make the `pages` content type localizable: that means, editors
will be able to create different versions of the same page in the specified 4 languages: 
English, Dutch, Japanese and Norwegian. To learn more about locales, 
visit the [locales page](./locales.md).



## Localize fields

Bolt allows you to specify which fields are localized within a content type separately.
For example, you may want the `title` and `content` fields of your records to be translated,
but not the `image` or `file` fields.

To configure a field as localizable (can be translated), use the `localize` option. Check the
example above again:

```yaml
pages:
    name: Pages
    singular_name: Page
    fields:
        heading:
            type: text
            class: large
            group: content
            localize: true # <- This field will be available in en, nl, ja and nb.
        subheading:
            type: text
            class: large
            localize: true # <- This field will be available in en, nl, ja and nb.
        slug:
            type: slug
            uses: [ heading ]
            localize: true # <- This field will be available in en, nl, ja and nb.
        photo:
            type: image
            label: "Eén plaatje" 
            placeholder: https://source.unsplash.com/1280x768/?business,workplace/__random__
            # <- This field will only be available in your default locale
    locales: ['en', 'nl', 'ja', 'nb']
```

By default, `localize` is set to `false` so that you only need to use `localize: true`
if you want the field to be translatable.

<p class="tip"><strong>Tip:</strong> The example above says that the <code>photo</code>
field will be available in the default locale only. To read more about that, check
the <a href="/localization/locales">locales page</a>.</p>

## Overriding the default locale

The example above says that the `photo` field will be available in the default locale only.
That is, the locale configured in the `services.yaml` file.

Bolt provides 2 ways to specify the default locale:
* To override the default locale for all your content types, visit the [locales](./locales.md) page
* To override the default locale for a single field, use `default_locale` on that field, as shown below:

```yaml
pages:
    name: Pages
    singular_name: Page
    fields:
        heading:
            type: text
            localize: true # <- This field will be available in en, nl, ja and nb.
            default_locale: 'nl'
    locales: ['en', 'nl', 'ja', 'nb']
```