# deprecated

`deprecated` is a Twig tag to generate a deprecation notice (via a call to the trigger_error() PHP function) where the
deprecated tag is used in a template:

```twig
{# base.twig #} 
{% deprecated 'The "base.twig" template is deprecated, use "layout.twig" instead.' %} 
{% extends 'layout.twig' %}
```

Also you can deprecate a block in the following way:

```twig
{% block hey %} 
    {% deprecated 'The "hey" block is deprecated, use "greet" instead.' %} 
    {{ block('greet') }} 
{% endblock
%}


{% block greet %} 
    Hey you!
{% endblock %} 
```

Note that by default, the deprecation notices are silenced and never displayed nor logged.
See <a href='https://twig.symfony.com/doc/3.x/recipes.html#deprecation-notices'>Recipes</a> to learn how to handle them.

Source: [Twig](https://twig.symfony.com/deprecated)