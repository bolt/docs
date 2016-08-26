---
title: Field types
---
Field types
===========

Text and HTML fields
--------------------

### Text

<a href="/files/fieldtypes/text.png" class="popup"><img src="/files/fieldtypes/text.png"></a><br>

A normal text input, often used for titles, short captions and alike.

### Textarea

<a href="/files/fieldtypes/textarea.png" class="popup"><img src="/files/fieldtypes/textarea.png"></a><br>

A longer text input, often used for text that should be unstyled and 1 - 5
paragraphs in length.

### Markdown

<a href="/files/fieldtypes/markdown.png" class="popup"><img src="/files/fieldtypes/markdown.png"></a><br>

A Markdown field. Markdown allows you to write using an easy-to-read,
easy-to-write plain text format, which then converts to valid HTML for viewing
on the frontend. Often used when text needs minimal custom styling but still
needs to be able to be sectioned or formatted. Highly reccomended if you feel
comfortable using it.

### HTML

<a href="/files/fieldtypes/html.png" class="popup"><img src="/files/fieldtypes/html.png"></a><br>

A WYSIWYG field that allows greater freedom to edit styling and presentation of
text. Often used for the body of a page or article. Features of the WYSIWYG can
be turned on or off in the Main configuration.

Media fields
------------

### Image

<a href="/files/fieldtypes/image.png" class="popup"><img src="/files/fieldtypes/image.png"></a><br>

A field for a single image, allows for them to be uploaded, selected from the
server or selected from the stack. Optionally can include `alt` and `title`
attributes.

### Imagelist

<a href="/files/fieldtypes/imagelist.png" class="popup"><img src="/files/fieldtypes/imagelist.png"></a><br>

A field for multiple images, with the same ways to add images as the image
field. Also allows for a line of text to be attached to each image.

### File

<a href="/files/fieldtypes/file.png" class="popup"><img src="/files/fieldtypes/file.png"></a><br>

A field for a single file, allows for them to be uploaded, selected from the
server or selected from the stack.

### Filelist

<a href="/files/fieldtypes/filelist.png" class="popup"><img src="/files/fieldtypes/filelist.png"></a><br>

A field for multiple files, with the same ways to add files as the file
field. Also allows for a line of text to be attached to each file.

### Video

<a href="/files/fieldtypes/video.png" class="popup"><img src="/files/fieldtypes/video.png"></a><br>

A field for embedding videos from websites like Youtube and Vimeo. Also allows
selection of size of the video and previewing of it.

### Geolocation

<a href="/files/fieldtypes/geolocation.png" class="popup"><img src="/files/fieldtypes/geolocation.png"></a><br>

A field for selecting geographic locations via either address lookup, manual
selection on a map or by entering longitude and latitude. This requires that a
google api key has been set in the main configuration. To get a key you can
follow [this guide](https://developers.google.com/maps/documentation/javascript/get-api-key#get-an-api-key)

Number-based fields
----------------

### Checkbox

<a href="/files/fieldtypes/checkbox.png" class="popup"><img src="/files/fieldtypes/checkbox.png"></a><br>

A field to store "True or false" type values. Internally stored as either 1 for
true if the checkbox was checked, and 0 for false if it wasn’t checked.

### Integer

<a href="/files/fieldtypes/integer.png" class="popup"><img src="/files/fieldtypes/integer.png"></a><br>

A field to store whole numbers. The value must be between -2147483648 and
+2147483647. Often used for storing things like prices of products.

### Float

<a href="/files/fieldtypes/float.png" class="popup"><img src="/files/fieldtypes/float.png"></a><br>

A field to store decimal numbers. Internally stored so that they can be sorted
numerically.

Select fields
-------------

### Select

<a href="/files/fieldtypes/select.png" class="popup"><img src="/files/fieldtypes/select.png"></a><br>

A drop-down list to make a pre-defined selection from. There are two ways of
specifying the list of available options. Either predefined options or by
selecting from a ContentTypes records.

### Multiselect

<a href="/files/fieldtypes/multiselect.png" class="popup"><img src="/files/fieldtypes/multiselect.png"></a><br>

A selectfield that allows for multiple items to be selected.

Bolt-specific fields
--------------------

### Templateselect

<a href="/files/fieldtypes/templateselect.png" class="popup"><img src="/files/fieldtypes/templateselect.png"></a><br>

Allows one to choose a specific template for each particular record. Can add
additional fields by using the feature "Template specific fields".

### Slug

<a href="/files/fieldtypes/slug.png" class="popup"><img src="/files/fieldtypes/slug.png"></a><br>

This field will determine what "slug" or permalink is used for accessing the
record on the frontend.

### Meta information

This section will be present in all ContentTypes and allows for a few different
options:

#### Publication date

<a href="/files/fieldtypes/publicationdate.png" class="popup"><img src="/files/fieldtypes/publicationdate.png"></a><br>

This will determine when the record will be published if used in conjuction
with the status "Timed publish". 

#### Depublication date

<a href="/files/fieldtypes/depublicationdate.png" class="popup"><img src="/files/fieldtypes/depublicationdate.png"></a><br>

This will allow for the record to be depublished after a certain date and time.

#### Status

<a href="/files/fieldtypes/status.png" class="popup"><img src="/files/fieldtypes/status.png"></a><br>

This allows you to decide the status of the record. The choices are:

* Published
* Not published
* Draft
* Timed publish

#### Owner

<a href="/files/fieldtypes/owner.png" class="popup"><img src="/files/fieldtypes/owner.png"></a><br>

This will allow you to select which user owns the record. This can affect who
has the ability to edit the record if your permissions are set up as such.

#### Comment

<a href="/files/fieldtypes/image.png" class="popup"><img src="/files/fieldtypes/image.png"></a><br>

This field only appears if you have enabled the changelog in your main
configuration but will allow you to add a comment describing the changes to a
record.

Relations and taxonomy
----------------------

### Relations

<a href="/files/fieldtypes/relationships.png" class="popup"><img src="/files/fieldtypes/relationships.png"></a><br>

Relations allows you to tie a record to another record of either the same or a
different ContentType for usage in your templates. An example of this is often
seen on ecommerece websites that have a "related products" section.

### Taxonomy

<a href="/files/fieldtypes/taxonomy.png" class="popup"><img src="/files/fieldtypes/taxonomy.png"></a><br>

Taxonomy allow you to categorize your record with different types of taxonomy
set up in your taxonomy file. There are three different types of taxonomy:

* **Tags** - Tags are a sort of ‘freeform’ labeling. Each record can have
  several tags, that do not have to be selected from a predefined list. Just
  add tags, as you go! Examples of websites that use tags extensively are
  Flickr or Delicious. The taxonomy can be set up to allow spaces in tag names
  or not.
* **categories** - Categories are chosen predefined categorizations for your
  record. These are often found on weblogging sites, to define the different
  types of blogpostings. The taxonomy can be limited to either one or more
  categories for each record.
* **grouping** - Grouping is like categories but it is - by definition - more
  strict. When a grouping applies to a certain record, that record should be
  viewed as a part of the other records with the same grouping. As such, a
  record can have only one ‘grouping’ at most.
