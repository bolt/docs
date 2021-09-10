Fetching Content
================

This page describes how to fetch existing Content from the database in code. Not to be confused with [fetching Content][fetching] in your (frontend) templates.

## Fetching content programatically in `setcontent`-like format.

<p class="note">This is the recommended and easy way of fetching Content
in Bolt. Alternatively, you can use Bolt's built-in repository and/or write
your own Doctirne repositories for special cases. See below for more info.</p>

Bolt provides the `Query` class, which is a Symfony service that allows you to query
and fetch content much like you would do in Twig templates using `setcontent`.

You can use two main methods of the service to fetch content:

| Method | Explanation |
--- | --- |
| `getContent` | A generic way of fetching content with new defaults, limitations and restrictions. |
| `getContentForTwig` | A way of fetching content suitable for displaying in the frontend, with default `order` and `published` status for entries. |

The `ExampleFetcher` class below shows you how to inject the `Query` service
and use it to filter and fetch content in PHP code.

```php
<?php

namespace App;

use Bolt\Enum\Statuses;
use Bolt\Storage\Query;

class ExampleFetcher
{
    /** Query*/
    private $query;

    public function __construct(Query $query)
    {
        $this->query = $query;
    }

    public function fetch(): array
    {
        // Using the generic Query::getContent()
        $entries = $this->query->getContent('entries', [
           'status' => Statuses::PUBLISHED,
           'title' => '%entry%' // search LIKE
        ]);

        // Using Query::getContentForTwig()
        // which sets default parameters, like status 'published'
        // and orderBy
        $entriesForTwig = $this->query->getContentForTwig('entries', [
            'title' => '%entry%' // search LIKE
        ]);

        // Get entries and pages, without any filtering parameters
        $entriesAndPages = $this->query->getContentForTwig('entries,showcases');


        // Finally, since all results are paginated using PagerFanta
        // here is a few operations we can run on them.
        $numberOfPages = $entries->getNbResults();
        $numberOfEntries = $entries->getNbResults();
        $currentPage = $entries->getCurrentPage();
        $currentPageEntries = iterator_to_array($entries->getCurrentPageResults());

        // And finally, let's just return entries that we found.
        return $currentPageEntries;
    }
}
```

## Fetching content using built-in Repositories

Doctrine is a PHP object relational mapper (ORM) and
Database Abstraction Layer (DBAL) that is the de-facto standard for Symfony
projects like Bolt. In plain terms, Doctrine is the PHP library
for working with databases in Symfony and Bolt itself.

Doctrine Repositories are PHP classes that allow you to query the [Entities][entities]
(tables, records) that Bolt has. Each entity has its own Repository class.

| Class | Purpose |
--- | --- |
| `ContentRepository` | Query and fetch Content entities (Bolt records) |
| `FieldRepository` | Query and fetch individual Fields in Bolt records |
| `LogRepository` | Query and fetch entities from the Bolt Logger |
| `MediaRepository` | Query and fetch media from the Filemanager |
| `RelationRepository` | Query and fetch relations between two Bolt records |
| `ResetPasswordRequestRepository` | Query and fetch entities related to Bolt's password reset feature |
| `TaxonomyRepository` | Query and fetch the taxonomy entities for records |
| `UserAuthTokenRepository` | Query and fetch info about authenticated users. Used on the Users & Permissions page |
| `UserRepository` | Query and fetch Bolt users. |

The `ContentRepository`, itself a Symfony service much like the `Query` class, 
has a number of methods. The `ExampleFetcherFromRepository` class shows how to work with Bolt's
own `ContentRepository`.

```php
<?php

namespace App;

use Bolt\Repository\ContentRepository;

class ExampleFetcherFromRepository
{
    /** @var ContentRepository */
    private $contentRepository;

    public function __construct(ContentRepository $contentRepository)
    {
        $this->contentRepository = $contentRepository;
    }

    public function fetch(): array
    {
        // Find record with specific ID
        $entryById = $this->contentRepository->find(50);

        // Get all records.
        $records = $this->contentRepository->findAll();

        // Get all records matching criteria, e.g. Content Type
        $entries = $this->contentRepository->findBy([
           'contentType' => 'entries'
        ]);

        // Search records programatically, for records that include 'apples', page 1, 100 per page
        $searchResults = iterator_to_array(
            $this->contentRepository->searchNaive('apples', 1, 100)
        );

        // Find by the record slug
        $aboutUs = $this->contentRepository->findOneBySlug('about-us');

        // Find by the value of a field
        $entry = $this->contentRepository->findOneByFieldValue('title', 'This is the title of the entry');

        // Let's return some records here.
        return $records;
    }
}
```

For more information on querying using Repositories, check the official 
[Doctrine documentation][doctrine-repositories].

## Creating a custom Repository

You can also create your custom Repository class inside the `src` folder of your project.
To do so, make sure you read and understand the contept behind [Doctrine repositories][doctrine-repositories] first.

Below is a Repository skeleton that you can use for Bolt `Content` entities.

```php
<?php

declare(strict_types=1);

namespace App;

use Bolt\Configuration\Content\ContentType;
use Bolt\Doctrine\JsonHelper;
use Bolt\Entity\Content;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\ORM\QueryBuilder;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method Content|null find($id, $lockMode = null, $lockVersion = null)
 * @method Content|null findOneBy(array $criteria, array $orderBy = null)
 * @method Content[] findAll()
 * @method Content[] findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class ContentRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Content::class);
    }

    public function getQueryBuilder(): QueryBuilder
    {
        return $this->createQueryBuilder('content');
    }

    public function findOneByFieldValue(string $fieldName, string $value, ?ContentType $contentType = null): ?Content
    {
        $qb = $this->getQueryBuilder();
        $connection = $qb->getEntityManager()->getConnection();

        [$where, $value] = JsonHelper::wrapJsonFunction('translation.value', $value, $connection);

        $query = $qb
            ->innerJoin('content.fields', 'field')
            ->innerJoin('field.translations', 'translation')
            ->andWhere($where . ' = :value')
            ->setParameter('value', $value)
            ->andWhere('field.name = :name')
            ->setParameter('name', $fieldName);

        if ($contentType) {
            $query->andWhere('content.contentType = :ct')
                ->setParameter('ct', $contentType->get('slug'));
        }

        return $query->setMaxResults(1)
            ->getQuery()
            ->getOneOrNullResult();
    }
}
```

[fetching]: /templating/content-fetching
[entities]: /extensions/entities
[doctrine-repositories]: https://www.doctrine-project.org/projects/doctrine-orm/en/2.9/reference/working-with-objects.html
