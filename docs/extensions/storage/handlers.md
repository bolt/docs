---
title: Working with Handlers
---
Handlers
========

Overview
--------

Handlers are short segments of code that include an `__invoke` statement and 
executes queries. It is called to not only manipulate the query, but 
run the query and return a result set. If you are wanting to just manipulate the query, 
please look at the documentation for `directives`. 
Examples of a handler would be for pagination, searching, or selecting data from
the database. 

Lets take a look at an example: 

```
/**
 *  Handler class to perform select query and return a resultset.
 */
class SelectQueryHandler
{
    /**
     * @param ContentQueryParser $contentQuery
     *
     * @return QueryResultset
     */
    public function __invoke(ContentQueryParser $contentQuery)
    {
        //A result set to store all results
        $set = new QueryResultset();
        
        //Loop through all content types that need to be fetched
        foreach ($contentQuery->getContentTypes() as $contenttype) {
        
            //Grab the Select Query Service = https://github.com/bolt/bolt/blob/release/3.2/src/Storage/Query/SelectQuery.php
            $query = $contentQuery->getService('select');
            
            //Get the entity manager for the specified content type
            $repo = $contentQuery->getEntityManager()->getRepository($contenttype);
            
            //Set the query builder for the select query
            $query->setQueryBuilder($repo->createQueryBuilder($contenttype));
            
            //Set the content type
            $query->setContentType($contenttype);
            
            //Set any parameters that are defined with the content query
            $query->setParameters($contentQuery->getParameters());
            
            //Run all of the directives that are specified, but skip over the limit directive
            $contentQuery->runDirectives($query, ['limit');
            
            //Query the results and store it
            $result = $repo->queryWith($query);
            if ($result) {
                //Add results to the result set/collection
                $set->add($result, $contenttype);
            }
        }
        if ($query->getSingleFetchMode()) {
            return $set->current();
        } else {
            return $set;
        }
    }
}
```

You can add the new handler by registering it with your parser. This can be done 
by the following code: 

```
    $app['query.parser']->addHandler('select', new SelectQueryHandler());
    $app['query.parser']->addOperation('select');
```

Then you can run the handler by `$app['query']->getContent("pages/select");`
