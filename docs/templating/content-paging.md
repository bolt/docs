---
title: Paging content
---
Paging
======

When you have more records than you'd like to display on one page, Bolt will paginate
your records. To display the pager, add a `pager` function.

```
{% setcontent entries = "entries" latest limit 25  %}

{% for entry in entries %}
    {{ entry.title }}
{% endfor %}

{{ pager() }}
```

## Number of records per page

### Number of records per page on listing pages
To configure the number of records per page on a [listing page][listing-page], 
set the `listing_records` option for the ContentType in `contenttypes.yaml`:

```yaml
    pages:
        name: Pages
        singular_name: Page
        ...
        listing_records: 10 
```

If there are more than 10 pages, the content will be paginated.

### Number of records per page using setcontent

If you're using `setcontent` to fetch records, you can limit the number of 
records per page by using the limit directive:

```twig
{% setcontent pages = 'pages' limit 10 %}
{{ pager(pages) }}
```

## Displaying the pager

To show the pager, use the `pager` function in your twig template:

```twig
{{ pager() }}
```

### Pager templates

Bolt comes with three partial templates for displaying the pager:

- `_pager_basic.html.twig` renders a plain html pager
- `_pager_bootstrap.html.twig` renders a [Bootstrap pagination component][bootstrap-pagination]
- `_pager_bulma.html.twig` renders a [Bulma pagination component][bulma-pagination] 

For example, use the following to render the Bulma pagination component:
```twig
{{ pager(template='@bolt/helpers/_pager_bulma.html.twig') }} 
```

If you'd like to define your own pager from scratch, just copy
`/vendor/bolt/core/templates/helpers/_pager_basic.html.twig` to your own theme folder, and rename it
to something like `mypager.twig`. Then, pass the name as an extra
parameter to the `pager` function:

```
{{ pager(template='mypager.twig) }}
```

### Pager options

| Parameter      | Description |
|----------------|-------------|
| `records` <small>optional</small> | The records to paginate. Default on a listing page are the listing records. |
| `template` <small>optional</small> | The twig template used to render the pager. By default, use Bolt's basic pager.  |
| `class` <small>optional</small> | An optional class name. Default is `pagination`. |
| `surround` <small>optional</small> | Specifies how many items to show around the current page. Default is `3`.

[listing-page]: ../contenttypes/content-in-templates#record-listing-pages
[bootstrap-pagination]: https://getbootstrap.com/docs/4.0/components/pagination/
[bulma-pagination]: https://bulma.io/documentation/components/pagination/
