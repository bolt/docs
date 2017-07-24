---
title: Template Specific Fields
---

Template Specific Fields
------------------------

The Template Specific Fields (or "TemplateFields" for short) are a feature that
helps solve a common challenge you might encounter when developing a site: It's
very difficult to create a *one size fits all* solution for all pages. Many may
look quite different to one another. This is why you'd create different
templates to suit these different requirements. However, one page may be
radically different from the other and even *using the same fields* between
these pages would provide a limitation.

For example, your home page may have many different sections with some complex
markup between them. All of your other pages have a single `body` html field,
which really won't suffice. You could create a new ContentType, or use
[Resource Contenttypes](../howto/resource-contenttype), but this isn't really an
elegant solution.

To get started with TemplateFields, you need to add a template select field to
your ContentType definition:

```yml
        template:
            type: templateselect
            filter: '*.twig'
```

Template specific fields allow you to define extra fields to use when a template
is chosen for a record. They're defined in the theme's `theme.yml`, and it's
just like defining the fields of a ContentType.

```yml
templatefields:
    index.twig: # Our homepage template
        section_1_heading:
            type: text
        section_1_body:
            type: html
        section_2_heading:
            type: text
        section_2_body:
            type: html
        footer_image:
            type: image
```

When you change your template while editing a record, and it has template fields
associated with it, you'll be politely notified that you need to save and
refresh for these changes to take effect. If this is already the template for a
record, this will happen automatically.

<a href="/files/templatefields-notification.png" class="popup">
<img src="/files/templatefields-notification.png" alt="TemplateFields Notification" width="500" />
</a>

<p class="note"><strong>Note:</strong> TemplateFields are usable with a select
number of field types. Do <strong>not</strong> use <code>type: date</code>,
<code>type: datetime</code>, <code>type: repeater</code> or <code>type: templateselect</code>
as template specific fields. These fields will not work as expected.
</p>

To change the name shown for each template in the `templateselect` field you can
define the names and their associated ContentTypes in the theme's `theme.yml`.

```yml
templateselect:
    templates:
        - name: 'Homepage template'
          filename: 'index.twig'
        - name: 'Page with gallery'
          filename: 'page_with_gallery.twig'
```

<a href="/files/template_custom_name.png" class="popup">
<img src="/files/template_custom_name.png" alt="Template with custom name" width="500" />
</a>

Then you will be able to go to the `Template` section of the record editing and change
the content to your heart's desire. Once saved, accessing this data is very simple.
Just go through the `templatefields` property of the record.

```twig
{{ record.templatefields.section_1 }}
{# This will output whatever is stored in section_1 #}
```

<p class="warning"><strong>Warning:</strong> The data stored in these fields is only
around while that template is selected. If you change templates with templatefield data
stored, you <em>will</em> lose that data if the templatefields of the new template differ
from those of the current one. Bolt will do its best to warn you when this will happen.
<br />
<a href="/files/templatefields-warning.png" class="popup">
<img src="/files/templatefields-warning.png" alt="TemplateFields Warning" width="500" />
</a></p>

