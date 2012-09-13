Contenttypes and records
========================

All content in Bolt is stored in the database in a logical and flexible fashion. In general, when you're building a website, you have an idea what kind of content you're going to be managing with the website. Most websites have some sort of 'pages' for generic stuff like 'about us' or 'Company History'. Most websites will also have some form of news-like items, that are shown based on the date that they were published. Some other sites might have 'book reviews' or 'event dates' or even completely different content. All of these different types of content are called **Contenttypes** in Bolt, and you can add as many different types as you need. 

Each contenttype is defined by a few fixed **Fields** that are used internally, but otherwise you're free to define how the content in a Contenttype is structured. For instance, in an 'event', you'll need a date on which the event takes place. For a 'book review', you'll need an author and publisher of the book. Other commonly used fields are 'title', 'introduction' or 'image'. Some of the Fields are Fixed, which means that every content type has them. For example, every contenttype has a Field for 'id', 'slug', 'date_created' and 'user'. Below we'll describe how to define the Contenttypes and the Fields that you can use to store the desired information in them. 

All content in your website is part of one Contenttype, which automatically defines which fields that piece of content has, and that automatically specifies how that piece of content is structured. Each one of those pieces of content is called a **Record**, and is stored in the database together. For example, a single 'book review' is a Record of Contenttype 'reviews' and a single 'page' is a Record of Contenttype Pages. 

When you're building a site that shows listings of several Records, that's called an Array of Records. For instance, if you create a page that has 'the five latest book reviews', you'll be using an Array of 5 'book review' Records of Contenttype 'book reviews'. 

Before we'll dive into the details, we'll give you a quick example of a simple Contenttype, how it's stored, and how you can access it in the templates to display on your site. 

An Example: News items
----------------------

In this example, we'll create a very simple contenttype for news items. Each news item will have a title, an image, and some text. We'll also be using some of the fixed Fields, like the slug, the user and the date. 

To add this Contenttype, edit the file app/config/contenttypes.yml, and add the following to the bottom or top of the file:

<pre class="brush: plain">
news:
    name: News
    singular_name: Newsitem 
    fields:
        title:
            type: text
            class: large
        slug:
            type: slug
            uses: title
        image:
            type: image             
        text:
            type: html
            height: 300px
    template: news.twig
</pre> 

<p class="note"><strong>Note:</strong> This file is in the YAML format, which means that the indentation is important. Make sure you leave leading spaces intact.</p>

This creates a new contenttype 'news'. Its name is 'News', and a single record is named 'Newsitem'. We've defined fields for 'title', 'slug', 'image' and 'text'. The 'template' defines the default template to use, when displaying a single template in the browser. 

After you've saved the file and Refresh the Dashboard screen in your browser, you'll be greeted by a warning that the Database needs to be updated. If we do this, the new contenttyp will be added to the database, with the fields that we defined in our contenttypes.yml file. 

<a href="/files/content-example1.png" class="fancybox"><img src="/files/content-example1.png" width="500"></a>

When you go to Settings > Check Database, the database will be updated, and you'll be given the option to add some "Lorem Ipsum" Records to the newly created Contenttype. If you do this, and go back to the dashboard, you'll see your new Contenttype with some example news items. Sweet! 

<a href="/files/content-example2.png" class="fancybox"><img src="/files/content-example2.png" width="500"></a>

To add a listing of these news items to the website, edit the twig template `view/index.twig`. Most likeley, it'll contain an include for a header and some other things. Add the following to the HTML-code, preferable somewhere below the header section:


When you refresh the front page of the website, you should see four news items listed on the page. You can click the title to go to the news item on a seperate page, but you'll get an error. In the contenttype we defined the template as `news.twig`, but it doesn't exist. Create the file in the `view/` folder, and add the following HTML-code:

<pre class="brush: html">
&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;
&lt;head&gt;
	&lt;meta charset="utf-8" /&gt;
	&lt;title&gt;{{ newsitem.title }}&lt;/title&gt;
&lt;/head&gt;

&lt;body&gt;

    &lt;article&gt;
        
        &lt;h1&gt;&lt;a href="{{ newsitem.link }}"&gt;{{ newsitem.title }}&lt;/a&gt;&lt;/h1&gt;
        
        {% if content.image!="" %}
            &lt;div class='imageholder'&gt;&lt;img src="{{ newsitem.image|thumbnail(480, 480) }}"&gt;&lt;/div&gt;
        {% endif %}
        
        {{ newsitem.text }}
    
        &lt;p class="meta"&gt;&lt;a href="{{ newsitem.link }}"&gt;Link&lt;/a&gt; - 
        	Posted by {{ newsitem.username }} 
        	on {{ newsitem.datecreated|date("M d, ’y")}}&lt;/p&gt;
        
    &lt;/article&gt;   
&lt;/body&gt;
&lt;/html&gt;
</pre>

<p class="note"><strong>Tip:</strong> If you're curious about the different <code>{{ tags }}</code> in this bit of code, read the <a href="/templates">Template documentation</a>.</p>

In the frontend of the website, in your templates, all content is accessible as an array. If you're accessing one record, it will be an array containing the fields, taxonomies and metadata. If you're accessing a set of records, it will be an array of arrays.
I.e. `{{ page.title }}` for the title of a page or `{{ events.4.date }}` for the date of the fourth event in an array.

If you're building a template and are unsure of what a certain variable contains or how the fields are named, use `{{ print(foo) }}`, where 'foo' is the name of your record or array. Below, in the section [The structure of a Record](#), the structure of a records is explained in detail.

Defining contenttypes
---------------------

In the frontend of the website, in your templates, all content is accessible as an array. If you're accessing one record, it will be an array containing the fields, taxonomies and metadata. If you're accessing a set of records, it will be an array of arrays.
I.e. `{{ page.title }}` for the title of a page or `{{ events.4.date }}` for the date of the fourth event in an array.

If you're building a template and are unsure of what a certain variable contains or how the fields are named, use `{{ print(foo) }}`, where 'foo' is the name of your record or array. Below, in the section [The structure of a Record](#), the structure of a records is explained in detail.

Field definitions
-----------------

In the frontend of the website, in your templates, all content is accessible as an array. If you're accessing one record, it will be an array containing the fields, taxonomies and metadata. If you're accessing a set of records, it will be an array of arrays.
I.e. `{{ page.title }}` for the title of a page or `{{ events.4.date }}` for the date of the fourth event in an array.

If you're building a template and are unsure of what a certain variable contains or how the fields are named, use `{{ print(foo) }}`, where 'foo' is the name of your record or array. Below, in the section [The structure of a Record](#), the structure of a records is explained in detail.

The structure of a Record
-------------------------

If you're building a template and are unsure of what a certain variable contains or how the fields are named, use `{{ print(foo) }}`, where 'foo' is the name of your record or array.

