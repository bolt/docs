# related_by_type

`related_by_type(direction = "both", limit = null, publishedOnly = true)` is a Twig filter to return a two-dimensional 
array of related records, where the first key is the contenttype.

```twig
    [
        'entries' => [ related_entry_1, related_entry_2, ... ],
        'pages' => [ related_page_1, related_page_2, ... ]
    ]
```

| Parameter     | Description                                                                                                 |
| ---           | ---                                                                                                         |
| direction     | Limit relations to a direction. Default is "both"; see [Relations and directions][direction] for more info. |
| limit         | Limits the number of related records that are returned.                                                     |
| publishedOnly | Return only related records that are published. Default is true                                             |

[direction]: ../../contenttypes/relationships#relations-and-directions
