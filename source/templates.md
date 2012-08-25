Building templates in Pilex
===========================

To show HTML pages with dynamic content, Pilex uses the [Twig](http://twig.sensiolabs.org/documentation) templating language. This means that everybody who is familiar with Twig can easily get started with building Pilex templates. 

In short, Twig is described as a 'flexible, fast, and secure template engine for PHP.' Primarily, it seperates the markup of your templates from the PHP code in the CMS. It does this elegantly and quickly, which means that writing your HTML templates in Twig will give you clean and legible templates, because you don't have to use PHP-like statements in your markup. That means less code like this: 
<pre class="brush: html">
	&lt;?php if ( the_something('3') ) { ?>
		&lt;h1>Title goes here.&lt;/h1> 
	&lt;?php } ?>
</pre>

And more like this:
<pre class="brush: html">
	{% if something('3') %}
		&lt;h1>Title goes here.&lt;/h1>
	{% endif %}
</pre>

A template in Pilex can use all of the standard Twig tags, with a few additions that are specific to working with Pilex. If you're not familiar with Twig yet, you should read "[Twig for Template Designers](http://twig.sensiolabs.org/doc/templates.html)", on the official Twig website. 

File Structure
--------------
A Pilex site consists of a set of twig templates, that are located in the 'view'-folder in the root of your site. You can always add more templates, if you want to. By default, the `index.twig` template is the homepage, but you can override it, using the configuration settings. 

<p class="tip">
Tip: the default template set uses includes to insert the header, footer and such, but you're free to use <a href="http://twig.sensiolabs.org/doc/templates.html#template-inheritance">Template Inheritance</a> if you prefer. 
</p>