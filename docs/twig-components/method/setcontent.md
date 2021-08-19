# setcontent

`setcontent` is a Twig tag to perform various queries on the database. It converts a human-readable query to actual 
records.

Much, much more information about the `setcontent` tag, together with additional query arguments, pagination, sorting 
and other options you can find in the chapter about [Fetching content](https://docs.bolt.cm/4.0/templating/content-fetching).

These queries are currently possible:

- `entry/12` - get entry with id 12
- `page/about` - get page with slug about
- `animal/search/5` - search for animals and return 5 of them (use where parameter 'filter' to specify search string)
- `(animal,plant)` - fetch records for animals and plants

```twig
{% setcontent about = 'page/about' %}

<h3>{{ about.title }}</h3>
{{ about.introduction|raw }}

<a href="{{ about|link }}">link</a>
```
