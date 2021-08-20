# plaintext

`plaintext` is a Twig filter to return a "plaintext" version of the string. 

For example:

```twig
{% set text = "Bonum patria: señor & <em>éxilium</em>!" %} 
{{ text|plaintext }}

=> Bonum patria: señor & éxilium!
```

This returns a string with letters, numbers and common extra characters, but without HTML tags. This makes the output
very suited for - for example - use in `<title>` tags.

The main difference between this filter and `|striptags` is that the output of this filter is marked as HTML in Twig,
meaning that characters like `&` and `'` will not be escaped. If you wish these to be escaped, use `|striptags` instead.
