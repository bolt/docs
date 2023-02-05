# related_first

`related_first(name = null, direction = "both" publishedOnly = true)` is a Twig filter to return the first of the returned related records.

| Parameter     | Description                                                                                                 |
| ---           | ---                                                                                                         |
| name          | The related content's name or contenttype. If not set, it will fetch all related records.                   |
| direction     | Limit relations to a direction. Default is "both"; see [Relations and directions][direction] for more info. |
| publishedOnly | Return only related records that are published. Default is true                                             |

[direction]: ../../contenttypes/relationships#relations-and-directions
