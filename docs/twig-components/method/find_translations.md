# find_translations

`find_translations(entity, locale = null)` is a Twig function to return an array of all translated versions of the
specified field, if the locale parameter is not give/null. When locale is specified, returns only the translation for
that locale if it exists, and null otherwise. In that case, the `find_translation()` function works like the translated
filter.

```twig
{% set translated_array = find_translations(fieldwithtranslations) %} # returns an array of translated fields 
{% set
translated = find_translations(fieldwithtranslations, 'nl') %} # returns the NL translation, or null if it does not
exist.
```
