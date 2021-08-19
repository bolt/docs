# shy

`shy` (soft hyphenate) is a Twig filter to be used for strings without spaces, that would otherwise break the layout of 
your page. By adding these soft hyphens, the browser knows it can wrap to the next line. 

For example:
```twig
|                         |
| Before: {{ file }}      |
| MyVeryLongFilenameWithoutSpacesOrDashesOrWhatever.jpg |
|                         |
| After: {{ file|shy }}   |
| MyVeryLongFilenameWith- |
| outSpacesOrDashesOrWha- |
| tever.jpg               |
|                         |
```
