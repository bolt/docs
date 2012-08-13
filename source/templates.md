Building templates in Pilex
===========================

Pilex uses the Twig templating language. This means that everybody who is familiar with Twig can easily get started with building Pilex templates. 

In short, Twig is described as a 'flexible, fast, and secure template engine for PHP.' Primarily, it seperates the markup of your templates from the PHP code in the CMS. It does this elegantly and quickly, which means that writing your HTML templates in Twig will give you clean and legible templates. No stuff like <?php if ( the_something('3') ) { ?><h1>Something</h1><?php } ?>. 
A template in Pilex can use all of the standard Twig tags, with a few additions that are specific to working with Pilex. If you're not familiar with Twig yet, you should read "[Twig for Template Designers](http://twig.sensiolabs.org/doc/templates.html)", on the official Twig website. 

File Structure
--------------
A Pilex site consists of a set of twig templates, that are located in the 'view'-folder in the root of your site. You can always add more templates, if you want to, but 


Tip: the default template set uses includes to insert the header, footer and such, but you're free to use [Template Inheritance](http://twig.sensiolabs.org/doc/templates.html#template-inheritance) if you prefer.  