# next

`next(byColumn = "id", sameContentType = true)` is a Twig filter to return the next record from the database. By
default, `|next` finds the right adjacent element for the same contenttype using the record's database id.

```twig
{% set record_after = record|next %} 
```

|Parameter | Description 
|---|---|
|`byColumn` | Sort records based on the passsed column's value. Default is `id` 
|`sameContentType` | If set to `true`, it only sorts records of the same contenttype. Default is `true`
