# json_decode

`json_decode(assoc = false, depth = 512, options = 0)` is a Twig filter to parse a string with JSON into an array /
object. It is the opposite of json_encode:

Example:

```twig
{% set json_string = '{"selected":"search","zoom":"10","search":"Vienna, Austria","lat":48.2081743,"long":16.3738189}' %}

{% if json_string is json %}
    {{ dump(json_string|json_decode()) }}
{% else %}
    <code>json_string</code> is not valid JSON
{% endif %}
```
