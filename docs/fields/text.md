---
title: Text field
---
Text field
==========

Simple text-input, for single-line fields.

## Basic Configuration:

```yaml
        name:
            type: text
```

## Example usage in templates:

```twig
{{ record.name }}
```

## Options:

The field has a few options to change the appearance and functionality of the
field.

* `class` Can be set to either of the:
  * `narrow` to make the field less wide
  * `large` to make both the field and the font larger
* `allow_twig` can be set to true or false to control if twig may be used in the
  field
* `pattern` Use this to validate the field against a certain pattern. [More about patterns](common#required-and-patterns)
* `placeholder` Placeholder text inside the input control.

## Input Sanitisation

All content in this field type will be sanitised before it gets inserted into
the database. This means that only 'whitelisted' HTML like `<b>` and
`<img src="…">` is kept, while things like `<embed>` and `<script>` are scrubbed
from the field before being stored. As a site-implementor you can control the
whitelisted tags and attributes using the following section in `config.yaml`:

```yaml
htmlcleaner:
    allowed_tags: [ div, span, p, br, hr, s, u, strong, em, i, b, li, ul, ol, …, … ]
    allowed_attributes: [ id, class, style, name, value, href, src, alt, title, …, … ]
```

To disable sanitisation for this field, you can add `sanitise: false` to the field config, like so:

```yaml
        title:
            type: text
            sanitise: false
```

## "Hiding" a field

The <code>class:</code>-option can be used to create "hidden" fields. Sometimes
you might want to _not_ show a field, but still want to display some
information to the editor. For example to give them more detailed instructions
on how to use the current ContentType. You can do this:

```yaml
        helpful_tip:
            type: text
            class: d-none
            label: 'A Helpful tip'
            postfix: |
                Duo Reges: constructio interrete. Eiuro, inquit adridens, hac
                quidem de re; Paulum, cum regem Persem captum adduceret, eodem
                flumine invectio? Videsne quam sit magna dissensio?
            group: Instructions
```

And the result will be:

![Screenshot of a helpful tip](https://user-images.githubusercontent.com/1833361/91960796-a1e7cb80-ed0a-11ea-9613-6701210a09a6.png)
