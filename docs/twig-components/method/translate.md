# translate

`translate(locale)` is a Twig filter to return the field translate into the requested locale.

| Parameter | Description                                      |
|-----------|--------------------------------------------------|
| locale    | The requested translation's locale, as a string. |

```twig
{% set image_nl = record.image|translate('nl') %}
``` 

<p class="warning"><strong>Caution:</strong> The |<code>translate</code> filter will return the field in the requested locale, but it 
will also change the locale of the <code>record.image</code> itself.</p>
