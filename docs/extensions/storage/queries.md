---
title: Working with Queries
---
Queries
========

Overview
--------

In the new storage system it contains the query object that provides additional 
functionality to work with the database. You can access the query functionality 
by using the following service - `$app['query']`. The query allows access to the 
TWIG method `setcontent`. Internally `$app['query']` is used to run this. An example 
of this functionality can be seen here - 

### Fetching Content
```
// getContent has two parameters - the query and the parameters
// Examples of usage:

// Get page with id 1
$page = $app['query']->getContent('pages', ['id' => 1]);

// Get about page and only return ONE
$page = $app['query']->getContent('pages/about', ['returnsingle' => true]);

// Search pages
$pages = $app['query']->getContent('pages/search', ['filter' => 'term']);

// Display the latest pages
$pages = $app['query']->getContent('pages/latest');

// Get two pages
$pages = $app['query']->getContent('pages/2');

// Pagination is not yet implemented
```

### Fetching Related Content
```
// Get relationships
$page = $app['query']->getContent('pages/1');

foreach ($results->relation['entries'] as $item) {
    // Access relationship in here ... Item will be EntityProxy, but can be accessed like a Content object
    // OR ... $item->toArray(); will return all fields
}

// Checking if item has related items
$page = $app['query']->getContent('pages/1');

$page->getRelation()->getField('entries')->count()
```
