---
title: Storage Repositories & Entity Mappings
---
Storage Repositories & Entity Mappings
======================================

Bolt 3 comes with an extensible [storage interface](../storage/introduction). 

If your extension needs to register [entity](../storage/entities) 
and [repository](../storage/repositories) mappings, 
your extension loader class should import `StorageTrait`, implement the 
`registerRepositoryMappings()` function and call `extendRepositoryMapping()` in 
your extension loader class.

#### Example

```php
namespace Bolt\Extension\DropBear\KoalaCatcher;

use Bolt\Extension\DropBear\KoalaCatcher\Storage\Entity;
use Bolt\Extension\DropBear\KoalaCatcher\Storage\Repository;
use Bolt\Extension\SimpleExtension;
use Bolt\Extension\StorageTrait;
use Silex\Application;

/**
 * An extension for catching koalas.
 *
 * @author Kenny Koala <kenny@dropbear.com.au>
 */
class KoalaCatcherExtension extends SimpleExtension
{
    use StorageTrait;

    /**
     * {@inheritdoc}
     */
    protected function registerServices(Application $app)
    {
        $this->extendRepositoryMapping();
    }

    /**
     * {@inheritdoc}
     */
    protected function registerRepositoryMappings()
    {
        return [
            'gumtree' => [Entity\GumTree::class => Repository\GumTree::class],
        ];
    }
```

**Note:** The above example uses "class name resolution" via the `::class` keyword.


Entity / Repository and Alias.
-----------------------------

The below code is mapping a custom entity to a custom repository with the "gumtree" alias.
```php
protected function registerRepositoryMappings()
{
    return [
        'gumtree' => [Entity\GumTree::class => Repository\GumTree::class],
    ];
}
```
That alias should match the **"unprefixed"** table name your entity data should be stored in. 

If your data are going to be stored in the `bolt_foo` table, you alias should be `foo`

**Note:** the default table prefix is `bolt_`

Custom Repository to Manage Entity Defined in Contenttype.Yml
-------------------------------------------------------------
Sometimes it could be convenient to define content structure through the [contenttype.yml](../../contenttypes/intro)  file ( in particular to enjoy easy field declaration and to take advantage of the backend auto generated Create/Read/Update/Delete  UI ). If you also want to manage those content entities through a custom repository: we got you covered!

Firstly You must create a custom Entity file which represent your content type and which extends `\Bolt\Storage\Entity\Content` and map that entity to your custom repository. Your custom repository must also extend `\Bolt\Storage\Repository\ContentRepository` and override the `createQueryBuilder` the whole is covered below:

For example, if we define a "races" content type like below:

```yml
races:
    name: Races
    slug: races
    singular_name: Race
    singular_slug: race
    fields:
        title:
            type: text
            class: large
            group: Text
        description:
            type: html
            height: 150px
        racedate:
            type: datetime
            label: "Date de la course"
            required: true
            variant: inline
            group: Options
        aresubscriptionsclosed:
            type: checkbox
            label: "Are Subscription Closed?"
            default: 0
            min: 0
    default_status: publish
    title_format: ['title', 'race_date']
```

We must define a "Race" entity which represent our "races" content type: 

```php
namespace Bolt\Extension\ACME\Race\Storage\Entity;

class Race extends \Bolt\Storage\Entity\Content
{
    /*
     * you can if you want (but dont have to), defined your own getters & setters 
     * here we are just defining one for the sample, but by default because we inherit the Bolt Content class, 
     * we have access to all the common content type value like id/slug/datecreated/relation/taxonomy etc..
     * and also to your custom fields.
     */
 
    protected $aresubscriptionsclosed;
 
    /**
     * @return mixed
     */
    public function getAreSubscriptionsClosed()
    {
        return  $this->aresubscriptionsclosed;
    }

    /**
     * @param mixed $aresubscriptionsclosed
     */
    public function setAreSubscriptionsClosed($value)
    {
        //you add some additional checks on $value here if you want
        $this->aresubscriptionsclosed =  $value;
    }
    
    /**
     * just a quick helper function which we can then use in twig
     */
    public function getDayLeftCountBeforeRace()
    {
        $now = new \DateTime();
        $now = new \DateTime();
        $interval = $this->racedate->diff($now);
        $dayLeftCount = $interval->format('%a');
        return $dayLeftCount;
    }
}
```

Then let's create a custom repository: 

```php
namespace Bolt\Extension\ACME\Race\Storage\Repository;

use Bolt\Extension\ACME\Race\Storage\Entity\Race;

class RaceRepository extends \Bolt\Storage\Repository\ContentRepository
{
    /**
     * @return Race[]
     */
    public function findOpenRaces()
    {
        $qb = $this->createQueryBuilder();
        $qb->where('racedate >= CURRENT_TIMESTAMP()')
            ->andWhere('aresubscriptionsclosed = 0');
        $races = $this->findWith($qb);
        return $races;
    }

    /**
     * It's very important to override the createQueryBuilder method because 
     * the parent class force the alias to "content" which is not compatible with our custom entity
     */
    public function createQueryBuilder($alias = null)
    {
        if(empty($alias)){
            $alias = $this->getAlias();
        }
        return parent::createQueryBuilder($alias);
    }
}
```

Then, we can map this custom entity and this custom repository together in your extension main file: 

```php
protected function registerRepositoryMappings()
{
    //the table generated for my "races" content type is "bolt_races" so the unprefixed name is simply "races"
    return [
        'races' => [
            \Bolt\Extension\ACME\Race\Storage\Entity\Race::class => 
            \Bolt\Extension\ACME\Race\Storage\Repository\RaceRepository::class
        ],
    ];
}
```

Then you are ready to go! You can just retrieve your repository like below: 
```php
$raceRepo = $app['storage']->getRepository(\Bolt\Extension\ACME\Race\Storage\Entity\Race::class);
//you can also retrieve your repository through the previously defined alias : 
//$raceRepo = $app['storage']->getRepository('races');
$openRaces = $raceRepo->findOpenRaces(); //$openRaces contains an array of Race Entities
```

You can also exploit the features of custom entity in your twig templates:
```twig
{% for id, race in openRaces %}
    {{ race.getDayLeftCountBeforeRace() }} days before the race !
{% endfor %}
```

That's all !
