# default

`default(default = "")` is a Twig filter to return the passed default value if the value is undefined or empty,
otherwise the value of the variable:

```twig
{{ var|default('var is not defined') }}

{{ var.foo|default('foo item on var is not defined') }}

{{ var['foo']|default('foo item on var is not defined') }}

{{ ''|default('passed var is empty')  }}
```

When using the default filter on an expression that uses variables in some
method calls, be sure to use the default filter whenever a variable can be undefined:

```twig
{{ var.method(foo|default('foo'))|default('foo') }} 
```

Using the default filter on a boolean variable might trigger
unexpected behavior, as false is treated as an empty value. Consider using ?? instead:

```twig
{% set foo = false %} 
{{ foo|default(true) }} {# true #} 
{{ foo ?? true }} {# false #} 
```

### Note

Read the documentation for the defined and empty tests to learn more about their semantics.

## Arguments 
- default: The default value

Source: [Twig](https://twig.symfony.com/default)