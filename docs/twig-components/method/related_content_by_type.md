# related_content_by_type

`related_content_by_type(content, bidirectional = true, limit = null, publishedOnly = true)` is a Twig filter to return a two-dimensional
array of related records, grouped by the contenttype.

```twig
    [
        'entries' => [ related_entry_1, related_entry_2, ... ],
        'pages' => [ related_page_1, related_page_2, ... ]
    ]
```

|Parameter	|Description
|---|---
|content	|The related content's name or contenttype. If not set, it will fetch all related records.
|bidirectional	|Performs bidirectional search. Default is true
|limit	|Limits the number of related records that are returned.
|publishedOnly	|Return only related records that are published. Default is true