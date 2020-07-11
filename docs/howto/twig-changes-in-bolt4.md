---
title: Twig changes between Bolt 3 and Bolt 4
---
Twig changes between Bolt 3 and Bolt 4
===========

##  Approach to migrating a website from Bolt 2/3 to Bolt 4.



1. Create a new Bolt 4 project at (project name) *["Installation"](http://bolt-docs.michael.twokings.eu/4.0/installation/installation)*

2. Enable debug mode on ( project name) (this will help when debugging issues)

3. Transfer the `contenttypes.yaml` from Bolt 3 to Bolt 4.* check their current setup, and if they use repeaters: in Bolt 4, this is replicated with using set and collection fields. Therefore, while it should be easy to copy-paste the file, we have to look at how to adopt it best.

4. Transfer the Twig templates + css files.

5. There will be errors, not least because the contenttypes.yaml will not be exactly the same. Once we know what this is breaking, we can start fixing those issues one by one, leading to a working website :-)

   *You notice the file extensions have a slightly different name. You need to make sure that when copying the “contenttypes.yml” file you rename it afterwards to “contenttypes.yaml”

   *Bolt 2/3 “Contenttypes.yml”*

   *Bolt 4   “Contenttypes.yaml”*

## Differences in code encountered:

**[Tags:](https://docs.bolt.cm/4.0/twig-components/tags#jumpbutton)** 

### Spaceless

**“Bolt 3”**

```twig
{% spaceless %} - {% end spaceless%} 
```

“**Bolt 4”**

```twig
{% apply spaceless %} - {% endapply %} 
```



**[Functions:](https://docs.bolt.cm/4.0/twig-components/functions#jumpbutton)** 

### Image

**“Bolt 3”**

```twig
<img src=“{{ image(partner, xxx, xxx) }}” alt=”{{partner.title}}”/>
```

**“Bolt 4”**

```twig
{{ showimage(partner, xxx, xxx) }}
```





 **[Global variables:](https://docs.bolt.cm/4.0/twig-components/variables#jumpbutton)** 

### "app.config.get” changed to “config.get"

*(app, config). Config was a property of app*

**“Bolt 3”**

```twig
{{ app.config.get('general/sitename') }}
```

**“Bolt 4”**

```twig
{{ config.get('general/sitename') }}
```



## **Other changes**

- Repeatable content fields are replaced by *[“collections”](https://docs.bolt.cm/4.0/fields/collection#jumpbutton)* and *[”sets”](https://docs.bolt.cm/4.0/fields/set#jumpbutton)* in Bolt 4.

- The *["Conimex extension"](https://extensions.boltcms.io/en/package/bobdenotter-conimex)* for bolt 4 is not compatible with the database exports of Bolt 3 for now.

- In the future the extension should make it possible to import Bolt 3 database yml files to a Bolt 4 database.

  









