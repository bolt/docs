# date

`date(format = null, timezone = null)` is a Twig filter to output a readable version of a timestamp.

```twig
{{ content.datecreated|date("M d, ’y")}}
```

See the various options for 'date' on the [PHP website](http://php.net/manual/en/function.date.php).

<p class="note"><strong>Note:</strong> This filter does <em>not</em> display a localized version of the date. Use the 
<code>{{ localdate }}</code>-filter if you want to display dates in other languages than English.</p>
