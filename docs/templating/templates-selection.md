---
title: Template selection
---
Template selection
==================

Bolt has some rules to help you quickly build custom templates for your site. If
your template is named exactly like the `singular_slug` or `slug` for the
ContentType or record it will be automatically used.

How does Bolt select what template to use for a given request? Unless specified,
Bolt will determine the names of these templates automatically via a method we
call 'cascading templates'. This allows for great flexibility, as well as ease
of use. Unless you specify anything, pages will get rendered using the basic
default templates, but you can refine this in the definition of the ContentTypes
or even on a per-record basis. The rules for selecting a template are as
follows.

### Selection of a template for an single record page:

  - If an overview page like `/page/foo-bar` is requested, and the ContentType
    has a `templateselect` field, and a template is selected for this record,
    that template will be used
  - Otherwise, if the ContentType definition has a value for `record_template`,
    that template will be used
  - Otherwise, Bolt will check if a template with a suited name exists. For
    example, if the ContentType's `singular_name` is 'Entry', Bolt will check
    for an `entry.twig` template. If it exists, that template will be used
  - Otherwise, if `record_template` is set in `config.yml`, that template will
    be used
  - If no other rule matches, Bolt will use a template named `record.twig`

### Selection of a template for an overview page:

  - If an overview page like `/entries` is requested, and the ContentType
    definition has a value for `listing_template`, that template will be used.
  - Otherwise, Bolt will check if a template with a suited name exists. For
    example, if the ContentType's name is 'Entries', Bolt will check for an
    `entries.twig` template. If it exists, that template will be used.
  - Otherwise, if `listing_template` is set in `config.yml`, that template will
    be used.
  - If no other rule matches, Bolt will use a template named `listing.twig`.

In the default template for a single record, it is available as both `{{ record
}}` and also by the name of the singular name. So, in the above example, you can
also use `{{ page }}`, without having to set it specifically. Likewise, in the
default template for multiple records, the content is available as `{{ records
}}` and also by the name of the ContentType, for example `{{ pages }}`.

<p class="note"><strong>Note:</strong> As you might have noticed, sometimes the
examples use <code>{{ page }}</code>, sometimes <code>{{ entry }}</code> and
sometimes something different altogether. These are just the names of the
objects containing the content, or the array with several records of content. By
default you can use the singular name of your ContentType, so be sure to replace
them with whatever the names of your ContentTypes or variables are.</p>
