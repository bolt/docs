Contenttypes and records
========================

 - All content is a record
 - Every record is a contenttype
 - Contenttypes are defined by fields
 - An array is a simple PHP k65datastructure, used to store information with key-value pairs. The key is a simple label for that particular value, while the value can be a number, string, boolean value or another array.

In the frontend of the website, in your templates, all content is accessible as an array. If you're accessing one record, it will be an array containing the fields, taxonomies and metadata. If you're accessing a set of records, it will be an array of arrays.
I.e. {{ page.title }} or {{ events.4.date }}

if you're building a template and are unsure of what it contains or how the fields are named, use {{ printr(foo) }}, where 'foo' is the name of your array.