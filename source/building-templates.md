Building templates in Bolt
===========================

To render HTML pages with dynamic content, Bolt uses the [Twig](http://twig.sensiolabs.org/documentation)
templating language. This means that everybody who is familiar with Twig can easily get
started with building templates in Bolt.

In short, Twig can be described as a 'flexible, fast, and secure template engine for PHP'.
Primarily, it separates the markup of your templates from the PHP code in the CMS. It does
this elegantly and quickly, which means that writing your HTML templates in Twig will give
you clean and legible templates. That means you don't have to use PHP-like statements in
your markup, so there's less code like this:

```
<?php if ( the_something('3') ) { ?>
<h1>Title is: <?php echo the_title() ?>.</h1>
<?php } ?>
```

And more like this:

```
{% if something('3') %}
	<h1>Title is: {{ title }}.</h1>
{% endif %}
```

A template in Bolt can use all standard Twig tags, with a few additions that are
specific to working with Bolt. If you're not familiar with Twig yet, you should read
"[Twig for Template Designers](http://twig.sensiolabs.org/doc/templates.html)", on the
official Twig website.

File Structure
--------------

A Bolt website theme consists of a set of twig templates, that are located in the
`theme`-folder in the root of your site. You can always add more templates, if you want to.
By default, the `index.twig` template is the homepage, but you can override it using the
configuration settings.

The current default theme contains the following files and folders:

  - `index.twig` - template frontpage of the website.
  - `entry.twig` - template for a single 'Entry'.
  - `listing.twig` - Template for displaying listings, like 'latest pages', but also taxonomy overview pages.
  - `record.twig` - template for a 'generic' Record page, if the content type has no template specified.
  - `searchresults.twig` - template for displaying search results.
  - `_aside.twig` - helper template that gets included as the sidebar.
  - `_header.twig` - same, but for the header.
  - `_footer.twig` - same, but for the footer.
  - `_recordfooter.twig`, `_sub_menu.twig`, `_sub_searchbox.twig` - small utility files, that are included in the other templates
  - `javascripts/` - a folder with some javascript files.
  - `stylesheets/` - .. and similarly, some css files.

The filenames of the 'helper' templates all start with an underscore. This is just a
convention, to make it easier to recognize which template does what. If one of your
contenttypes have a 'template select' field, Bolt will skip these helper templates by
default.

<p class="tip"> Tip: the default template set uses includes to insert the
header, footer and such, but you're free to use
[Template Inheritance](http://twig.sensiolabs.org/doc/templates.html#template-inheritance)
if you prefer.</p>

By default, Bolt creates links to single pages based on the contenttypes, and it uses a
template based on its name. For instance, if your site has a contenttype `foos`, a single
record in that contenttype will be available under <a>domain.com/foo/slug-of-record</a>,
where `slug-of-record` is the slugified version of the title. Bolt will try to use
`foo.twig` as the template to render the page. You can change this by either defining
another template in `contenttypes.yml`, or using a 'template select' field in the
contenttype. More information about this can be found in the chapter [Working with Content
and Content types](/contenttypes-and-records).


Template tags
-------------

A simple `entry.twig` template could look something like the example you see below. Using
this example we'll go over some of the details of the Twig Template language. As mentioned
before: Much, much more detailed info can be found at
[Twig for Template Designers](http://twig.sensiolabs.org/doc/templates.html)
on the official Twig site.

```
{% include '_header.twig' %}

<article>

    <h1><a href="{{ content.link }}">{{ content.title }}</a></h1>

    {# Only display the image, if there's an actual image to display #}
    {% if content.image!="" %}
        <div class='imageholder-wide'>
        	<img src="{{ content.image|thumbnail(320, 240) }}">
        </div>
    {% endif %}

    {{ content.body }}

    <p class="meta">
    	Posted by {{ content.user.displayname }} on
    	{{ content.datecreated|date("M d, ’y")}}
    </p>

</article>

{% include '_footer.twig' %}
```

What happens in this example is the following:

  - `{% include '_header.twig' %}`, line 1: The include tag reads the template named
    `_header.twig`, parses it like any other Twig template, and outputs it to the browser.

  - `{{ content.title }}`, line 5: Since this is a generic template, 'content' contains
    the record of the current requested page. For example, if the current page is
    <a>domain.com/news/the-website-is-live</a>, `content` would contain the record from
    'news' that has 'the-website-is-live' as a slug. 'content' is an array, so to output
    the 'title' field, we use the '.'-notation.

  - `{{ content.link }}`, line 5: Here we use the link property to get the URL that links
    to the content.

  - `{# Only display .. #}`, line 7: This is a simple comment. It will be removed when the
    template is rendered to the browser, so it will not show up in 'view source'.

  - `{% if content.image!="" %} .. {% endif %}`, lines 8 - 12: The if-statement only
    parses the part between the start and end tag, if the given condition is true. So, in
    this case, the image is only rendered to the browser, if `content.image` does not equal
    "", i.e. if it is not empty.

  - `{{ content.image|thumbnail(320, 240) }}`, line 10: By using the `thumbnail` filter,
    we can create thumbnail images on the fly. In this case, the image source attribute in
    the HTML will be something like '/thumbs/300x240/imagename.jpg'. Bolt has a built-in
    image resizer that will create the image with the exact dimensions, and caches it for
    further use.

  - `{{ content.body }}`, line 14: This renders the 'body' field of the content.

  - `{{ content.datecreated|date("M d, ’y")}}`, line 18: `datecreated` is one of the
    elements that is always present in all content types, and it contains the date the
    record was created. It's stored in a machine-readable format, so to display it the way
    we want, we use the `date()` filter. In this case, it will output something like
    'August 26, ’12'.

### Twig basics

There are basically three different types of Twig tags that you can use in your templates:

  - `{% foo %}` is a functional tag. It contains some keyword, and it usually _does_
    something. It's used for `for`-loops to iterate over an array, `if`-statements,
    `include`-statements, `set`-statements and things like that.
  - `{{ foo }}` is a simple output tag. Whatever is in the variable `foo` gets sent to the
    browser.
  - `{# foo #}` is a comment. Use it to add comments to your templates, that don't do
    anything. they are comparible to the HTML comments like `<!-- foo -->`, except for the
    fact that Twig comments don't get sent to the browser, so you can't see them using
    'view source'.

Inside these tags you can use expressions, statements, variables, functions and filters.
We'll give some quick examples here, but for in-depth coverage you should read the Twig
manual.

  - `{{ foo }}` outputs the variable `foo`. Nothing more, nothing less.
  - `{{ bar(foo) }}` outputs the results of the function `bar()`. In this case, 'foo' is
    used as an argument in the function, so the output is most likely dependent on the
    contents of `foo`.
  - `{{ foo|bar }}` Outputs the variable `foo`, but with `bar` as a filter. If `foo` is
    "hello", `{{ foo|upper }}` would output "HELLO".
  - `{% if foo == "bar" %}` is a statement that tests if the variable `foo` is equal to
    the value "bar". If so, the part that's between the opening statement and the
    corresponding `{% endif %}` will be rendered.


### Strict variables

Bolt sets 'strict_variables' in Twig to `false` by default. This will mean you will get
not warnings if you try to use a variable that doesn't exist. This makes it easier to use
conditional outputting, because it will allow you to do the following, regardless if
`content` or `content.image` exist in the current page.

```
{% if content.image != "" %}
	(do something with the image..)
{% endif %}
```

It will also make sure the following will not give an error in your templates:

```
Non existing variable {{ foo }}, with
non existing element {{ foo.bar }}.
```

While this facilitates writing generic templates, it also makes debugging harder, because
no error will be shown if you make a typo in a variable name, or try to access a
non-existing element. To enable strict variables, set the following in your `config.yml`:

```
strict_variables: true
```

If you do this, you will have to do more strict checking on your variables, because an
error will be output, if you try to use a non-existing variable:

```
{% if content.image is defined and content.image != "" %}
	{# do something with content.image... #}
{% endif %}
```

Template Specific Fields
------------------------

It's very difficult to create a *one size fits all* solution for your site. Many pages may
look quite different to one another. This is why you'd create different templates to suit
these different requirements. However, one page may be radically different from the other
and even *using the same fields* between these pages would provide a limitation. 

For example, your home page may have many different sections with some complex markup
between them. All of your other pages have a single `body` html field, which really won't
suffice. You could create a new contenttype, or use [resource
contenttypes](/howto/resource-contenttype), but this isn't really an elegent solution.

Template specific fields allow you to define extra fields to use when a template is
chosen for a record. They're defined in the theme's `config.yml`, and it's just like
defining the fields of a contenttype.

```yml
templatefields:
    index.twig: # Our homepage template
        section_1_heading:
            type: text
        section_1_body:
            type: html
        section_2_heading:
            type: text
        section_2_body:
            type: html
        footer_image:
            type: image
```

When you change your template while editing a record, and it has template fields
associated with it, you'll be politely notified that you need to save and refresh for
these changes to take effect. If this is already the template for a record, this will
happen automatically.

<!-- Screenshot here -->

Then you will be able to go to the `Template` section of the record editing and change
the content to your heart's desire.

<!-- Screenshot here -->

Once saved, accessing this data is very simple. Just go through the `templatefields`
property of the record.

```twig
{{ record.templatefields.section_1 }}
{# This will output whatever is stored in section_1 #}
```

<p class="warning"><strong>Warning:</strong> The data stored in these fields is only
around while that template is selected. If you change templates with templatefield data
stored, you <em>will</em> lose that data. The application will do its best to warn you
when this will happen.<br />
<!-- Screenshot here --></p>

