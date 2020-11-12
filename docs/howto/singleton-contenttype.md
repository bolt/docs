---
title: Making a Singleton ContentType
---
Making a Singleton ContentType
==============================

In a nutshell; a singleton is a ContentType that contains only 1 record.

You can use singletons for all kinds of things, from complex homepages, single
page applications to a general settings page for your website.

When you set a ContentType to be a singleton, you can use it to update some
aspects of the layout for that ContentType's record, making your experience
more fluent.

Creating the ContentType
------------------------

To make a ContentType behave as a singleton, you need only add `singleton: true`
to its configuration in `contenttypes.yml`.


### Example: A "settings" singleton

In this example we'll run you through creating a settings ContentType, here you
can allow your site manager to edit things like social media URL's, non-page
specific content, and anything you feel a user should be able to manage
independent of the template designer.


```yaml
settings:
    name: Site Settings
    singular_name: Site Settings
    fields:
        headers:
            type: repeater
            group: headers
            fields:
                header_title:
                    type: text
                    label: Title text
        footer_text:
            type: html
            group: footer
        footer_copyright:
            type: text
    viewless: true
    singleton: true
    default_status: published
    sort: -id
    icon_many: "fa:cogs"
    icon_one: "fa:cog"
```


<p class="note"><strong>Note:</strong> Adding <code>sort: -id</code> will make
sure you can grab the last record created when fetching it in a template, even
if you've deleted and created the post multiple times and the ID has been
incremented.</p>


Using a singleton record in your template
-----------------------------------------

As a singleton is just a ContentType much like any other, you can fetch the
record with like normal using [`setcontent`][setcontent].

For example, to fetch the record and display some of its content, the Twig
template would contain something similar to:

```twig
    {% setcontent settings = "settings" limit 1 returnsingle %}

    {# Display the headers #}
    {% for header in settings.headers %}
        <h2>{{ header.header_title }}</h2>
    {% endfor %}

    <div>
        {# The body of the template #}
    </div>

    {# Display the footer #}
    {% if settings.footer_copyright %}
        <p class="copyright">
        {{ settings.footer_copyright }}
        </p>
    {% endif %}
```

[setcontent]: ../templating/content-fetching
