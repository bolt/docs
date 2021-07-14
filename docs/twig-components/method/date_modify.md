# date_modify

`date_modify(modifier)` is a Twig filter to modify a date with a given modifier string:

```twig
{{ post.published_at|date_modify("+1 day")|date("m/d/Y") }}
```

The date_modify filter accepts strings (it must be in a format supported by the strtotime function) or DateTime
instances. You can combine it with the date filter for formatting.

## Arguments 
- modifier: The modifier

Source: [Twig](https://twig.symfony.com/date_modify)