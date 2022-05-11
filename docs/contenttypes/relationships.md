---
title: Relationships
---
Relationships
=============

You can define relationships between records by adding a relation to
`contenttypes.yaml`.

```yaml
pages:
    name: Pages
    singular_name: Page
    [..]

entries:
    name: Entries
    singular_name: Entry
    fields:
        [..]
    relations:
        pages:
            multiple: false
            required: false
            label: Select a related page
            order: -id
    [..]
```

The `relations` are defined by the `slug` of the ContentType that it's related to. If a slug is not explicitly defined for a ContentType, the `name` is used. In the example above, it is `pages`. It takes a few parameters:

| Parameter        | Description                                                                                                                                                                                                                                                                                                                                                                                        |
|------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `required`       | `true` or `false`, to determine if the user must pick a related record. Defaults to `true`.                                                                                                                                                                                                                                                                                                        |
| `multiple`       | `true` or `false`, to indicate whether the user can pick one related record, or more than one.  Defaults to `false`.                                                                                                                                                                                                                                                                               |
| `label`          | The label to show on the edit screen.                                                                                                                                                                                                                                                                                                                                                              |
| `order`          | The order in which the items are listed on the edit screen. This can be any field in the ContentType. Prefix with `-` to reverse the sorting. In the case of the example, `-id` means that the records that were created last are at the top.                                                                                                                                                      
| `format`         | How to show the titles for each record that can be selected. For example if you have two fields for firstname and lastname you might put `'{{firstname}} {{lastname}}'` here. The default is `'{title} (№ {id}, {status})'`                                                                                                                                                                        |
| `link_to_record` | `true` or `false`, to indicate wether or not to display the pencil icon with a link to the related edit Record page. Defaults to `false`. |

Editing a record that has relations defined looks like this:

<a href="https://user-images.githubusercontent.com/7093518/91450856-0d4e1b00-e87d-11ea-847e-13a075ddf164.png" class="popup"><img src="https://user-images.githubusercontent.com/7093518/91450856-0d4e1b00-e87d-11ea-847e-13a075ddf164.png" width="350"></a>

If you see this, you might consider adding the reverse relation to the
`contenttypes.yaml` as well.

Relations in templates
----------------------
To get the related records in twig, use the _filter_ `related`.

```
    {% set relatedrecords = record|related %}
    {% if relatedrecords is not empty %}
        <p>Related content:</p>
        <ul>
        {% for related in relatedrecords %}
            <li><a href="{{ related|link }}">{{ related.title }}</a></li>
        {%  endfor %}
        </ul>
    {% endif %}
```
