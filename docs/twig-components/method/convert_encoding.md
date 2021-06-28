# convert_encoding

`convert_encoding(to, from)` is a Twig filter to convert a string from one encoding to another. The first argument is the expected output
charset, and the second one is the input charset:

```twig
{{ data|convert_encoding('UTF-8', 'iso-2022-jp') }}
```

### Note
This filter relies on the iconv extension.

##Arguments
<ul>
<li>to: The output charset</li>
<li>from: The input charset</li>
</ul>
<br>
Source: [Twig](https://twig.symfony.com/convert_encoding)