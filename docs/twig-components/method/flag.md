# flag

`flag(localeCode)` is a Twig function to display the abbreviation of the current language used in the application

```twig
{% for locale in locales() %}
    <p>
        {{ locale.flag }}
    </p>
{% endfor %}
```

Will output something like:

```twig
nl gb
```
