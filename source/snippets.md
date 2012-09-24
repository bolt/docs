piSnippets
========

This page contains some handy code snippets. 


Simple menu
-----------

The following creates a simple menu in HTML, based on the last 4 pages. Only pages where the chapter taxonomy is 'main' are selected, assuming there's a taxonomy 'chapter'.

<pre class="brush: html">
    &lt;nav id="main">
    {% setcontent pages = 'pages/latest/4' where { 'taxonomy/chapter': 'main'}  %}
    
    {% for page in pages %}
        {% if loop.first %}&lt;ul>{% endif %}
        &lt;li>&lt;a href="{{ page|link }}" {% if page|current %}class="current"{% endif %}>{{ page.title|trimtext(12) }}&lt;/a>&lt;/li>            
        {% if loop.last %}&lt;/ul>{% endif %}
    {% else %}
        &lt;em>No main navigation items. Add some Pages, and set the 'Chapter' to 'Main'.&lt;/em>
    {% endfor %}
    &lt;/nav>
</pre>

<p class="note"><strong>Note:</strong> This is a specific sample. In general, you're probably better off using Bolt's built in <a href="/menus">menu functionality</a>.</p>