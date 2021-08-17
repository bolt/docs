# dump

`dump()` is a Twig function to dump the entire object, similar to PHP's var_dump

```twig
{% set about = content('page', {'slug': 'about'}) %}

{{ dump(about) }}
```

For more info on debugging your Bolt site, see the chapter on [Debugging Bolt](https://docs.bolt.cm/4.0/debugging).


<p class="note"><strong>Note:</strong> Don't forget to set <code>APP_DEBUG=1
</code> in your <code>.env</code> file. Otherwise the
<code>dump()</code> will output nothing at all.</p>
