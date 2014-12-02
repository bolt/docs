# Making a 'resource' Contenttype

A common question that comes up is how to create a generic Contenttype for things like 404 pages and site header text that can be used in templates. A simple approach is to create a '*resource*' Contenttype.

For the purposes of this HOWTO we care going to call it "resource". But as with any Contenttype, you can use any unique name. 

## Creating the Contenttype

Firstly, in your `contenttypes.yml` file create a new Contenttype with the following parameters:

```yaml
resources:
    name: Resources
    singular_name: Resource
    fields:
        title:
            type: text
            class: large
            required: true
        slug:
            type: slug
            uses: title
        html:
            type: textarea
            height: 150px
        template:
            type: templateselect
            filter: '*.twig'
    default_status: published
    show_on_dashboard: false
    searchable: false
    viewless: true
```

### Fields

#### Title & Slug

You will note that the title and slug fields work together to create a human readable resource name that we can use later in `{% setcontent resource = 'resources/slug' %}`.

#### HTML

In this example, the `html` field is simply a HTML text area. As this is intended for use by developers, it gives us full control over the HTML and layout. It is also worth noting that the WYSWYG editor would interfere with this layout in an attempt to be user-friendly.

#### Template

We include a `template` field so that you can, if you wish, assign an specific template to an individual resource record. This is particularly useful for things like 404 pages where you want to have a database stored record for the content of the 404 page, but a themed template to display it.

### Default Publishing Status

We use the `default_status: published` parameter to automatically set new resource records to `published` for ease of use.

### Visibility

There are three visibility setting that we apply to keep these records hidden from normal users.

#### Show on Dashboard

By setting `show_on_dashboard: false` we will hide the editing and existence of these records from the Bolt Dashboard. While we are going to use permissions to make these inaccessible to most users, it is still nice to keep them well confined.

#### Searchable

By setting `searchable: false` these Contenttype records will be excluded from search results. 

#### Viewless

By setting `viewless: true`, routes will not be set for the Contenttype listing, or the records themselves.

## Permissions

The last part of the set-up is permissions. In your `permissions.yml` file, under the `contenttypes` key add in something similar to this: 

```yaml
contenttypes:
    resources:
        edit: [ developer ]
        create: [ developer ]
        publish: [ developer ]
        depublish: [ developer ]
        delete: [ developer ]
        view: [ developer ]
```

This will limit edit, create, (de)publish, delete and view access to only those with the `root` and `developer` roles.

## Accessing Resource Records in Templates

Accessing the resource records in a Twig template file is very easy: 

```twig
{% setcontent resource = 'resources/my-resource-slug' %}
{{ resource.html|raw }}
```

## Example Configuration of a 404 Resource 

As a final example, lets step though creating a resource record for your 404 page.

First create a `Resource` record, give it the title of "Not Found", which will generate the slug of `not-found` and set the template to you themes 404 Twig template: 
<a href="/files/howto-resource-contenttype-404.png"><img src="/files/howto-resource-contenttype-404.png"></a>

Next, in your `config.yml` file simply set the `notfound` key like so:

```yaml
notfound: resources/not-found
```
