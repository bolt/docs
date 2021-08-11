# absolute_link

`absolute_link(link)` is a Twig function to create a proper link to either a relative page, or to an external source. In
the below example, the editor can provide either page/about, or https://boltcms.io, and both will work:

```twig
<a href="{{ absolute_link(block.contentlink|e) }}">Read more</a>
```

See also [Linking in templates](https://docs.bolt.cm/4.0/templating/linking-in-templates), with a detailed description
of a good usecase.

Source: Bolt