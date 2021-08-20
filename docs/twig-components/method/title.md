# title

`title(locale = "", length = 120)` is a Twig filter to create a short, text-only, title of a record. It'll produce a suitable title-like output that can be 
used for overview pages, listings, et cetera. It does this, regardless of the actual structure of the ContentType. It 
looks at fields named 'title' or 'heading', or at the fields used in the slug, but as long as there's any text fields, 
you'll get a consistent and useable output.

|Parameter	|Description
|---|---
|locale	|The locale to generate the title for
|length	|The maximum length of the title


<p class="note"><strong>Note:</strong> Twig supports named parameters. So, if you want to set the length of the title, without having to explicitly 
set the locale, you can use this: {{ record|title(length = 100) }}.</p>
