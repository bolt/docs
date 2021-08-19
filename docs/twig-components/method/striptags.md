# striptags

`striptags(allowable_tags)` is a Twig filter to strip SGML/XML tags and replace adjacent whitespace by one space.

```twig
{{ some_html|striptags }}
```

You can also provide tags which should not be stripped:

```twig
{{ some_html|striptags('<br><p>') }}
```

In this example, the <br/>, <br>, <p>, and </p> tags won't be removed from the string.

<p class="note"><strong>Note:</strong>Internally, Twig uses the PHP strip_tags function.</p>

## Arguments
- `allowable_tags`: Tags which should not be stripped

Source: [Twig](https://twig.symfony.com/doc/3.x/filters/striptags.html)
