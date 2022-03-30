# url_decode

`url_decode` is a Twig filter to decode a given URL-encoded string, replacing 
any %## encoding in the given string. Plus symbols ('+') are decoded to a space character.
This filter does the opposite of Twig's built-in url_encode filter.

```twig
{{ "Mot%C3%B6rhead%20and%20Mg%C5%82a%20are%20cool"|url_decode }}

=> Motörhead and Mgła are cool
```

It works both on plain strings, as well as encoded arrays of URL parameters:

```twig
{% set params = {'param1': 'value', 'foo': 'bar', 'qux': 'Motörhead and Mgła are cool'} %}

{{ dump(params) }}
{{ dump(params|url_encode) }}
{{ dump(params|url_encode|url_decode) }}
```

<p><img src="https://user-images.githubusercontent.com/1833361/90623780-405a3400-e217-11ea-8fc8-b0a908530117.png" alt="" /></p>

<p class="note"><strong>Note: </strong>If you're simply trying to get a parameter from the URL, you might want to 
use the built-in <code>app.request</code> instead. For example: <code>{{ app.request.get('foo') }}</code>.
