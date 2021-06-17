# apply

`apply` is a Twig tag to allow you to apply Twig filters on a block of template data:

`{% apply upper %}`

&nbsp;&nbsp;&nbsp;&nbsp;This text becomes uppercase

`{% endapply %}`


You can also chain filters and pass arguments to them:

`{% apply lower|escape('html') %}
<strong>SOME TEXT</strong>
{% endapply %}`

`{# outputs "&lt;strong&gt;some text&lt;/strong&gt;" #}`

Source: [Twig](https://twig.symfony.com/apply)