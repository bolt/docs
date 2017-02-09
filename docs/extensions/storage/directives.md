---
title: Working with Directives
---
Directives
========

Overview
--------

Directives are short segments of code that include an `__invoke` statement and 
manipulate queries. A good example of this would be the [LimitHandler](https://github.com/bolt/bolt/blob/master/src/Storage/Query/Handler/LimitHandler.php).
As you can see the code is very simplistic and all it does is manipulates the query 
builder and sets a limit on the result.

The code that would execute the `LimitHandler` would be: 
`{% setcontent mypages = 'pages' limit 1 %}`

You can add your own directive by creating a new extension, and registering 
it as a directive handler for the content parser service. An example of doing 
that would be: 
`$app['query.parser']->addDirectiveHandler('limit', new LimitHandler());`
