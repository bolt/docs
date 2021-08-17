# locales

`locales(localeCodes = null, all = false)` is a Twig function to take the list of codes of the locales (
languages) enabled in the application and returns an array with the name of each locale written in its own language (
e.g. English, Français, Español, etc.).

```twig
{% for locale in locales() %}
    <p>
        {{ locale.emoji }}
        {{ locale.flag }}
        {{ locale.code }}
        {{ locale.name }}
        {{ locale.localizedname }}
        {{ locale.link }}
        {{ locale.current }}
    </p>
{% endfor %}
```

Will output something like:

```twig
<p>🇬🇧 gb en English English {{ link-to-translated-page }} 1</p> <!-- 1 because current is truthy -->

<p>🇳🇱 nl nl Dutch Nederlands {{ link-to-translated-page }}</p>

<p>🇯🇵 jp ja Japanese 日本語 {{ link-to-translated-page }}</p>

<p>🇳🇴 no nb Norwegian Bokmål norsk bokmål {{ link-to-translated-page }}</p>
```

Please refer to the [locales](/5.0/localization/locales) documentation.
