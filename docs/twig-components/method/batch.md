# batch

`batch`

The batch filter "batches" items by returning a list of lists with the given number of items. A second parameter can be
provided and used to fill in missing items:

```
{% set items = ['a', 'b', 'c', 'd'] %}
<table>
    {% for row in items|batch(3, 'No item') %}
        <tr>
            {% for column in row %}
                <td>{{ column }}</td>
            {% endfor %}
        </tr>
    {% endfor %}
</table>
```

The above example will be rendered as:

```
<table>
    <tr>
        <td>a</td>
        <td>b</td>
        <td>c</td>
    </tr>
    <tr>
        <td>d</td>
        <td>No item</td>
        <td>No item</td>
    </tr>
</table>
```
<br>
<div style="background-color: #f5f5f5;">
<p><strong>Arguments</strong></p>

<ul>
<li>size: The size of the batch; fractional numbers will be rounded up</li>
<li>fill: Used to fill in missing items</li>
<li>preserve_keys: Whether to preserve keys or not</li>
</ul>
</div>
<br>
Source: [Twig](https://twig.symfony.com/batch)