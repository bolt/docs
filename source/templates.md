Building templates in Pilex
===========================

To render HTML pages with dynamic content, Pilex uses the [Twig](http://twig.sensiolabs.org/documentation) templating language. This means that everybody who is familiar with Twig can easily get started with building templates in Pilex. 

In short, Twig can be described as a 'flexible, fast, and secure template engine for PHP.' Primarily, it seperates the markup of your templates from the PHP code in the CMS. It does this elegantly and quickly, which means that writing your HTML templates in Twig will give you clean and legible templates. That means you don't have to use PHP-like statements in your markup, so there's less code like this: 
<pre class="brush: html">
	&lt;?php if ( the_something('3') ) { ?>
		&lt;h1>Title is: &lt;?php echo the\_title() ?>.&lt;/h1> 
	&lt;?php } ?>
</pre>

And more like this:
<pre class="brush: html">
	{% if something('3') %}
		&lt;h1>Title is: {{ title }}.&lt;/h1>
	{% endif %}
</pre>

A template in Pilex can use all of the standard Twig tags, with a few additions that are specific to working with Pilex. If you're not familiar with Twig yet, you should read "[Twig for Template Designers](http://twig.sensiolabs.org/doc/templates.html)", on the official Twig website. 

File Structure
--------------

A Pilex website theme consists of a set of twig templates, that are located in the `view`-folder in the root of your site. You can always add more templates, if you want to. By default, the `index.twig` template is the homepage, but you can override it using the configuration settings. 

The current default theme contains the following files and folders:

  - `index.twig` - template frontpage of the website.
  - `entry.twig` - template for a single Entry.
  - `page.twig` - template for a single Page.
  - `error.twig` - template for displaying errors (including 404's).
  - `_aside.twig` - helper template that gets included as the sidebar.
  - `_header.twig` - same, but for the header.
  - `_header.twig` - same, but for the footer.
  - `js/` - a folder with some javascript files.
  - `css/` - .. and similarly, some css files.

The filenames of the 'helper' templates all start with an underscore. This is just a convention, to make it easier to recognize which template does what. If one of your contenttypes have a 'template select' field, Pilex will skip these helper templates by default. 

<p class="tip">
Tip: the default template set uses includes to insert the header, footer and such, but you're free to use <a href="http://twig.sensiolabs.org/doc/templates.html#template-inheritance">Template Inheritance</a> if you prefer. 
</p>

By default, Pilex creates links to single pages based on the contenttypes, and it uses a template based on its name. For instance, if your site has a contenttype `foos`, a single record in that contenttype will be available under <a>domain.com/foo/slug-of-record</a>, where `slug-of-record` is the sluggified version of the title. Pilex will try to use `foo.twig` as the template to render the page. You can change this by either defining another template in `contenttypes.yml`, or using a 'template select' field in the contenttype. More information about this can be found in the chapter [Working with Content and Content types](/content).


Template tags
-------------

A simple `entry.twig` template could look something like the example you see below. Using this example we'll go over some of the details of the Twig Template language. As mentioned before: Much, much more detailed info can be found at [Twig for Template Designers](http://twig.sensiolabs.org/doc/templates.html) on the official Twig site. 

<pre class="brush: html">
{% include '_header.twig' %}

&lt;article>

    &lt;h1>&lt;a href="{{ content|link }}">{{ content.title }}&lt;/a>&lt;/h1>
    
    {# Only display the image, if there's an actual image to display #}
    {% if content.image!="" %}
        &lt;div class='imageholder-wide'>
        	&lt;img src="{{ content.image|thumbnail(320, 240) }}">
        &lt;/div>
    {% endif %}
    
    {{ content.body|raw }}

    &lt;p class="meta">
    	Posted by {{ content.username }} on 
    	{{ content.datecreated|date("M d, ’y")}}
    &lt;/p>
    
</article>  

{% include '_footer.twig' %}
</pre>

What happens in this example is the following:

  - `{% include '_header.twig' %}`, line 1: The include tag reads the template named `_header.twig`, parses it like any other Twig template, and outputs it to the browser.

  - `{{ content.title }}`, line 5: Since this is a generic template, 'content' contains the record of the current requested page. For example, if the current page is <a>domain.com/news/the-website-is-live</a>, `content` would contain the record from 'news' that has 'the-website-is-live' as a slug. 'content' is an array, so to output the 'title' field, we use the '.'-notation. 

  - `{{ content|link }}`, line 5: Here we use the 'link'-filter to get the link for the content array. 

  - `{# Only display .. #}`, line 7: This is a simple comment. It will be removed when the template is rendered to the browser, so it will not show up in 'view source'.

  - `{% if content.image!="" %} .. {% endif %}`, lines 8 - 12: The if-statement only parses the part between the start and end tag, if the given condition is true. So, in this case, the image is only rendered to the browser, if content.image does not equal "", i.e. if it is not empty. 

  - `{{ content.image|thumbnail(320, 240) }}`, line 10: By using the `thumbnail` filter, we can create thumbnail images on the fly. In this case, the image source attribute in the HTML will be something like '/thumbs/300x240/imagename.jpg'. Pilex has a built-in image resizer that will create the image with the exact dimensions, and caches it for further use. 

  - `{{ content.body|raw }}`, line 14: This renders the 'body' field of the content to the browser. By default, Twig escapes all HTML to the browser. If we didn't add the `raw` filter, all '<' and '>' characters in the body would be output as '&amp;lt;' and '&amp;gt;' respectively. If 'body' is an HTML field in our contenttype, we want it to be output as normal HTML, so we have to add the `raw` filter.

  - `{{ content.datecreated|date("M d, ’y")}}`, line 18: `datecreated` is one of the elements that is always present in all content types, and it contains the date the record was created. It's stored in a machine-readable format, so to display it the way we want, we use the `date()` filter. In this case, it will output something like 'August 26, ’12'.

<h3>Twig basics</h3>

There are basically three different types of Twig tags that you can use in your templates: 

  - `{% foo %}` is a functional tag. It contains some keyword, and it usually _does_ something. It's used for `for`-loops to iterate over an array, `if`-statements, `include`-statements, `set`-statements and things like that. 
  - `{{ foo }}` is a simple output tag. Whatever is in the variable `foo` gets sent to the browser. 
  - `{# foo #}` is a comment. Use it to add comments to your templates, that don't do anything. they are comparible to the HTML comments like `<!-- foo -->`, except for the fact that Twig comments don't get sent to the browser, so you can't see them using 'view source'.

Inside these tags you can use expressions, statements, variables, functions and filters. We'll give some quick examples here, but for in-depth coverage you should read the Twig manual. 

  - `{{ foo }}` outputs the variable `foo`. Nothing more, nothing less.
  - `{{ bar(foo) }}` outputs the results of the function 'bar()'. In this case, 'foo' is used as an argument in the function, so the output is most likely dependant on the contents of 'foo'.
  - `{{ foo|bar }}` Outputs the variable 'foo', but with 'bar' as a filter. If 'foo' is "hello", `{{ foo|upper }}` would output "HELLO". 
  - `{% if foo == "bar" %}` is a statement that tests if the variable 'foo' is equal to the value "bar". If so, the part that's between the opening statement and the corresponding `{% endif %}` will be rendered to the browser.
 

<h3>Strict variables</h3>

Pilex sets 'strict_variables' in Twig to `false` by default. This will mean you will get not warnings if you try to use a variable that doesn't exist. This makes it easier to use conditional outputting, because it will allow you to do the following, regardless if `content` or `content.image` exist in the current page.

<pre class="brush: html">
	{% if content.image != "" %}
		(do something with the image..)
	{% endif %}
</pre>

It will also make sure the following will not give an error in your templates:

<pre class="brush: html">
	Non existing variable {{ foobar }}, with 
	non existing element {{ foobar.pompidom }}.
</pre>

While this facilitates writing generic templates, it also makes debugging harder, because no error will be shown if you make a typo in a variablename, or try to access a non-existing element. To enable strict variables, set the following in your `config.yml`:

<pre class="brush: plain">
strict_variables: true
</pre> 

If you do this, you will have to do more strict checking on your variables, because an error will be output, if you try to use a non-existing variable: 

<pre class="brush: html">
	{% if content.image is defined and content.image != "" %}
		(do something with the image..)
	{% endif %}
</pre>

