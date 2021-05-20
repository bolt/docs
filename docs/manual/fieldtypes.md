---
title: Field types
---
Field types
===========

Text and HTML fields
--------------------

### Text

<a href="https://user-images.githubusercontent.com/7093518/91459622-21971580-e887-11ea-89f4-34eca1f725ce.png" class="popup"><img src="https://user-images.githubusercontent.com/7093518/91459622-21971580-e887-11ea-89f4-34eca1f725ce.png"></a><br>

A normal text input, often used for titles, short captions and alike.

### Textarea

<a href="https://user-images.githubusercontent.com/7093518/91459746-45f2f200-e887-11ea-805b-5678d46d4b1b.png" class="popup"><img src="https://user-images.githubusercontent.com/7093518/91459746-45f2f200-e887-11ea-805b-5678d46d4b1b.png"></a><br>

A longer text input, often used for text that should be unstyled and 1 - 5
paragraphs in length.

### Markdown

<a href="https://user-images.githubusercontent.com/7093518/91459821-63c05700-e887-11ea-9d12-5b3e84a24322.png" class="popup"><img src="https://user-images.githubusercontent.com/7093518/91459821-63c05700-e887-11ea-9d12-5b3e84a24322.png"></a><br>

A Markdown field. Markdown allows you to write using an easy-to-read,
easy-to-write plain text format, which then converts to valid HTML for viewing
on the frontend. Often used when text needs minimal custom styling but still
needs to be able to be sectioned or formatted. Highly reccomended if you feel
comfortable using it.

### HTML

<a href="https://user-images.githubusercontent.com/7093518/91459881-789cea80-e887-11ea-9681-ffd60be1c8a6.png" class="popup"><img src="https://user-images.githubusercontent.com/7093518/91459881-789cea80-e887-11ea-9681-ffd60be1c8a6.png"></a><br>

A WYSIWYG field that allows greater freedom to edit styling and presentation of
text. Often used for the body of a page or article. Features of the WYSIWYG can
be turned on or off in the Main configuration.

Date Field
----------

### Date

<a href="https://user-images.githubusercontent.com/7093518/91460561-3627dd80-e888-11ea-9485-6ba7acdd7efa.png" class="popup"><img src="https://user-images.githubusercontent.com/7093518/91460561-3627dd80-e888-11ea-9485-6ba7acdd7efa.png"></a><br>

A field for a single date with or without time. See https://github.com/bolt/docs/edit/4.0/docs/manual/fieldtypes.md for options


Media fields
------------

### Image

<a href="https://user-images.githubusercontent.com/7093518/91460674-5ce61400-e888-11ea-9371-ee958177c8c1.png" class="popup"><img src="https://user-images.githubusercontent.com/7093518/91460674-5ce61400-e888-11ea-9371-ee958177c8c1.png"></a><br>

A field for a single image, allows for them to be uploaded, selected from the
server or selected from the stack. Optionally can include `alt` and `title`
attributes.

### Imagelist

<a href="https://user-images.githubusercontent.com/7093518/91460750-7ab37900-e888-11ea-848c-6b7c9d526efe.png" class="popup"><img src="https://user-images.githubusercontent.com/7093518/91460750-7ab37900-e888-11ea-848c-6b7c9d526efe.png"></a><br>

A field for multiple images, with the same ways to add images as the image
field. Also allows for a line of text to be attached to each image.

### File

<a href="https://user-images.githubusercontent.com/7093518/91461007-ca924000-e888-11ea-883e-c03b1b40f53c.png" class="popup"><img src="https://user-images.githubusercontent.com/7093518/91461007-ca924000-e888-11ea-883e-c03b1b40f53c.png"></a><br>

A field for a single file, allows for them to be uploaded, selected from the
server or selected from the stack.

### Filelist

<a href="https://user-images.githubusercontent.com/7093518/91461093-e4338780-e888-11ea-9429-b980a3252909.png" class="popup"><img src="https://user-images.githubusercontent.com/7093518/91461093-e4338780-e888-11ea-9429-b980a3252909.png"></a><br>

A field for multiple files, with the same ways to add files as the file
field. Also allows for a line of text to be attached to each file.

### Embed

<a href="https://user-images.githubusercontent.com/7093518/91461493-5e640c00-e889-11ea-86d1-18b3c554dec6.png" class="popup"><img src="https://user-images.githubusercontent.com/7093518/91461493-5e640c00-e889-11ea-86d1-18b3c554dec6.png"></a><br>

A field for embedding videos and other content from websites like Youtube and Vimeo. Also allows
selection of size of the video and previewing of it.

Number-based fields
----------------

### Checkbox

<a href="https://user-images.githubusercontent.com/7093518/91461591-7b004400-e889-11ea-8fa1-6c94d35d278e.png" class="popup"><img src="https://user-images.githubusercontent.com/7093518/91461591-7b004400-e889-11ea-8fa1-6c94d35d278e.png"></a><br>

A field to store "True or false" type values. Internally stored as either 1 for
true if the checkbox was checked, and 0 for false if it wasn’t checked.

### Integer

<a href="https://user-images.githubusercontent.com/7093518/91461920-e1856200-e889-11ea-8f43-64d870f0a4ec.png" class="popup"><img src="https://user-images.githubusercontent.com/7093518/91461920-e1856200-e889-11ea-8f43-64d870f0a4ec.png"></a><br>

A field to store whole numbers. The value must be between -2147483648 and
+2147483647. Often used for storing things like prices of products.

### Float

<a href="https://user-images.githubusercontent.com/7093518/91531685-77ae9c00-e90d-11ea-95d6-df32970b9b32.png" class="popup"><img src="https://user-images.githubusercontent.com/7093518/91531685-77ae9c00-e90d-11ea-95d6-df32970b9b32.png"></a><br>

A field to store decimal numbers. Internally stored so that they can be sorted
numerically.

Select fields
-------------

### Select

<a href="https://user-images.githubusercontent.com/7093518/91531755-93b23d80-e90d-11ea-86ed-a36990385780.png" class="popup"><img src="https://user-images.githubusercontent.com/7093518/91531755-93b23d80-e90d-11ea-86ed-a36990385780.png"></a><br>

A drop-down list to make a pre-defined selection from. There are two ways of
specifying the list of available options. Either predefined options or by
selecting from a ContentTypes records.

### Multiselect

<a href="https://user-images.githubusercontent.com/7093518/91531813-b04e7580-e90d-11ea-9931-3528b059188f.png" class="popup"><img src="https://user-images.githubusercontent.com/7093518/91531813-b04e7580-e90d-11ea-9931-3528b059188f.png"></a><br>

A selectfield that allows for multiple items to be selected.

Bolt-specific fields
--------------------

### Templateselect

<a href="https://user-images.githubusercontent.com/7093518/91534734-556b4d00-e912-11ea-8b2f-1452ed3204cf.png" class="popup"><img src="https://user-images.githubusercontent.com/7093518/91534734-556b4d00-e912-11ea-8b2f-1452ed3204cf.png"></a><br>

Allows one to choose a specific template for each particular record. Can add
additional fields by using the feature "Template specific fields".

### Slug

<a href="https://user-images.githubusercontent.com/7093518/91534811-7a5fc000-e912-11ea-9c1f-cc7de20debe7.png" class="popup"><img src="https://user-images.githubusercontent.com/7093518/91534811-7a5fc000-e912-11ea-9c1f-cc7de20debe7.png"></a><br>

This field will determine what "slug" or permalink is used for accessing the
record on the frontend.

### Meta information

This section will be present in all ContentTypes and allows for a few different
options:

<a href="https://user-images.githubusercontent.com/7093518/91534876-96fbf800-e912-11ea-9fcb-ee9c4792f3f0.png" class="popup"><img src="https://user-images.githubusercontent.com/7093518/91534876-96fbf800-e912-11ea-9fcb-ee9c4792f3f0.png"></a><br>

#### Publication date

This will determine when the record will be published if used in conjuction
with the status "Timed publish". 

#### Depublication date

This will allow for the record to be depublished after a certain date and time.

#### Status

This allows you to decide the status of the record. The choices are:

* Published
* Held
* Draft
* Timed publish

Relations and taxonomy
----------------------

### Relations

<a href="https://user-images.githubusercontent.com/7093518/90906874-8e676700-e3d2-11ea-92b7-928514f576b9.png" class="popup"><img src="https://user-images.githubusercontent.com/7093518/90906874-8e676700-e3d2-11ea-92b7-928514f576b9.png"></a><br>

Relations allows you to tie a record to another record of either the same or a
different ContentType for usage in your templates. An example of this is often
seen on ecommerece websites that have a "related products" section.

### Taxonomy

<a href="https://user-images.githubusercontent.com/7093518/90906874-8e676700-e3d2-11ea-92b7-928514f576b9.png" class="popup"><img src="https://user-images.githubusercontent.com/7093518/90906874-8e676700-e3d2-11ea-92b7-928514f576b9.png"></a><br>

Taxonomy allow you to categorize your record with different types of taxonomy
set up in your taxonomy file. There are three different types of taxonomy:

* **tags** - Tags are a sort of ‘freeform’ labeling. Each record can have
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
