# sanitise

`sanitise` is a Twig filter to sanitize the value of a field.

`boolean`, default is `true`. If set to false, the value of the field will not be sanitised. This means HTML tags
like `<script>` and `<embed>` will be left as-is.
