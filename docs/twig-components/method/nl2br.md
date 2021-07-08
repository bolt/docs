# nl2br

`nl2br(is_xhtml)` is a Twig filter to insert HTML line breaks before all newlines in a string:

```twig
{{ "I like Twig.\nYou will like it too."|nl2br }}
{# outputs

    I like Twig.<br />
    You will like it too.

#}
```

### Note

The nl2br filter pre-escapes the input before applying the transformation.

Source: [Twig](https://twig.symfony.com/nl2br)