# htmllang

`htmllang()` is a Twig function to return the appropriate code for the `lang` attribute of the `<html>` tag for the current locale.

This Twig function will output the currently set locale in a suitable format for the HTML lang attribute in your templates. For example, if you've set `locale: en_GB`, this is the result:

```twig
<html lang="{{ htmllang() }}">

# <html lang="en-GB">
```
