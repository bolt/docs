# sandbox

`sandbox` is a Twig tag to be used to enable the sandboxing mode for an included template, when sandboxing is not enabled globally for the Twig environment:

```twig
{% sandbox %}
    {% include 'user.html' %}
{% endsandbox %}
```

### Warning
The sandbox tag is only available when the sandbox extension is enabled (see the Twig for Developers chapter).

### Note
The sandbox tag can only be used to sandbox an include tag and it cannot be used to sandbox a section of a template. The following example won't work:

```twig
{% sandbox %}
    {% for i in 1..2 %}
        {{ i }}
    {% endfor %}
{% endsandbox %}
```

Source: [Twig](https://twig.symfony.com/sandbox)