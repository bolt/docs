# related

`related(name = null, direction = true, limit = null, publishedOnly = true)` is a Twig filter to return an array of 
records that are related to the given record.

| Parameter     | Description                                                                                                 |
| ---           | ---                                                                                                         |
| name          | The related content's name or contenttype. If not set, it will fetch all related records.                   |
| direction     | Limit relations to a direction. Default is "both"; see [Relations and directions][direction] for more info. |
| limit         | Limits the number of related records that are returned.                                                     |
| publishedOnly | Return only related records that are published. Default is true                                             |

```twig
{% set relatedrecords = record|related() %}
<p class="meta">Related content:
    <ul>
    {% for related in relatedrecords %}
        <li><a href="{{ related|link }}">{{ related|title }}</a></li>
    {% endfor %}
    </ul>
</p>
```

[direction]: ../../contenttypes/relationships#relations-and-directions
