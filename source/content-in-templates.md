Content in templates
====================

Perhaps the thing you'll do most in templates, is access records of content. Either by requesting specific content, or implicitly when requesting pages that are the defaults for certain contenttypes. 

For example, if you have a 'Pages' contenttype, with 'Page' as a singular_name, your site will automatically have pages like:

  - `http://example.org/pages` - Uses `pages.twig`, and displays several records of contenttype 'Pages'.
  - `http://example.org/page/lorem-ipsum-dolor` - Uses `page.twig`, and displays the record of contenttype 'Pages' with the slug 'lorem-ipsum-dolor'.

Unless specified, Pilex will determine the names of these templates automatically. Both of these default templates can be overridden by defining `template` and `singletemplate` in `contenttypes.yml`. 
If the contenttype has a 'template select' field type, the template can be set on a per-record basis. 

In the default template for a single record, it is available as both {{ record }} and also by the name of the singular name. So, in the above example, you can also use {{ page }}, without having to set it specifically.
Likewise, in the default template for multiple records, the content is available as {{ records }} and also by the name of the contenttype, for example {{ pages }}

