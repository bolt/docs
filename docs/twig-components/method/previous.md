# previous

`previous(byColumn = "id", sameContentType = true)` is a Twig filter to return the previous record from the database. By
default, |previous finds the left adjacent element for the same contenttype using the record's database id.

```twig
{% set record_before = record|previous %}
```

Parameter | Description 
--- | ---
byColumn | Sort records based on the passed column's value. Default is id. 
sameContentType | If set to true, it only sorts records of the same contenttype. Default is true.
