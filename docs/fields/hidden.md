---
title: Hidden field
---
Hidden field
============

The hidden field offers the possibility to pass a constant value from YAML configuration to Twig template.  
This field is invisible in content type editing form. Thereby it can't be edited in backend.  
You can change its value at will in content type YAML definition.  

## Basic Configuration:

```yaml
        secret:
            type: hidden  
            default: "foo bar baz"
```

## Example usage in templates:

```twig
{{ record.secret }}
```  
Will show :   
`foo bar baz`

## Hiding a field, still showing the pre- and postfix

Sometimes you might want to _not_ show a field, but still want to display some
information to the editor. For example to give them more detailed instructions
on how to use the current ContentType. The `type: hidden` field is not suited
for this, because it hides the entire Field. Instead, use a text field, and
hide its input. See an example on the [Text Field](./text) page.
